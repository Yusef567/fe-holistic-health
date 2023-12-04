"use client";
import { useEffect, useState } from "react";
import { useRefreshToken } from "../hooks/useRefreshToken";
import { useAuth } from "../contexts/AuthContext";
import { ReactNode } from "react";

const PersistLogin = ({
  children,
  loadingComponent,
}: {
  children: ReactNode;
  loadingComponent: ReactNode;
}) => {
  const [isLoading, setIsLoading] = useState(true);
  const refresh = useRefreshToken();
  const context = useAuth();

  useEffect(() => {
    const verifyRefreshToken = async () => {
      try {
        await refresh();
      } catch (err) {
        throw err;
      } finally {
        setIsLoading(false);
      }
    };

    !context?.accessToken ? verifyRefreshToken() : setIsLoading(false);
  }, []);

  return <>{isLoading ? loadingComponent : children}</>;
};

export default PersistLogin;
