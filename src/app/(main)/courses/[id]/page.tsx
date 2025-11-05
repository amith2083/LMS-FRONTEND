'use client';
import { formatPrice } from "@/lib/formatPrice";
import CourseDetailsIntro from "./_components/CourseDetailsIntro";
import CourseDetails from "./_components/CourseDetails";
import Testimonials from "./_components/Testimonials";
import RelatedCourses from "./_components/RelatedCourses";
import LoadingSpinner from "@/components/LoadingSpinner";

// import { useCourseDetails, useRelatedCourses } from "@/app/hooks/useCourse";
import { use } from "react";
import { useCourseById } from "@/app/hooks/useCourseQueries";

const SingleCoursePage = ({ params }: { params: Promise<{ id: string }> }) => {
  // const { id } = params;
  // const courseId = params.id;
  const { id: courseId } = use(params);
 
  const { data: course, isLoading, isError } = useCourseById(courseId);
  // Use categoryId only after course is fetched
  const categoryId = course?.category?._id.toString() || course?.category?.id; // adjust as per your course schema
  // const {
  //   data: relatedCourses,
  //   isLoading: relatedLoading,
  // } = useRelatedCourses(courseId, categoryId);
  // console.log('related',relatedCourses);

  if (isLoading) {
    return <LoadingSpinner size="lg" message="Fetching course details..." />; 
  }
  if (isError) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[400px] py-8">
        <div className="text-red-500 text-xl font-semibold mb-2">Failed to load course.</div>
        <button className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition">
          Retry
        </button>
      </div>
    ); 
  }
  if (!course) return <div className="text-center py-8">No course found.</div>;
  
  return (
    <>
      <CourseDetailsIntro course={course} />
      <CourseDetails course={course} />
      {course?.testimonials && <Testimonials testimonials={course.testimonials} />} 
      {/* {relatedCourses?.length > 0 && <RelatedCourses relatedCourses={relatedCourses} />} */}
    </>
  );
};

export default SingleCoursePage;