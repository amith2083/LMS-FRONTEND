"use client";
import { useCourses, useCoursesByInstructorId } from "@/app/hooks/useCourseQueries";
import { columns } from "./_components/columns";
import { DataTable } from "./_components/data-table";
import { useSession } from "next-auth/react";

interface Course {
  [key: string]: any;
}

const CoursesPage = () => {
 const { data: session, status } = useSession();
  const instructorId = session?.user?.id;
  const userRole = session?.user?.role;

  if (status === "authenticated" && userRole !== "instructor") {
    return <p>Access denied: Only instructors can view this page.</p>;
  }

  const { data: courses, isLoading, error } = useCoursesByInstructorId(instructorId || "");

  console.log("course", courses);
  console.log("session", session);

  if (status === "loading") return <p>Loading ...</p>;
  if (status === "unauthenticated") return <p>Please sign in to view courses</p>;
  if (isLoading) return <p>Loading courses...</p>;
  if (error) return <p>Failed to load courses: {error.message}</p>;

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
