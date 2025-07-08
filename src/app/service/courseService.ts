import axios, { AxiosError } from "axios";

const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL as string;

//  Get All Courses
export const getCourses = async () => {
  try {
    const response = await axios.get(`${BASE_URL}/api/courses`, {
      withCredentials: true,
    });
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
    const response = await axios.get(`${BASE_URL}/api/courses/${id}`, {
      withCredentials: true,
    });
    return response.data;
  } catch (error: any) {
    const axiosError = error as AxiosError<any>;
    const message =
      axiosError.response?.data?.message || "Failed to fetch course";
    throw new Error(message);
  }
};

//  Create New Course
export const createCourse = async (courseData: any) => {
    console.log('cousrsedata',courseData)
  try {
    const response = await axios.post(`${BASE_URL}/api/courses`, courseData, {
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
    const response = await axios.put(
      `${BASE_URL}/api/courses/${id}`,
      courseData,
      {
        headers: { "Content-Type": "application/json" },
        withCredentials: true,
      }
    );
    return response.data;
  } catch (error: any) {
    const axiosError = error as AxiosError<any>;
    const message =
      axiosError.response?.data?.message || "Failed to update course";
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

  const response = await axios.put(
    `${BASE_URL}/api/courses/${courseId}/image`,
    formData,
    {
      headers: {
        "Content-Type": "multipart/form-data",
      },
      withCredentials: true,
    }
  );

  return response.data;
};

//  Delete Course
export const deleteCourse = async (id: string) => {
  try {
    const response = await axios.delete(`${BASE_URL}/api/courses/${id}`, {
      withCredentials: true,
    });
    return response.data;
  } catch (error: any) {
    const axiosError = error as AxiosError<any>;
    const message =
      axiosError.response?.data?.message || "Failed to delete course";
    throw new Error(message);
  }
};
