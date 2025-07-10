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
    onSuccess: (_data, { courseId }) => {
      // queryClient.invalidateQueries({ queryKey: ["module"] });
      queryClient.invalidateQueries({ queryKey: ["course", courseId] });
    },
  });
};
