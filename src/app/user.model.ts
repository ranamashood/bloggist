export interface User {
  email: string;
  password: string;
  token?: string;
  createdAt: Date;
  _id?: string;
}
