
'use client';

import { getQueryClient } from '@/lib/getQueryClient';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
// import { useState } from 'react';


export default function QueryProvider({ children }: { children: React.ReactNode }) {
  // const [queryClient] = useState(() => new QueryClient());
  const queryClient = getQueryClient();

  return (
    <QueryClientProvider client={queryClient}>
      {children}
      {process.env.NODE_ENV === 'development' && (
        <ReactQueryDevtools initialIsOpen={true} />
      )}
    </QueryClientProvider>
  );
}
