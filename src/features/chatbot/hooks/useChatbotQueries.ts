import { getMessage } from "@/features/chatbot/services/chatbotService";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";




export const useGetMessage = () => {
  return useMutation({
    mutationFn: (message: string) => getMessage(message),
  });
};
