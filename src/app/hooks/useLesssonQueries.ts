import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  createLesson,
  deleteLesson,
  getLessonById,
  updateLesson,
  getVideoUploadUrl,
  getVideoPlaybackUrl,
} from "../service/lessonService";

// Fetch a lesson by ID
export const useLessonById = (id: string) =>
  useQuery({
    queryKey: ["lesson", id],
    queryFn: () => getLessonById(id),
    enabled: !!id,
  });

// Create a new lesson
export const useCreateLesson = (moduleId: string) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: any) => createLesson(data, moduleId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["module", moduleId] });
    },
  });
};

// Update a lesson
export const useUpdateLesson = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: any }) =>
      
      updateLesson(id, data),
    onSuccess: (_, { id }) => {
      queryClient.invalidateQueries({ queryKey: ["lesson", id] });
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
