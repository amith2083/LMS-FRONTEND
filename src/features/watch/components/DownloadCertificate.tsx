'use client'
import { Button } from "@/components/ui/button";
import axiosInstance from "@/lib/axios";
import { useState } from "react";
import { toast } from "sonner";

interface Props {
  courseId: string;
  totalProgress: number;
}
export const DownloadCertificate = ({courseId,totalProgress}:Props) => {

    const [isCertificateDownloading,setIsCertificateDownloading] = useState(false);

    async function handleCertificateDownload(){
       if (isCertificateDownloading) return;

    setIsCertificateDownloading(true);

    try {
      // Call your backend endpoint that returns PDF as binary
      const response = await axiosInstance.get(`/api/certificate/${courseId}`, {
        responseType: "blob",           // THIS IS CRUCIAL for binary files
        withCredentials: true,          // sends cookies/auth
      });

      // Create download link
      const blob = new Blob([response.data], { type: "application/pdf" });
      const url = URL.createObjectURL(blob);

      const link = document.createElement("a");
      link.href = url;
      link.download = `Certificate-${courseId}.pdf`; // nice filename
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);

      // Clean up
      URL.revokeObjectURL(url);

      toast.success("Certificate downloaded successfully!");
    } catch (error: any) {
      console.error("Certificate download failed:", error);
      const message =
        error.response?.data?.message ||
        error.message ||
        "Failed to download certificate";
      toast.error(message);
    } finally {
      {
        setIsCertificateDownloading(false);
      }
    }
}


    return (
        <Button className="w-full mt-6" disabled={totalProgress<100}    onClick={handleCertificateDownload}>
           Download Certificate 
         </Button>
    )
    
}