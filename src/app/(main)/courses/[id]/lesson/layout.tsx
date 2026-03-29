import { CourseProgress } from "@/features/watch/components/course-progress";
import { cn } from "@/lib/utils";
import { PlayCircle } from "lucide-react";
import { Lock } from "lucide-react";
import { CheckCircle } from "lucide-react";
import { CourseSidebarMobile } from "@/features/watch/components/CourseSidebarMobile";
import { CourseSidebar } from "@/features/watch/components/CourseSidebar";
import { redirect } from "next/navigation";
import { getQueryClient } from "@/lib/getQueryClient";
import { getCourseById } from "@/features/courses/services/courseService";
import { getWatchByLessonAndModule } from "@/features/watch/services/watchService";
import { hasEnrollmentForCourse } from "@/features/enrollments/services/enrollmentService";




export default async function CourseLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  // const session = await getServerSession(authOptions);
  // if (!session?.user?.id) redirect('/login');



  //  const isEnrolled = await hasEnrollmentForCourse(id);
  // if (!isEnrolled) {
  //   redirect("/courses");
  // }



  return (
    <div className="">
      <div className="h-[80px] lg:pl-96 fixed top-[60px] inset-y-0 w-full z-10">
      <div className="flex lg:hidden p-4 border-b h-full items-center bg-white shadow-sm relative">
          {/* Course Sidebar For Mobile */}
          <CourseSidebarMobile courseId={id} />
          {/* <NavbarRoutes /> */}
        </div>
      </div>
     
      <div className="grid grid-cols-1 lg:grid-cols-12">
      <div className="hidden lg:flex h-full w-96 flex-col inset-y-0 z-50">
        {/* sidebar starts */}
        <CourseSidebar courseId={id}/>
        {/* sidebar ends */}
      </div>
      <main className="lg:pl-96 pt-[80px] lg:pt-[20px] h-full col-span-10 px-4">{children}</main>
      </div>
     
      
    </div>
  );
};

