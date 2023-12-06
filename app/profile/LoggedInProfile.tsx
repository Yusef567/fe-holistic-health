"use client";

import useLogout from "../hooks/useLogout";

const LoggedInProfile = ({ username }: { username: string }) => {
  const logout = useLogout();

  const signOut = async () => {
    await logout();
  };

  const professionalCheck = /^[A-Z0-9]{1,}@healthcareclinic\.com$/i;
  const isProfessional = professionalCheck.test(username);

  return (
    <div className="flex flex-col items-center gap-2 mb-2 w-2/3 md:w-2/4 ">
      <h2 className="text-2xl mt-2 md:text-4xl lg:text-5xl font-bold pb-1 px-3">
        {`${username}`}
      </h2>
      <h3 className=" text-base md:text-2xl font-medium  text-center ">
        <span className="text-lg font-semibold md:text-3xl">Permissions:</span>
        {isProfessional
          ? " Share your knowledge by posting insightful quizzes. Engage further by liking and commenting on quizzes that you find useful."
          : " You can like and comment on your favorite quizzes to share your thoughts and show appreciation"}
      </h3>
      <button
        onClick={signOut}
        className="bg-gradient-to-r from-blue-500 to-indigo-600 font-semibold rounded w-36 md:w-40 py-3 mt-5 hover:opacity-95 self-center text-xl"
      >
        Log Out
      </button>
    </div>
  );
};
export default LoggedInProfile;
