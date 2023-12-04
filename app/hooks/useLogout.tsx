import { useAuth } from "../contexts/AuthContext";
import { logUserOut } from "../api/auth";

const useLogout = () => {
  const { clearUserCredentials } = useAuth();

  const logout = async () => {
    clearUserCredentials();
    logUserOut();
  };

  return logout;
};

export default useLogout;
