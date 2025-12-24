import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { createWatch, getWatchByLessonAndModule } from "../services/watchService";

type CreateWatchVariables = {
  courseId: string;
  lessonId: string;
  moduleId: string;
  state: "started" | "completed";
  lastTime: number;
};
export const useWatchByLessonAndModule = (
  lessonId:string,
  moduleId:string
) => {
  return useQuery({
    queryKey: ["watch", lessonId, moduleId],
    queryFn: () => getWatchByLessonAndModule(lessonId, moduleId),
    enabled: !!lessonId && !!moduleId, // only run if both exist
    staleTime: 5 * 60 * 1000,
  });
};


export const useCreateWatch = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      courseId,
      lessonId,
      moduleId,
      state,
      lastTime,
    }: CreateWatchVariables) =>
    
      createWatch(courseId, lessonId, moduleId, state, lastTime),
      

 
    onSuccess: (_data, variables) => {
      const { lessonId, moduleId } = variables;
      queryClient.invalidateQueries({
        queryKey: ["watch", lessonId, moduleId],
      });
      // If you also have a list of watches for the whole course you can invalidate it too:
      // queryClient.invalidateQueries({ queryKey: ["watches", courseId] });
    },

   
  });
}