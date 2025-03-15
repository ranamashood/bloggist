import { ObjectId } from 'mongodb';

export interface Blog {
  userId: ObjectId;
  title: string;
  desc: string;
  totalLikes: number;
  createdAt: Date;
  _id?: ObjectId;
}
