"use client";
import React, { useEffect, useState } from "react";
import { Button, buttonVariants } from "@/components/ui/button";
import { Session } from "next-auth";
import { ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useCreateEnrollment } from "@/app/hooks/useEnrollmentQueries";
import { toast } from "sonner";

const EnrollCourse = ({ asLink, courseId }) => {
  const { data: session, status } = useSession();

  const { mutateAsync, isPending } = useCreateEnrollment();
  const router = useRouter();

  const handleEnroll = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!session) {
      router.push("/login");
      return;
    }

    try {
      const enrollmentData = { course: courseId, method: "stripe" };
      const result = await mutateAsync(enrollmentData);

      if (result.sessionUrl) {
        window.location.assign(result.sessionUrl);
      } else {

        router.push(`/courses/${courseId}/success`); 
      }
    } catch (error: any) {
      toast.error(error?.message || "Failed to enroll in the course.");
    }
  };

  return (
    <form onSubmit={handleEnroll}>
      {asLink ? (
        <Button
          type="submit"
          variant="ghost"
          className="text-xs text-sky-700 h-7 gap-1"
          disabled={isPending}
        >
          {isPending ? "Processing..." : "Enroll"}
          <ArrowRight className="w-3" />
        </Button>
      ) : (
        <Button
          type="submit"
          className={cn(buttonVariants({ size: "lg" }))}
          disabled={isPending} // Changed from isLoading to isPending
        >
          {isPending ? "Processing..." : "Enroll Now"}
        </Button>
      )}
    </form>
  );
};

export default EnrollCourse;
