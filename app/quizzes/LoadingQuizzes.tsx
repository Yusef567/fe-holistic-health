import { Skeleton } from "@/app/components/ui/skeleton";

const LoadingQuizzes = () => {
  return (
    <main className="text-center font-poppins my-5">
      <section>
        <h1 className="text-5xl my-2 md:text-6xl lg:text-8xl font-bold text-transparent bg-clip-text bg-gradient-to-l from-custom-green to-custom-blue m-10 ">
          Quizzes
        </h1>

        <ul className="flex flex-wrap justify-center items-center m-5 gap-5">
          {Array.from({ length: 12 }, (_, i) => i + 1).map((id) => {
            return (
              <li
                key={id}
                className="flex flex-col w-full justify-center md:w-80 lg:w-1/4 h-80 rounded"
              >
                <Skeleton className="rounded-md w-full h-[13.5rem] bg-gray-300 my-1 "></Skeleton>
                <Skeleton className="h-7 w-5/6 bg-gray-300 my-1"></Skeleton>
                <Skeleton className="h-5 w-2/5 bg-gray-300 my-1"></Skeleton>
                <div className="flex items-center ">
                  <Skeleton className="h-4 w-1/4 bg-gray-300"></Skeleton>
                  <Skeleton className="h-5 w-7 rounded-full bg-gray-300 ml-6"></Skeleton>
                </div>
              </li>
            );
          })}
        </ul>
      </section>
    </main>
  );
};

export default LoadingQuizzes;
