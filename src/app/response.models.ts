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
  totalLikes: number;
  totalComments: number;
  isLiked: boolean;
  createdAt: string;
  _id: string;
}

export interface BlogsResponse {
  user: UserResponse;
  title: string;
  totalLikes: number;
  totalComments: number;
  isLiked: boolean;
  createdAt: string;
  _id: string;
}

export interface CommentResponse {
  user: UserResponse;
  blogId: string;
  comment: string;
  replyId: string;
  replies: CommentResponse[];
  isDeleted: boolean;
  totalLikes: number;
  isLiked: boolean;
  createdAt: string;
  _id: string;
}
