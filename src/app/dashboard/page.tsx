import dynamic from 'next/dynamic';
const ECommerce = dynamic(() => import('components/Dashboard/E-commerce'));
import DefaultLayout from 'components/Dashboard/DefaultLayout';
import { get_all_records } from 'config/fetch';
import { cookies } from 'next/headers';

async function DashboardMain() {
  const cookie = await cookies()
  const token = cookie.get('admin_access_token')?.value;
  const superAdmin = cookie.get('super_admin_access_token')?.value;
  const  finaltoken = token || superAdmin  || "";
const records = await get_all_records(finaltoken)


  return (
    <DefaultLayout>
      <ECommerce records={records} />
    </DefaultLayout>
  );
}

export default DashboardMain;
