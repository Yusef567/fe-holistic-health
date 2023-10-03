"use client";

import { getComments } from "../../api/comments";
import { Comment } from "../../types/commentsTypes";
import { CustomAxiosError } from "@/app/types/errorTypes";
import { Quiz } from "@/app/types/quizTypes";
import { dateFormatter } from "@/app/utils/dateFormatter";
import { useInfiniteQuery } from "@tanstack/react-query";
import { useEffect, useRef } from "react";
import { AiFillDislike, AiFillLike } from "react-icons/ai";
import { MdAccountCircle } from "react-icons/md";
import { useIntersection } from "@mantine/hooks";
import LoadingComments from "./LoadingComments";

const Comments = ({ quiz }: { quiz: Quiz }) => {
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
                  <AiFillLike className="text-gray-300 mr-2 hover:cursor-pointer" />
                  <p className="mr-4 text-gray-100">{comment?.likes}</p>
                  <AiFillDislike className="text-gray-300 hover:cursor-pointer " />
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
