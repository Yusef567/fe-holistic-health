"use client";

import { fetchQuiz } from "@/app/api/quizzes";
import { CustomAxiosError } from "@/app/types/errorTypes";
import { useEffect, useState } from "react";
import Image from "next/image";
import { AiFillDislike, AiFillLike } from "react-icons/ai";
import { dateFormatter } from "@/app/utils/dateFormatter";
import { Quiz } from "@/app/types/quizTypes";
import DisplayQuestions from "./DisplayQuestions";
import Comments from "./Comments";
import LoadingQuizId from "./LoadingQuizId";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { useAuth } from "@/app/contexts/AuthContext";
import { UserLikedStatus } from "@/app/types/usersTypes";
import PersistLogin from "@/app/components/PersisitLogin";
import useAxiosPrivate from "@/app/hooks/useAxiosPrivate";

const SingleQuiz = ({ params }: { params: { id: string } }) => {
  const quizId = parseInt(params.id);
  const router = useRouter();
  const { accessToken, isAuthenticated } = useAuth();
  const [showQuiz, setShowQuiz] = useState(false);
  const queryClient = useQueryClient();

  const [likedStatus, setLikedStatus] = useState<boolean | null>(null);

  if (isNaN(quizId)) router.push("/quizzes");

  const protectedQuiz = () => {
    const axiosPrivate = useAxiosPrivate();

    const fetchLikedStatus = async (quiz_id: number) => {
      try {
        const response = await axiosPrivate.get(
          `/quizzes/${quiz_id}/user/likes`
        );
        return response.data.likedStatus;
      } catch (err) {
        throw err;
      }
    };

    const patchQuiz = async (quiz_id: number, vote: boolean) => {
      try {
        const response = await axiosPrivate.patch(`/quizzes/${quiz_id}`, {
          inc_likes: vote,
        });
        return response.data.quiz;
      } catch (err) {
        throw err;
      }
    };

    return { fetchLikedStatus, patchQuiz };
  };

  const { fetchLikedStatus, patchQuiz } = protectedQuiz();

  useEffect(() => {
    if (accessToken) {
      fetchLikedStatus(quizId).then((status: UserLikedStatus) => {
        setLikedStatus(status.hasLiked);
      });
    }
  }, [accessToken, quizId]);

  const {
    data: quiz,
    error,
    isLoading,
  } = useQuery<Quiz, CustomAxiosError>(["quiz", quizId], () =>
    fetchQuiz(quizId)
  );

  const likeMutation = useMutation(
    async (vote: boolean) => {
      if (accessToken) {
        return patchQuiz(quizId, vote);
      }
    },
    {
      onMutate: async (vote) => {
        await queryClient.cancelQueries(["quiz", quizId]);

        const prevQuiz = queryClient.getQueryData<Quiz>(["quiz", quizId]);
        const prevLikes = prevQuiz?.likes;

        queryClient.setQueryData<Quiz | undefined>(
          ["quiz", quizId],
          (prevQuiz) => {
            if (prevQuiz) {
              return {
                ...prevQuiz,
                likes: vote ? prevQuiz.likes + 1 : prevQuiz.likes - 1,
              };
            }
          }
        );
        if (likedStatus === null) {
          setLikedStatus(vote ? true : false);
        } else if (likedStatus === false && vote) {
          setLikedStatus(null);
        } else if (likedStatus && !vote) {
          setLikedStatus(null);
        }

        return { prevLikes };
      },
      onError: (err, vote, context) => {
        queryClient.setQueryData<Quiz | undefined>(
          ["quiz", quizId],
          (prevQuiz) => {
            if (prevQuiz) {
              return {
                ...prevQuiz,
                likes: context?.prevLikes ?? prevQuiz.likes,
              };
            }
            return undefined;
          }
        );
      },
      onSettled: (data) => {
        queryClient.invalidateQueries(["quiz", quizId]);
      },
    }
  );

  const handleLike = (vote: boolean) => {
    if (isAuthenticated()) {
      if (likedStatus === null || vote !== likedStatus) {
        likeMutation.mutate(vote);
      } else if (vote === likedStatus) {
        likeMutation.mutate(!vote);
      }
    } else {
      router.push("/profile");
    }
  };

  if (error) {
    return (
      <h1>{`${error.response?.status} Error: ${error.response?.data?.msg}`}</h1>
    );
  }
  if (isLoading) {
    return <LoadingQuizId />;
  }
  return (
    <PersistLogin loadingComponent={<LoadingQuizId />}>
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
                  <button
                    onClick={() => {
                      handleLike(true);
                    }}
                  >
                    <AiFillLike
                      className={` mr-2 hover:cursor-pointer focus:outline-none ${
                        likedStatus ? "text-blue-500" : "text-gray-300"
                      }`}
                    />
                  </button>
                  <p className="mr-4 text-gray-100">{quiz.likes}</p>
                  <button
                    onClick={() => {
                      handleLike(false);
                    }}
                  >
                    <AiFillDislike
                      className={` mr-2 hover:cursor-pointer focus:outline-none ${
                        likedStatus === false
                          ? "text-blue-500"
                          : "text-gray-300"
                      }`}
                    />
                  </button>
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
    </PersistLogin>
  );
};

export default SingleQuiz;
