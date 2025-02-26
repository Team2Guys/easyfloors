'use client';
import Breadcrumb from 'components/Dashboard/Breadcrumbs/Breadcrumb';
import DefaultLayout from 'components/Dashboard/Layouts/DefaultLayout';
import React, { useState } from 'react';
import { formatDate } from 'config';
import { LuView } from 'react-icons/lu';
import OrderList from 'components/Orders/orders';
import { IOrder, IOrderProduct } from 'types/type';
const AbundantOrder = ({
  abundantOrderData,
}: {
  abundantOrderData: IOrder[];
}) => {
  const [visible, setVisible] = useState(false);
  const [selectedProducts, setSelectedProducts] = useState<IOrderProduct[]>([]);

  const ordercolumns = [
    {
      title: 'OrderId',
      dataIndex: 'orderId',
      key: 'orderId',
    },
    {
      title: 'Email',
      dataIndex: 'user_email',
      key: 'user_email',
    },
    {
      title: 'Phone Number',
      dataIndex: 'phoneNumber',
      key: 'phoneNumber',
    },
    {
      title: 'Address',
      dataIndex: 'address',
      key: 'address',
    },
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
      render: (text: string, record: IOrder) => (
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
      <Breadcrumb pageName="Abandoned Order" />
      <OrderList
        orderData={abundantOrderData}
        orderColumns={ordercolumns}
        visible={visible}
        setVisible={setVisible}
        selectedProducts={selectedProducts}
      />
    </DefaultLayout>
  );
};

export default AbundantOrder;
