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


const EnrollCourse = ({ asLink, courseId}) => {
const { data: session, status } = useSession();
 const [loginSession, setLoginSession] = useState<Session | null>(null);
  useEffect(() => {
    setLoginSession(session);
  }, [session]);
   const createEnrollmentMutation = useCreateEnrollment();
  const router = useRouter();





 

  const handleEnroll = async (e: React.FormEvent) => {
     e.preventDefault();
  

   
    if (!loginSession) {
      router.push("/login");
      return;
    }
    
  

    try {
      const enrollmentData = { course: courseId, method: 'stripe' }; // Adjust if more fields needed
      const result = await createEnrollmentMutation.mutateAsync(enrollmentData);
    
      if (result.sessionUrl) {
        window.location.assign(result.sessionUrl);
      } else {
        // Handle free enrollment success (e.g., toast or redirect)
        router.push(`/courses/${courseId}/success`); // Example
      }
    } catch (error) {
      console.error("Enrollment error:", error);
      // Handle error (e.g., toast)
      if (error.message === "User is already enrolled in this course") {
        toast.error("You are already enrolled in this course.");
      } else {
        toast.error(error.message || "Failed to enroll in the course.");
      }
    }
  };

  return (
   <form onSubmit={handleEnroll}>
      {asLink ? (
        <Button
          type="submit"
          variant="ghost"
          className="text-xs text-sky-700 h-7 gap-1"
          disabled={createEnrollmentMutation.isPending} // Changed from isLoading to isPending
        >
          {createEnrollmentMutation.isPending ? "Processing..." : "Enroll"} 
          <ArrowRight className="w-3" />
        </Button>
      ) : (
        <Button
          type="submit"
          className={cn(buttonVariants({ size: "lg" }))}
          disabled={createEnrollmentMutation.isPending} // Changed from isLoading to isPending
        >
          {createEnrollmentMutation.isPending ? "Processing..." : "Enroll Now"} 
        </Button>
      )}
    </form>
  );
};

export default EnrollCourse;