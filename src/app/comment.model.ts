export interface Comment {
  userId: string;
  blogId: string;
  replyId?: string;
  comment: string;
  createdAt: Date;
  _id?: string;
}
