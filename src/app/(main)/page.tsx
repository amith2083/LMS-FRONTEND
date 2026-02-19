import { getCategories } from "@/app/services/categoryService";
import { getCourses } from "@/app/services/courseService";
import HomePageClient from "./_components/Home";
import { Category } from "../types/category";
import { Course, CoursesResponse } from "../types/course";

export default async function HomePage() {

  const categories:Category[] = await getCategories();

  const coursesData:CoursesResponse = await getCourses({
    page: 1,
    limit: 8,
  });

  const courses:Course[] = coursesData?.courses ?? [];



 
  return <HomePageClient categories={categories} courses={courses} />;
}