import { ObjectId } from 'mongodb';

export interface Blog {
  userId: ObjectId;
  title: string;
  desc: string;
  totalLikes: number;
  totalComments: number;
  totalBookmarks: number;
  createdAt: Date;
  _id?: ObjectId;
}
