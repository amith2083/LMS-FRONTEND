// app/courses/_components/CoursesPage.tsx (Full Code with TanStack Query Error Handling)
'use client';

import ActiveFilters from "./ActiveFilters";
import CourseCard from "./CourseCard";
import FilterCourse from "./FilterCourse";
import FilterCourseMobile from "./FilterCourseMobile";
import SortCourse from "./SortCourse";
import SearchCourse from "./SearchCourse";
import { useState, useEffect, useCallback } from "react";
import { SkeletonWrapper } from "react-skeletonify";
import { useCourses } from "@/app/hooks/useCourseQueries";
import { useCategories } from "@/app/hooks/useCategoryQueries";
import { useQueryClient } from "@tanstack/react-query"; // For manual retry

const CoursesPage = () => {
  const queryClient = useQueryClient(); // For retry invalidation
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState('');
  const [categories, setCategories] = useState<string[]>([]);
  const [price, setPrice] = useState<string[]>([]);
  const [sort, setSort] = useState('');

  // Reset page when filters change
  useEffect(() => {
    setPage(1);
  }, [search, categories, price, sort]);

  const params = { search, categories, price, sort, page, limit: 9 };
  const { 
    data, 
    isLoading: isCoursesLoading, 
    error: coursesError, 
    isError: isCoursesError 
  } = useCourses(params);
  
  const { 
    data: allCategories = [], 
    isLoading: isCategoriesLoading, 
    error: categoriesError, 
    isError: isCategoriesError 
  } = useCategories();

  const courses = data?.courses || [];

  // Dummy course for skeleton rendering
  const dummyCourse = {
    _id: 'dummy',
    title: '',
    thumbnail: null,
    category: { title: '' },
    modules: [],
    price: 0,
  };

  // Debounced search update
  const debouncedSearch = useCallback((value: string) => {
    const timeoutId = setTimeout(() => setSearch(value), 300);
    return () => clearTimeout(timeoutId);
  }, []);

  // Handle courses error fallback
  if (isCoursesError) {
    return (
      <section className="container space-y-6 py-6">
        {/* Keep header and filters for usability */}
        <div className="flex items-baseline justify-between border-b pb-6">
          <SearchCourse onSearchChange={debouncedSearch} />
          <div className="flex items-center gap-2">
            <SortCourse sort={sort} onSortChange={setSort} />
            <FilterCourseMobile
              categories={categories}
              price={price}
              onCategoriesChange={setCategories}
              onPriceChange={setPrice}
            />
          </div>
        </div>
        <ActiveFilters
          filter={{ categories, price, sort }}
          onCategoriesChange={setCategories}
          onPriceChange={setPrice}
          onSortChange={setSort}
        />
        {/* Error fallback for grid */}
        <div className="p-4 border rounded bg-red-50">
          <h2 className="text-red-600 mb-2">Failed to load courses: {coursesError?.message}</h2>
          <button
            onClick={() => queryClient.invalidateQueries({ queryKey: ['courses', params] })}
            className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
          >
            Retry Courses
          </button>
        </div>
      </section>
    );
  }

  // Handle categories error (show basic filters without data)
  if (isCategoriesError) {
    return (
      <section className="container space-y-6 py-6">
        {/* Header */}
        <div className="flex items-baseline justify-between border-b pb-6">
          <SearchCourse onSearchChange={debouncedSearch} />
          <div className="flex items-center gap-2">
            <SortCourse sort={sort} onSortChange={setSort} />
            <FilterCourseMobile
              categories={categories}
              price={price}
              onCategoriesChange={setCategories}
              onPriceChange={setPrice}
            />
          </div>
        </div>
        <ActiveFilters
          filter={{ categories, price, sort }}
          onCategoriesChange={setCategories}
          onPriceChange={setPrice}
          onSortChange={setSort}
        />
        {/* Error for filters */}
        <div className="p-4 border rounded bg-red-50 lg:col-span-4">
          <h2 className="text-red-600 mb-2">Failed to load categories: {categoriesError?.message}</h2>
          <button
            onClick={() => queryClient.invalidateQueries({ queryKey: ['categories'] })}
            className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
          >
            Retry Filters
          </button>
        </div>
        {/* Show courses if available */}
        <div className="lg:col-span-3">
          <SkeletonWrapper loading={isCoursesLoading}>
            <div className="grid sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-4">
              {(isCoursesLoading ? Array.from({ length: 6 }) : courses).map((courseOrIndex, i) => {
                const course = isCoursesLoading ? { ...dummyCourse, _id: `dummy-${i}` } : courseOrIndex;
                return <CourseCard key={course._id} course={course} />;
              })}
            </div>
          </SkeletonWrapper>
        </div>
      </section>
    );
  }

  // Normal render (no errors)
  return (
    <section id="courses" className="container space-y-6 dark:bg-transparent py-6">
      {/* header */}
      <div className="flex items-baseline justify-between border-gray-200 border-b pb-6 flex-col gap-4 lg:flex-row">
        <SearchCourse onSearchChange={debouncedSearch} />
        <div className="flex items-center justify-end gap-2 max-lg:w-full">
          <SortCourse sort={sort} onSortChange={setSort} />
          <FilterCourseMobile
            categories={categories}
            price={price}
            onCategoriesChange={setCategories}
            onPriceChange={setPrice}
          />
        </div>
      </div>
      {/* header ends */}
      {/* active filters */}
      <ActiveFilters
        filter={{ categories, price, sort }}
        onCategoriesChange={setCategories}
        onPriceChange={setPrice}
        onSortChange={setSort}
      />

      <section className="pb-24 pt-6">
        <div className="grid grid-cols-1 gap-x-8 gap-y-10 lg:grid-cols-4">
          {/* Filters - Skeletonized */}
          <SkeletonWrapper loading={isCategoriesLoading}>
            <FilterCourse
              categories={allCategories}
              isLoading={false}
              selectedCategories={categories}
              selectedPrice={price}
              onCategoriesChange={setCategories}
              onPriceChange={setPrice}
            />
          </SkeletonWrapper>

          {/* Course grid - Skeletonized */}
          <div className="lg:col-span-3">
            <SkeletonWrapper loading={isCoursesLoading}>
              <div className="grid sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-4">
                {(isCoursesLoading ? Array.from({ length: 6 }) : courses).map((courseOrIndex, i) => {
                  const course = isCoursesLoading ? { ...dummyCourse, _id: `dummy-${i}` } : courseOrIndex;
                  return <CourseCard key={course._id} course={course} />;
                })}
              </div>
            </SkeletonWrapper>
          </div>
        </div>
      </section>
      {/* Pagination */}
      {data?.totalPages > 1 && (
        <div className="flex justify-center gap-4">
          <button
            onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
            disabled={page === 1}
            className="px-4 py-2 bg-gray-200 rounded disabled:opacity-50"
          >
            Prev
          </button>
          <span className="px-4 py-2">{page} / {data.totalPages}</span>
          <button
            onClick={() =>
              setPage((prev) =>
                data?.totalPages && prev < data.totalPages ? prev + 1 : prev
              )
            }
            disabled={page === data?.totalPages}
            className="px-4 py-2 bg-gray-200 rounded disabled:opacity-50"
          >
            Next
          </button>
        </div>
      )}
    </section>
  );
};

export default CoursesPage;