import axiosInstance from "@/lib/axios";
import  { AxiosError } from "axios";
import { Course, RelatedCourse, SingleCourse, } from "../types/course";
import { handleApiError } from "@/helper/handleApiError";



// Get All Courses with filters
export const getCourses = async (params?: {
  search?: string;
  category?: string;
  price?: string;
  sort?: string;
  page?: number;
  limit?: number;
})=> {
  try {
    console.log("Axios is calling /api/courses with params:", params);
    const response = await axiosInstance.get("/api/courses", { params });


    return response.data;
  } catch (error) {
    handleApiError(error)
  }
};

//  Get Single Course by ID
export const getCourseById = async (id: string): Promise<SingleCourse> => {
  try {
    const response = await axiosInstance.get<SingleCourse>(`/api/courses/${id}`);
    return response.data;
  } catch (error) {
    handleApiError(error);
    throw error;
  }
};
export const getCoursesByInstructorId = async (instructorId: string) => {
  try {
    const response = await axiosInstance.get(`/api/courses/instructor/${instructorId}`);
    return response.data;
  } catch (error) {
   handleApiError(error)
  }
};

// Get Course for Admin by ID (status: true)
export const getCoursesForAdmin = async () => {
  try {
    const response = await axiosInstance.get('/api/courses/admin');
  
    return response.data;
  } catch (error) {
    handleApiError(error)
  }
};

export const getRelatedCourses = async (
  courseId: string
): Promise<RelatedCourse[]> => {
  try {
    const response = await axiosInstance.get<RelatedCourse[]>(
      `/api/courses/related/${courseId}`
    );
    return response.data;
  } catch (error) {
    handleApiError(error);
    throw error;
  }
};

//  Create New Course
export const createCourse = async (courseData: any) => {
  
  try {
    const response = await axiosInstance.post('/api/courses', courseData, {
      headers: { "Content-Type": "application/json" },
      withCredentials: true,
    });
    return response.data;
  } catch (error) {
    handleApiError(error)
  }
};

//  Update Course
export const updateCourse = async (id: string, courseData: any) => {
  try {
  const response = await axiosInstance.put(`/api/courses/${id}`, courseData, {
      headers: { "Content-Type": "application/json" },
    });
    return response.data;
  } catch (error) {
    handleApiError(error)
  }
};
//  Update only the course image
// export const updateCourseImage = async (courseId: string, imageUrl: string) => {
//   try {
//     const response = await axios.put(
//       `${BASE_URL}/api/courses/${courseId}`,
//       { thumbnail: imageUrl }, // assuming `thumbnail` is the field name in DB
//       {
//         headers: {
//           "Content-Type": "application/json",
//         },
//         withCredentials: true,
//       }
//     );
//     return response.data;
//   } catch (error: any) {
//     const axiosError = error as AxiosError<any>;
//     const message =
//       axiosError.response?.data?.message || "Failed to update course image";
//     throw new Error(message);
//   }
// };

export const updateCourseImage = async (courseId: string, file: File) => {
  try{
  const formData = new FormData();
  formData.append("image", file); // must match Multer config

 const response = await axiosInstance.put(`/api/courses/${courseId}/image`, formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });

  return response.data;
  }catch (error) {
    handleApiError(error)
  }
};

//  Delete Course
export const deleteCourse = async (id: string) => {
  try {
    const response = await axiosInstance.delete(`/api/courses/${id}`);
    return response.data;
  } catch (error) {
    handleApiError(error)
  }
};
