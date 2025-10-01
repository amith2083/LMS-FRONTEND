import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { getUserById, getUsers, updateUser } from "../service/userService";

// import { useSession } from "next-auth/react";
interface User {
  id: string;
  role: "admin" | "student" | "instructor";
  isVerified?: boolean;
  isBlocked?: boolean;
}
export const useUsers = () => {
  // const { data: session, status } = useSession();
  // const user = session?.user as User | undefined;

  return useQuery({
    queryKey: ["users"],
    queryFn: getUsers,
    staleTime: 5 * 60 * 1000,
    // enabled: status === "authenticated" && !!user,
  });
};

export const useUserById = (id: string) =>
  useQuery({
    queryKey: ["user", id],
    queryFn: () => getUserById(id),
    enabled: !!id,
  });

export const useUpdateUser = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: any }) => {
      return updateUser(id, data);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["user"] }); 
    },
  });
};