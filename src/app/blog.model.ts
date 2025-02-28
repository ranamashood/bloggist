import { ObjectId } from 'mongodb';

export interface Blog {
  title: string;
  desc: string;
  id?: ObjectId;
}
