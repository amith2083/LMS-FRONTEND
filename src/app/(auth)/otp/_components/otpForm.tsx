'use client'

import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { resendOtp, verifyOtp } from "@/app/service/authService";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";

export const OtpForm = () => {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isOtpExpired, setIsOtpExpired] = useState(false);
  const [timer, setTimer] = useState(60);
  const [otpArray, setOtpArray] = useState<string[]>(["", "", "", "", "", ""]);
  const inputRefs = useRef<Array<HTMLInputElement | null>>([]);

  const router = useRouter();

  // Start or resume timer
  useEffect(() => {
    const storedEmail = localStorage.getItem("otpEmail");
    if (storedEmail) setEmail(storedEmail);

    const expiryTime = localStorage.getItem("otpExpiryTime");
    if (expiryTime) {
      const remaining = Math.floor((+expiryTime - Date.now()) / 1000);
      if (remaining > 0) {
        startOtpTimer(remaining);
      } else {
        setIsOtpExpired(true);
        setTimer(0);
        localStorage.removeItem("otpExpiryTime");
      }
    }
  }, []);

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (timer > 0) {
      interval = setInterval(() => {
        setTimer((prev) => {
          if (prev <= 1) {
            clearInterval(interval);
            setIsOtpExpired(true);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [timer]);

  const startOtpTimer = (durationSeconds: number) => {
    const expiry = Date.now() + durationSeconds * 1000;
    localStorage.setItem("otpExpiryTime", expiry.toString());
    setTimer(durationSeconds);
    setIsOtpExpired(false);
  };

  const handleOtpChange = (index: number, value: string) => {
    if (!/^\d?$/.test(value)) return;

    const newOtp = [...otpArray];
    newOtp[index] = value;
    setOtpArray(newOtp);

    if (value && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Backspace" && !otpArray[index] && index > 0) {
      const newOtp = [...otpArray];
      newOtp[index - 1] = "";
      setOtpArray(newOtp);
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handleVerify = async () => {
    setIsLoading(true);
    setError("");

    const joinedOtp = otpArray.join("");
    if (!/^\d{6}$/.test(joinedOtp)) {
      setError("Please enter a valid 6-digit OTP");
      setIsLoading(false);
      return;
    }
const combinedOtp = parseInt(joinedOtp, 10);
    try {
      const response = await verifyOtp(email, combinedOtp);
      if (response.success) {
        localStorage.removeItem("otpEmail");
        localStorage.removeItem("otpExpiryTime");
        toast.success("Account created successfully!");
        router.push("/login");
        return;
      }
    } catch (error: any) {
      setError(error.message || "Verification failed.");
      if (error.message?.toLowerCase().includes("expired")) {
        setIsOtpExpired(true);
        setTimer(0);
        localStorage.removeItem("otpExpiryTime");
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handleResendOtp = async () => {
    setError("");
    setIsOtpExpired(false);
    setOtpArray(["", "", "", "", "", ""]);
    startOtpTimer(60);
try{
    const response = await resendOtp(email)

    if (response.status === 200) {
      toast.success("OTP resent successfully. Please check your email.");
      return;
    } 
  }catch (error:any){
     
      setError(error.message || "Failed to resend OTP.");
    }
  };

  return (
    <Card className="mx-auto max-w-sm w-full">
      <CardHeader>
        <CardTitle className="text-2xl text-center">
          <p className="mt-5 text-3xl font-bold leading-tight text-gray-900 sm:text-5xl lg:text-3xl font-pj">
            <span className="relative inline-flex">
              <span className="bg-gradient-to-r from-[#44BCFF] via-[#FF44EC] to-[#FF675E] blur-lg filter opacity-30 w-full h-full absolute inset-0"></span>
              <span className="relative">OTP Verification</span>
            </span>
          </p>
        </CardTitle>
        <CardDescription className="text-center">
          Enter the 6-digit code sent to your email
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid gap-4">
          <div className="flex justify-center gap-2">
            {otpArray.map((digit, idx) => (
              <Input
  key={idx}
  type="text"
  inputMode="numeric"
  maxLength={1}
  className="w-10 h-12 text-center text-xl"
  value={digit}
  onChange={(e) => handleOtpChange(idx, e.target.value)}
  onKeyDown={(e) => handleKeyDown(idx, e)}
  ref={(el) => {
    inputRefs.current[idx] = el;
  }}
/>
            ))}
          </div>

          {error && (
            <p className="text-sm text-center text-red-500">{error}</p>
          )}

          {!isOtpExpired ? (
            <p className="text-sm text-gray-600 text-center">
              Resend OTP in {String(Math.floor(timer / 60)).padStart(2, "0")}:
              {String(timer % 60).padStart(2, "0")}
            </p>
          ) : (
            <Button
              className="w-full mt-4 bg-red-500"
              onClick={handleResendOtp}
            >
              Resend OTP
            </Button>
          )}

          <Button
            onClick={handleVerify}
            disabled={isLoading}
            className="w-full"
            variant="black"
          >
            {isLoading ? "Verifying..." : "Submit"}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};
