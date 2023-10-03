import Image from "next/image";
import { dateFormatter } from "../utils/dateFormatter";
import { AiFillLike } from "react-icons/ai";
import Link from "next/link";
import { QuizInfo } from "../types/quizTypes";

const QuizzesCard = ({ quiz }: { quiz: QuizInfo }) => {
  return (
    <li
      key={quiz.quiz_id}
      className="flex flex-col justify-center md:w-80 lg:w-1/4 md:h-80 transition-transform hover:scale-105 cursor-pointer rounded text-left "
    >
      <Link href={`/quizzes/${quiz.quiz_id}`}>
        <Image
          src={quiz.quiz_img}
          alt={quiz.quiz_name}
          width={500}
          height={500}
          priority={true}
          className="w-full md:h-[14.8rem] object-cover rounded-md"
        />
        <h2 className="text-xl font-medium py-1 line-clamp-1 ">
          {quiz.quiz_name}
        </h2>
        <h3 className="text-lg font-base">{quiz.category}</h3>
        <div className="flex items-center text-gray-200">
          <h4 className="text-sm font-light">
            {dateFormatter(quiz.release_date)}
          </h4>
          <AiFillLike className="text-gray-200 ml-2" />
          <p className="text-sm ml-1">{quiz.likes}</p>
        </div>
      </Link>
    </li>
  );
};

export default QuizzesCard;
