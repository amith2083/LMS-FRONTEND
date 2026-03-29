"use client";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import Logo from "./logo";
import { cn } from "@/lib/utils";
import { Button, buttonVariants } from "@/components/ui/button";
import { X, Menu } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { UserAvatar } from "./user-avatar";
import { AnimatedShinyText } from "@/components/magicui/animated-shiny-text";
import { usePathname, useRouter } from "next/navigation";
import { toast } from "sonner";
import { useUser } from "@/features/auth/context/UserContext";
import { logout } from "@/features/auth/services/authService";

const navLinks = [
  {
    title: "Home",
    href: "/",
  },
  {
    title: "Courses",
    href: "/courses",
  },
  {
    title: "About",
    href: "/about",
  },
  // {
  //   title: "Contact",
  //   href: "/contact",
  // },
];

const Navbar = () => {
  const { user, loading, setUser } = useUser();
  const router = useRouter();
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleLogout = async (e: React.MouseEvent) => {
    e.preventDefault();
    try {
      await logout();
      setUser(null);
      router.push("/login");
      toast.success("Successfully logged out");
    } catch (error: any) {
      toast.error(error.message || "Logout failed");
    }
  };

  const toggleMenu = () => setMobileOpen(!mobileOpen);

  return (
    <div className="w-full flex items-center justify-between gap-4">
      {/* Left section — Logo */}
      <div className="flex items-center shrink-0">
        <Link href="/">
          <Logo />
        </Link>
      </div>

      {/* Center section — Nav Links (Desktop) */}
      <div className="flex-1 flex justify-center">
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
                  className="flex items-center"
                >
                  <AnimatedShinyText
                    className={cn(
                      "px-3 py-1 rounded-full font-semibold text-md transition-colors",
                      isActive ? "text-primary border-b-2 border-primary rounded-none" : "text-foreground/60 hover:text-primary/80"
                    )}
                  >
                    {item.title}
                  </AnimatedShinyText>
                </Link>
              );
            })}
          </nav>
        ) : null}
      </div>

      {/* Right section — Auth/Profile (Desktop) + ALL Mobile */}
      <div className="flex items-center gap-4">
        {/* Desktop Profile */}
        <nav className="lg:flex items-center gap-4 hidden">
          {loading ? (
            <div className="h-9 w-24 bg-muted rounded-md animate-pulse" />
          ) : !user ? (
            <div className="flex items-center gap-4">
              <Link
                href="/login"
                className={cn(
                  buttonVariants({ variant: "default", size: "sm" }),
                  "px-6 bg-primary hover:bg-primary/90 transition-all duration-300 rounded-xl"
                )}
              >
                Login
              </Link>
              <Link
                href="/register/student"
                className={cn(
                  buttonVariants({ variant: "outline", size: "sm" }),
                  "px-6 border-primary/20 hover:bg-primary/10 transition-all duration-300 rounded-xl"
                )}
              >
                Register
              </Link>
            </div>
          ) : (
            <UserAvatar logoutRedirect="/login" />
          )}
        </nav>

        {/* MOBILE ACTIONS */}
        <div className="lg:hidden flex items-center gap-3">
          {user && (
            <UserAvatar className="scale-90" logoutRedirect="/login" />
          )}
          <button
            onClick={toggleMenu}
            className={cn(
              "p-2.5 rounded-xl bg-slate-50 border border-slate-100 text-slate-600 hover:text-primary hover:border-primary/20 transition-all duration-300 group",
              mobileOpen ? "rotate-90 bg-primary/5 border-primary/20 text-primary shadow-sm" : ""
            )}
          >
            {mobileOpen ? <X size={20} /> : <Menu size={20} className="group-hover:scale-110 transition-transform" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Overlay — Absolute positioned */}
      {mobileOpen && (
        <div className="absolute top-[72px] left-4 right-4 bg-white/95 backdrop-blur-2xl border border-slate-200/50 shadow-[0_20px_50px_rgba(0,0,0,0.1)] rounded-[2.5rem] flex flex-col items-center py-12 px-6 space-y-8 animate-in fade-in slide-in-from-top-6 z-[60] overflow-hidden lg:hidden">
          {/* Background flourish inside mobile menu */}
          <div className="absolute -z-10 top-0 left-1/2 -translate-x-1/2 w-40 h-40 bg-primary/5 rounded-full blur-[80px]" />

          {navLinks.map((item, index) => {
            const cleanPath = pathname.replace(/\/$/, "");
            const cleanHref = item.href.replace(/\/$/, "");
            const isActive = cleanPath === cleanHref;
            return (
              <Link
                key={index}
                href={item.href}
                onClick={() => setMobileOpen(false)}
                className="w-full text-center"
              >
                <AnimatedShinyText
                  className={cn(
                    "inline-flex px-8 py-3 rounded-2xl font-black text-2xl tracking-tighter transition-all",
                    isActive ? "text-primary bg-primary/5" : "text-slate-400 hover:text-slate-900"
                  )}
                >
                  {item.title}
                </AnimatedShinyText>
              </Link>
            );
          })}

          {!user ? (
            <div className="flex flex-col gap-4 mt-12 w-full max-w-xs">
              <Link
                href="/login"
                onClick={() => setMobileOpen(false)}
                className="w-full text-center py-5 bg-primary text-white font-black rounded-3xl shadow-2xl shadow-primary/20 hover:translate-y-[-2px] active:scale-95 transition-all text-lg tracking-tight"
              >
                LOG IN
              </Link>
              <Link
                href="/register/student"
                onClick={() => setMobileOpen(false)}
                className="w-full text-center py-5 border-2 border-slate-100 text-slate-500 font-bold rounded-3xl hover:bg-slate-50 active:scale-95 transition-all uppercase tracking-widest text-xs"
              >
                Create Account
              </Link>
            </div>
          ) : (
            <div className="flex flex-col gap-4 mt-12 w-full max-w-xs">
              <Link
                href={user.role === 'instructor' ? '/instructor/dashboard' : '/account'}
                onClick={() => setMobileOpen(false)}
                className="w-full text-center py-5 bg-accent text-white font-black rounded-3xl shadow-2xl shadow-accent/30 hover:translate-y-[-2px] active:scale-95 transition-all flex items-center justify-center gap-3 uppercase tracking-wider text-sm"
              >
                Go to Dashboard
              </Link>
              <button
                onClick={(e) => {
                  handleLogout(e);
                  setMobileOpen(false);
                }}
                className="w-full py-5 border-2 border-destructive/5 text-destructive/50 font-bold rounded-3xl hover:bg-destructive/5 active:scale-95 transition-all text-[11px] uppercase tracking-[0.3em]"
              >
                Sign Out
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default Navbar;

