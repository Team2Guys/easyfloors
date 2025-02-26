import React, { useState } from 'react';
import { Modal, Table } from 'antd';
import Image from 'next/image';
import { IOrder, IOrderList } from 'types/type';



const OrderList = ({
  orderData,
  orderColumns,
  visible,
  setVisible,
  selectedProducts,
}: IOrderList) => {
  const [searchTerm, setSearchTerm] = useState<string>('');

  const handleOk = () => setVisible(false);
  const handleCancel = () => setVisible(false);

  const filteredData = searchTerm
    ? orderData.filter((order) =>
        ['user_email', 'address', 'phoneNumber', 'orderId']
          .map(
            (key) => order[key as keyof IOrder]?.toString().toLowerCase() || '',
          )
          .some((value) => value.includes(searchTerm.toLowerCase())),
      )
    : orderData;

  return (
    <div>
      <div className="flex justify-between mb-4 items-center text-dark dark:text-white">
        <input
          className="peer lg:p-3 p-2 block outline-none border rounded-md border-gray-200 dark:bg-boxdark dark:bg-transparent dark:border-white text-11 xs:text-sm dark:focus:border-primary focus:border-dark focus:ring-dark-500 disabled:opacity-50 disabled:pointer-events-none dark:text-black"
          type="search"
          placeholder="Search Orders"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      {filteredData.length > 0 ? (
        <>
          <Table
            className="overflow-x-scroll lg:overflow-auto"
            dataSource={filteredData}
            columns={orderColumns}
            pagination={false}
            rowKey="orderId"
          />
          <Modal
            title="Order Detail"
            open={visible}
            onOk={handleOk}
            onCancel={handleCancel}
            footer={null}
          >
            {selectedProducts.map((product) => (
              <div className="flex gap-2 items-center mt-2" key={product.id}>
                <Image
                  className="rounded-md"
                  width={100}
                  height={100}
                  loading='lazy'
                  src={product.productData.posterImageUrl}
                  alt={product.productData.name}
                />
                <div>
                  <h3>{product.productData.name}</h3>
                  <p>
                    Price: {product.productData.price}{' '}
                    {product.productData.currency}
                  </p>
                  <p>Quantity: {product.quantity}</p>
                </div>
              </div>
            ))}
          </Modal>
        </>
      ) : (
        'No Orders found'
      )}
    </div>
  );
};

export default OrderList;
