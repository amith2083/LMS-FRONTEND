'use client'
import React from 'react'
import Navbar from './navbar'
import { SessionProvider } from 'next-auth/react'
import { BorderBeam } from "@/components/magicui/border-beam"

const Header = () => {
  return (
    <SessionProvider>
      <header className="z-40 bg-background/60 backdrop-blur-md fixed top-0 left-0 right-0 border-b border-muted/20 ">
        <BorderBeam className="opacity-50" />
        <div className="container flex h-20 items-center justify-between py-6">
          <Navbar />
        </div>
      </header>
    </SessionProvider>
  )
}

export default Header