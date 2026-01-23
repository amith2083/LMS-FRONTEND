import { getCategories } from "@/app/services/categoryService";
import { getCourses } from "@/app/services/courseService";
import HomePageClient from "./_components/Home";

export default async function HomePage() {

  const categories = await getCategories();

  const coursesData = await getCourses({
    page: 1,
    limit: 8,
  });

  const courses = coursesData?.courses ?? [];

 
  return <HomePageClient categories={categories} courses={courses} />;
}