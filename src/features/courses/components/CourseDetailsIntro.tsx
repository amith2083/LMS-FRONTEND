'use client'
import React from 'react';
import { cn } from '@/lib/utils';
import { buttonVariants } from '@/components/ui/button';
import Link from 'next/link';
import Image from 'next/image';
import EnrollCourse from '@/features/enrollments/components/enroll-course';
import { useHasEnrollmentForCourse } from '@/features/enrollments/hooks/useEnrollmentQueries';
import { Loader2 } from 'lucide-react';
import { SingleCourse } from '@/features/courses/types/course';
import { SectionWrapper } from '@/components/shared/section-wrapper';
import { motion } from 'motion/react';

interface Props {
  course: SingleCourse;
}

const CourseDetailsIntro = ({ course }: Props) => {
  const { data: isEnrolled, isLoading } = useHasEnrollmentForCourse(course?._id);

  return (
    <SectionWrapper direction="up" distance={20} className="pt-24 pb-32 grainy overflow-hidden">
      <div className="container px-6">
        <div className="mx-auto max-w-7xl">
          <div className="max-w-3xl mx-auto text-center">
            <motion.h1 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.1, duration: 0.5 }}
              className="px-6 text-sm font-bold uppercase tracking-[0.2em] text-indigo-600/70 mb-6"
            >
              {course?.category?.title || "Skillseed Course"}
            </motion.h1>
            
            <motion.p 
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.6 }}
              className="text-5xl font-extrabold leading-[1.1] text-slate-900 sm:text-6xl lg:text-7xl font-display tracking-tight"
            >
              <span className="relative">
                {course?.title}{" "}
                <span className="absolute -bottom-2 left-0 w-full h-[0.1em] bg-indigo-600/10 rounded-full" />
              </span>
            </motion.p>
            
            <motion.p 
               initial={{ opacity: 0 }}
               animate={{ opacity: 1 }}
               transition={{ delay: 0.4, duration: 0.8 }}
               className="mt-8 text-lg text-slate-500 max-w-xl mx-auto leading-relaxed"
            >
              {course?.description?.slice(0, 160)}...
            </motion.p>

            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.6 }}
              className="mt-10 flex items-center justify-center flex-wrap gap-4"
            >
              {isLoading ? (
                <button
                  disabled
                  className={cn(
                    buttonVariants({ variant: "default", size: "lg" }),
                    "cursor-not-allowed opacity-80 min-w-[160px]"
                  )}
                >
                  <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                  Loading...
                </button>
              ) : isEnrolled ? (
                <Link
                  href={`/courses/${course?._id}/lesson`}
                  className={cn(buttonVariants({ variant: 'default', size: 'lg' }), "shadow-xl shadow-indigo-100 hover:scale-105 transition-all duration-300")}
                >
                  Go to Course
                </Link>
              ) : (
                <EnrollCourse courseId={course?._id} />
              )}

              <div className="hidden sm:block w-[1px] h-8 bg-slate-200 mx-2" />

              <div className={cn(
                buttonVariants({ variant: "ghost", size: "lg" }),
                "text-slate-900 font-bold pointer-events-none"
              )}>
                Price: <span className="text-indigo-600 ml-1.5">${course?.price}</span>
              </div>
            </motion.div>
          </div>
        </div>

        <motion.div 
          initial={{ opacity: 0, scale: 0.9, y: 40 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ delay: 0.7, duration: 0.8, ease: "easeOut" }}
          className="relative mt-20 group"
        >
          <div className="absolute -inset-4 bg-gradient-to-tr from-indigo-500 to-purple-500 rounded-3xl blur-2xl opacity-10 group-hover:opacity-20 transition duration-1000" />
          <div className="relative mx-auto max-w-4xl">
            <div className="aspect-video bg-white rounded-3xl shadow-2xl overflow-hidden border border-slate-100 relative">
               <Image
                 className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
                 fill
                 src={course?.thumbnail}
                 alt={course?.title}
                 priority
               />
               <div className="absolute inset-0 bg-gradient-to-t from-slate-900/40 to-transparent" />
            </div>
          </div>
        </motion.div>
      </div>
    </SectionWrapper>
  );
};

export default CourseDetailsIntro;
