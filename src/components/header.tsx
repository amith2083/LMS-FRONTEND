"use client";
import React from "react";
import Navbar from "./navbar";

const Header = () => {
  return (
    <header className="z-40 bg-background/60 backdrop-blur-md fixed top-0 left-0 right-0 border-b border-muted/20  ">
      <div className="container flex h-20 items-center justify-between py-6">
        <Navbar />
      </div>
    </header>
  );
};

export default Header;
