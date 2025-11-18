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
  
  const categoryId = course?.category?._id.toString() 
  // const {
  //   data: relatedCourses,
  //   isLoading: relatedLoading,
  // } = useRelatedCourses(courseId, categoryId);
  // console.log('related',relatedCourses);

  if (isLoading) {
    return <LoadingSpinner size="lg" message="Fetching course details..." />; 
  }

  if (!course) return <div className="text-center py-8">No course found.</div>;
  
  return (
    <>
      <CourseDetailsIntro course={course} />
      <CourseDetails course={course} />
      {course?.testimonials && <Testimonials testimonials={course?.testimonials} />} 
      {/* {relatedCourses?.length > 0 && <RelatedCourses relatedCourses={relatedCourses} />} */}
    </>
  );
};

export default SingleCoursePage;