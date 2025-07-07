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

  console.log(role);

  return (
    <div className='w-full flex h-screen  justify-center items-center '>
      <div className='container'>
        <SignupForm role={role} />
      </div>
    </div>
  ) 
}

export default Page
