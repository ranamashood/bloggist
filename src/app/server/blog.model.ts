import { ObjectId } from 'mongodb';

export interface Blog {
  userId: ObjectId;
  title: string;
  desc: string;
  totalLikes: number;
  totalComments: number;
  createdAt: Date;
  _id?: ObjectId;
}
