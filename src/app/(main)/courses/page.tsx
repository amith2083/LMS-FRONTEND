
import { dehydrate, HydrationBoundary } from '@tanstack/react-query';
import { getQueryClient } from '@/lib/getQueryClient';
import CoursesPage from './_components/CoursesPage';
import { getCategories } from '@/app/services/categoryService';
import { getCourses } from '@/app/services/courseService';



export default async function CoursesPageWrapper() {
  const queryClient = getQueryClient();


  await queryClient.prefetchQuery({
    queryKey: ['categories'],
    queryFn: getCategories,
  });

  await queryClient.prefetchQuery({
    queryKey: ['courses', { page: 1, limit: 6, search: '', category: '', price: '', sort: '' }],
    queryFn: () => getCourses({ page: 1, limit: 6, search: '', category: '', price: '', sort: '' }),
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <CoursesPage />
    </HydrationBoundary>
  );
}