import OrderHistoryTable from 'components/OrderHistory/OrderHistory'
import Breadcrumb from 'components/Reusable/breadcrumb'
import React from 'react'

const OrderHistory = () => {
  return (
   <>
    <Breadcrumb title="Order History" />
    <OrderHistoryTable />
   </>
  )
}

export default OrderHistory
