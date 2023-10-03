import { Skeleton } from "@/app/components/ui/skeleton";
import LoadingComments from "./LoadingComments";

const LoadingQuizId = () => {
  return (
    <main className=" my-5">
      <section>
        <div className="flex flex-col justify-center items-center px-2 ">
          <Skeleton className="h-8 md:h-16 lg:h-20  bg-gray-300 mb-2  md:mb-5 px-2 w-5/6 self-start md:self-center " />
          <Skeleton className="sm:hidden h-8  bg-gray-300  mb-2 px-2 w-4/6 self-start "></Skeleton>
          <Skeleton className="w-full rounded-md h-64 md:h-96 lg:h-[35rem] lg:w-4/6  md:w-5/6 bg-gray-300" />
          <div className="w-full lg:w-4/6  md:w-5/6 text-2xl mt-2">
            <Skeleton className="h-5 md:h-7 bg-gray-300 mb-1 px-2" />
            <Skeleton className="h-5 md:h-7 bg-gray-300 mb-1 px-2" />
            <Skeleton className="h-5 md:h-7 bg-gray-300 mb-3 px-2 w-3/5" />
            <Skeleton className="h-6 md:h-8 w-2/5 bg-gray-300 mb-3 px-2" />
            <Skeleton className="h-6 md:h-8 w-2/4 bg-gray-300 mb-1 px-2" />
          </div>
          <Skeleton className="h-11 md:h-14 rounded w-[150px] bg-gray-300 mb-2 px-2 mt-5" />
          <LoadingComments />
        </div>
      </section>
    </main>
  );
};

export default LoadingQuizId;
