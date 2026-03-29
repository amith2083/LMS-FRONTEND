import { formatPrice } from "@/lib/formatPrice";
import CourseDetailsIntro from "@/features/courses/components/CourseDetailsIntro";
import CourseDetails from "@/features/courses/components/CourseDetails";
import Testimonials from "@/features/testimonials/components/Testimonials";
import RelatedCourses from "@/features/courses/components/RelatedCourses";
import LoadingSpinner from "@/components/shared/LoadingSpinner";
import { getCourseById, getRelatedCourses } from "@/features/courses/services/courseService";

interface Props {
  params: Promise<{ id: string }>;
}
const SingleCoursePage = async ({ params }: Props) => {
  const { id: courseId } = await params;

const [course, relatedCourses] = await Promise.all([
    getCourseById(courseId),
    getRelatedCourses(courseId),
   
  ]);


  



  // if (isCourseLoading || isHasEnrollmentLoading) {
  //   return <LoadingSpinner size="lg" message="Fetching course details..." />;
  // }

 if (!course) {
    return (
      <div className="text-center py-16 text-2xl text-muted-foreground">
        No course found.
      </div>
    );
  }

  return (
       <>
      <CourseDetailsIntro course={course} />
      <CourseDetails course={course} />

      {course.testimonials.length > 0 && (
        <Testimonials testimonials={course.testimonials} />
      )}

      {relatedCourses.length > 0 && (
        <RelatedCourses relatedCourses={relatedCourses} />
      )}
    </>
  );
};

export default SingleCoursePage;

