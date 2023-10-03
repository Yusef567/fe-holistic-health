import axios from "axios";
import { CommentsQuery } from "../types/commentsTypes";

const apiInstance = axios.create({
  baseURL: "https://holistic-backend.onrender.com/api",
});

export const getComments = async (quiz_id: number, params: CommentsQuery) => {
  try {
    const {
      data: { comments },
    } = await apiInstance.get(`/comments/quiz/${quiz_id}`, { params });
    return comments;
  } catch (err) {
    throw err;
  }
};
