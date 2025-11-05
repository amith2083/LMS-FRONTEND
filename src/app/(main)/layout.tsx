
import Footer from '@/components/footer';
import Header from '@/components/header';


import React from 'react';

const MainLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    
    <div className="min-h-screen flex flex-col" >
      
      <Header/>
       <main className='flex-1 pt-20 flex flex-col border-b border-gray-600'>{children}</main>
    
     <Footer/>
    
    </div>
    
  );
};

export default MainLayout;
