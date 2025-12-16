
import { XCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function PaymentFailed({ searchParams }: { searchParams: { courseId?: string } }) {
  const courseId = searchParams.courseId;

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <div className="max-w-md w-full text-center space-y-8">
        <div className="flex justify-center">
          <XCircle className="w-24 h-24 text-red-500" />
        </div>

        <div>
          <h1 className="text-3xl font-bold text-gray-900">Payment Failed</h1>
          <p className="mt-4 text-lg text-gray-600">
            Don't worry — no money was charged.
          </p>
          <p className="mt-2 text-gray-500">
            Your card was declined or you canceled the payment.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button asChild size="lg">
            <Link href={courseId ? `/courses/${courseId}` : "/courses"}>
              Try Again
            </Link>
          </Button>
          <Button asChild variant="outline" size="lg">
            <Link href="/courses">Browse All Courses</Link>
          </Button>
        </div>

        <p className="text-sm text-gray-500 mt-8">
          Need help? Contact support at{" "}
          <a href="mailto:support@skillseed.com" className="text-primary font-medium">
            support@skillseed.com
          </a>
        </p>
      </div>
    </div>
  );
}