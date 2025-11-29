
import axiosInstance from "@/lib/axios";
import { AxiosError } from "axios";

export const createQuizAssessment = async (
  courseId: string,
  quizSetId: string,
  answers: { quizId: string; options: { option: string }[] }[]
) => {
    try{
      console.log('res', courseId,quizSetId,answers)
  const res = await axiosInstance.post(`/api/assessment/${courseId}/submit`, {
    quizSetId,
    answers,
  },{withCredentials:true});
  return res.data;
}catch (error) {
    const axiosError = error as AxiosError<any>;
    const message =
      axiosError.response?.data?.message ;
    throw new Error(message);
  }
};