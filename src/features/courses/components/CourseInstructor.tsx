'use client'
import React from "react";
import { Presentation } from "lucide-react";
import { UsersRound } from "lucide-react";
import { Star } from "lucide-react";
import { MessageSquare } from "lucide-react";
import Image from "next/image";
import { useCoursesByInstructorId } from "@/features/courses/hooks/useCourseQueries";
import { useEnrollmentsForCourse } from "@/features/enrollments/hooks/useEnrollmentQueries";



import { SingleCourse } from "@/features/courses/types/course";

const CourseInstructor = ({ course }: { course: SingleCourse }) => {
  const instructorId = course?.instructor._id;
  const courseId = course?._id;


  
  
  const {
    data: courseDetailsByInstructor,
    isLoading:isCourseLoading,
    isError,
  } = useCoursesByInstructorId(instructorId);
    const {
    data: enrollmentDetailsByCourse,
    isLoading:isEnrollentLoading,
    
  } = useEnrollmentsForCourse(courseId);



  return (
    <div className="bg-gray-50 rounded-md p-8">
      <div className="md:flex md:gap-x-5 mb-8">
        <div className="h-[310px] w-[270px] relative flex-none rounded mb-5 md:mb-0 overflow-hidden shadow-lg border border-slate-100">
          <Image
            src={course?.instructor?.profilePicture || "/avatar.png"}
            alt={course?.instructor?.name || "Instructor"}
            fill
            sizes="(max-width: 768px) 100vw, 270px"
            className="object-cover transition-transform duration-500 hover:scale-110"
          />
        </div>
        <div className="flex-1">
          <div className="max-w-[300px]">
            <h4 className="text-[34px] font-bold leading-[51px]">{course?.instructor?.name}</h4>
            <div className="text-gray-600 font-medium mb-6">
              {course?.instructor?.designation}
            </div>
            <ul className="list space-y-4">
              <li className="flex items-center space-x-3">
                <Presentation className="text-gray-600" />
                <div>{courseDetailsByInstructor?.length} Courses</div>
              </li>
              <li className="flex space-x-3">
                <UsersRound className="text-gray-600" />
                <div>
                  {enrollmentDetailsByCourse?.length ?? 0}+ Student Learned
                </div>
              </li>
              <li className="flex space-x-3">
                <MessageSquare className="text-gray-600" />
                <div>{courseDetailsByInstructor?.reviews} Reviews</div>
              </li>
              <li className="flex space-x-3">
                <Star className="text-gray-600" />
                <div>{courseDetailsByInstructor?.ratings} Average Rating</div>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <p className="text-gray-600">{course?.instructor?.bio}</p>
    </div>
 
  );
};

export default CourseInstructor;


