export type Role = "admin" | "author" | "viewer";

export type Profile = {
  id: string;
  name: string | null;
  email: string;
  role: Role;
  created_at: string;
};

export type PostListItem = {
  id: string;
  title: string;
  image_url: string | null;
  summary: string | null;
  created_at: string;
  author_id: string;
  author_name: string;
};

export type PostDetail = PostListItem & {
  body: string;
  updated_at: string;
};

export type CommentItem = {
  id: string;
  post_id: string;
  user_id: string;
  comment_text: string;
  created_at: string;
  commenter_name: string;
};

export type DashboardStats = {
  totalPosts: number;
  totalComments: number;
  ownPosts: number;
};

export type ActionState = {
  error?: string;
  success?: string;
};
