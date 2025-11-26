import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { getReport } from "../service/reportService";



export const useReport = (courseId: string) =>
  useQuery({
    queryKey: ["report"],
    queryFn: () => getReport(courseId),
    enabled: !!courseId
  });





