import { authOptions } from 'auth/authOptions';
import OrderHistoryTable from 'components/OrderHistory/OrderHistory'
import Breadcrumb from 'components/Reusable/breadcrumb'
import { fetchOrdersHistory } from 'config/fetch';
import { getServerSession } from 'next-auth';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import React from 'react'

const OrderHistory = async () => {
    const session = await getServerSession(authOptions)
  if(!session){
    redirect('/login')
  }
  const email = session.user?.email;
   const allCookies = await cookies();
     const token =
       allCookies.get("super_admin_access_token")?.value ||
       allCookies.get("admin_access_token")?.value;
  const OrderHistory = await fetchOrdersHistory(token , email);
  return (
   <>
    <Breadcrumb title="Order History" />
    <OrderHistoryTable OrderHistory={OrderHistory} />
   </>
  )
}

export default OrderHistory
