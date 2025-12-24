import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";

import {getQuizsets,
  getQuizsetById,
  createQuizset,
  updateQuizset,
  deleteQuizset,
  addQuizToQuizset,
  deleteQuizFromQuizset,togglePublishQuizset } from "../services/quizsetService";

export const useQuizsets = () => {
  return useQuery({
    queryKey: ["quizsets"],
    queryFn: getQuizsets,
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
};

export const useQuizsetById = (id: string) =>
  useQuery({
    queryKey: ["quizset", id],
    queryFn: () => getQuizsetById(id),
    enabled: !!id, // don't run if ID is falsy
  });

export const useCreateQuizset = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (quizsetData: any) => createQuizset(quizsetData),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["quizsets"] });
    },
  });
};

export const useUpdateQuizset = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: any }) => updateQuizset(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["quizset"] });
    },
  });
};

export const useDeleteQuizset = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => deleteQuizset(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["quizsets"] });
    },
  });
};

export const useAddQuizToQuizset = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ quizsetId, quizData }: { quizsetId: string; quizData: any }) =>{
   
      return addQuizToQuizset(quizsetId, quizData)
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["quizset"] });
    },
  });
};

export const useDeleteQuizFromQuizset = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ quizsetId, quizId }: { quizsetId: string; quizId: string }) =>
      deleteQuizFromQuizset(quizsetId, quizId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["quizset"] });
    },
  });
};

export const useTogglePublishQuizset = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (quizsetId: string) => togglePublishQuizset(quizsetId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["quizset"] });
    },
  });
};