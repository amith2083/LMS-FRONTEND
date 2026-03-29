"use client"
import { useCoursesByInstructorId } from "@/features/courses/hooks/useCourseQueries";
import { columns } from "@/features/courses/components/columns";
import { DataTable } from "@/features/courses/components/data-table";
import { useUser } from "@/features/auth/context/UserContext";



const CoursesPage = () => {
  const { user, loading: isAuthLoading } = useUser();
  const instructorId = user?.id;
  const userRole = user?.role;

  if (!user && !isAuthLoading) {
    return <p>Access denied: Only instructors can view this page.</p>;
  }


  const { data: courses, isLoading, error } = useCoursesByInstructorId(instructorId ??'');



  if (isAuthLoading) return <p>Loading ...</p>;
  if (!user) return <p>Please sign in to view courses</p>;
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

