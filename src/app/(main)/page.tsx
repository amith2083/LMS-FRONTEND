import { getCategories } from "@/features/categories/services/categoryService";
import { getCourses } from "@/features/courses/services/courseService";
import HomePageClient from "@/features/courses/components/Home";
import { Category } from "@/features/categories/types/category";
import { Course, CoursesResponse } from "@/features/courses/types/course";

export default async function HomePage() {

  const categories:Category[] = await getCategories();

  const coursesData:CoursesResponse = await getCourses({
    page: 1,
    limit: 8,
  });

  const courses:Course[] = coursesData?.courses ?? [];



 
  return <HomePageClient categories={categories} courses={courses} />;
}
