import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  createLesson,
  deleteLesson,
  getLessonById,
  updateLesson,
  getVideoUploadUrl,
  getVideoPlaybackUrl,
} from "../services/lessonService";
interface CreateLessonVariables {
  data: {
    title: string;
    order?: number;
  };
  moduleId: string;
}

// Fetch a lesson by ID
export const useLessonById = (id: string) =>
  useQuery({
    queryKey: ["lesson", id],
    queryFn: () => getLessonById(id),
    enabled: !!id,
  });

// Create a new lesson
export const useCreateLesson = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ data, moduleId }:CreateLessonVariables) => createLesson(data, moduleId),
    onSuccess: (newLesson, variables) => {
      const{moduleId}= variables
      queryClient.invalidateQueries({ queryKey: ["module",moduleId] });
    },
  });
};

// Update a lesson
export const useUpdateLesson = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, data,moduleId }: { id: string; data: any,moduleId:string }) =>
      
      updateLesson(id, data),
    onSuccess: (updatedLesson, variables) => {
      const { id, moduleId, } = variables;
     
      queryClient.invalidateQueries({ queryKey: ["lesson", id] });
      // 2. Invalidate the exact module that owns this lesson
      if (moduleId) {
        queryClient.invalidateQueries({
          queryKey: ["module", moduleId],
        });
      }
    },
  });
};

// Delete a lesson
export const useDeleteLesson = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, moduleId }: { id: string; moduleId: string }) =>
      deleteLesson(id, moduleId),
    onSuccess: (_, { moduleId }) => {
      queryClient.invalidateQueries({ queryKey: ["module", moduleId] });
    },
  });
};


// Get signed upload URL
export const useUploadSignedUrl = () =>
  useMutation({
    mutationFn: ({
      fileName,
      fileType,
    }: {
      fileName: string;
      fileType: string;
    }) => getVideoUploadUrl(fileName, fileType),
  });

// Get signed playback URL
export const usePlaybackSignedUrl = () =>
  useMutation({
    mutationFn: ({ key }: { key: string }) => getVideoPlaybackUrl(key),
  });
