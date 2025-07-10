"use client";

import { Trash } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState } from "react";

import { toast } from "sonner";

import { useDeleteLesson, useUpdateLesson } from "@/app/hooks/useLesssonQueries";





interface Lesson {
  _id: string;
  active: boolean;
}

interface LessonActionsProps {
  lesson: Lesson;
  moduleId: string;
  // onDelete: () => void;
    onDelete: (id: string) => void;
}

export const LessonActions: React.FC<LessonActionsProps> = ({
  lesson,
  moduleId,
  onDelete,
}) => {
  const [published, setPublished] = useState<boolean>(lesson?.active);
  const [loading, setLoading] = useState<boolean>(false);
    const toggleMutation = useUpdateLesson();
    const deleteMutation = useDeleteLesson();


  const handleTogglePublish = async () => {
   
    setLoading(true);
    try {
      // const newState = await changeLessonPublishState(lesson.id);
       await toggleMutation.mutateAsync({
            id: lesson._id,
            data: { status: !published },
          });
 setPublished((prev) => !prev);
      toast.success("The lesson has been updated");
     
    } catch (e: any) {
      toast.error(e.message || "An error occurred");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async () => {
    if (published) {
      toast.error(
        "A published lesson cannot be deleted. First unpublish it, then delete."
      );
      return;
    }

    setLoading(true);
    try {
      // await deleteLesson(lesson.id, moduleId);
   await deleteMutation.mutateAsync({ id: lesson._id, moduleId });
      // onDelete();
      onDelete(lesson._id);
         toast.success("The lesson has been deleted");
         
    } catch (e: any) {
      toast.error(e.message || "An error occurred");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center gap-x-2">
      <Button
        variant="outline"
        size="sm"
        onClick={handleTogglePublish}
        disabled={loading}
      >
        {published ? "Unpublish" : "Publish"}
      </Button>

      <Button size="sm" onClick={handleDelete} disabled={loading}>
        <Trash className="h-4 w-4" />
      </Button>
    </div>
  );
};
