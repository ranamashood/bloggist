export interface UserResponse {
  name: string;
  avatar: {
    initials: string;
    color: string;
    bgColor: string;
  };
  settings: {
    headline: string;
    banner: string;
  };
  createdAt?: string;
  _id: string;
}

export interface BlogResponse {
  user: UserResponse;
  title: string;
  desc: string;
  tags: string[];
  readTime: number;
  totalLikes: number;
  totalComments: number;
  totalBookmarks: number;
  isLiked: boolean;
  isBookmarked: boolean;
  createdAt: string;
  _id: string;
}

export interface BlogsResponse {
  user: UserResponse;
  title: string;
  tags: string[];
  readTime: number;
  totalLikes: number;
  totalComments: number;
  isLiked: boolean;
  createdAt: string;
  _id: string;
}

export interface LatestBlogsResponse {
  title: string;
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
