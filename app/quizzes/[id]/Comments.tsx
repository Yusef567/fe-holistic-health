"use client";

import { getComments } from "../../api/comments";
import { Comment, CommentVote } from "../../types/commentsTypes";
import { CustomAxiosError } from "@/app/types/errorTypes";
import { Quiz } from "@/app/types/quizTypes";
import { dateFormatter } from "@/app/utils/dateFormatter";
import {
  useInfiniteQuery,
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";
import { useEffect, useRef, useState } from "react";
import { AiFillDislike, AiFillLike } from "react-icons/ai";
import { MdAccountCircle } from "react-icons/md";
import { useIntersection } from "@mantine/hooks";
import LoadingComments from "./LoadingComments";
import { useAuth } from "@/app/contexts/AuthContext";
import { useRouter } from "next/navigation";
import useAxiosPrivate from "@/app/hooks/useAxiosPrivate";

const Comments = ({ quiz }: { quiz: Quiz }) => {
  const [likedComments, setLikedComments] = useState<CommentVote[]>([]);

  const { accessToken } = useAuth();
  const queryClient = useQueryClient();
  const router = useRouter();

  useEffect(() => {
    if (quiz && quiz.quiz_id) {
      queryClient.invalidateQueries(["comments", quiz.quiz_id]);
    }
  }, [quiz, queryClient]);

  const axiosPrivate = useAxiosPrivate();

  const fetchLikedStatus = async (quiz_id: number) => {
    try {
      const response = await axiosPrivate.get(
        `/comments/quiz/${quiz_id}/user/likes`
      );
      return response.data.likedStatus;
    } catch (err) {
      throw err;
    }
  };

  const patchComment = async (comment_id: number, vote: boolean) => {
    try {
      const response = await axiosPrivate.patch(`/comments/${comment_id}`, {
        inc_likes: vote,
      });
      return response.data.comment;
    } catch (err) {
      throw err;
    }
  };

  const limit = 5;

  const { data, isLoading, isError, error, fetchNextPage } = useInfiniteQuery(
    ["comments", quiz.quiz_id],
    async ({ pageParam = 1 }) => {
      const response = await getComments(quiz.quiz_id, {
        p: pageParam,
        limit,
      });
      return response;
    },
    {
      getNextPageParam: (_, pages) => {
        return pages.length + 1;
      },
    }
  );

  const lastCommentRef = useRef<HTMLElement>(null);

  const { ref, entry } = useIntersection({
    root: lastCommentRef.current,
    threshold: 1,
  });

  useEffect(() => {
    if (entry?.isIntersecting) fetchNextPage();
  }, [entry]);

  useEffect(() => {
    if (quiz?.quiz_id && accessToken) {
      fetchLikedStatus(quiz.quiz_id).then((likedCommentsData) => {
        setLikedComments(likedCommentsData?.votes);
      });
    }
  }, [quiz, accessToken]);

  const likeCommentMutation = useMutation(
    async ({ comment_id, vote }: { comment_id: number; vote: boolean }) => {
      const response = await patchComment(comment_id, vote);

      return response.data;
    },
    {
      onMutate: async ({ comment_id, vote }) => {
        const prevComments = queryClient.getQueryData<Comment[]>(["comments"]);
        const updatedComments = prevComments?.map((comment) => {
          if (comment.comment_id === comment_id) {
            return {
              ...comment,
              likes: vote ? comment.likes + 1 : comment.likes - 1,
            };
          }
          return comment;
        });
        queryClient.setQueryData<Comment[] | undefined>(
          ["comments"],
          updatedComments
        );

        const updatedLikedComments = likedComments.map((comment) => {
          const commentCopy = { ...comment };
          if (commentCopy.comment_id === comment_id) {
            if (commentCopy.hasLiked === null) {
              commentCopy.hasLiked = vote;
            } else if (commentCopy.hasLiked === true && vote === false) {
              commentCopy.hasLiked = null;
            } else if (commentCopy.hasLiked === false && vote === true) {
              commentCopy.hasLiked = null;
            }
          }
          return commentCopy;
        });
        setLikedComments(updatedLikedComments);
        return { prevComments, prevLikedComments: likedComments };
      },
      onError: (
        error,
        comment,
        context = { prevComments: [], prevLikedComments: [] }
      ) => {
        queryClient.setQueryData<Comment[] | undefined>(
          ["comments"],
          context.prevComments
        );

        setLikedComments(context.prevLikedComments);
      },
      onSettled: async () => {
        queryClient.invalidateQueries(["comments"]);

        if (accessToken && quiz?.quiz_id) {
          const likedCommentsData = await fetchLikedStatus(quiz.quiz_id);
          setLikedComments(likedCommentsData.votes);
        }
      },
    }
  );

  const handleLike = (comment_id: number, vote: boolean) => {
    if (accessToken) {
      const comment = likedComments?.find(
        (comment) => comment.comment_id === comment_id
      );

      if (
        comment?.hasLiked === null ||
        (comment?.hasLiked === true && vote === false) ||
        (comment?.hasLiked === false && vote === true)
      ) {
        likeCommentMutation.mutate({ comment_id, vote });
      } else if (
        (comment?.hasLiked === true && vote === true) ||
        (comment?.hasLiked === false && vote === false)
      ) {
        likeCommentMutation.mutate({ comment_id, vote: !vote });
      }
    } else {
      router.push("/profile");
    }
  };

  if (isLoading) {
    return <LoadingComments />;
  }

  if (isError) {
    const customError = error as CustomAxiosError;

    return (
      <div>
        <h1>{`${customError.response?.status} Error: ${customError.response?.data?.msg}`}</h1>
      </div>
    );
  }
  return (
    <section className="px-2 mt-2 w-full lg:w-4/6 md:w-5/6">
      <h1 className="text-2xl font-bold my-2 text-left">
        Comments ({quiz.comment_count})
      </h1>
      <ul className="flex flex-col items-start text-left">
        {data?.pages.flat().map((comment: Comment, i) => {
          const isLastComment = i === data.pages.flat().length - 1;
          return (
            <li
              key={comment?.comment_id}
              ref={isLastComment ? ref : undefined}
              className="flex flex-col text-xl w-full h-48 md:h-44 bg-neutral-800 text-stone-200 font-medium rounded mb-2 px-2 overflow-auto"
            >
              <div className="flex flex-row items-center gap-2 mb-2">
                <MdAccountCircle size="45px" className="" />
                <h2>{comment?.username}</h2>
              </div>
              <h3 className="flex flex-grow">{comment?.comment_text}</h3>
              <div className="flex items-center text-left text-xl my-2 text-gray-100 ">
                <p className="mr-5">{dateFormatter(comment?.created_at)}</p>
                <div className="bg-neutral-800 flex items-center rounded px-2">
                  <button
                    onClick={() => {
                      handleLike(comment.comment_id, true);
                    }}
                  >
                    <AiFillLike
                      className={`mr-2 hover:cursor-pointer focus:outline-none ${
                        likedComments.find(
                          (likedComment) =>
                            likedComment.comment_id === comment.comment_id &&
                            likedComment.hasLiked === true
                        )
                          ? "text-blue-500"
                          : "text-gray-300"
                      }`}
                    />
                  </button>
                  <p className="mr-4 text-gray-100">{comment?.likes}</p>
                  <button
                    onClick={() => {
                      handleLike(comment.comment_id, false);
                    }}
                  >
                    <AiFillDislike
                      className={`mr-2 hover:cursor-pointer focus:outline-none ${
                        likedComments.find(
                          (likedComment) =>
                            likedComment.comment_id === comment.comment_id &&
                            likedComment.hasLiked === false
                        )
                          ? "text-blue-500"
                          : "text-gray-300"
                      }`}
                    />
                  </button>
                </div>
              </div>
            </li>
          );
        })}
      </ul>
    </section>
  );
};
export default Comments;
