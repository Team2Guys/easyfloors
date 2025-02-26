'use client';
import React from 'react';
import { usePathname } from 'next/navigation';
import Footer from './footer/footer';
import Header from './layout/header/Header';

const PathnameWrapper = ({ children }: { children: React.ReactNode }) => {
  const pathname = usePathname() as string;

  const withoutHeaderPages = ['/dashboard', '/thanks'];
  return (
    <>
      {withoutHeaderPages.includes(pathname) ||
      pathname.split('/').includes('dashboard') ? (
        pathname === '/dashboard/Admin-login' ? (
          <Header />
        ) : null
      ) : (
        <Header />
      )}
      {children}
      {pathname !== '/' &&
      (withoutHeaderPages.includes(pathname) ||
        pathname.split('/').includes('dashboard')) ? (
        pathname === '/dashboard/Admin-login' ? (
          <Footer />
        ) : null
      ) : (
        <Footer />
      )}
    </>
  );
};

export default PathnameWrapper