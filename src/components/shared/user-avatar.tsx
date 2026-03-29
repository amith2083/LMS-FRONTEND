"use client";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useUser } from "@/features/auth/context/UserContext";
import { logout } from "@/features/auth/services/authService";
import { toast } from "sonner";

interface UserAvatarProps {
  logoutRedirect?: string;
  className?: string;
}

export const UserAvatar = ({ logoutRedirect = "/login", className }: UserAvatarProps) => {
  const { user, setUser } = useUser();
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
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <div className={`cursor-pointer relative ${className}`}>
          <Avatar className="h-10 w-10 border-2 border-primary/20 hover:border-primary transition-all duration-300">
            <AvatarImage src={user?.profilePicture} alt={user?.name || "User"} />
            <AvatarFallback>{user?.name?.charAt(0) || "U"}</AvatarFallback>
          </Avatar>
        </div>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        align="end"
        className="w-56 mt-2 bg-background/95 backdrop-blur-md rounded-lg shadow-xl"
      >
        {user?.role !== "admin" && (
          <DropdownMenuItem asChild>
            <Link href="/account" className="hover:bg-primary/10 transition-colors">
              Profile
            </Link>
          </DropdownMenuItem>
        )}

        {user?.role === "instructor" && (
          <DropdownMenuItem asChild>
            <Link href="/instructor/dashboard" className="hover:bg-primary/10 transition-colors">
              <strong>Instructor Dashboard</strong>
            </Link>
          </DropdownMenuItem>
        )}

        {user?.role === "student" && (
          <DropdownMenuItem asChild>
            <Link href="/account/enrolled-courses" className="hover:bg-primary/10 transition-colors">
              My Courses
            </Link>
          </DropdownMenuItem>
        )}

        <DropdownMenuItem asChild>
          <Link
            href=""
            onClick={handleLogout}
            className="hover:bg-primary/10 transition-colors"
          >
            Logout
          </Link>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
