'use client'
import Link from "next/link";
import React, { useEffect, useState } from "react";
import Logo from "./logo";
import { cn } from "@/lib/utils";
import { Button, buttonVariants } from "./ui/button";
import { X, Menu } from "lucide-react";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "./ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { AnimatedShinyText } from "@/components/magicui/animated-shiny-text";
import { signOut, useSession } from "next-auth/react";
import { Session } from "next-auth";
import { useRouter } from "next/navigation";
import { logout } from "@/app/service/authService";

const navLinks = [
  {
    title: "Courses",
    href: "/courses",
  },
  {
    title: "About",
    href: "/about",
  },
];

const Navbar = () => {
const { data: session, status } = useSession();
  const router = useRouter();

 

 

  const handleLogout = async (e: React.MouseEvent) => {
    e.preventDefault();
    try {
      await logout();
     
      await signOut({ redirect: false });
     
      router.push("/login");
    } catch (error) {
      console.error("Logout error:", error);
    }
  };

  return (
    <>
      <div className="flex items-center gap-8">
        <Link href="/">
          <Logo />
        </Link>
        {navLinks?.length ? (
          <nav className="lg:flex gap-8 hidden">
            {navLinks?.map((item, index) => (
              <Link
                className={cn(
                  "flex items-center font-semibold text-md transition-colors",
                  "hover:text-foreground/90"
                )}
                key={index}
                href={item.href}
              >
                <AnimatedShinyText className="px- 3 py-1 rounded-full">
                  {item.title}
                </AnimatedShinyText>
              </Link>
            ))}
          </nav>
        ) : null}
      </div>

      <nav className="flex items-center gap-4">
        {status === "loading" ? (
          <div className="h-9 w-24 bg-muted rounded-md animate-pulse hidden lg:block" />
        ) : status === "unauthenticated" ? (
          <div className="lg:flex items-center gap-4 hidden">
            <Link
              href="/login"
              className={cn(buttonVariants({ variant: "default", size: "sm" }), "px-4 bg-primary hover:bg-primary/90 transition-all duration-300")}
            >
              Login
            </Link>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" size="sm" className="border-primary/20 hover:bg-primary/10">
                  Register
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="mt-2 bg-background/95 backdrop-blur-md rounded-lg shadow-xl" align="end">
                <DropdownMenuItem asChild>
                  <Link href="/register/student" className="hover:bg-primary/10 transition-colors">
                    Student
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link href="/register/instructor" className="hover:bg-primary/10 transition-colors">
                    Instructor
                  </Link>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        ) : (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <div className="cursor-pointer relative">
                <Avatar className="h-10 w-10 border-2 border-primary/20 hover:border-primary transition-all duration-300">
                  <AvatarImage
                    src={session?.user?.profilePicture}
                    alt="User"
                  />
                  <AvatarFallback>Hi</AvatarFallback>
                </Avatar>
              </div>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-56 mt-2 bg-background/95 backdrop-blur-md rounded-lg shadow-xl">
              <DropdownMenuItem asChild>
                <Link href="/account" className="hover:bg-primary/10 transition-colors">
                  Profile
                </Link>
              </DropdownMenuItem>
              {session?.user?.role === "instructor" && (
                <DropdownMenuItem asChild>
                  <Link href="/instructor/dashboard" className="hover:bg-primary/10 transition-colors">
                    <strong>Instructor Dashboard</strong>
                  </Link>
                </DropdownMenuItem>
              )}
              <DropdownMenuItem asChild>
                <Link href="/account/enrolled-courses" className="hover:bg-primary/10 transition-colors">
                  My Courses
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link href="#" className="hover:bg-primary/10 transition-colors">
                  Testimonials & Certificates
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link href="" onClick={handleLogout} className="hover:bg-primary/10 transition-colors">
                  Logout
                </Link>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        )}
      </nav>
    </>
  );
};

export default Navbar;