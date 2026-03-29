import { LoginForm } from "@/features/auth/components/LoginForm";
import { Suspense } from "react";

const LoginPage = () => {
  return (
    <div className="w-full flex-col h-screen flex items-center justify-center">
      <div className="container">
        <Suspense fallback={<div>Loading...</div>}>
          <LoginForm />
        </Suspense>
      </div>
    </div>
  );
};
export default LoginPage;
