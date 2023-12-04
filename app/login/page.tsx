"use client";

import { FormEvent, useEffect, useState } from "react";
import { Input } from "../components/ui/input";
import { Label } from "../components/ui/label";
import { useMutation } from "@tanstack/react-query";
import { logUserIn } from "../api/auth";
import { CustomAxiosError } from "../types/errorTypes";
import Link from "next/link";
import { useAuth } from "../contexts/AuthContext";
import { useRouter } from "next/navigation";
import PersistLogin from "../components/PersisitLogin";
import LoadingLogIn from "./LoadingLogIn";

const Login = () => {
  const [usernameInput, setUsernameInput] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<CustomAxiosError | null>(null);

  const router = useRouter();

  const { isAuthenticated, setUserCredentials } = useAuth();

  const isLoggedIn = isAuthenticated();

  useEffect(() => {
    if (isLoggedIn) {
      router.push("/profile");
    }
  }, [isLoggedIn]);

  const loginMutation = useMutation(
    () => {
      return logUserIn(usernameInput, password);
    },
    {
      onSuccess: async (data) => {
        setUserCredentials(usernameInput, data.accessToken);

        router.push("/profile");
      },
      onError: (err: CustomAxiosError) => {
        setError(err);
      },
    }
  );

  const handleLogin = (event: FormEvent) => {
    event.preventDefault();
    loginMutation.mutate();
  };

  return (
    <PersistLogin loadingComponent={<LoadingLogIn />}>
      <main>
        <section className="flex flex-col justify-center items-center font-poppins">
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-black my-3">
            Holistic Health
          </h1>
          <h2 className="text-5xl mt-2 md:text-6xl lg:text-8xl font-bold text-transparent bg-clip-text bg-gradient-to-l from-custom-green to-custom-blue pb-2">
            Log In
          </h2>
          <form
            className="w-2/3 md:w-2/5 lg:w-1/4 mt-5 flex flex-col"
            onSubmit={handleLogin}
          >
            <Label htmlFor="username" className="text-2xl">
              Username
            </Label>
            <Input
              required
              type="text"
              id="username"
              placeholder="Username"
              className="my-3"
              value={usernameInput}
              onChange={(e) => {
                setUsernameInput(e.target.value);
              }}
            />
            <Label htmlFor="password" className="text-2xl">
              Password
            </Label>
            <Input
              required
              type="password"
              id="password"
              placeholder="Password"
              className="my-3"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
              }}
            />

            {error ? (
              <p className="text-xl text-stone-200 bg-neutral-800 rounded my-1 p-1">
                {`* Error: ${error.response?.data.msg}`}
              </p>
            ) : null}
            <button
              disabled={loginMutation.isLoading}
              className="bg-gradient-to-r from-blue-500 to-indigo-600 font-semibold rounded w-36 py-2 mt-5 hover:opacity-95 self-center"
            >
              {loginMutation.isLoading ? "Logging in..." : "Log In"}
            </button>
          </form>
          <div className="mt-5 flex flex-col">
            <h3 className="text-xl md:text-2xl font-medium">
              {"Don't have an account? "}
              <Link
                href="/register"
                className="text-indigo-500 "
                aria-label="Sign Up"
              >
                Sign up
              </Link>
            </h3>
          </div>
        </section>
      </main>
    </PersistLogin>
  );
};

export default Login;
