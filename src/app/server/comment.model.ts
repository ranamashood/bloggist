import { ObjectId } from 'mongodb';

export interface Comment {
  userId: ObjectId;
  blogId: ObjectId;
  replyId?: ObjectId;
  comment: string;
  isDeleted: boolean;
  totalLikes: number;
  createdAt: Date;
  _id?: ObjectId;
}
