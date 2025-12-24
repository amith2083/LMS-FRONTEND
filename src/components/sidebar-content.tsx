"use client";

import { BarChart, LogOut } from "lucide-react";

import { BookOpen } from "lucide-react";
import { SidebarItem } from "./sidebar-item";
import { BookA } from "lucide-react";
import { Radio } from "lucide-react";
import { PersonStanding } from "lucide-react";
import { MessageCircleMore } from "lucide-react";
import { CirclePlus } from "lucide-react";
import { Boxes } from "lucide-react";
import Logo from "./logo";
import { logout } from "@/app/services/authService";
import { signOut } from "next-auth/react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

const routes = [
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

  //   {
  //     icon: BookA,
  //     label: "Quizes",
  //     href: "/dashboard/quiz-sets",
  //   },
];

export const SidebarContent = () => {
 
  const router = useRouter();

  const handleLogout = async (e: React.MouseEvent) => {
    e.preventDefault();
    try {
      await logout();

      await signOut({ redirect: false });

      router.push("/admin/login");
    } catch (error: any) {
      toast.error(error);
    }
  };

  return (
    <>
      <div className="flex flex-col w-full">
        {routes.map((route) => (
          <SidebarItem
            key={route.href}
            icon={route.icon}
            label={route.label}
            href={route.href}
          />
        ))}
      </div>
      <div
        onClick={handleLogout}
        className="  flex justify-center items-center gap-2 pr-22 cursor-pointer hover:text-slate-600 hover:bg-slate-300/20 h-13"
      >
        <LogOut />
        <span className=" text-slate-500 text-sm font-[500] transition-all  ">
          Logout
        </span>
      </div>
    </>
  );
};
