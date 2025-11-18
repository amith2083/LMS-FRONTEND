import React from 'react';
import { cn } from '@/lib/utils';
import { buttonVariants } from '@/components/ui/button';
import Link from 'next/link';
import Image from 'next/image';
import EnrollCourse from '@/components/enroll-course';

import { useHasEnrollmentForCourse } from '@/app/hooks/useEnrollmentQueries';


const CourseDetailsIntro =  ({course}) => {
  




  const { data: isEnrolled, isLoading } = useHasEnrollmentForCourse( course?._id);

    return (
        <div className="overflow-x-hidden  grainy bg-amber-100">
        <section className="pt-12  sm:pt-16 bg-red-300">
          <div className="container bg-fuchsia-300">
            <div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8 bg-green-300">
              <div className="max-w-2xl mx-auto text-center">
                <h1 className="px-6 text-lg text-gray-600 font-inter">
                  {course?.title}
                </h1>
                <p className="mt-5 text-4xl font-bold leading-tight text-gray-900 sm:leading-tight sm:text-5xl lg:text-6xl lg:leading-tight font-pj">
                  <span className="relative inline-flex sm:inline">
                    <span className="bg-gradient-to-r from-[#44BCFF] via-[#FF44EC] to-[#FF675E] blur-lg filter opacity-30 w-full h-full absolute inset-0"></span>
                    <span className="relative">{course?.subtitle} </span>
                  </span>
                </p>

                <div className="mt-6 flex items-center justify-center flex-wrap gap-3">
                  {isLoading ? (
                  <button
                    disabled
                    className={cn(buttonVariants({ variant: 'outline', size: 'lg' }))}
                  >
                    Checking enrollment...
                  </button>
                ) : isEnrolled ? (
                  <Link
                    href={`/courses/${course?._id}/lesson`}
                    className={cn(buttonVariants({ variant: 'default', size: 'lg' }))}
                  >
                    Go to Course
                  </Link>
                ) : (
                  <EnrollCourse courseId={course?._id} />
                )}
                
                  <Link
                    href=""
                    className={cn(
                      buttonVariants({ variant: "outline", size: "lg" })
                    )}
                  >
                    See Intro
                  </Link>
                  <Link
                    href=""
                    className={cn(
                      buttonVariants({ variant: "destructive", size: "lg" })
                    )}
                  >
                   Price : ${course?.price}
                  </Link>
                </div>
              </div>
            </div>

            <div className="pb-12  mt-6">
              <div className="relative">
                <div className="absolute inset-0 h-2/3"></div>
                <div className="relative mx-auto">
                  <div className="lg:max-w-3xl lg:mx-auto">
                    <Image
                      className="mx-auto rounded-lg max-w-sm object-cover"
                      width={300}
                      height={400}
                       src={course?.thumbnail}
                      alt=""
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    );
};

export default CourseDetailsIntro;