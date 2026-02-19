import { getCategories } from "@/app/services/categoryService";
import { getCourses } from "@/app/services/courseService";
import CoursesPage from "./_components/Courses";
import { Category } from "@/app/types/category";

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
    <CoursesPage
      initialCoursesData={initialCoursesResponse}
      initialCategories={categories}
    />
  );
};

export default CoursesPageWrapper;
