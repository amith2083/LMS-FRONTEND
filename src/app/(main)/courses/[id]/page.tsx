import { formatPrice } from "@/lib/formatPrice";
import CourseDetailsIntro from "./_components/CourseDetailsIntro";
import CourseDetails from "./_components/CourseDetails";
import Testimonials from "./_components/Testimonials";
import RelatedCourses from "./_components/RelatedCourses";
import LoadingSpinner from "@/components/LoadingSpinner";
import { getCourseById, getRelatedCourses } from "@/app/services/courseService";
import { hasEnrollmentForCourse } from "@/app/services/enrollmentService";
interface Props {
  params: {
    id: string;
  };
}
const SingleCoursePage = async({ params }: Props) => {
  // const params = useParams();
  const courseId = params?.id ;

const [course, relatedCoursesData] = await Promise.all([
    getCourseById(courseId),
    getRelatedCourses(courseId),
   
  ]);

  const relatedCourses = relatedCoursesData ?? [];
  
    console.log('rel',relatedCourses)


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
      {course?.testimonials.length > 0 && (
        <Testimonials testimonials={course?.testimonials} />
      )}
      {relatedCourses?.length > 0 && <RelatedCourses relatedCourses={relatedCourses} />}
    </>
  );
};

export default SingleCoursePage;
