import axios from "axios";
import { CommentsQuery } from "../types/commentsTypes";
import useAxiosPrivate from "../hooks/useAxiosPrivate";

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

export const protectedComments = () => {
  const axiosPrivate = useAxiosPrivate();

  const fetchLikedStatus = async (quiz_id: number) => {
    try {
      const response = await axiosPrivate.get(
        `/comments/quiz/${quiz_id}/user/likes`
      );
      return response.data.likedStatus;
    } catch (err) {
      throw err;
    }
  };

  const patchComment = async (comment_id: number, vote: boolean) => {
    try {
      const response = await axiosPrivate.patch(`/comments/${comment_id}`, {
        inc_likes: vote,
      });
      return response.data.comment;
    } catch (err) {
      throw err;
    }
  };

  return {
    fetchLikedStatus,
    patchComment,
  };
};
