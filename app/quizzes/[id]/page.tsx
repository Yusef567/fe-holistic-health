"use client";

import { fetchQuiz } from "@/app/api/quizzes";
import { CustomAxiosError } from "@/app/types/errorTypes";
import { useState } from "react";
import Image from "next/image";
import { AiFillDislike, AiFillLike } from "react-icons/ai";
import { dateFormatter } from "@/app/utils/dateFormatter";
import { Quiz } from "@/app/types/quizTypes";
import DisplayQuestions from "./DisplayQuestions";
import Comments from "./Comments";
import LoadingQuizId from "./LoadingQuizId";
import { useQuery } from "@tanstack/react-query";
import { useRouter } from "next/navigation";

const SingleQuiz = ({ params }: { params: { id: string } }) => {
  const idInt = parseInt(params.id);
  const router = useRouter();

  if (isNaN(idInt)) router.push("/quizzes");
  const {
    data: quiz,
    error,
    isLoading,
  } = useQuery<Quiz, CustomAxiosError>(["quiz", idInt], () => fetchQuiz(idInt));

  const [showQuiz, setShowQuiz] = useState(false);
  if (error) {
    return (
      <main className="text-center font-poppins my-5">
        <section>
          <h1 className="text-4xl my-2 md:text-5xl lg:text-7xl font-bold">{`${error.response?.status} Error: ${error.response?.data?.msg}`}</h1>
        </section>
      </main>
    );
  }
  if (isLoading) {
    return <LoadingQuizId />;
  }
  return (
    <main className="text-left md:text-center font-poppins my-5">
      <section className="flex flex-col items-center">
        <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-transparent bg-clip-text bg-gradient-to-l from-custom-green to-custom-blue pb-5 mb-2 px-2">
          {quiz.quiz_name}
        </h1>
        <div className="flex flex-col justify-center items-center px-2">
          <Image
            src={quiz.quiz_img}
            alt={quiz.quiz_name}
            width={1000}
            height={1000}
            priority={true}
            className="w-full object-cover rounded-md h-auto lg:w-4/6  md:w-5/6"
          />
          {showQuiz && <DisplayQuestions quiz={quiz} />}
          <div className="w-full lg:w-4/6  md:w-5/6 text-2xl mt-2 leading-8">
            <h2 className="text-left font-medium">{quiz.description}</h2>
            <h3 className="text-left mt-2">{quiz.category}</h3>
            <div className="flex items-center text-left text-xl mt-2 text-gray-100">
              <p className="mr-5 ">{quiz.username}</p>
              <p className="mr-5">{dateFormatter(quiz.release_date)}</p>
              <div className="bg-neutral-800 flex items-center rounded px-2">
                <AiFillLike className="text-gray-300 mr-2 hover:cursor-pointer" />
                <p className="mr-4 text-gray-100">{quiz.likes}</p>
                <AiFillDislike className="text-gray-300 hover:cursor-pointer" />
              </div>
            </div>
          </div>
        </div>
        {!showQuiz && (
          <button
            className="bg-gradient-to-r from-blue-500 to-indigo-600  text-xl font-medium py-3 rounded min-w-[150px] cursor-pointer mt-5"
            onClick={() => setShowQuiz(true)}
          >
            Start Quiz
          </button>
        )}
        <Comments quiz={quiz} />
      </section>
    </main>
  );
};

export default SingleQuiz;
