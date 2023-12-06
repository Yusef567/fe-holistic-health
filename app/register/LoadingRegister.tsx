import { Skeleton } from "@/app/components/ui/skeleton";

const LoadingRegister = () => {
  return (
    <main>
      <section className="flex flex-col justify-center items-center font-poppins">
        <h1 className="text-5xl md:text-7xl lg:text-8xl font-black my-3">
          Holistic Health
        </h1>
        <Skeleton className="bg-gray-300 h-12 md:h-16 w-48 md:w-1/4 lg:w-1/5 mt-5"></Skeleton>
        <div className="w-2/3 md:w-2/5 lg:w-1/4">
          <Skeleton className="bg-gray-300 h-6 md:h-8 w-60 lg:hidden mt-5"></Skeleton>
          <Skeleton className="bg-gray-300 h-6 md:h-8 w-40 lg:hidden mt-2"></Skeleton>

          <Skeleton className="bg-gray-300 h-6  hidden lg:block mt-5"></Skeleton>

          <Skeleton className="bg-gray-300 h-10 md:h-10 mt-5 lg:mt-2"></Skeleton>
          <Skeleton className="bg-gray-300 h-10 md:h-10 mt-5"></Skeleton>
          <Skeleton className="bg-gray-300 h-10 md:h-10 mt-5"></Skeleton>
          <Skeleton className="bg-gray-300 h-10 md:h-10 my-5"></Skeleton>
        </div>
        <Skeleton className="bg-gray-300 h-12 md:h-14 w-40 mt-5"></Skeleton>
      </section>
    </main>
  );
};
export default LoadingRegister;
