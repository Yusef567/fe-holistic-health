import axios from "axios";

import { useEffect } from "react";
import { useRefreshToken } from "./useRefreshToken";
import { useAuth } from "../contexts/AuthContext";

const apiInstance = axios.create({
  baseURL: "https://holistic-backend.onrender.com/api",
  withCredentials: true,
  headers: { "Content-Type": "application/json" },
});

const useAxiosPrivate = () => {
  const refresh = useRefreshToken();
  const context = useAuth();

  useEffect(() => {
    const requestIntercept = apiInstance.interceptors.request.use(
      (config) => {
        if (!config.headers["Authorization"]) {
          config.headers["Authorization"] = `Bearer ${context?.accessToken}`;
        }
        return config;
      },
      (error) => Promise.reject(error)
    );

    const responseIntercept = apiInstance.interceptors.response.use(
      (response) => response,
      async (error) => {
        const prevRequest = error?.config;

        if (error.response?.status === 401 && !prevRequest?.sent) {
          prevRequest.sent = true;
          const newAccessToken = await refresh();
          prevRequest.headers["Authorization"] = `Bearer ${newAccessToken}`;

          return apiInstance(prevRequest);
        }

        return Promise.reject(error);
      }
    );

    return () => {
      apiInstance.interceptors.response.eject(requestIntercept);
      apiInstance.interceptors.response.eject(responseIntercept);
    };
  }, [refresh, context]);

  return apiInstance;
};

export default useAxiosPrivate;
