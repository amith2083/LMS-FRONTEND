import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  getCourses,
  getCourseById,
  createCourse,
  updateCourse,
  deleteCourse,
  updateCourseImage,
} from "../service/courseService";
import { Coming_Soon } from "next/font/google";

// Fetch all courses
export const useCourses = () =>
  useQuery({
    queryKey: ["courses"],
    queryFn: getCourses,
    staleTime: 5 * 60 * 1000, // 5 minutes
  });

// Fetch a course by ID
export const useCourseById = (id: string) =>
  useQuery({
    queryKey: ["course", id],
    queryFn: () => getCourseById(id),
    enabled: !!id, // don't run if ID is falsy
  });

// Create a course
export const useCreateCourse = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createCourse,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["courses"] });
    },
  });
};

// Update a course
export const useUpdateCourse = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: any }) =>
      updateCourse(id, data),
    onSuccess: () => {
     queryClient.invalidateQueries({ queryKey: ["course"] }); 
    },
  });
};
//  update course image
export const useUpdateCourseImage = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ courseId, file }: { courseId: string; file:File }) =>
     
      updateCourseImage(courseId, file),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["course"] }); 
    },
  });
};

// Delete a course
export const useDeleteCourse = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteCourse,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["courses"] });
    },
  });
};
