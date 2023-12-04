"use client";

import Link from "next/link";
import { useAuth } from "../contexts/AuthContext";
import { MdAccountCircle } from "react-icons/md";
import PersistLogin from "../components/PersisitLogin";
import LoggedInProfile from "./LoggedInProfile";
import LoadingProfile from "./LoadingProfile";

const Profile = () => {
  const { username, isAuthenticated } = useAuth();

  return (
    <PersistLogin loadingComponent={<LoadingProfile />}>
      <main>
        <section className="flex flex-col justify-center items-center font-poppins">
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-black my-3">
            Holistic Health
          </h1>
          <h2 className="text-4xl mt-2 md:text-6xl lg:text-7xl font-bold pb-1 text-transparent bg-clip-text bg-gradient-to-l from-custom-green to-custom-blue">
            Profile
          </h2>
          <MdAccountCircle className="text-[12rem] md:text-[15rem]" />
          {isAuthenticated() && username ? (
            <LoggedInProfile username={username} />
          ) : (
            <div className="flex flex-col items-center gap-2 mb-2">
              <h2 className="text-3xl mt-2 md:text-5xl lg:text-5xl font-semibold pb-1">
                You are not logged in
              </h2>
              <Link
                href="/login"
                className="bg-gradient-to-r from-blue-500 to-indigo-600 font-semibold rounded w-36 md:w-40 py-2.5 mt-5 hover:opacity-95 text-xl text-center"
                aria-label="Log In"
              >
                Log In
              </Link>
            </div>
          )}
        </section>
      </main>
    </PersistLogin>
  );
};

export default Profile;
