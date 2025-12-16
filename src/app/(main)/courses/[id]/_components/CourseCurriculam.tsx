"use client";
import React from "react";
import { BookCheck, FileQuestion } from "lucide-react";
import { Clock10 } from "lucide-react";
import { Radio } from "lucide-react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

import CourseModuleList from "./module/CourseModuleList";

const CourseCurriculam = ({ course }) => {
  console.log('curriculum',course)

  const totalDurationSeconds = course?.modules?.reduce((modAcc: number, mod: any) => {
    return modAcc + (mod.lessonIds?.reduce((acc: number, lesson: any) => acc + (lesson.duration || 0), 0) || 0);
  }, 0) || 0;

  const totalHours = totalDurationSeconds > 0 ? (totalDurationSeconds / 3600).toFixed(1) : "0";
    

  return (
    <>
      <div className="flex gap-x-5 items-center justify-center flex-wrap mt-4 mb-6 text-gray-600 text-sm">
        <span className="flex items-center gap-1.5">
          <BookCheck className="w-4 h-4" />
          {course?.modules?.length || 0} Modules
        </span>
        <span className="flex items-center gap-1.5">
          <Clock10 className="w-4 h-4" />
          {totalHours}+ Hours
        </span>
        {/* <span className="flex items-center gap-1.5">
          <FileQuestion className="w-4 h-4" />
          {course?.quizSet || 0} Quiz
        </span> */}
      </div>

      <Accordion
        defaultValue={["item-1", "item-2", "item-3"]}
        type="multiple"
        collapsible="true"
        className="w-full"
      >
        {course?.modules &&
          course.modules.map((module) => (
            <CourseModuleList key={module._id} module={module} />
          ))}
      </Accordion>
    </>
  );
};

export default CourseCurriculam;
