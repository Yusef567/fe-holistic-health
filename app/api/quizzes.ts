import axios from "axios";
import { AxiosQuizQuery, QuizQueryParams } from "../types/quizTypes";

const apiInstance = axios.create({
  baseURL: "https://holistic-backend.onrender.com/api",
});

export const getQuizzes = async (
  queryParams: QuizQueryParams,
  page?: number
) => {
  try {
    const params: AxiosQuizQuery = { p: page, limit: queryParams.limit };

    if (queryParams.sort_by) {
      params.sort_by = queryParams.sort_by;
      params.order = queryParams.order_by;
    }

    if (queryParams.category) {
      params.category = queryParams.category;
    }

    const res = await apiInstance.get("/quizzes", { params });
    return res.data;
  } catch (err) {
    throw err;
  }
};

export const fetchQuiz = async (quiz_id: number) => {
  try {
    const { data } = await apiInstance(`/quizzes/${quiz_id}`);
    return data.quiz;
  } catch (err) {
    throw err;
  }
};
