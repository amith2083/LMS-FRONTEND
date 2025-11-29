'use client';
import { formatPrice } from "@/lib/formatPrice";
import CourseDetailsIntro from "./_components/CourseDetailsIntro";
import CourseDetails from "./_components/CourseDetails";
import Testimonials from "./_components/Testimonials";
import RelatedCourses from "./_components/RelatedCourses";
import LoadingSpinner from "@/components/LoadingSpinner";

// import { useCourseDetails, useRelatedCourses } from "@/app/hooks/useCourse";

import { useCourseById } from "@/app/hooks/useCourseQueries";
import { useHasEnrollmentForCourse } from "@/app/hooks/useEnrollmentQueries";
import { useParams } from "next/navigation";

const SingleCoursePage = () => {
 
    const params = useParams();
  const courseId = params?.id as string;
  
 
  const { data: course, isLoading:isCourseLoading, isError } = useCourseById(courseId);
   const { data: isEnrolled, isLoading:isHasEnrollmentLoading } = useHasEnrollmentForCourse( course?._id);
  const categoryId = course?.category?._id

  // const {
  //   data: relatedCourses,
  //   isLoading: relatedLoading,
  // } = useRelatedCourses(courseId, categoryId);
  // console.log('related',relatedCourses);

  if (isCourseLoading|| isHasEnrollmentLoading) {
    return <LoadingSpinner size="lg" message="Fetching course details..." />; 
  }

  if (!course) return <div className="text-center py-8">No course found.</div>;
  
  return (
    <>
      <CourseDetailsIntro course={course} isEnrolled={isEnrolled} />
      <CourseDetails course={course} />
      {course?.testimonials && <Testimonials testimonials={course?.testimonials} />} 
      {/* {relatedCourses?.length > 0 && <RelatedCourses relatedCourses={relatedCourses} />} */}
    </>
  );
};

export default SingleCoursePage;