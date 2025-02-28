'use client';
import React, { useState } from 'react';
import Breadcrumb from 'components/Dashboard/Breadcrumbs/Breadcrumb';
import DefaultLayout from 'components/Dashboard/DefaultLayout';
import { formatDate } from 'config';
import OrderList from 'components/Orders/orders';
import { LuView } from 'react-icons/lu';
import { IOrder, IOrderProduct } from 'types/type';

const Orders = ({ orderData }: { orderData: IOrder[] }) => {
  const [selectedProducts, setSelectedProducts] = useState<IOrderProduct[]>([])
  const [visible, setVisible] = useState(false);

  const orderColumns = [
    { title: 'OrderId', dataIndex: 'orderId', key: 'orderId' },
    { title: 'Email', dataIndex: 'user_email', key: 'user_email' },
    { title: 'Phone Number', dataIndex: 'phoneNumber', key: 'phoneNumber' },
    { title: 'Address', dataIndex: 'address', key: 'address' },
    {
      title: 'Date',
      dataIndex: 'createdAt',
      key: 'createdAt',
      render: (createdAt: string) => formatDate(createdAt),
    },
    {
      title: 'View Products',
      dataIndex: 'view',
      key: 'view',
      render: (_: unknown, record: IOrder) => (
        <span className="flex justify-center">
          <LuView
            onClick={() => handleViewProducts(record.products)}
            className="cursor-pointer text-green-500"
            size={30}
          />
        </span>
      ),
    },
  ];

  const handleViewProducts = (products: IOrderProduct[]) => {
    setSelectedProducts(products);
    setVisible(true);
  };

  return (
    <DefaultLayout>
      <Breadcrumb pageName="View Orders" />
      <OrderList
        orderData={orderData}
        orderColumns={orderColumns}
        visible={visible}
        setVisible={setVisible}
        selectedProducts={selectedProducts}
      />
    </DefaultLayout>
  );
};

export default Orders;
