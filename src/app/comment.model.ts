export interface Comment {
  userId: string;
  blogId: string;
  comment: string;
  createdAt: Date;
  _id?: string;
}
