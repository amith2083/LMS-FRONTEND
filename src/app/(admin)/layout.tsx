"use client";
import Footer from "@/components/footer";
import Navbar from "@/components/navbar";
import Sidebar from "@/components/sidebar";
import { usePathname } from "next/navigation";

import { ReactNode } from "react";
interface DashboardLayoutProps {
  children: ReactNode;
}

const Dashboard = ({ children }:DashboardLayoutProps) => {
  const pathname = usePathname();

  // Hide sidebar + navbar on login page
  const isLoginPage = pathname === "/admin/login"
  return (
    <div className="h-full">
      <div className="h-[80px] lg:pl-56 fixed inset-y-0 w-full z-50">
        {/* <Navbar /> */}
      </div>
      {/* Sidebar - Only show if NOT login page */}
      {!isLoginPage && (
        <div className="hidden lg:flex h-full w-56 flex-col fixed inset-y-0 z-40">
          <Sidebar />
        </div>
      )}
      <main className="lg:pl-56 pt-[80px] h-full">{children}</main>
      
    </div>
  );
};
export default Dashboard;