'use client';
import dynamic from 'next/dynamic';

const ECommerce = dynamic(() => import('components/Dashboard/E-commerce'), {
  ssr: false,
});
import DefaultLayout from 'components/Dashboard/DefaultLayout';
import ProtectedRoute from 'hooks/AuthHookAdmin';
import { RECORDS } from 'types/type';


function DashboardMain({records}:{records: RECORDS}) {
  return (
    <DefaultLayout>
        <ECommerce records={records} />
    </DefaultLayout>
  );
}

export default ProtectedRoute(DashboardMain);
