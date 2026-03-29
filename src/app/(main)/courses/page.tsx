import { Suspense } from "react";
import { getCategories } from "@/features/categories/services/categoryService";
import { getCourses } from "@/features/courses/services/courseService";
import CoursesPage from "@/features/courses/components/Courses";
import { Category } from "@/features/categories/types/category";

const CoursesPageWrapper = async () => {
  const [categoriesData, coursesData] = await Promise.all([
    getCategories(),
    getCourses({ page: 1, limit: 6 }),
  ]);

  const categories = categoriesData || [];
  const initialCoursesResponse = coursesData || {
    courses: [],
    totalPages: 1,
    totalCourses: 0,
  };

  return (
    <Suspense fallback={<div className="container py-24 text-center">Loading courses...</div>}>
      <CoursesPage
        initialCoursesData={initialCoursesResponse}
        initialCategories={categories}
      />
    </Suspense>
  );
};

export default CoursesPageWrapper;


