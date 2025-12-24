import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createTestimonial } from "../services/testimonialService";




export const useCreateTestimonial = () => {
  const queryClient = useQueryClient();

   return useMutation({
     mutationFn: ({ courseId, values }: { courseId: string; values: any }) =>
       createTestimonial(courseId, values),
     onSuccess: () => {
       queryClient.invalidateQueries({ queryKey: ["module"] });
     },
   });
};