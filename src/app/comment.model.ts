export interface Comment {
  userId: string;
  blogId: string;
  replyId?: string;
  comment: string;
  isDeleted: boolean;
  totalLikes: number;
  createdAt: Date;
  _id?: string;
}
