"use client";

import { DashboardNavbar } from "@/components/shared/dashboard-navbar";
import Sidebar from "@/components/shared/sidebar";
import { usePathname } from "next/navigation";
import { BarChart, PersonStanding, BookOpen, Boxes, CirclePlus } from "lucide-react";

import { ReactNode } from "react";
interface DashboardLayoutProps {
  children: ReactNode;
}

const adminRoutes = [
  {
    icon: BarChart,
    label: "Analytics",
    href: "/admin/dashboard",
  },
  {
    icon: PersonStanding,
    label: "Users",
    href: "/admin/users",
  },
  {
    icon: BookOpen,
    label: "Courses",
    href: "/admin/courses",
  },
  {
    icon: Boxes,
    label: "Categories",
    href: "/admin/categories",
  },
  {
    icon: CirclePlus,
    label: "Add Categories",
    href: "/admin/addcategory",
  },
];

const Dashboard = ({ children }: DashboardLayoutProps) => {
  const pathname = usePathname();

  // Hide sidebar + navbar on login page
  const isLoginPage = pathname === "/admin/login";

  return (
    <div className="h-full">
      {/* Navbar - Only show if NOT login page */}
      {!isLoginPage && (
        <div className="h-[80px] lg:pl-56 fixed inset-y-0 w-full z-50">
          <DashboardNavbar logoutRedirect="/admin/login" />
        </div>
      )}
      {/* Sidebar - Only show if NOT login page */}
      {!isLoginPage && (
        <div className="hidden lg:flex h-full w-56 flex-col fixed inset-y-0 z-40">
          <Sidebar routes={adminRoutes} logoutRedirect="/admin/login" />
        </div>
      )}
      <main className={`${!isLoginPage ? "lg:pl-56 pt-[80px]" : ""} h-full`}>
        {children}
      </main>
    </div>
  );
};
export default Dashboard;

