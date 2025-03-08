import { ObjectId } from 'mongodb';

export interface Blog {
  userId: ObjectId;
  title: string;
  desc: string;
  _id?: ObjectId;
}
