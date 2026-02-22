import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { getMessage } from "../services/chatbotService";



export const useGetMessage = () => {
  return useMutation({
    mutationFn: (message: string) => getMessage(message),
  });
};