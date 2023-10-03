import { Skeleton } from "@/app/components/ui/skeleton";

const LoadingComments = () => {
  return (
    <div className="w-full lg:w-4/6  md:w-5/6 text-2xl mt-2 ">
      <ul className="flex flex-col items-start text-left mt-3">
        <Skeleton className="h-8 md:h-8 w-1/3 bg-gray-300 mb-2 px-2" />
        {Array.from({ length: 5 }, (_, i) => i + 1).map((id) => {
          return (
            <li
              key={id}
              className="flex flex-col w-full h-48 md:h-44 rounded mb-2 px-2 bg-neutral-800 "
            >
              <Skeleton className="h-12 w-12 rounded-full bg-gray-300 px-2 mt-2" />
              <Skeleton className="h-6 w-full bg-gray-300 mb-1 px-2 mt-2" />
              <Skeleton className="h-6 w-2/4 bg-gray-300 mb-2 px-2" />
              <div className="flex items-center mt-3">
                <Skeleton className="h-6 w-1/4 bg-gray-300"></Skeleton>
                <Skeleton className="h-5 w-7 rounded-full bg-gray-300 ml-6"></Skeleton>
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default LoadingComments;
