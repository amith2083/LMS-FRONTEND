import { SidebarLessonItem } from "./SidebarLessonItems";
import { AccordionContent } from "@/components/ui/accordion";
import { Lesson } from "@/features/lessons/types/lesson";

export const SidebarLessons = ({
  courseId,
  lessons,
  module,
}: {
  courseId: string;
  lessons: Lesson[];
  module: string;
}) => {
const allLessons = (lessons).toSorted((a,b) => a.order - b.order);

    return (
        <AccordionContent>
            <div className="flex flex-col w-full gap-3">
    
              {
              allLessons.map((lesson) => (
                <SidebarLessonItem key={lesson._id} courseId={courseId} lesson={lesson} module={module}/> 
              ))
            }

            </div>
          </AccordionContent>
    )
    
}