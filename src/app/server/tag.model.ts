import { ObjectId } from 'mongodb';

export interface Tag {
  name: string;
  _id?: ObjectId;
}
