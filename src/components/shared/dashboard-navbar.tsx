"use client";

import { UserAvatar } from "./user-avatar";

interface DashboardNavbarProps {
    logoutRedirect?: string;
}

export const DashboardNavbar = ({ logoutRedirect }: DashboardNavbarProps) => {
  return (
    <div className="p-4 border-b h-full flex items-center bg-white shadow-sm">
      <div className="flex items-center justify-end w-full px-6">
        <UserAvatar logoutRedirect={logoutRedirect} />
      </div>
    </div>
  );
};
