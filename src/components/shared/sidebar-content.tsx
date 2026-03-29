"use client";

import { LogOut, LucideIcon } from "lucide-react";
import { SidebarItem } from "./sidebar-item";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { useUser } from "@/features/auth/context/UserContext";
import { logout } from "@/features/auth/services/authService";

interface Route {
  icon: LucideIcon;
  label: string;
  href: string;
}

interface SidebarContentProps {
  routes: Route[];
  logoutRedirect?: string;
}

export const SidebarContent = ({ routes, logoutRedirect = "/login" }: SidebarContentProps) => {
  const { setUser } = useUser();
  const router = useRouter();

  const handleLogout = async (e: React.MouseEvent) => {
    e.preventDefault();
    try {
      await logout();
      setUser(null);
      router.push(logoutRedirect);
      toast.success("Logged out successfully");
    } catch (error: any) {
      toast.error(error.message || "Logout failed");
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
        className="flex justify-center items-center gap-2 pr-22 cursor-pointer hover:text-slate-600 hover:bg-slate-300/20 h-13"
      >
        <LogOut className="w-5 h-5 text-slate-500" />
        <span className="text-slate-500 text-sm font-[500] transition-all">
          Logout
        </span>
      </div>
    </>
  );
};

