import { useAuth } from "../contexts/AuthContext";
import jwt from "jsonwebtoken";
import { refreshAccessToken } from "../api/auth";

export const useRefreshToken = () => {
  const { setUserCredentials } = useAuth();

  const refresh = async () => {
    try {
      const newAccessToken = await refreshAccessToken();
      const decodedToken: any = jwt.decode(newAccessToken);

      setUserCredentials(decodedToken.username, newAccessToken);
    } catch (err) {
      throw err;
    }
  };
  return refresh;
};
