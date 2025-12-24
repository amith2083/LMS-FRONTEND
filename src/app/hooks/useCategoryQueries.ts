
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  getCategories,
  getCategoryById,
  createCategory,
  updateCategory,
  deleteCategory,
  toggleCategoryPublishState,
  updateCategoryImage,
} from "../services/categoryService";

// Fetch all categories
export const useCategories = () =>
  useQuery({
    queryKey: ["categories"],
    queryFn: getCategories,
    staleTime: 5 * 60 * 1000,
    throwOnError: true, // Bubble errors to boundary
  });

// Fetch single category
export const useCategoryById = (id: string) =>
  useQuery({
    queryKey: ["category", id],
    queryFn: () => getCategoryById(id),
    enabled: !!id,
  });

// Create category
export const useCreateCategory = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: createCategory,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["categories"] });
    },
  });
};

// Update category
export const useUpdateCategory = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: any }) => updateCategory(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["category"] });
    },
  });
};
//  update category image
export const useUpdateCategoryImage = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ categoryId, file }: { categoryId: string; file:File }) =>
     
      updateCategoryImage(categoryId, file),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["category"] }); 
    },
  });
};

// Delete category
export const useDeleteCategory = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: deleteCategory,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["categories"] });
    },
  });
};

// Toggle publish state
export const useTogglePublishCategory = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: toggleCategoryPublishState,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["categories"] });
    },
  });
};
