"use client";

import Logo from "@/components/shared/logo";
import Link from "next/link";
import { SidebarContent } from "./sidebar-content";
import { LucideIcon } from "lucide-react";

interface Route {
  icon: LucideIcon;
  label: string;
  href: string;
}

interface SidebarProps {
  routes: Route[];
  logoutRedirect?: string;
}

const Sidebar = ({ routes, logoutRedirect }: SidebarProps) => {
  return (
    <div className="h-full border-r flex flex-col overflow-y-auto bg-white shadow-sm">
      <div className="p-6">
        <Link href="/">
          <Logo />
        </Link>
      </div>
      <div className="flex flex-col w-full">
        <SidebarContent routes={routes} logoutRedirect={logoutRedirect} />
      </div>
    </div>
  );
};

export default Sidebar;

