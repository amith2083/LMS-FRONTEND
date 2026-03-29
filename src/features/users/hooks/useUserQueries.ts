import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { getUserById, getUsers, updateUser, updateUserImage } from "../services/userService";


interface User {
  id: string;
  role: "admin" | "student" | "instructor";
  isVerified?: boolean;
  isBlocked?: boolean;
}
export const useUsers = () => {


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
    onSuccess: (updatedUser,variables) => {
      const id = variables.id
      queryClient.invalidateQueries({ queryKey: ["user",id] }); 
     
     // Update users list cache
      queryClient.setQueryData(["users"], (old: any = []) =>
        old.map((c: any) => (c._id === updatedUser._id ? updatedUser : c))
      );
    },
  });
};

export const useUpdateUserImage = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, file }: { id: string; file: File }) => {
      return updateUserImage(id, file);
    },
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ["user", variables.id] });
      queryClient.invalidateQueries({ queryKey: ["users"] });
    },
  });
};
