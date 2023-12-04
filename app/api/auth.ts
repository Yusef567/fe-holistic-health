import axios from "axios";

const apiInstance = axios.create({
  baseURL: "https://holistic-backend.onrender.com/api",
  withCredentials: true,
  headers: { "Content-Type": "application/json" },
});

export const logUserIn = async (username: string, password: string) => {
  try {
    const response = await apiInstance.post("/auth/login", {
      username,
      password,
    });
    return response.data;
  } catch (err) {
    throw err;
  }
};

export const refreshAccessToken = async () => {
  try {
    const response = await apiInstance.post("/auth/refresh-token");
    return response.data.accessToken;
  } catch (err) {
    throw err;
  }
};

export const logUserOut = async () => {
  try {
    const response = await apiInstance.post("/auth/logout");
    return response.data;
  } catch (err) {
    throw err;
  }
};
