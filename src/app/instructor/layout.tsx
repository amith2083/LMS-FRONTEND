"use client";

import Sidebar from "@/components/shared/sidebar";
import { DashboardNavbar } from "@/components/shared/dashboard-navbar";
import { ReactNode } from "react";
import { BarChart, BookOpen, CirclePlus, BookA, MessageCircleMore } from "lucide-react";

interface DashboardLayoutProps {
  children: ReactNode;
}

const routes = [
  {
    icon: BarChart,
    label: "Analytics",
    href: "/instructor/dashboard",
  },
  {
    icon: BookOpen,
    label: "Courses",
    href: "/instructor/courses",
  },
  {
    icon: CirclePlus,
    label: "Add Course",
    href: "/instructor/courses/add",
  },
  {
    icon: BookA,
    label: "Quizes",
    href: "/instructor/quiz-sets",
  },
  {
    icon: CirclePlus,
    label: "Add Quizset",
    href: "/instructor/quiz-sets/add",
  },
  // {
  //   icon: MessageCircleMore,
  //   label: "chat",
  //   href: "/instructor/chat",
  // },
];

const Dashboard = ({ children }: DashboardLayoutProps) => {
  return (
    <div className="h-full">
      <div className="h-[80px] lg:pl-56 fixed inset-y-0 w-full z-50">
        <DashboardNavbar />
      </div>
      <div className="hidden lg:flex h-full w-56 flex-col fixed inset-y-0 z-50">
        <Sidebar routes={routes} />
      </div>
      <main className="lg:pl-56 pt-[80px] h-full">{children}
        
      </main>
    </div>
  );
};

export default Dashboard;

