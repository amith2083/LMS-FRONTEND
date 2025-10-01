'use client';
import { Trash } from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { useDeleteQuizFromQuizset } from "@/app/hooks/useQuizQueries";


export const QuizCardActions = ({ quiz, quizSetId }) => {
  const { mutateAsync, isPending } = useDeleteQuizFromQuizset();

  const handleDelete = async () => {
    try {
      await mutateAsync({ quizsetId: quizSetId, quizId: quiz.id });
      toast.success("Quiz has been deleted");
    } catch (error) {
      toast.error("Failed to delete quiz");
    }
  };

  return (
    <div className="flex gap-2">
      <Button
        className="text-destructive"
        variant="ghost"
        size="sm"
        onClick={handleDelete}
        disabled={isPending}
      >
        <Trash className="w-3 mr-1" />
      </Button>
    </div>
  );
};