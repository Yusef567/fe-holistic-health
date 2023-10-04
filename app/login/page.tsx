"use client";

import { FormEvent, useState } from "react";
import { Input } from "../components/ui/input";
import { Label } from "../components/ui/label";
import Link from "next/link";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = (event: FormEvent) => {
    event.preventDefault();
  };

  return (
    <main>
      <section className="flex flex-col justify-center items-center font-poppins">
        <h1 className="text-5xl md:text-7xl lg:text-8xl font-black my-3">
          Holistic Health
        </h1>
        <h2 className="text-5xl mt-2 md:text-6xl lg:text-7xl font-bold text-transparent bg-clip-text bg-gradient-to-l from-custom-green to-custom-blue pb-1">
          Log In
        </h2>
        <form
          className="w-2/3 md:w-2/5 lg:w-1/5 mt-5 flex flex-col"
          onSubmit={handleLogin}
        >
          <Label htmlFor="username" className="text-2xl">
            Username
          </Label>
          <Input
            type="username"
            id="username"
            placeholder="Username"
            className="my-3"
            value={username}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
              setUsername(e.target.value);
            }}
          />
          <Label htmlFor="password" className="text-2xl">
            Password
          </Label>
          <Input
            type="password"
            id="password"
            placeholder="Password"
            className="my-3"
            value={password}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
              setPassword(e.target.value);
            }}
          />
          <button className="bg-gradient-to-r from-blue-500 to-indigo-600 font-semibold rounded w-36 py-2 mt-5 hover:opacity-95 self-center">
            Log In
          </button>
        </form>
        <div className="mt-5 flex flex-col">
          <h3 className="text-xl md:text-2xl font-medium">
            Don't have an account?{" "}
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
  );
};

export default Login;
