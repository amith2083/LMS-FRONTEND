
import Footer from '@/components/footer';
import Header from '@/components/header';


import ChatBot from "@/app/(main)/_components/chatBot";


import React from 'react';

const MainLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    
    <div className="min-h-screen flex flex-col" >
      
      <Header/>
       <main className='flex-1 pt-20 flex flex-col  '>{children}</main>
      <ChatBot />
     <Footer/>
    
    </div>
    
  );
};

export default MainLayout;
