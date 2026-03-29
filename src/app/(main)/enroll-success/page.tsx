"use client";
import { useSearchParams } from "next/navigation";

import { useEffect } from "react";
import Link from "next/link";
import { CircleCheck } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useConfirmEnrollment } from "@/features/enrollments/hooks/useEnrollmentQueries"; 
import { useUser } from "@/features/auth/context/UserContext";


import { Suspense } from "react";

function SuccessContent() {
  const searchParams = useSearchParams();
  const { user, loading } = useUser();

  const session_id = searchParams.get("session_id");
  const courseId = searchParams.get("courseId");


  useEffect(() => {
    if (!user && !loading) {
      window.location.href = "/login";
    }
  }, [user, loading]);

  if (loading) {
    return (
      <div className="flex h-screen items-center justify-center">
        Loading...
      </div>
    );
  }

  // Safety check
  if (!session_id || !courseId) {
    return (
      <div className="flex h-screen flex-col items-center justify-center gap-4">
        <h1 className="text-2xl font-bold text-red-600">
          Invalid Payment Link
        </h1>
        <p>Missing session ID or course ID.</p>
        <Button asChild>
          <Link href="/courses">Back to Courses</Link>
        </Button>
      </div>
    );
  }

  // 1. Confirm the enrollment (fires once on mount)
  const {
    mutate: confirm,
    data: enrollment,
    isPending,
    isSuccess: confirmed,
    error: confirmError,
  } = useConfirmEnrollment();

  useEffect(() => {
    if (session_id && !confirmed) {
      confirm(session_id);
    }
  }, [session_id, confirmed, confirm]);

  if (confirmError) {
    return (
      <div className="flex h-screen flex-col items-center justify-center gap-4 text-center">
        <h1 className="text-2xl font-bold text-red-600">
          Something went wrong
        </h1>
        <p>{confirmError?.message || "Please contact support."}</p>
        <Button asChild>
          <Link href="/courses">Back to Courses</Link>
        </Button>
      </div>
    );
  }

  if (isPending || !enrollment) {
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
          Congratulations, {enrollment.student.name}! 🎉
        </h1>

        <p className="text-lg md:text-xl">
          You are now successfully enrolled in
          <br />
          <strong className="text-sky-600">{enrollment.course.title}</strong>
        </p>

        <div className="flex flex-wrap justify-center gap-4">
          <Button asChild size="lg">
            <Link href="/courses">Browse More Courses</Link>
          </Button>

          <Button asChild variant="outline" size="lg">
            <Link href={`/courses/${enrollment.course._id}/lesson`}>
              Start Learning Now
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
}

export default function SuccessPage() {
  return (
    <Suspense fallback={<div className="flex h-screen items-center justify-center">Loading...</div>}>
      <SuccessContent />
    </Suspense>
  );
}

