'use client';

import { useSearchParams } from 'next/navigation';
import { useSession } from 'next-auth/react';
import { useEffect } from 'react';
import Link from 'next/link';
import { CircleCheck } from 'lucide-react';
import { Button } from '@/components/ui/button';

import { useConfirmEnrollment } from '@/app/hooks/useEnrollmentQueries'; // adjust path
import { useCourseById } from '@/app/hooks/useCourseQueries';
import { useUserById } from '@/app/hooks/useUserQueries';

export default function SuccessPage() {
  const searchParams = useSearchParams();
  const { data: session, status } = useSession();

  const session_id = searchParams.get('session_id');
  const courseId = searchParams.get('courseId');

  // Redirect unauthenticated users early
  if (status === 'unauthenticated') {
    window.location.href = '/login';
    return null;
  }

  if (status === 'loading') {
    return <div className="flex h-screen items-center justify-center">Loading...</div>;
  }

  // Safety check
  if (!session_id || !courseId) {
    return (
      <div className="flex h-screen flex-col items-center justify-center gap-4">
        <h1 className="text-2xl font-bold text-red-600">Invalid Payment Link</h1>
        <p>Missing session ID or course ID.</p>
        <Button asChild>
          <Link href="/courses">Back to Courses</Link>
        </Button>
      </div>
    );
  }

  const userId = session?.user?.id as string;

  // 1. Confirm the enrollment (fires once on mount)
  const { mutate: confirm, isPending: confirming, isSuccess: confirmed, error: confirmError } = useConfirmEnrollment();

  useEffect(() => {
    if (session_id && !confirmed) {
      confirm(session_id);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [session_id]);

  // 2. Fetch course and user data
  const {
    data: course,
    isLoading: courseLoading,
    error: courseError,
  } = useCourseById(courseId);

  const {
    data: user,
    isLoading: userLoading,
    error: userError,
  } = useUserById(userId);

  const isLoading = confirming || courseLoading || userLoading;
  const hasError = confirmError || courseError || userError;

  if (hasError) {
    return (
      <div className="flex h-screen flex-col items-center justify-center gap-4 text-center">
        <h1 className="text-2xl font-bold text-red-600">Something went wrong</h1>
        <p>{(confirmError || courseError || userError)?.message || 'Please contact support.'}</p>
        <Button asChild>
          <Link href="/courses">Back to Courses</Link>
        </Button>
      </div>
    );
  }

  if (isLoading || !course || !user) {
    return (
      <div className="flex h-screen items-center justify-center">
        <div className="text-lg">Confirming your enrollment...</div>
      </div>
    );
  }

  return (
    <div className="flex h-full w-full flex-1 flex-col items-center justify-center">
      <div className="flex flex-col items-center gap-8 max-w-[600px] text-center px-4">
        <CircleCheck className="h-32 w-32 rounded-full bg-green-500 p-8 text-white" />

        <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold">
          Congratulations, <strong>{user.name || 'Student'}</strong>! 🎉
        </h1>

        <p className="text-lg md:text-xl">
          You are now successfully enrolled in
          <br />
          <strong className="text-sky-600">{course.title}</strong>
        </p>

        <div className="flex flex-wrap justify-center gap-4">
          <Button asChild size="lg">
            <Link href="/courses">Browse More Courses</Link>
          </Button>

          <Button asChild variant="outline" size="lg">
            <Link href={`/courses/${courseId}/lesson`}>
              Start Learning Now
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
}