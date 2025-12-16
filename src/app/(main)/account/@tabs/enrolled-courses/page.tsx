'use client';



import SkeletonBox from "../../component/skeleton";
import EnrolledCourseCard from "../../component/enrolled-coursecard";
import { useSession } from "next-auth/react";
import { useUserById } from "@/app/hooks/useUserQueries";
import { useEnrollmentsForUser } from "@/app/hooks/useEnrollmentQueries";
import Link from "next/link";
import { en } from "zod/v4/locales";

function EnrolledCourses() {

    const { data: enrollments, isLoading: isLoadingEnrollments } = useEnrollmentsForUser();
   




  if ( isLoadingEnrollments) {
    return (
      <div className="grid sm:grid-cols-2 gap-6">
        {[1, 2].map((_, i) => (
          <div key={i} className="p-4 border rounded-lg space-y-4 bg-white dark:bg-slate-900 shadow">
            <SkeletonBox className="w-full aspect-video" />
            <SkeletonBox className="h-5 w-3/4" />
            <SkeletonBox className="h-4 w-1/2" />
            <SkeletonBox className="h-4 w-full" />
            <SkeletonBox className="h-4 w-full" />
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className="grid sm:grid-cols-2 gap-6">
      {enrollments && enrollments.length > 0 ? (
        enrollments.map((enrollment) => (
          <Link key={enrollment?._id} href={`/courses/${enrollment?.course?._id.toString()}/lesson`}>
          <EnrolledCourseCard key={enrollment?._id} enrollment={enrollment} />
          </Link>
        ))
      ) : (
        <p className="text-center font-semibold text-red-500 col-span-2">
          No enrollments found!
        </p>
      )}
    </div>
  );
}

export default EnrolledCourses;
