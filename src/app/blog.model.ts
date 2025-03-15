export interface Blog {
  userId: string;
  title: string;
  desc: string;
  totalLikes: number;
  createdAt: Date;
  _id?: string;
}
