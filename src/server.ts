import {
  AngularNodeAppEngine,
  createNodeRequestHandler,
  isMainModule,
  writeResponseToNodeResponse,
} from '@angular/ssr/node';
import express, { NextFunction, Request, Response } from 'express';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import cors from 'cors';
import 'dotenv/config';
import { MongoClient, ObjectId } from 'mongodb';
import { User } from './app/server/user.model';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { Comment } from './app/server/comment.model';
import {
  BlogResponse,
  BlogsResponse,
  CommentResponse,
} from './app/response.models';

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

function verifyTokenMiddleware(
  req: Request,
  res: Response,
  next: NextFunction,
): void {
  const token = req.headers['authorization'];

  if (!token) {
    res.status(403).json({ message: 'No token provided' });
    return;
  }

  try {
    const decoded = jwt.verify(
      token.split(' ')[1],
      process.env['TOKEN_SECRET']!,
    );
    (req as any).user = decoded;
    (req as any).user.token = token.split(' ')[1];
    next();
  } catch (error) {
    res.status(401).json({ message: 'Invalid token' });
    return;
  }
}

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

const getRandomColor = () => {
  const colorCombos = [
    { bgColor: '#FCEEE4', color: '#D94F4F' },
    { bgColor: '#E3ECFA', color: '#276FBF' },
    { bgColor: '#E8F6E0', color: '#3B7A57' },
    { bgColor: '#FFE7D0', color: '#DA7746' },
    { bgColor: '#DFF4FA', color: '#2D9CDB' },
    { bgColor: '#E6E6FA', color: '#5F4B8B' },
    { bgColor: '#E1F0E5', color: '#488C5C' },
    { bgColor: '#F3E1FA', color: '#7E3F98' },
    { bgColor: '#FBF0D6', color: '#A67C00' },
    { bgColor: '#E8EBF5', color: '#5953A3' },
    { bgColor: '#EDE6FA', color: '#6C3483' },
    { bgColor: '#FFDCCF', color: '#E07A5F' },
    { bgColor: '#DFF6ED', color: '#16A085' },
    { bgColor: '#EDE1FA', color: '#8E44AD' },
    { bgColor: '#FAE8D0', color: '#F39C12' },
    { bgColor: '#DFDFFA', color: '#3F51B5' },
    { bgColor: '#F4E3DF', color: '#A0522D' },
    { bgColor: '#E0F0F0', color: '#008080' },
    { bgColor: '#DFF7F3', color: '#00695C' },
    { bgColor: '#FAE6C4', color: '#FF8C00' },
    { bgColor: '#E0E8FA', color: '#1565C0' },
    { bgColor: '#FFE8E0', color: '#BF360C' },
    { bgColor: '#E8F5DA', color: '#2E7D32' },
    { bgColor: '#E0F0FF', color: '#0D47A1' },
    { bgColor: '#FFDCE6', color: '#C94D7F' },
    { bgColor: '#FAE2E2', color: '#B71C1C' },
    { bgColor: '#EBEBEB', color: '#37474F' },
    { bgColor: '#E4E8FA', color: '#283593' },
    { bgColor: '#F5E8DB', color: '#8D6E63' },
    { bgColor: '#E5F8E5', color: '#2E8B57' },
    { bgColor: '#FAE1E8', color: '#C2185B' },
    { bgColor: '#E4F9E4', color: '#43A047' },
  ];

  return colorCombos[Math.floor(Math.random() * colorCombos.length)];
};

const getInitials = (fullName: string) => {
  const allNames = fullName.trim().split(' ');
  const initials = allNames.reduce((acc, curr, index) => {
    if (index === 0 || index === allNames.length - 1) {
      acc = `${acc}${curr.charAt(0).toUpperCase()}`;
    }
    return acc;
  }, '');
  return initials;
};

app.post('/api/user/register', async (req, res) => {
  const { name, email, password } = req.body;

  const randomColor = getRandomColor();

  const newUser = {
    name: name,
    email: email,
    password: await bcrypt.hash(password, 10),
    avatar: {
      initials: getInitials(name),
      color: randomColor.color,
      bgColor: randomColor.bgColor,
    },
    createdAt: new Date(),
  };

  await db.collection('users').insertOne(newUser);

  res.status(201).json(newUser);
});

app.post('/api/user/login', async (req, res) => {
  const { email, password } = req.body;

  const user = await db.collection<User>('users').findOne({ email });

  if (!user) {
    return res.status(401).json(null);
  }

  const passwordMatched = user
    ? await bcrypt.compare(password, user.password)
    : false;

  user.token = jwt.sign({ id: user?._id }, process.env['TOKEN_SECRET']!, {
    expiresIn: '1d',
  });

  return passwordMatched
    ? res.status(200).json(user)
    : res.status(401).json(null);
});

app.get('/api/user', verifyTokenMiddleware, async (req, res) => {
  if (!req.user) {
    return res.json(null);
  }

  const user = await db
    .collection<User>('users')
    .findOne({ _id: new ObjectId(req.user.id) });

  if (!user) {
    return res.json(null);
  }

  user.token = req.user.token;

  return res.json(user);
});

app.post('/api/blogs', verifyTokenMiddleware, async (req, res) => {
  const { title, desc } = req.body;

  const newBlog = {
    title,
    desc,
    totalLikes: 0,
    totalComments: 0,
    userId: new ObjectId(req.user!.id),
    createdAt: new Date(),
  };

  await db.collection('blogs').insertOne(newBlog);

  res.status(201).json(newBlog);
});

app.get('/api/blogs', async (req, res) => {
  const userId = new ObjectId(req.query['userId'] as string);

  const blogs: BlogsResponse[] = await db
    .collection('blogs')
    .aggregate<BlogsResponse>([
      {
        $lookup: {
          from: 'users',
          localField: 'userId',
          foreignField: '_id',
          as: 'user',
        },
      },
      { $unwind: '$user' },
      {
        $lookup: {
          from: 'likes',
          localField: '_id',
          foreignField: 'blogId',
          as: 'isLiked',
          pipeline: [{ $match: { userId } }],
        },
      },
      {
        $project: {
          user: {
            _id: 1,
            name: 1,
            avatar: {
              initials: 1,
              color: 1,
              bgColor: 1,
            },
          },
          title: 1,
          totalLikes: 1,
          totalComments: 1,
          isLiked: { $toBool: { $size: '$isLiked' } },
          createdAt: 1,
        },
      },
    ])
    .toArray();

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
  const userId = new ObjectId(req.query['userId'] as string);

  const blog = await db
    .collection('blogs')
    .aggregate<BlogResponse>([
      { $match: { _id: new ObjectId(id) } },
      {
        $lookup: {
          from: 'users',
          localField: 'userId',
          foreignField: '_id',
          as: 'user',
        },
      },
      { $unwind: '$user' },
      {
        $lookup: {
          from: 'likes',
          localField: '_id',
          foreignField: 'blogId',
          as: 'isLiked',
          pipeline: [{ $match: { userId } }],
        },
      },
      {
        $project: {
          user: {
            _id: 1,
            name: 1,
            avatar: {
              initials: 1,
              color: 1,
              bgColor: 1,
            },
          },
          title: 1,
          desc: 1,
          totalLikes: 1,
          totalComments: 1,
          isLiked: { $toBool: { $size: '$isLiked' } },
          createdAt: 1,
        },
      },
    ])
    .next();

  res.status(200).json(blog);
});

app.delete('/api/blogs/:id', verifyTokenMiddleware, async (req, res) => {
  const { id } = req.params;

  const deletedBlog = await db
    .collection('blogs')
    .deleteOne({ _id: new ObjectId(id) });

  if (!deletedBlog) {
    return res.json({ message: 'Blog not found' });
  }

  return res.json({ message: 'Blog deleted' });
});

app.post('/api/blogs/likes', verifyTokenMiddleware, async (req, res) => {
  const blogId = new ObjectId(req.body.id as string);
  const userId = new ObjectId(req.user!.id);

  const isLiked = await db.collection('likes').findOne({ userId, blogId });

  if (isLiked) {
    await db.collection('likes').deleteOne({ _id: isLiked._id });
    await db
      .collection('blogs')
      .updateOne({ _id: blogId }, { $inc: { totalLikes: -1 } });
    return res.json({ liked: false });
  } else {
    await db.collection('likes').insertOne({ userId, blogId });
    await db
      .collection('blogs')
      .updateOne({ _id: blogId }, { $inc: { totalLikes: 1 } });
    return res.json({ liked: true });
  }
});

app.post('/api/comments', verifyTokenMiddleware, async (req, res) => {
  const {
    comment,
    blogId,
    replyId,
  }: { comment: string; blogId: string; replyId: string } = req.body;

  const newComment: Comment = {
    comment,
    blogId: new ObjectId(blogId),
    userId: new ObjectId(req.user!.id),
    isDeleted: false,
    totalLikes: 0,
    createdAt: new Date(),
  };

  if (replyId) {
    newComment.replyId = new ObjectId(replyId);
  }

  const result = await db.collection<Comment>('comments').insertOne(newComment);

  const insertedComment = await db
    .collection('comments')
    .aggregate<CommentResponse>([
      { $match: { _id: new ObjectId(result.insertedId) } },
      {
        $lookup: {
          from: 'users',
          localField: 'userId',
          foreignField: '_id',
          as: 'user',
        },
      },
      { $unwind: '$user' },
      {
        $project: {
          user: {
            name: 1,
            avatar: {
              initials: 1,
              color: 1,
              bgColor: 1,
            },
            _id: 1,
          },
          blogId: 1,
          comment: 1,
          replyId: 1,
          totalLikes: 1,
          createdAt: 1,
          _id: 1,
        },
      },
    ])
    .next();

  await db
    .collection('blogs')
    .updateOne({ _id: new ObjectId(blogId) }, { $inc: { totalComments: 1 } });

  res.status(201).json(insertedComment);
});

app.get('/api/comments/:blogId', async (req, res) => {
  const { blogId } = req.params;
  const userId = new ObjectId(req.query['userId'] as string);

  const comments = await db
    .collection('comments')
    .aggregate<CommentResponse>([
      { $match: { blogId: new ObjectId(blogId) } },
      {
        $lookup: {
          from: 'users',
          localField: 'userId',
          foreignField: '_id',
          as: 'user',
        },
      },
      { $unwind: '$user' },
      {
        $lookup: {
          from: 'likes',
          localField: '_id',
          foreignField: 'commentId',
          as: 'isLiked',
          pipeline: [{ $match: { userId } }],
        },
      },
      {
        $project: {
          user: {
            name: 1,
            avatar: {
              initials: 1,
              color: 1,
              bgColor: 1,
            },
            _id: 1,
          },
          blogId: 1,
          comment: 1,
          replyId: 1,
          isDeleted: 1,
          totalLikes: 1,
          isLiked: { $toBool: { $size: '$isLiked' } },
          createdAt: 1,
          _id: 1,
        },
      },
    ])
    .toArray();

  const getNestedComments = async (comments: CommentResponse[]) => {
    const commentMap = new Map(
      comments.map((comment) => [
        comment._id?.toString(),
        { ...comment, replies: [] },
      ]),
    );

    const nestedComments: CommentResponse[] = [];

    comments.forEach((comment) => {
      if (comment.replyId) {
        const parent = commentMap.get(comment.replyId.toString());
        if (parent) {
          parent.replies.push(commentMap.get(comment._id?.toString()) as never);
        }
      } else {
        nestedComments.push(commentMap.get(comment._id?.toString()) as never);
      }
    });

    return nestedComments;
  };

  const nestedComments = await getNestedComments(comments);

  res.status(200).json(nestedComments);
});

app.delete('/api/comments/:id', verifyTokenMiddleware, async (req, res) => {
  const { id } = req.params;

  const deletedComment = await db
    .collection('comments')
    .updateOne(
      { _id: new ObjectId(id) },
      { $set: { comment: '', isDeleted: true } },
    );

  if (!deletedComment) {
    return res.json({ message: 'Comment not found' });
  }

  return res.json({ message: 'Comment deleted' });
});

app.post('/api/comments/likes', verifyTokenMiddleware, async (req, res) => {
  const commentId = new ObjectId(req.body.id as string);
  const userId = new ObjectId(req.user!.id);

  const isLiked = await db.collection('likes').findOne({ userId, commentId });

  if (isLiked) {
    await db.collection('likes').deleteOne({ _id: isLiked._id });
    await db
      .collection('comments')
      .updateOne({ _id: commentId }, { $inc: { totalLikes: -1 } });
    return res.json({ liked: false });
  } else {
    await db.collection('likes').insertOne({ userId, commentId });
    await db
      .collection('comments')
      .updateOne({ _id: commentId }, { $inc: { totalLikes: 1 } });
    return res.json({ liked: true });
  }
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
