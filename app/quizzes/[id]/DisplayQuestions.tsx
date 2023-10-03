"use client";

import { Answer, Quiz } from "../../types/quizTypes";
import { useEffect, useState } from "react";
import { AiOutlineCheck, AiOutlineClose } from "react-icons/ai";
import { motion } from "framer-motion";
import { generateMsg } from "../../utils/generateMsg";

const DisplayQuestions = ({ quiz }: { quiz: Quiz }) => {
  const totalQuestions = quiz.questions.length;
  const { questions } = quiz;
  const lookUp: { [key: number]: string } = {
    0: "A",
    1: "B",
    2: "C",
    3: "D",
  };
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [usersAnswers, setUsersAnswers] = useState<Answer[]>([]);
  const [hasAnswered, setHasAnswered] = useState(false);
  const [quizHasEnded, setQuizHasEnded] = useState(false);
  const [resetQuiz, setResetQuiz] = useState(false);
  const [userSelectedAnswerId, setUserSelectedAnswerId] = useState<
    number | null
  >(null);

  const correctAnswerId = quiz.questions[currentQuestion].answers.find(
    (answer) => answer.is_correct
  )?.answer_id;

  const userScore = usersAnswers.filter((answer) => answer.is_correct).length;

  useEffect(() => {
    if (resetQuiz) {
      setCurrentQuestion(0);
      setUsersAnswers([]);
      setHasAnswered(false);
      setQuizHasEnded(false);
      setUserSelectedAnswerId(null);
      setResetQuiz(false);
    }
  }, [resetQuiz]);

  const { message, message2 } = generateMsg(userScore, totalQuestions);

  const handleAnswer = (answer: Answer) => {
    if (!hasAnswered && currentQuestion === totalQuestions - 1) {
      setHasAnswered(true);
      setQuizHasEnded(true);
      setUserSelectedAnswerId(answer.answer_id);
      setUsersAnswers((currentAnswers) => {
        return [...currentAnswers, answer];
      });
    } else if (!hasAnswered) {
      setHasAnswered(true);
      setUserSelectedAnswerId(answer.answer_id);
      setUsersAnswers((currentAnswers) => {
        return [...currentAnswers, answer];
      });
    }
  };
  const handleNextQuestion = () => {
    if (currentQuestion < totalQuestions - 1) {
      setHasAnswered(false);
      setUserSelectedAnswerId(null);
      setCurrentQuestion(currentQuestion + 1);
    }
  };

  return (
    <section className="px-2 mt-2 w-full lg:w-4/6  md:w-5/6 ">
      <div className="">
        <p className="text-xl md:text-2xl font-bold mb-2 px-2 ">
          {questions[currentQuestion].question_text}
        </p>

        <ul className="flex flex-col items-start text-left ">
          {questions[currentQuestion].answers.map((answer, index) => {
            return (
              <li
                key={answer.answer_id}
                onClick={() => handleAnswer(answer)}
                className={`text-xl w-full h-[6.5rem] md:h-[5.5rem]    overflow-auto rounded mb-2 px-2  cursor-pointer text-stone-200 font-medium 
                ${!hasAnswered ? "hover:bg-indigo-600" : ""}
               ${
                 hasAnswered && answer.answer_id === correctAnswerId
                   ? " bg-gradient-to-r from-green-600 via-green-550 to-green-600 "
                   : "bg-neutral-800 "
               }
               ${
                 hasAnswered && answer.answer_id === userSelectedAnswerId
                   ? "border border-l-8 border-indigo-500  "
                   : ""
               }
               `}
              >
                <p>{`${lookUp[index]}: ${answer.answer_text}`}</p>
              </li>
            );
          })}
          <p className="text-xl font-semibold">{`${
            currentQuestion + 1
          }/${totalQuestions}`}</p>

          {userSelectedAnswerId !== null &&
          userSelectedAnswerId === correctAnswerId ? (
            <motion.div
              className="flex justify-center items-center rounded px-2"
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.5 }}
              transition={{ duration: 0.2 }}
            >
              <AiOutlineCheck
                size="45px"
                className="text-emerald-500  text-3xl font-bold"
              />
              <p className="text-emerald-500 text-4xl font-semibold">
                Correct!{" "}
              </p>
            </motion.div>
          ) : userSelectedAnswerId !== null ? (
            <motion.div
              className="flex justify-center items-center rounded px-2"
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.5 }}
              transition={{ duration: 0.2 }}
            >
              <AiOutlineClose
                size="40px"
                className="text-red-400 text-3xl font-bold"
              />
              <p className="text-red-400 text-4xl font-bold">Wrong!</p>
            </motion.div>
          ) : null}
        </ul>
        {quizHasEnded && (
          <motion.div
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.5 }}
            transition={{ duration: 0.2 }}
            className="text-xl font-bold my-2 px-2 flex flex-col items-center"
          >
            <p className="text-2xl">
              Your score: {userScore}/{totalQuestions}
            </p>
            <p className=""> {message}</p>
            <p> {message2}</p>
          </motion.div>
        )}
        <div className="flex flex-col items-center">
          {hasAnswered && currentQuestion <= totalQuestions - 2 ? (
            <button
              className="bg-gradient-to-r from-blue-500 to-indigo-600  text-xl font-medium py-2 rounded min-w-[150px] cursor-pointer my-5 "
              disabled={!hasAnswered}
              onClick={handleNextQuestion}
            >
              Next
            </button>
          ) : null}
          {hasAnswered && quizHasEnded ? (
            <button
              onClick={() => setResetQuiz(true)}
              className="bg-gradient-to-r from-blue-500 to-indigo-600  text-xl font-medium py-2 rounded min-w-[150px] cursor-pointer my-5"
            >
              Play again
            </button>
          ) : null}
        </div>
      </div>
    </section>
  );
};

export default DisplayQuestions;
