export interface User {
  name: string;
  email: string;
  password: string;
  token?: string;
  createdAt: Date;
  _id?: string;
}
