"use client";

import React from "react";
import { SignupForm } from "../_components/signup-form";
import { useParams } from "next/navigation";

interface PageProps {
  params: {
    role: string;
  };
}

const Page = () => {
  const params = useParams();
  const role = params?.role as string;

  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-gradient-to-br from-blue-50 via-white to-purple-50 px-4 py-12">
      <div className="w-full max-w-md">
        <SignupForm role={role} />
      </div>
    </div>
  );
};

export default Page;
