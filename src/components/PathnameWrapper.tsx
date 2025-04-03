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
  const hideNeedHelpPages = ['/privacy-policy', '/terms-and-conditions','/return-and-refund-policy','/how-to-measure-your-room','/shipping-policy','/faqs','/measurement-appointment',"/checkout",'/contact-us',"/track-order"];

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
        {pathname !== '/' &&
        (withoutHeaderPages.includes(pathname) ||
          pathname.split('/').includes('dashboard')) ? (
          pathname === '/dashboard/Admin-login' ? <Footer /> : null
        ) : (
          <>
            {!hideNeedHelpPages.includes(pathname) && <NeedHelp />} 
            <Footer />
          </>
        )}
      </>
    </ApolloProvider>
  );
};

export default PathnameWrapper;