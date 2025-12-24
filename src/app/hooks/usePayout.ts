
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { getTotalEarningsForAdmin, getTotalEarningsForInstructor } from "../services/payoutService";


export const useTotalEarnings = (id:string) =>
  useQuery({
    queryKey: ["totalearnings"],
  queryFn: () => getTotalEarningsForInstructor(id),
    staleTime: 5 * 60 * 1000,
    throwOnError: true, // Bubble errors to boundary
  });

  export const useTotalEarningsForAdmin = () =>
  useQuery({
    queryKey: ["totalearningsForAdmin"],
  queryFn: () => getTotalEarningsForAdmin(),
    staleTime: 5 * 60 * 1000,
    throwOnError: true, // Bubble errors to boundary
  });
