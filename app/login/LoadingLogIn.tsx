import { Skeleton } from "@/app/components/ui/skeleton";

const LoadingLogIn = () => {
  return (
    <main>
      <section className="flex flex-col justify-center items-center font-poppins">
        <h1 className="text-5xl md:text-7xl lg:text-8xl font-black my-3">
          Holistic Health
        </h1>
        <Skeleton className="bg-gray-300 h-12 md:h-16 w-44 md:w-1/4 lg:w-1/5 my-5"></Skeleton>
        <Skeleton className="bg-gray-300 h-10 md:h-12 w-64 md:w-2/5 lg:w-1/4 my-5"></Skeleton>
        <Skeleton className="bg-gray-300 h-10 md:h-12 w-64 md:w-2/5 lg:w-1/4 mb-5"></Skeleton>
        <Skeleton className="bg-gray-300 h-12 md:h-14 w-40 mt-5"></Skeleton>
        <Skeleton className="bg-gray-300 h-8 md:h-8 w-72 md:w-2/5 lg:w-1/4 mt-5"></Skeleton>
      </section>
    </main>
  );
};
export default LoadingLogIn;
