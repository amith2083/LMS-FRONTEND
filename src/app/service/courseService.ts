import axiosInstance from "@/lib/axios";
import  { AxiosError } from "axios";
import { CoursesResponse } from "../types/course";



// Get All Courses with filters
export const getCourses = async (params?: {
  search?: string;
  category?: string;
  price?: string;
  sort?: string;
  page?: number;
  limit?: number;
}): Promise<CoursesResponse> => {
  try {
    const response = await axiosInstance.get("/api/courses", { params });
    console.log('res',response.data)

    return response.data;
  } catch (error: any) {
    const axiosError = error as AxiosError<any>;
    const message =
      axiosError.response?.data?.message || "Failed to fetch courses";
    throw new Error(message);
  }
};

//  Get Single Course by ID
export const getCourseById = async (id: string) => {
  try {
   const response = await axiosInstance.get(`/api/courses/${id}`);
    return response.data;
  } catch (error: any) {
    const axiosError = error as AxiosError<any>;
    const message =
      axiosError.response?.data?.message || "Failed to fetch course";
    throw new Error(message);
  }
};
export const getCoursesByInstructorId = async (instructorId: string) => {
  try {
    const response = await axiosInstance.get(`/api/courses/instructor/${instructorId}`);
    return response.data;
  } catch (error: any) {
    const axiosError = error as AxiosError<any>;
    const message = axiosError.response?.data?.message || "Failed to fetch instructor courses";
    throw new Error(message);
  }
};

// Get Course for Admin by ID (status: true)
export const getCoursesForAdmin = async () => {
  try {
    const response = await axiosInstance.get('/api/courses/admin');
    console.log('res',response.data)
    return response.data;
  } catch (error: any) {
    const axiosError = error as AxiosError<any>;
    const message = axiosError.response?.data?.message || "Failed to fetch course for admin";
    throw new Error(message);
  }
};

//  Create New Course
export const createCourse = async (courseData: any) => {
    console.log('cousrsedata',courseData)
  try {
    const response = await axiosInstance.post('/api/courses', courseData, {
      headers: { "Content-Type": "application/json" },
      withCredentials: true,
    });
    return response;
  } catch (error: any) {
    const axiosError = error as AxiosError<any>;
    const message =
      axiosError.response?.data?.message || "Failed to create course";
    throw new Error(message);
  }
};

//  Update Course
export const updateCourse = async (id: string, courseData: any) => {
  try {
  const response = await axiosInstance.put(`/api/courses/${id}`, courseData, {
      headers: { "Content-Type": "application/json" },
    });
    return response.data;
  } catch (error: any) {
    const axiosError = error as AxiosError<any>;
    const message = axiosError.response?.data?.message || "Failed to update course";
    throw new Error(message);
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
  const formData = new FormData();
  formData.append("image", file); // must match Multer config

 const response = await axiosInstance.put(`/api/courses/${courseId}/image`, formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });

  return response.data;
};

//  Delete Course
export const deleteCourse = async (id: string) => {
  try {
    const response = await axiosInstance.delete(`/api/courses/${id}`);
    return response.data;
  } catch (error: any) {
    const axiosError = error as AxiosError<any>;
    const message =
      axiosError.response?.data?.message || "Failed to delete course";
    throw new Error(message);
  }
};
