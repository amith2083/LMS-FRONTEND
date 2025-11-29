import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createQuizAssessment } from "../service/assessment";
import { toast } from "sonner";



export const useCreateQuizAssessment = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ courseId, quizSetId, answers }: { 
      courseId: string; 
      quizSetId: string; 
      answers: Array<{ quizId: string; options: { option: string }[] }> 
    }) => createQuizAssessment(courseId, quizSetId, answers),

    onSuccess: () => {
  
      queryClient.invalidateQueries({ queryKey: ["report"] });
    },
    // onError: () => {
    //   toast.error("Failed to submit quiz");
    // },
  });
};

 
