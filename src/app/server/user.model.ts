import { ObjectId } from 'mongodb';

export interface User {
  email: string;
  password: string;
  token?: string;
  _id?: ObjectId;
}
