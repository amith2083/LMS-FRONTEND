"use client";
import { CourseProgress } from "@/components/course-progress";
import { SidebarModules } from "./sidebar-modules";
import { GiveReview } from "./give-review";
import { DownloadCertificate } from "./download-certificate";
import Quiz from "./quiz";
import { useReport } from "@/app/hooks/useReportQueries";
import { useCourseById } from "@/app/hooks/useCourseQueries";

export const CourseSidebar = ({ courseId }: { courseId: string }) => {
  const { data: course, isLoading: courseLoading } = useCourseById(courseId);
  const { data: report, isLoading: reportLoading } = useReport(courseId);

  if (courseLoading || reportLoading) {
    return <p className="p-4">Loading sidebar…</p>;
  }

  const totalCompletedModules = report?.totalCompletedModules?.length ?? 0;
  const totalModules = course?.modules?.length ?? 0;
  const totalProgress =
    totalModules > 0 ? (totalCompletedModules / totalModules) * 100 : 0;

  return (
    <div className="h-full border-r flex flex-col overflow-y-auto shadow-sm">
      <div className="p-8 border-b">
        <h1 className="font-semibold">{course.title}</h1>
        <div className="mt-10">
          <CourseProgress size={25} variant="success" value={totalProgress} />
        </div>
      </div>

      <SidebarModules courseId={courseId} modules={course.modules} />

      <div className="w-full px-4 lg:px-14 pt-10 border-t">
        {course.quizSet && (
          <Quiz
            courseId={courseId}
            quizSet={course.quizSet}
            isTaken={!!report?.quizAssessment}
          />
        )}
      </div>

      <div className="w-full px-6">
        <GiveReview courseId={courseId} />
        <DownloadCertificate
          courseId={courseId}
          totalProgress={totalProgress}
        />
      </div>
    </div>
  );
};
