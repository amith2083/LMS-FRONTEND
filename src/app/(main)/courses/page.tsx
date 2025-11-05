
import { dehydrate, HydrationBoundary } from '@tanstack/react-query';
import { getQueryClient } from '@/lib/getQueryClient';
import CoursesPage from './_components/CoursesPage';
import { getCategories } from '@/app/service/categoryService';
import { getCourses } from '@/app/service/courseService';



export default async function CoursesPageWrapper() {
  const queryClient = getQueryClient();

  // Prefetch initial data (page 1, no filters)
  await queryClient.prefetchQuery({
    queryKey: ['categories'],
    queryFn: getCategories,
  });

  await queryClient.prefetchQuery({
    queryKey: ['courses', { page: 1, limit: 9, search: '', categories: [], price: [], sort: '' }],
    queryFn: () => getCourses({ page: 1, limit: 9, search: '', categories: [], price: [], sort: '' }),
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <CoursesPage />
    </HydrationBoundary>
  );
}