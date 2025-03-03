import {
  AngularNodeAppEngine,
  createNodeRequestHandler,
  isMainModule,
  writeResponseToNodeResponse,
} from '@angular/ssr/node';
import express from 'express';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import cors from 'cors';
import 'dotenv/config';
import { MongoClient, Db, ObjectId } from 'mongodb';
import { User } from './app/user.model';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

const serverDistFolder = dirname(fileURLToPath(import.meta.url));
const browserDistFolder = resolve(serverDistFolder, '../browser');

const app = express();
const angularApp = new AngularNodeAppEngine();

app.use(cors({ origin: 'http://localhost:4200' }));
app.use(express.json());

const MONGO_URI = process.env['DB_CONN_STRING'] || 'mongodb://localhost:27017/';
const DB_NAME = process.env['DB_NAME'] || 'bloggistDB';

const mongoClient = new MongoClient(MONGO_URI);
await mongoClient.connect();

const db = mongoClient.db(DB_NAME);

/**
 * Example Express Rest API endpoints can be defined here.
 * Uncomment and define endpoints as necessary.
 *
 * Example:
 * ```ts
 * app.get('/api/**', (req, res) => {
 *   // Handle API request
 * });
 * ```
 */

app.post('/api/user/register', async (req, res) => {
  const { email, password } = req.body;

  const newUser = {
    email: email,
    password: await bcrypt.hash(password, 10),
  };

  await db.collection('users').insertOne(newUser);

  res.status(201).json(newUser);
});

app.post('/api/user/login', async (req, res) => {
  const { email, password } = req.body;

  const user = await db.collection<User>('users').findOne({ email });
  const passwordMatched = user
    ? await bcrypt.compare(password, user.password)
    : false;

  const token = jwt.sign({ id: user?._id }, process.env['TOKEN_SECRET']!, {
    expiresIn: '1d',
  });

  passwordMatched
    ? res.status(200).json({ token })
    : res.status(401).json(null);
});

app.post('/api/blogs', async (req, res) => {
  const { title, desc } = req.body;

  const newBlog = { title, desc };
  await db.collection('blogs').insertOne(newBlog);

  res.status(201).json(newBlog);
});

app.get('/api/blogs', async (_req, res) => {
  const blogs = await db.collection('blogs').find().toArray();

  res.status(200).json(blogs);
});

app.get('/api/blogs/ids', async (_req, res) => {
  const blogs = await db
    .collection('blogs')
    .find()
    .project({ _id: 1 })
    .toArray();

  res.status(200).json(blogs);
});

app.get('/api/blogs/:id', async (req, res) => {
  const { id } = req.params;

  const blog = await db.collection('blogs').findOne({ _id: new ObjectId(id) });

  res.status(200).json(blog);
});

/**
 * Serve static files from /browser
 */
app.use(
  express.static(browserDistFolder, {
    maxAge: '1y',
    index: false,
    redirect: false,
  }),
);

/**
 * Handle all other requests by rendering the Angular application.
 */
app.use('/**', (req, res, next) => {
  angularApp
    .handle(req)
    .then((response) =>
      response ? writeResponseToNodeResponse(response, res) : next(),
    )
    .catch(next);
});

/**
 * Start the server if this module is the main entry point.
 * The server listens on the port defined by the `PORT` environment variable, or defaults to 4000.
 */
if (isMainModule(import.meta.url)) {
  const port = process.env['PORT'] || 4000;
  app.listen(port, () => {
    console.log(`Node Express server listening on http://localhost:${port}`);
  });
}

/**
 * Request handler used by the Angular CLI (for dev-server and during build) or Firebase Cloud Functions.
 */
export const reqHandler = createNodeRequestHandler(app);
