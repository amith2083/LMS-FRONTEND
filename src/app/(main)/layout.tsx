
import Footer from '@/components/shared/footer';
import Header from '@/components/shared/header';


import ChatBot from "@/features/chatbot/components/chat-bot";


import React from 'react';

const MainLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    
    <div className="min-h-screen flex flex-col" >
      
      <Header/>
       <main className='flex-1 pt-24 sm:pt-28 flex flex-col'>{children}</main>
      <ChatBot />
     <Footer/>
    
    </div>
    
  );
};

export default MainLayout;


