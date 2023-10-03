export type QuizInfo = {
  quiz_id: number;
  quiz_name: string;
  category: string;
  quiz_img: string;
  description: string;
  username: string;
  user_id: number;
  release_date: string;
  likes: number;
};

export type QuizQueryParams = {
  limit?: number;
  sort_by?: string;
  order_by?: string;
  category?: string;
};

export type AxiosQuizQuery = {
  p?: number;
  limit?: number;
  sort_by?: string;
  order?: string;
  category?: string;
};

export type Answer = {
  answer_id: number;
  answer_text: string;
  is_correct: boolean;
};

export type Question = {
  question_id: number;
  question_text: string;
  answers: Answer[];
};

export type Quiz = {
  quiz_id: number;
  quiz_name: string;
  description: string;
  quiz_img: string;
  category: string;
  user_id: number;
  username: string;
  release_date: string;
  likes: number;
  comment_count: number;
  questions: Question[];
};
