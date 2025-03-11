import { ObjectId } from 'mongodb';

export interface User {
  name?: string;
  email: string;
  password: string;
  avatar: {
    initials: string;
    color: string;
    bgColor: string;
  };
  token?: string;
  createdAt: Date;
  _id?: ObjectId;
}
