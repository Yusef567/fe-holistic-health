export type CommentsQuery = {
  p?: number;
  limit?: number;
};

export type Comment = {
  comment_id: number;
  quiz_id: number;
  comment_text: string;
  username: string;
  user_id: number;
  created_at: string;
  likes: number;
};

export type CommentVote = {
  comment_id: number;
  hasLiked: boolean | null;
};
