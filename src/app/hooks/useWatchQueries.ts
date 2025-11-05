import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { getWatchByLessonAndModule } from "../service/watchService";


export const useWatchByLessonAndModule = (
  lessonId: string,
  moduleId: string
) => {
  return useQuery({
    queryKey: ["watch", lessonId, moduleId],
    queryFn: () => getWatchByLessonAndModule(lessonId, moduleId),
    enabled: !!lessonId && !!moduleId, // only run if both exist
    staleTime: 5 * 60 * 1000,
  });
};


