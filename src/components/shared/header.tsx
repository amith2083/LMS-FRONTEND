"use client";
import React from "react";
import Navbar from "./navbar";
import { cn } from "@/lib/utils";

const Header = () => {
  const [scrolled, setScrolled] = React.useState(false);

  React.useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header className={cn(
      "z-50 fixed top-0 left-0 right-0 transition-all duration-500",
      scrolled
        ? "h-16 bg-white/80 backdrop-blur-xl border-b border-slate-200/50 shadow-sm"
        : "h-20 bg-transparent border-transparent"
    )}>
      <div className="w-full h-full px-6 md:px-10 flex items-center justify-between">
        <Navbar />
      </div>
    </header>
  );
};

export default Header;

