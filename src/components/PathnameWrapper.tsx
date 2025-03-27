'use client';
import React from 'react';
import { usePathname } from 'next/navigation';
import Footer from './footer/footer';
import Header from './layout/header/Header';
import NeedHelp from './NeedHelp/NeedHelp';
import { ApolloProvider } from '@apollo/client';
import client from 'config/apolloClient';

const PathnameWrapper = ({ children }: { children: React.ReactNode }) => {
  const pathname = usePathname() as string;

  const withoutHeaderPages = ['/dashboard', '/thanks', '/login', '/signup', '/forgot-password'];
  const hideNeedHelpOn = ['/track-order']; 

  return (
    <ApolloProvider client={client}>
      <>
        {withoutHeaderPages.includes(pathname) ||
        pathname.split('/').includes('dashboard') ? (
          pathname === '/dashboard/Admin-login' ? <Header /> : null
        ) : (
          <Header />
        )}

        {children}

        {!hideNeedHelpOn.includes(pathname) && <NeedHelp />}

        {pathname !== '/' &&
        (withoutHeaderPages.includes(pathname) ||
          pathname.split('/').includes('dashboard')) ? (
          pathname === '/dashboard/Admin-login' ? <Footer /> : null
        ) : (
          <Footer />
        )}
      </>
    </ApolloProvider>
  );
};

export default PathnameWrapper;
