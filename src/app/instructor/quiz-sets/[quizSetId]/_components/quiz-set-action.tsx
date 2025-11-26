"use client";

import { Trash } from "lucide-react";

import { Button } from "@/components/ui/button";
import { useState } from "react";
import { useRouter } from "next/navigation";

import { toast } from "sonner";
import {
  useDeleteQuizset,
  useTogglePublishQuizset,
} from "@/app/hooks/useQuizQueries";

export const QuizSetAction = ({ quizSetId, active }) => {

  const [published, setPublished] = useState(active);
  console.log('published',published)

  const router = useRouter();
  const { mutateAsync: toggleStatus, isPending: isToggling } =
    useTogglePublishQuizset();
  const { mutateAsync: deleteQuizset, isPending: isDeleting } =
    useDeleteQuizset();
  const handleToggle = async () => {
    try {
      await toggleStatus(quizSetId);
           setPublished((prev) => !prev);
           
      toast.success(`Quiz set ${active ? "unpublished" : "published"}`);
    } catch (error) {
      toast.error(
        `Failed to toggle quiz set status: ${error.message || "Unknown error"}`
      );
    }
  };

  const handleDelete = async () => {
    try {
      if (published) {
        toast.error(
          "A published quiz set cannot be deleted. Unpublish it first."
        );
        return;
      }
      await deleteQuizset(quizSetId);
      toast.success("Quiz set deleted");
      router.push("/instructor/quiz-sets");
    } catch (error) {
      toast.error("Failed to delete quiz set");
    }
  };

  return (
    <div className="flex items-center gap-x-2">
      <Button
        variant="outline"
        size="sm"
        onClick={handleToggle}
        disabled={isToggling || isDeleting}
      >
        {active ? "Unpublish" : "Publish"}
      </Button>
      <Button
        size="sm"
        onClick={handleDelete}
        disabled={isToggling || isDeleting}
      >
        <Trash className="h-4 w-4" />
      </Button>
    </div>
  );
};
