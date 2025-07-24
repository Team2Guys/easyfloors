'use client';
import React, { useState } from 'react';
import Sidebar from 'components/Dashboard/Sidebar';
import Header from 'components/Dashboard/Header';

export default function DefaultLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  return (
    <div className="flex h-screen overflow-hidden">
        <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
        <div className="relative flex flex-1 flex-col overflow-y-auto overflow-x-hidden dark:border-strokedark dark:bg-boxdark dark:border-strokedark dark:bg-boxdark dark:bg-black dark:text-white dark:bg-boxdark dark:border-white border">
          <Header sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
          <main className="dark:border-strokedark dark:bg-boxdark dark:border-strokedark dark:bg-boxdark dark:bg-black dark:text-white dark:bg-boxdark dark:border-white border ">
            <div className="mx-auto max-w-screen-2xl p-4 md:p-6 2xl:p-10  ">
              {children}
            </div>
          </main>
        </div>
    </div>
  );
}
