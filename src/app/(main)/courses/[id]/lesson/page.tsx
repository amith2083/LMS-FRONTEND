import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import VideoDescription from "./_components/video-description";
import { getCourseById } from "@/app/services/courseService";
import { getLessonBySlug } from "@/app/services/lessonService";
import { LessonVideo } from "./_components/lesson-video";

const Course = async ({
  params,
  searchParams,
}: {
  params: { id: string };
  searchParams: { name?: string; module?: string };
}) => {
  const { id } = params;
  const { name, module } = searchParams;
  const course = await getCourseById(id);
  const allModules = course.modules.toSorted((a, b) => a.order - b.order);

  const defaultLesson = allModules[0]?.lessonIds?.toSorted(
    (a, b) => a.order - b.order,
  )[0];

  const lessonToPlay = name ? await getLessonBySlug(name) : defaultLesson;
  

  const defaultModule = module ?? allModules[0]._id;
  return (
    <div>
      <div className="flex flex-col max-w-4xl mx-auto pb-20">
        <div className="p-4 w-full">
          <LessonVideo
            courseId={id}
            lesson={lessonToPlay}
            moduleId={defaultModule}
          />
        </div>
        <div>
          <div className="p-4 flex flex-col md:flex-row items-center justify-between">
            <h2 className="text-2xl font-semibold mb-2">
              {lessonToPlay.title}
            </h2>
          </div>
          <Separator />
          <VideoDescription description={lessonToPlay.description} />
        </div>
      </div>
    </div>
  );
};
export default Course;
