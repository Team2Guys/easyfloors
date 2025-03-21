'use client';
import React, { ReactNode } from 'react';
import { Provider } from 'react-redux';;
import { store } from '../store';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { SessionProvider } from "next-auth/react";
interface ProvidersProps {
  children: ReactNode;
}
const queryClient = new QueryClient();

const Customprovider: React.FC<ProvidersProps> = ({ children }) => {
  return (
    <Provider store={store}>
    <SessionProvider>

        <QueryClientProvider client={queryClient}>
          {children}
        </QueryClientProvider>
    </SessionProvider>

    </Provider>
  );
};

export default Customprovider;
