export interface Comment {
  userId: string;
  blogId: string;
  replyId?: string;
  comment: string;
  isDeleted: boolean;
  createdAt: Date;
  _id?: string;
}
