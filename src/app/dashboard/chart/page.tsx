'use client';
import React from 'react';
import dynamic from 'next/dynamic';

const Chart = dynamic(() => import('components/Dashboard/Charts/page'), {
  ssr: false,
});

import DefaultLayout from 'components/Dashboard/Layouts/DefaultLayout';
import ProtectedRoute from 'hooks/AuthHookAdmin';
const BasicChartPage: React.FC = () => {
  return (
    <DefaultLayout>
      <Chart />
    </DefaultLayout>
  );
};

export default ProtectedRoute(BasicChartPage);
