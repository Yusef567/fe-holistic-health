import React, { createContext, useContext, useState } from "react";

type AuthContextData = {
  username: string | null;
  accessToken: string | null;
  isAuthenticated: () => boolean;
  setUserCredentials: (username: string, token: string) => void;
  clearUserCredentials: () => void;
};

const AuthContext = createContext<AuthContextData | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [username, setUsername] = useState<string | null>(null);
  const [accessToken, setAccessToken] = useState<string | null>(null);

  const setUserCredentials = (usernamePara: string, token: string) => {
    setUsername(usernamePara);
    setAccessToken(token);
  };

  const clearUserCredentials = () => {
    setUsername(null);
    setAccessToken(null);
  };

  const isAuthenticated = () => !!accessToken;

  const contextValue: AuthContextData = {
    username,
    accessToken,
    isAuthenticated,
    setUserCredentials,
    clearUserCredentials,
  };

  return (
    <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>
  );
};
