import { redirect } from "next/navigation";
import { CircleCheck } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import axiosInstance from "@/lib/axios";

import { headers } from "next/headers"; // Add this import
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

const Success = async ({ searchParams }: { searchParams: { session_id?: string; courseId?: string } }) => {
  const { session_id, courseId } = searchParams;
  console.log('id=', session_id, courseId);

  if (!session_id || !courseId) {
    throw new Error("Missing session_id or courseId");
  }

  const session = await getServerSession(authOptions); // This works fine for session check
  console.log('session', session);
  if (!session?.user?.id) {
    redirect("/login");
  }

  let enrollment;
  let course;
  let user;
  let errorMessage: string | null = null;

  try {
    const cookie = (await headers()).get('cookie'); // Get client's cookies
    console.log('cookie',cookie)

    // Call backend to confirm enrollment (creates in DB and sends emails)
    const response = await axiosInstance.post("/api/enrollments/confirm", { session_id }, {
      headers: {
        "Content-Type": "application/json",
        "Cookie": cookie || '', // Forward cookies for auth
      },
      withCredentials: true, // Keep this, though Cookie header is key
    });
    enrollment = response.data;
    console.log('enrollment', enrollment);

    // Fetch course and user (server-side) - also forward cookies
    const courseResponse = await axiosInstance.get(`/api/courses/${courseId}`, {
      headers: {
        "Cookie": cookie || '',
      },
      withCredentials: true,
    });
    course = courseResponse.data;
    console.log('course', course);

    const userResponse = await axiosInstance.get(`/api/users/${session.user.id}`, {
      headers: {
        "Cookie": cookie || '',
      },
      withCredentials: true,
    });
    user = userResponse.data;
    console.log('user', user);
  } catch (error: any) {
    errorMessage = error.response?.data?.message || "Enrollment confirmation failed. Please contact support.";
    console.log(errorMessage);
  }

  if (errorMessage) {
    return <div>Error: {errorMessage}</div>;
  }

  const customerName = user?.name || "User";
  const productName = course?.title || "Course";

  return (
    <div className="h-full w-full flex-1 flex flex-col items-center justify-center">
      <div className="flex flex-col items-center gap-6 max-w-[600px] text-center">
        <CircleCheck className="w-32 h-32 bg-green-500 rounded-full p-0 text-white" />
        <h1 className="text-xl md:text-2xl lg:text-3xl">
          Congratulations! <strong>{customerName}</strong> Your Enrollment was Successful for <strong>{productName}</strong>
        </h1>
        <div className="flex items-center gap-3">
          <Button asChild size="sm">
            <Link href="/courses">Browse Courses</Link>
          </Button>
          <Button asChild variant='outline' size="sm">
            <Link href={`/courses/${courseId}/lesson`}>Play Course</Link>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Success;