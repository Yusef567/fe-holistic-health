import axios from "axios";
import { UserDetails } from "../types/usersTypes";

const apiInstance = axios.create({
  baseURL: "https://holistic-backend.onrender.com/api",
  headers: { "Content-Type": "application/json" },
});

export const createUser = async (newUser: UserDetails) => {
  try {
    const response = await apiInstance.post("/users", newUser);
    return response.data.user;
  } catch (err) {
    throw err;
  }
};
