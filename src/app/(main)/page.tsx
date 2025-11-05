
import { dehydrate, HydrationBoundary } from '@tanstack/react-query';
import { getQueryClient } from '@/lib/getQueryClient';
import HomePage from './_components/homepage';
import { getCategories } from "../service/categoryService";
import { getCourses } from "../service/courseService";


export default async function Page() {
  const queryClient = getQueryClient();

  await queryClient.prefetchQuery({
    queryKey: ['categories'],
    queryFn: getCategories,
  });

  await queryClient.prefetchQuery({
    queryKey: ['courses', { page: 1, limit: 8, sort: "newest" }],
    queryFn: () => getCourses({ page: 1, limit: 8, sort: "newest" }),
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <HomePage />
    </HydrationBoundary>
  );
}