import Image from 'next/image'
import React from 'react'
import { cn } from '@/lib/utils'
import { BorderBeam } from "@/components/magicui/border-beam"

interface LogoProps {
  className?: string
}

const Logo: React.FC<LogoProps> = ({ className = '' }) => {
  return (
    <div className="relative">
      <Image
        className={cn('max-w-[50px] rounded-full hover:scale-110 transition-transform duration-300', className)}
        src="/assets/logo.png"
        alt="logo"
        width={50}
        height={50}
      />
      <BorderBeam className="opacity-30" size={80} duration={12} />
    </div>
  )
}

export default Logo