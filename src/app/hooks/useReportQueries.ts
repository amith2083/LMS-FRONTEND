import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { getReport } from "../services/reportService";



export const useReport = (courseId: string) =>
  useQuery({
    queryKey: ["report",courseId],
    queryFn: () => getReport(courseId),
    enabled: !!courseId
  });





