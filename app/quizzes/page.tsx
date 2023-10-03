"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { usePathname, useSearchParams } from "next/navigation";
import { getQuizzes } from "../api/quizzes";
import QuizzesCard from "./QuizzesCard";
import { getCategories } from "../api/categories";
import LoadingQuizzes from "./LoadingQuizzes";
import { QuizInfo, QuizQueryParams } from "../types/quizTypes";
import { CustomAxiosError } from "../types/errorTypes";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/app/components/ui/select";

const Quizzes = () => {
  const sortOptions = [
    {
      key: "release_date-desc",
      value: "release_date-desc",
      label: "Date: Newest",
    },
    {
      key: "release_date-asc",
      value: "release_date-asc",
      label: "Date: Oldest",
    },
    { key: "likes-asc", value: "likes-asc", label: "Likes: Low - High" },
    { key: "likes-desc", value: "likes-desc", label: "Likes: High - Low" },
    { key: "quiz_name-asc", value: "quiz_name-asc", label: "Title: A - Z" },
    { key: "quiz_name-desc", value: "quiz_name-desc", label: "Title: Z - A" },
  ];

  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const pageStr = searchParams.get("page") ?? "1";
  let page = parseInt(pageStr);
  const limit = 9;

  const [selectedSortBy, setSelectedSortBy] = useState("");
  const [selectedOrderBy, setSelectedOrderBy] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");

  const sortByQuery = searchParams.get("sort_by");
  const orderByQuery = searchParams.get("order_by");
  const categoryQuery = searchParams.get("category");

  const [quizzes, setQuizzes] = useState([]);
  const [categories, setCategories] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<CustomAxiosError | null>(null);
  const [totalCount, setTotalCount] = useState(0);

  const totalPages = Math.ceil(totalCount / limit);
  const numButtonsToShow = 4;
  const startPage = Math.max(
    1,
    Math.min(page - 1, totalPages - numButtonsToShow + 1)
  );
  const endPage = Math.min(totalPages, startPage + numButtonsToShow - 1);

  const constructQueryParams = () => {
    const newQueryParams = new URLSearchParams(searchParams);
    newQueryParams.set("page", pageStr);

    if (selectedSortBy) {
      newQueryParams.set("sort_by", selectedSortBy);
    }

    if (selectedOrderBy) {
      newQueryParams.set("order_by", selectedOrderBy);
    }

    if (selectedCategory) {
      newQueryParams.set("category", selectedCategory);
    }

    return newQueryParams;
  };

  const handleNextPage = () => {
    if (page < totalPages) {
      const nextPage = page + 1;
      const newQueryParams = constructQueryParams();
      newQueryParams.set("page", nextPage.toString());

      router.push(`${pathname}?${newQueryParams.toString()}`);
    }
  };

  const handlePrevPage = () => {
    if (page > 1) {
      const prevPage = page - 1;
      const newQueryParams = constructQueryParams();
      newQueryParams.set("page", prevPage.toString());

      router.push(`${pathname}?${newQueryParams.toString()}`);
    }
  };

  const handleSortChange = (value: string) => {
    const [newSortBy, newOrderBy] = value.split("-");

    const newQueryParams = new URLSearchParams();

    if (newSortBy) {
      newQueryParams.set("sort_by", newSortBy);
    }

    if (newOrderBy) {
      newQueryParams.set("order_by", newOrderBy);
    }

    if (categoryQuery) {
      newQueryParams.set("category", categoryQuery);
    }

    if (searchParams.has("page")) {
      newQueryParams.set("page", "1");
    }

    setSelectedSortBy(newSortBy);
    setSelectedOrderBy(newOrderBy);
    router.push(`${pathname}?${newQueryParams.toString()}`);
  };

  const handleCategoryChange = (value: string) => {
    const newCategory = value;
    const newQueryParams = new URLSearchParams();

    if (selectedSortBy) {
      newQueryParams.set("sort_by", selectedSortBy);
    }

    if (selectedOrderBy) {
      newQueryParams.set("order_by", selectedOrderBy);
    }

    if (newCategory) {
      newQueryParams.set("category", newCategory);
    }

    if (searchParams.has("page")) {
      newQueryParams.set("page", "1");
    }

    setSelectedCategory(newCategory);
    router.push(`${pathname}?${newQueryParams.toString()}`);
  };

  const renderPageButtons = () => {
    const buttons = [];

    for (let pageNumber = startPage; pageNumber <= endPage; pageNumber++) {
      const newQueryParams = constructQueryParams();
      newQueryParams.set("page", pageNumber.toString());

      buttons.push(
        <button
          key={pageNumber}
          aria-label={`Go to Page ${pageNumber} of ${endPage}`}
          onClick={() => {
            router.push(`${pathname}?${newQueryParams.toString()}`);
          }}
          className={`font-extrabold text-xl w-9 md:w-12 border border-gray-300 rounded ${
            pageNumber === page ? "text-custom-blue" : ""
          }`}
        >
          {pageNumber}
        </button>
      );
    }

    return buttons;
  };

  useEffect(() => {
    setIsLoading(true);
    setError(null);

    if (isNaN(page)) {
      page = 1;
      const newQueryParams = constructQueryParams();
      newQueryParams.set("page", page.toString());

      router.push(`${pathname}?${newQueryParams.toString()}`);
    }

    const queryParams: QuizQueryParams = {
      limit,
    };
    if (sortByQuery) {
      queryParams.sort_by = sortByQuery;
      setSelectedSortBy(sortByQuery);
    }

    if (orderByQuery) {
      queryParams.order_by = orderByQuery;
      setSelectedOrderBy(orderByQuery);
    }

    if (categoryQuery) {
      queryParams.category = categoryQuery;
      setSelectedCategory(categoryQuery);
    }

    getCategories()
      .then((categories) => {
        setCategories(categories);
        return getQuizzes(queryParams, page);
      })
      .then(({ quizzes, totalCount }) => {
        setQuizzes(quizzes);
        setTotalCount(totalCount);
        setIsLoading(false);
      })
      .catch((error) => {
        setError(error);
        setIsLoading(false);
      });
  }, [page, limit, sortByQuery, orderByQuery, categoryQuery]);

  return isLoading ? (
    <LoadingQuizzes />
  ) : error ? (
    <main className="text-center font-poppins my-5">
      <section>
        <header>
          <h1 className="text-5xl my-2 md:text-6xl lg:text-8xl font-bold text-transparent bg-clip-text bg-gradient-to-l from-custom-green to-custom-blue m-10 ">
            Quizzes
          </h1>
        </header>
        <h2 className="text-4xl my-2 md:text-5xl lg:text-7xl font-bold">{`${error.response?.status} Error: ${error.response?.data?.msg}`}</h2>
      </section>
    </main>
  ) : (
    <main className="text-center font-poppins my-5">
      <section>
        <header>
          <h1 className="text-5xl my-2 md:text-6xl lg:text-8xl font-bold text-transparent bg-clip-text bg-gradient-to-l from-custom-green to-custom-blue m-10 ">
            Quizzes
          </h1>
        </header>

        <div className="flex flex-col items-start md:flex-row md:justify-center m-5 gap-3">
          <Select
            value={
              !selectedSortBy || !selectedOrderBy
                ? undefined
                : `${selectedSortBy}-${selectedOrderBy}`
            }
            onValueChange={(value) => {
              handleSortChange(value);
            }}
          >
            <SelectTrigger className="w-48 h-11" aria-label="Select a Sort By">
              <SelectValue placeholder="Select a sort by" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectLabel>Sort by</SelectLabel>
                {sortOptions.map((option) => (
                  <SelectItem
                    key={option.key}
                    value={option.value}
                    aria-label={`Sort quizzes by ${option.value}`}
                  >
                    {option.label}
                  </SelectItem>
                ))}
              </SelectGroup>
            </SelectContent>
          </Select>

          <Select
            value={!selectedCategory ? undefined : selectedCategory}
            onValueChange={(value) => {
              handleCategoryChange(value);
            }}
          >
            <SelectTrigger className="w-48 h-11" aria-label="Select a Category">
              <SelectValue placeholder="Select a category" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectLabel>Category</SelectLabel>
                {/* <SelectItem value="">All Categories</SelectItem> */}
                {categories.map((category: any) => (
                  <SelectItem
                    aria-label={`Select ${category.category} quizzes`}
                    key={category.category_id}
                    value={category.category}
                  >
                    {category.category}
                  </SelectItem>
                ))}
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>

        <ul className="flex flex-wrap justify-center items-center m-5 gap-5">
          {quizzes.map((quiz: QuizInfo) => {
            return <QuizzesCard key={quiz.quiz_id} quiz={quiz} />;
          })}
        </ul>

        <div className="flex justify-center my-10 gap-2">
          <button
            onClick={handlePrevPage}
            aria-label="Previous page"
            disabled={page === 1}
            className={`${
              page === 1 ? "cursor-not-allowed" : ""
            } bg-gradient-to-r from-blue-500 to-indigo-600 font-medium py-1 rounded w-[85px] md:min-w-[6.25rem]`}
          >
            Previous
          </button>
          {renderPageButtons()}
          <button
            onClick={handleNextPage}
            aria-label="Next page"
            disabled={page === totalPages}
            className={`${
              page === totalPages ? "cursor-not-allowed" : ""
            } bg-gradient-to-r from-blue-500 to-indigo-600 font-medium py-1 rounded w-[85px] md:min-w-[6.25rem]`}
          >
            Next
          </button>
        </div>
      </section>
    </main>
  );
};

export default Quizzes;
