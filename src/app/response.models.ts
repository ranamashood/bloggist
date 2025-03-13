export interface UserResponse {
  name: string;
  avatar: {
    initials: string;
    color: string;
    bgColor: string;
  };
  _id: string;
}

export interface BlogResponse {
  user: UserResponse;
  title: string;
  desc: string;
  createdAt: string;
  _id: string;
}

export interface BlogsResponse {
  user: UserResponse;
  title: string;
  createdAt: string;
  _id: string;
}

export interface CommentResponse {
  user: UserResponse;
  blogId: string;
  comment: string;
  replyId: string;
  replies: CommentResponse[];
  createdAt: string;
  _id: string;
}
