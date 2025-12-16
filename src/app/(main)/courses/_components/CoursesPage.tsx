
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
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

const CoursesPage = () => {
  const queryClient = useQueryClient(); // For retry invalidation
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState('');
  const [selectedCategory, setSelectedCategory]= useState<string>('');
const [price, setPrice] = useState<string>('');
  const [sort, setSort] = useState('');

  // Reset page when filters change
  useEffect(() => {
    setPage(1);
  }, [search, selectedCategory, price, sort]);

  const params = {
    search,
    category: selectedCategory || undefined,
    price: price || undefined,
    sort: sort || undefined,
    page,
    limit: 6,
  };
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

  

  // Debounced search update
  const debouncedSearch = useCallback((value: string) => {
    const timeoutId = setTimeout(() => setSearch(value), 300);
    return () => clearTimeout(timeoutId);
  }, []);

 


  // Normal render (no errors)
  return (
    <section id="courses" className="container space-y-6 dark:bg-transparent py-6">
      {/* header */}
      <div className="flex items-baseline justify-between border-gray-200 border-b pb-6 flex-col gap-4 lg:flex-row">
        <SearchCourse onSearchChange={debouncedSearch} />
        <div className="flex items-center justify-end gap-2 max-lg:w-full">
          <SortCourse sort={sort} onSortChange={setSort} />
          <FilterCourseMobile
           categories={allCategories}
              isLoading={false}
            selectedCategory={selectedCategory}
            selectedPrice={price}
            onCategoryChange={setSelectedCategory}
            onPriceChange={setPrice}
          />
        </div>
      </div>
      {/* header ends */}
      {/* active filters */}
      <ActiveFilters
        filter={{ selectedCategory, price, sort }}
        onCategoryChange={setSelectedCategory}
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
              selectedCategory={selectedCategory}
              selectedPrice={price}
              onCategoryChange={setSelectedCategory}
              onPriceChange={setPrice}
            />
          </SkeletonWrapper>

          {/* Course grid - Skeletonized */}
          <div className="lg:col-span-3">
            
           
              
             <div className="lg:col-span-3 grid sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-4">
              {isCoursesLoading ? (
    Array.from({ length: 6 }).map((_, i) => (
      <SkeletonWrapper key={i} loading={true}>
        <CourseCard course={{}} />
      </SkeletonWrapper>
    ))
  ) : (
    courses.map(course => (
      <CourseCard key={course._id} course={course} />
    ))
  )}
          
          </div>
              
              
        
          </div>
        </div>
      </section>
   
     {/* ---------- PAGINATION  ---------- */}
  {data?.totalPages && data.totalPages > 1 && (
  <Pagination className="mt-8">
    <PaginationContent className="flex items-center gap-1">

      {/* ← PREV */}
      <PaginationItem>
        <PaginationPrevious
          href="#"
          onClick={(e) => {
            e.preventDefault();
            if (page > 1) setPage(page - 1);
          }}
          className={page === 1 ? 'pointer-events-none opacity-50' : 'cursor-pointer'}
        />
      </PaginationItem>

      {/* Page 1 */}
      <PaginationItem>
        <PaginationLink href="#" isActive={page === 1} onClick={(e) => { e.preventDefault(); setPage(1); }}>
          1
        </PaginationLink>
      </PaginationItem>

      {/* ... if gap */}
      {page > 3 && <PaginationItem><PaginationEllipsis /></PaginationItem>}

      {/* Page before current */}
      {page > 2 && (
        <PaginationItem>
          <PaginationLink href="#" onClick={(e) => { e.preventDefault(); setPage(page - 1); }}>
            {page - 1}
          </PaginationLink>
        </PaginationItem>
      )}

      {/* Current page */}
      {page !== 1 && page !== data.totalPages && (
        <PaginationItem>
          <PaginationLink href="#" isActive>{page}</PaginationLink>
        </PaginationItem>
      )}

      {/* Page after current */}
      {page < data.totalPages - 1 && (
        <PaginationItem>
          <PaginationLink href="#" onClick={(e) => { e.preventDefault(); setPage(page + 1); }}>
            {page + 1}
          </PaginationLink>
        </PaginationItem>
      )}

      {/* ... if gap */}
      {page < data.totalPages - 2 && <PaginationItem><PaginationEllipsis /></PaginationItem>}

      {/* Last page */}
      <PaginationItem>
        <PaginationLink href="#" isActive={page === data.totalPages} onClick={(e) => { e.preventDefault(); setPage(data.totalPages); }}>
          {data.totalPages}
        </PaginationLink>
      </PaginationItem>

      {/* → NEXT */}
      <PaginationItem>
        <PaginationNext
          href="#"
          onClick={(e) => {
            e.preventDefault();
            if (page < data.totalPages) setPage(page + 1);
          }}
          className={page === data.totalPages ? 'pointer-events-none opacity-50' : 'cursor-pointer'}
        />
      </PaginationItem>

    </PaginationContent>
  </Pagination>
)}
    </section>
  );
};

export default CoursesPage;