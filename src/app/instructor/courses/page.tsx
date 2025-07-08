"use client";
import { useCourses } from "@/app/hooks/useCourseQueries";
import { columns } from "./_components/columns";
import { DataTable } from "./_components/data-table";

interface Course {
  [key: string]: any;
}

const CoursesPage = () => {
  const { data: courses, isLoading, error } = useCourses();

  if (isLoading) return <p>Loading courses...</p>;
  if (error) return <p>Failed to load courses</p>;

  return (
    <div className="p-6">
      {/* <Link href="/teacher/create">
        <Button>New Course</Button>
      </Link> */}
      <DataTable columns={columns} data={courses} />
    </div>
  );
};

export default CoursesPage;
