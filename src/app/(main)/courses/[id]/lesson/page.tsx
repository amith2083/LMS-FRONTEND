import { Separator } from "@/components/ui/separator";
import VideoDescription from "@/features/watch/components/VideoDescription";
import { getCourseById } from "@/features/courses/services/courseService";
import { getLessonBySlug } from "@/features/lessons/services/lessonService";
import { VideoPlayer } from "@/features/watch/components/VideoPlayer";
import { Lesson } from "@/features/lessons/types/lesson";
import type { Module } from "@/features/courses/types/course";

/** Module from API can have lessonIds populated as lesson objects with order */
type ModuleWithLessons = { _id: string; order?: number; lessonIds?: Array<{ _id: string; order?: number; title?: string; description?: string; videoKey?: string }> };

const Course = async ({
  params,
  searchParams,
}: {
  params: Promise<{ id: string }>;
  searchParams: Promise<{ name?: string; module?: string }>;
}) => {
  const { id } = await params;
  const { name, module: moduleParam } = await searchParams;

  const course = await getCourseById(id);
  if (!course) {
    return (
      <div className="text-center py-16 text-2xl text-muted-foreground">
        No course found.
      </div>
    );
  }

  const allModules = (course.modules ?? []).toSorted((a: Module, b: Module) => (a.order ?? 0) - (b.order ?? 0));
  const firstModule = allModules[0];
  const lessonIds = firstModule?.lessonIds as ModuleWithLessons["lessonIds"] | undefined;
  const defaultLesson = lessonIds?.length
    ? [...lessonIds].sort((a, b) => (a.order ?? 0) - (b.order ?? 0))[0]
    : undefined;

  const lessonToPlay: Lesson | undefined = name
    ? await getLessonBySlug(name)
    : defaultLesson
      ? {
          _id: defaultLesson._id,
          title: defaultLesson.title ?? "",
          description: defaultLesson.description ?? "",
          access: "free",
          active: true,
          videoKey: defaultLesson.videoKey,
        }
      : undefined;

  const defaultModule = moduleParam ?? firstModule?._id ?? "";

  if (!lessonToPlay) {
    return (
      <div className="text-center py-16 text-2xl text-muted-foreground">
        No lesson found.
      </div>
    );
  }

  return (
    <div>
      <div className="flex flex-col max-w-4xl mx-auto pb-20">
        <div className="p-4 w-full">
          <VideoPlayer
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

