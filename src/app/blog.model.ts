export interface Blog {
  userId: string;
  title: string;
  desc: string;
  readTime: number;
  totalLikes: number;
  totalComments: number;
  totalBookmarks: number;
  createdAt: Date;
  _id?: string;
}
