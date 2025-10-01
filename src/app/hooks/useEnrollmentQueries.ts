
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  getEnrollments,
  getEnrollmentById,
  getEnrollmentsForCourse,
  getEnrollmentsForUser,
  createEnrollment,
  confirmEnrollment,


} from "../service/enrollmentService";
import { IEnrollment } from "../interfaces/enrollment/IEnrollment";

// Fetch all enrollments (e.g., for admin)
export const useEnrollments = () => {
  return useQuery({
    queryKey: ["enrollments"],
    queryFn: getEnrollments,
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
};

// Fetch an enrollment by ID
export const useEnrollmentById = (id: string) => {
  return useQuery({
    queryKey: ["enrollment", id],
    queryFn: () => getEnrollmentById(id),
    enabled: !!id, // Don't run if ID is falsy
  });
};

// Fetch enrollments for a course
export const useEnrollmentsForCourse = (courseId: string) => {
  return useQuery({
    queryKey: ["enrollments", "course", courseId],
    queryFn: () => getEnrollmentsForCourse(courseId),
    enabled: !!courseId, // Don't run if courseId is falsy
  });
};

// Fetch enrollments for the authenticated user
export const useEnrollmentsForUser = () => {
  return useQuery({
    queryKey: ["enrollments", "user"],
    queryFn: getEnrollmentsForUser,
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
};

// Create an enrollment
export const useCreateEnrollment = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createEnrollment,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["enrollments"] });
      queryClient.invalidateQueries({ queryKey: ["enrollments", "user"] });
    },
  });
};
export const useConfirmEnrollment = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: confirmEnrollment,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["enrollments"] });
      queryClient.invalidateQueries({ queryKey: ["enrollments", "user"] });
    },
  });
};




