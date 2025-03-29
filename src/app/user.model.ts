export interface User {
  name: string;
  email: string;
  password: string;
  avatar: {
    initials: string;
    color: string;
    bgColor: string;
  };
  settings: {
    headline: string;
    banner: string;
  };
  token?: string;
  createdAt: Date;
  _id?: string;
}
