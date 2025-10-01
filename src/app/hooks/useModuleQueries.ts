import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  getModuleById,
  createModule,
  updateModule,
  deleteModule,
} from "../service/moduleService";

// Get Module by ID
export const useModuleById = (id: string) =>
  useQuery({
    queryKey: ["module", id],
    queryFn: () => getModuleById(id),
    enabled: !!id,
  });

// Create Module
export const useCreateModule = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: createModule,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["course"] }); // Update course since module is part of it
    },
  });
};

// Update Module (including publish status)
export const useUpdateModule = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: any }) =>
      updateModule(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["module"] });
    },
  });
};

// Delete Module
export const useDeleteModule = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, courseId }: { id: string; courseId: string }) =>
      deleteModule(id, courseId),
    onMutate: async ({ id, courseId }) => {
      // Cancel any outgoing refetches to avoid overwriting the optimistic update
      await queryClient.cancelQueries({ queryKey: ["course", courseId] });

      // Snapshot the previous course data
      const previousCourse = queryClient.getQueryData(["course", courseId]);

      // Optimistically update the course by removing the deleted module
      queryClient.setQueryData(["course", courseId], (old: any) => {
        if (!old) return old;
        return {
          ...old,
          modules: old.modules.filter((module: any) => module._id !== id),
        };
      });

      // Return context with the previous course data for rollback
      return { previousCourse };
    },
    onError: (err, { courseId }, context) => {
      // Roll back to the previous course data on error
      queryClient.setQueryData(["course", courseId], context?.previousCourse);
    },
    onSettled: (_data, _error, { courseId }) => {
      // Invalidate the course query to ensure it syncs with the server
      queryClient.invalidateQueries({ queryKey: ["course", courseId] });
    },
  });
};
// export const useDeleteModule = () => {
//   const queryClient = useQueryClient();
//   return useMutation({
//     mutationFn: ({ id, courseId }: { id: string; courseId: string }) =>
      
//       deleteModule(id, courseId),
//     onSuccess: (_data, { courseId }) => {
   
//       queryClient.invalidateQueries({ queryKey: ["course", courseId] });
//         //  queryClient.invalidateQueries({ queryKey: ["module"] });
//     },
//   });
// };
