"use client";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import Logo from "./logo";
import { cn } from "@/lib/utils";
import { Button, buttonVariants } from "./ui/button";
import { X, Menu } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { AnimatedShinyText } from "@/components/magicui/animated-shiny-text";
import { signOut, useSession } from "next-auth/react";
import { Session } from "next-auth";
import { usePathname, useRouter } from "next/navigation";
import { logout } from "@/app/service/authService";
import { toast } from "sonner";

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
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleLogout = async (e: React.MouseEvent) => {
    e.preventDefault();
    try {
      await logout();

      await signOut({ redirect: false });

      router.push("/login");
    } catch (error:any) {
      toast.error(error)
      console.error("Logout error:", error);
    }
  };
  const toggleMenu = () => setMobileOpen(!mobileOpen);


  return (
    <>
      {/* Left section — Logo */}
      <div className="flex items-center gap:3 lg: gap-8">
        <Link href="/">
          <Logo />
        </Link>
         </div>
          {/* Center section — Nav Links */}
        {navLinks?.length ? (
          <nav className="lg:flex gap-8 hidden">
            {navLinks?.map((item, index) => {
              const cleanPath = pathname.replace(/\/$/, "");
              const cleanHref = item.href.replace(/\/$/, "");

              const isActive = cleanPath === cleanHref;

              return (
                <Link
                  key={index}
                  href={item.href}
                  // keep the Link only for navigation – no visual classes
                  className="flex items-center"
                >
                  {/* 2. Move ALL visual Tailwind classes here */}
                  <AnimatedShinyText
                    className={cn(
                      "px-3 py-1 rounded-full font-semibold text-md transition-colors",
                      isActive ? "text-blue-500" : "text-foreground/60"
                    )}
                  >
                    {item.title}
                  </AnimatedShinyText>
                </Link>
              );
            })}
          </nav>
        ) : null}
     
    {/* Right section — Auth/Profile */}
      <nav className="lg:flex items-center gap-4 hidden">
        {status === "loading" ? (
          <div className="h-9 w-24 bg-muted rounded-md animate-pulse hidden lg:block" />
        ) : status === "unauthenticated" ? (
          <div className="lg:flex items-center gap-4 hidden">
            <Link
              href="/login"
              className={cn(
                buttonVariants({ variant: "default", size: "sm" }),
                "px-4 bg-primary hover:bg-primary/90 transition-all duration-300"
              )}
            >
              Login
            </Link>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="outline"
                  size="sm"
                  className="border-primary/20 hover:bg-primary/10"
                >
                  Register
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent
                className="mt-2 bg-background/95 backdrop-blur-md rounded-lg shadow-xl"
                align="end"
              >
                <DropdownMenuItem asChild>
                  <Link
                    href="/register/student"
                    className="hover:bg-primary/10 transition-colors"
                  >
                    Student
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link
                    href="/register/instructor"
                    className="hover:bg-primary/10 transition-colors"
                  >
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
                  <AvatarImage src={session?.user?.profilePicture} alt="User" />
                  <AvatarFallback>Hi</AvatarFallback>
                </Avatar>
              </div>
            </DropdownMenuTrigger>
            <DropdownMenuContent
              align="end"
              className="w-56 mt-2 bg-background/95 backdrop-blur-md rounded-lg shadow-xl"
            >
              <DropdownMenuItem asChild>
                <Link
                  href="/account"
                  className="hover:bg-primary/10 transition-colors"
                >
                  Profile
                </Link>
              </DropdownMenuItem>
              {session?.user?.role === "instructor" && (
                <DropdownMenuItem asChild>
                  <Link
                    href="/instructor/dashboard"
                    className="hover:bg-primary/10 transition-colors"
                  >
                    <strong>Instructor Dashboard</strong>
                  </Link>
                </DropdownMenuItem>
              )}
              <DropdownMenuItem asChild>
                <Link
                  href="/account/enrolled-courses"
                  className="hover:bg-primary/10 transition-colors"
                >
                  My Courses
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link
                  href="#"
                  className="hover:bg-primary/10 transition-colors"
                >
                  Testimonials & Certificates
                </Link>
              </DropdownMenuItem>
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
        )}
      </nav>
      {/* MOBILE NAVBAR */}
      <div className="lg:hidden flex items-center rounded-md  bg-orange-400">
        <button
          onClick={toggleMenu}
          className="p-2 rounded-md text-foreground/80 hover:text-foreground transition"
        >
          {mobileOpen ? <X size={24} /> : <Menu size={24} />}
        </button>

        {/* Mobile Menu Overlay */}
        {mobileOpen && (
          <div className="absolute top-20 left-0 w-full bg-background/95 backdrop-blur-md border-b border-muted/20 shadow-lg flex flex-col items-center py-6 space-y-4 animate-in fade-in slide-in-from-top-2 z-50">
            {navLinks.map((item, index) => {
              const cleanPath = pathname.replace(/\/$/, "");
              const cleanHref = item.href.replace(/\/$/, "");
              const isActive = cleanPath === cleanHref;
              return (
                <Link
                  key={index}
                  href={item.href}
                  onClick={() => setMobileOpen(false)}
                >
                  <AnimatedShinyText
                    className={cn(
                      "px-3 py-1 rounded-full font-semibold text-lg transition-colors",
                      isActive ? "text-blue-500" : "text-foreground/60"
                    )}
                  >
                    {item.title}
                  </AnimatedShinyText>
                </Link>
              );
            })}

            {status === "unauthenticated" ? (
              <div className="flex flex-col gap-3 mt-4">
                <Link
                  href="/login"
                  onClick={() => setMobileOpen(false)}
                  className="w-32 text-center px-4 py-2 bg-primary text-white rounded-md"
                >
                  Login
                </Link>
                <Link
                  href="/register/student"
                  onClick={() => setMobileOpen(false)}
                  className="w-32 text-center px-4 py-2 border border-primary rounded-md text-primary"
                >
                  Register
                </Link>
              </div>
            ) : (
              <button
                onClick={(e) => {
                  handleLogout(e);
                  setMobileOpen(false);
                }}
                className="w-32 mt-4 text-center px-4 py-2 border border-destructive text-destructive rounded-md"
              >
                Logout
              </button>
            )}
          </div>
        )}
      </div>
    </>
  );
};

export default Navbar;
