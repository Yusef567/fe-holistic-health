"use client";

import { FormEvent, useEffect, useState } from "react";
import { Input } from "../components/ui/input";
import { Label } from "../components/ui/label";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/app/components/ui/select";
import { useRouter } from "next/navigation";
import { useMutation } from "@tanstack/react-query";
import { createUser } from "../api/users";
import { CustomAxiosError } from "../types/errorTypes";
import { useAuth } from "../contexts/AuthContext";
import PersistLogin from "../components/PersisitLogin";
import LoadingRegister from "./LoadingRegister";

const Register = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState<CustomAxiosError | null>(null);

  const [isHealthProfessional, setIsHealthProfessional] = useState(false);
  const [usernameMsg, setUsernameMsg] = useState("");
  const [passwordMsg, setPasswordMsg] = useState("");
  const [confirmPasswordMsg, setConfirmPasswordMsg] = useState("");

  const isValidUsername = /^[A-Z0-9]{3,15}$/i;
  const isValidProfessional = /^[A-Z0-9]{1,}@healthcareclinic\.com$/i;
  const isStrongPassword =
    /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/;

  const router = useRouter();

  const { isAuthenticated } = useAuth();

  const isLoggedIn = isAuthenticated();

  useEffect(() => {
    if (isLoggedIn) {
      router.push("/profile");
    }
  }, [isLoggedIn]);

  useEffect(() => {
    if (usernameMsg) {
      setUsernameMsg("");
    }
    if (username) {
      handleUsernameChange(username);
    }
  }, [isHealthProfessional]);

  const signUpMutation = useMutation(
    () => {
      return createUser({ username, password });
    },
    {
      onSuccess: async (data) => {
        router.push("/login");
      },
      onError: (err: CustomAxiosError) => {
        setError(err);
      },
    }
  );

  const handleUsernameChange = (usernameInput: string) => {
    setUsername(usernameInput);

    if (usernameMsg) {
      setUsernameMsg("");
    }

    if (isHealthProfessional && !isValidProfessional.test(usernameInput)) {
      setUsernameMsg("Invalid healthcare professional username");
    } else if (!isHealthProfessional && !isValidUsername.test(usernameInput)) {
      setUsernameMsg(
        "Invalid username format. Please use between 3 and 15 characters, consisting of letters and numbers only."
      );
    }
  };

  const handlePasswordChange = (passwordInput: string) => {
    setPassword(passwordInput);

    if (passwordMsg) {
      setPasswordMsg("");
    }

    if (confirmPasswordMsg) {
      setConfirmPasswordMsg("");
    }

    if (!isStrongPassword.test(passwordInput)) {
      setPasswordMsg(
        "Your password must contain at least one uppercase letter, one lowercase letter, one number, one special character (such as @$!%*#?&), and be a minimum of 8 characters long"
      );
    }

    if (passwordInput !== confirmPassword) {
      setConfirmPasswordMsg("Password's don't match");
    }
  };

  const handleConfirmPassword = (passwordInput: string) => {
    setConfirmPassword(passwordInput);

    if (confirmPasswordMsg) {
      setConfirmPasswordMsg("");
    }
    if (passwordInput !== password) {
      setConfirmPasswordMsg("Password's don't match");
    }
  };

  const handleSignUp = (event: FormEvent) => {
    event.preventDefault();

    if (!usernameMsg && !passwordMsg && !confirmPasswordMsg) {
      signUpMutation.mutate();
    }
  };

  useEffect(() => {
    if (usernameMsg) {
      setUsernameMsg("");
    }
  }, [isHealthProfessional]);

  return (
    <PersistLogin loadingComponent={<LoadingRegister />}>
      <main>
        <section className="flex flex-col justify-center items-center font-poppins">
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-black my-3">
            Holistic Health
          </h1>
          <h2 className="text-5xl mt-2 md:text-6xl lg:text-7xl font-bold text-transparent bg-clip-text bg-gradient-to-l from-custom-green to-custom-blue pb-1">
            Sign Up
          </h2>

          <form
            className="w-2/3 md:w-2/5 lg:w-1/4 mt-5 flex flex-col"
            onSubmit={handleSignUp}
          >
            <Label
              aria-label="Are you a healthcare professional?"
              className="text-2xl"
            >
              Are you a healthcare professional?
            </Label>
            <Select
              value={isHealthProfessional ? "true" : "false"}
              onValueChange={(value) => {
                setIsHealthProfessional(value === "true" ? true : false);
              }}
            >
              <SelectTrigger className="my-3">
                <SelectValue />
              </SelectTrigger>

              <SelectContent>
                <SelectGroup>
                  <SelectItem
                    aria-label="Yes, I am a healthcare professional"
                    value="true"
                  >
                    Yes
                  </SelectItem>
                  <SelectItem
                    aria-label="No, I am not a healthcare professional"
                    value="false"
                  >
                    No
                  </SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>

            <Label htmlFor="username" className="text-2xl">
              Username
            </Label>
            <Input
              required
              type="text"
              id="username"
              placeholder="Username"
              className="my-3"
              onChange={(e) => handleUsernameChange(e.target.value)}
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
              onChange={(e) => handlePasswordChange(e.target.value)}
            />
            <Label htmlFor="confirm-password" className="text-2xl">
              Confirm Password
            </Label>
            <Input
              required
              type="password"
              id="confirm-password"
              placeholder="Confirm Password"
              className="my-3"
              onChange={(e) => handleConfirmPassword(e.target.value)}
            />
            <div>
              <p className="text-l text-stone-200 bg-neutral-800 rounded my-1">
                {usernameMsg ? `* ${usernameMsg}` : null}
              </p>
              <p className="text-l text-stone-200 bg-neutral-800 rounded my-1">
                {passwordMsg ? `* ${passwordMsg}` : null}
              </p>
              <p className="text-l text-stone-200 bg-neutral-800 rounded my-1">
                {confirmPasswordMsg ? `* ${confirmPasswordMsg}` : null}
              </p>
            </div>

            {error ? (
              <p className="text-xl text-stone-200 bg-neutral-800 rounded my-1 p-1">
                {`* Error: ${error.response?.data.msg}`}
              </p>
            ) : null}

            <button
              disabled={
                !!(usernameMsg || passwordMsg || confirmPasswordMsg) ||
                signUpMutation.isLoading
              }
              className={`bg-gradient-to-r from-blue-500 to-indigo-600 font-semibold rounded w-36 py-2 mt-5 hover:opacity-95 self-center my-5 ${
                usernameMsg ||
                passwordMsg ||
                confirmPasswordMsg ||
                signUpMutation.isLoading
                  ? "cursor-not-allowed"
                  : "cursor-pointer"
              }`}
            >
              {signUpMutation.isLoading ? "Please wait..." : "Sign Up"}
            </button>
          </form>
        </section>
      </main>
    </PersistLogin>
  );
};

export default Register;
