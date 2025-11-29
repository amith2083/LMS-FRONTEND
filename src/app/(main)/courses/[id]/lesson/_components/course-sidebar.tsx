

import { CourseProgress } from "@/components/course-progress";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { CheckCircle } from "lucide-react";
import { PlayCircle } from "lucide-react";
import { Lock } from "lucide-react";
import Link from "next/link";
import { ReviewModal } from "./review-modal";
import { DownloadCertificate } from "./download-certificate";
import { GiveReview } from "./give-review";
import { SidebarModules } from "./sidebar-modules";
import { cookies } from "next/headers";
import { getWatchByLessonAndModule } from "@/app/service/watchService";
import { getCourseById } from "@/app/service/courseService";
import { getReport } from "@/app/service/reportService";
import Quiz from "./quiz";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { constructNow } from "date-fns";

export const CourseSidebar = async({courseId }) => {
 const cookieStore = await cookies();
  
  // Extract only the accessToken
  const accessToken = cookieStore.get('accessToken')?.value;
  const cookieHeader = accessToken ? `accessToken=${accessToken}` : '';
  const session = await getServerSession(authOptions)



    
    const course = await getCourseById(courseId);
   
      const report = await getReport( courseId,cookieHeader )
     

  const totalCompletedModules = report?.totalCompletedModules ? report?.totalCompletedModules.length : 0;

  const totalModules = course?.modules ? course.modules.length : 0;

  const totalProgress = (totalModules > 0) ? (totalCompletedModules/totalModules) * 100 : 0;
  

  const updatedModules = await Promise.all(
    course?.modules.map(async (module) => {
      const moduleId = module._id;
      const lessons = module?.lessonIds;

      const updatedLessons = await Promise.all(
        lessons.map(async (lesson) => {
          const lessonId = lesson._id;
      
          const watch = await getWatchByLessonAndModule(lessonId, moduleId,cookieHeader);
          if (watch?.state === 'completed') {
            lesson.state = 'completed';
          }
        
          return lesson;
        })
      );
      return module;
    })
  );
  
  const quizSet = course?.quizSet;
  const isQuizComplete = report?.quizAssessment ? true : false;

  return (
    <>
      <div className="h-full border-r flex flex-col overflow-y-auto shadow-sm">
        <div className="p-8 flex flex-col border-b">
          <h1 className="font-semibold">{course.title}</h1>
          {/* Check purchase */}
          {
            <div className="mt-10">
              <CourseProgress size={25} variant="success" value= {totalProgress}/>
            </div>
          }
        </div>
        
        <SidebarModules courseId ={courseId} modules ={updatedModules}/>
         <div className="w-full px-4 lg:px-14 pt-10 border-t">
          {
            quizSet && <Quiz courseId={courseId} quizSet={quizSet} isTaken={isQuizComplete} />
          }
          
        </div>

        <div className="w-full px-6">
        <GiveReview courseId={courseId} userId ={session?.user.id} />
        <DownloadCertificate courseId={courseId} totalProgress={totalProgress}/>
        </div> 



      </div>
      
    </>
  );
};
