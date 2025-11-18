'use client'

import React from 'react'
import { SignupForm } from '../_components/signup-form'
import { useParams } from 'next/navigation'

interface PageProps {
  params: {
    role: string
  }
}

const Page = () => {
   const params = useParams();
  const role = params?.role as string;

 

  return (
    <div className='w-full flex h-screen bg-blue-300  justify-center items-center"> '>
      <div className='container bg-amber-200'>
        <SignupForm role={role} />
      </div>
    </div>
  ) 
}

export default Page
