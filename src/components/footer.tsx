import React from 'react'
import Logo from './logo'
import { BorderBeam } from "@/components/magicui/border-beam"

const Footer = () => {
  return (
    <footer className="border-t bg-gradient-to-t from-muted/20 to-background relative">
      <BorderBeam className="opacity-50" />
      <div className="container flex flex-col items-center justify-between gap-6 py-12 md:h-24 md:flex-row md:py-0">
        <div className="flex flex-col items-center gap-4 px-8 md:flex-row md:gap-4 md:px-0">
          <Logo />
          <p className="text-center text-sm font-medium text-foreground/80 leading-loose md:text-left">
            Built by @ Skillseed 2025
          </p>
        </div>
      </div>
    </footer>
  )
}

export default Footer