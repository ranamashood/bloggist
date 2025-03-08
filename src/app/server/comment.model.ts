import { ObjectId } from 'mongodb';

export interface Comment {
  userId: ObjectId;
  blogId: ObjectId;
  comment: string;
  _id?: ObjectId;
}
