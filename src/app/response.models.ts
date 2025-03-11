export interface BlogResponse {
  user: {
    name: string;
    _id: string;
  };
  title: string;
  desc: string;
  createdAt: string;
  _id: string;
}

export interface BlogsResponse {
  user: {
    name: string;
    _id: string;
  };
  title: string;
  createdAt: string;
  _id: string;
}

export interface CommentResponse {
  user: {
    name: string;
    _id: string;
  };
  blogId: string;
  comment: string;
  createdAt: string;
  _id: string;
}
