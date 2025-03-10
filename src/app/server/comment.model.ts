import { ObjectId } from 'mongodb';

export interface Comment {
  userId: ObjectId;
  blogId: ObjectId;
  comment: string;
  createdAt: Date;
  _id?: ObjectId;
}
