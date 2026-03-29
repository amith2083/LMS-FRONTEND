import React from 'react';
import Image from "next/image";
import Link from "next/link";
import { Button, buttonVariants } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { formatPrice } from "@/lib/formatPrice";
import { ArrowRightIcon } from "lucide-react";
import { BookOpen } from "lucide-react";
import EnrollCourse from '@/features/enrollments/components/enroll-course';
import { Course } from '@/features/courses/types/course';

interface CourseCardProps {
  course: Course
}

const CourseCard = ({ course }: CourseCardProps) => {


  return (
    <Link key={course._id} href={`/courses/${course._id}`} className="block h-full group">
      <div className="h-full border rounded-2xl p-3 bg-white transition-all duration-500 ease-out group-hover:shadow-2xl group-hover:shadow-indigo-500/10 group-hover:-translate-y-1 group-hover:border-indigo-100">
        <div className="relative w-full aspect-video rounded-xl overflow-hidden bg-slate-50">
          {course.thumbnail && (
            <Image
              src={course.thumbnail}
              alt={course.title}
              className="object-cover transition-transform duration-700 group-hover:scale-110"
              fill
            />
          )}
        </div>
        <div className="flex flex-col pt-3">
          <div className="text-[17px] font-bold font-display leading-tight group-hover:text-indigo-600 line-clamp-2 min-h-[50px]">
            {course?.title}
          </div>
          <p className="text-[13px] font-medium text-slate-500 uppercase tracking-wider mt-1">{course?.category?.title}</p>
          
          <div className="my-4 flex items-center gap-x-3 text-sm text-slate-400">
              <div className="flex items-center gap-x-1.5 px-2.5 py-1 rounded-full bg-slate-50 border border-slate-100 transition-colors group-hover:bg-indigo-50 group-hover:border-indigo-100 group-hover:text-indigo-600">
                <BookOpen className="w-3.5 h-3.5" />
                <span className="text-xs font-semibold">{course?.modules?.length} Chapters</span>
              </div>
          </div>

          <div className="flex items-center justify-between mt-auto pt-2">
            <p className="text-lg font-bold text-slate-800">
              {formatPrice(course?.price)}
            </p>
            <div className="opacity-0 translate-x-2 transition-all duration-300 group-hover:opacity-100 group-hover:translate-x-0">
               <EnrollCourse asLink={true} courseId={course?._id}/>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default CourseCard;


