
import React from 'react'
import { OtpForm } from "@/features/auth/components/otp-form";

const OtpPage = () => {
  return (
    <div className="w-full flex-col h-screen flex items-center justify-center">
         <div className="container">
          <OtpForm/>
         </div>
       </div>
  )
}

export default OtpPage

