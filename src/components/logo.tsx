import Image from 'next/image'
import React from 'react'

import { cn } from '@/lib/utils'

interface LogoProps {
  className?: string
}

const Logo: React.FC<LogoProps> = ({ className = '' }) => {
  return (
    <div>
      <Image className={cn('max-w-[50px]', className)}  src="/assets/logo.png" alt='logo'
        width={50}
        height={50} />
    </div>
  )
}

export default Logo
