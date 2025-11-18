import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  getCourses,
  getCourseById,
  createCourse,
  updateCourse,
  deleteCourse,
  updateCourseImage,
  getCoursesByInstructorId,
  getCoursesForAdmin
} from "../service/courseService";
import { CoursesResponse } from "../types/course";

interface User {
  id: string;
  role: "admin" | "student" | "instructor";
  isVerified?: boolean;
  isBlocked?: boolean;
}
export const useCourses = (params?: {
  search?: string;
  category?: string;
  price?: string;
  sort?: string;
  page?: number;
  limit?: number;
}) => {
 

  return useQuery<CoursesResponse>({
    queryKey: ["courses", params],
    queryFn: () => getCourses(params),
    staleTime: 5 * 60 * 1000,
    keepPreviousData: true, // For smooth pagination/filtering
    throwOnError: true, // Bubble errors to boundary
  });
};

// Fetch all courses
// export const useCourses = () =>
//   useQuery({
//     queryKey: ["courses"],
//     queryFn: getCourses,
//     staleTime: 5 * 60 * 1000, // 5 minutes
//   });

// Fetch a course by ID
export const useCourseById = (id: string) =>
  useQuery({
    queryKey: ["course", id],
    queryFn: () => getCourseById(id),
    enabled: !!id, // don't run if ID is falsy
  });
  // New hook to get courses by instructor ID
export const useCoursesByInstructorId = (instructorId: string) =>
{
  console.log("Instructor ID in hook:", instructorId);

  return useQuery({
    
    queryKey: [ "instructor", instructorId],
      
    queryFn: () => getCoursesByInstructorId(instructorId),
    enabled: !!instructorId,
  });
}

// New hook to get course for admin by ID
export const useCoursesForAdmin = () =>
  useQuery({
    queryKey: [ "adminCourse", ],
    queryFn: () => getCoursesForAdmin(),
    
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
    mutationFn: ({ id, data }: { id: string; data: any }) =>{
  
      return updateCourse(id, data);
    },
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
