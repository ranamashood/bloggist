import { ObjectId } from 'mongodb';

export interface Blog {
  userId: ObjectId;
  title: string;
  desc: string;
  tags: string[];
  readTime: number;
  totalLikes: number;
  totalComments: number;
  totalBookmarks: number;
  createdAt: Date;
  _id?: ObjectId;
}
