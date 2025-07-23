'use client'
import { Modal, Table } from 'antd'
import Breadcrumb from 'components/Dashboard/Breadcrumbs/Breadcrumb'
import DefaultLayout from 'components/Dashboard/DefaultLayout'
import Image from 'next/image'
import React, { useState } from 'react'
import { BsEyeFill } from 'react-icons/bs'
import { Order as prodOrder } from 'types/prod'

const Order = ({ title, ordersData, isfreesample }: { title: string, ordersData: prodOrder[], isfreesample?: boolean }) => {
   const [isModalOpen, setIsModalOpen] = useState(false);
   const [selectedOrder, setSelectedOrder] = useState<prodOrder | null>(null);
   const showModal = (record: prodOrder) => {
      setSelectedOrder(record);
      setIsModalOpen(true);
   };

   const handleCancel = () => {
      setIsModalOpen(false);
      setSelectedOrder(null);
   };
   const hasTransactionDate = ordersData?.some(item => item.transactionDate);

   const columns = [
      {
         title: "Order Id",
         dataIndex: "orderId",
         key: "orderId",
         width: 100,
      },
      {
         title: "Name",
         dataIndex: "firstName",
         key: "firstName",
         width: 150,
         render: (_: number, record: prodOrder) => `${record.firstName} ${record.lastName}`
      },
      {
         title: "Email",
         dataIndex: "email",
         key: "email",
         width: 200,
      },
      {
         title: "Phone Number",
         dataIndex: "phone",
         key: "phone",
         width: 120,
      },
      {
         title: "Country",
         dataIndex: "country",
         key: "country",
         width: 140,
      },
      {
         title: "Emirate",
         dataIndex: "emirate",
         key: "emirate",
         width: 90,
      },
      ...(!isfreesample
         ? hasTransactionDate
            ? [
               {
                  title: "Transaction Date",
                  dataIndex: "transactionDate",
                  key: "transactionDate",
                  width: 140,
                  render: (date: string) => new Date(date).toLocaleString(),
               },
               {
                  title: "Total Amount",
                  dataIndex: "totalPrice",
                  key: "totalPrice",
                  width: 100,
               },
            ]
            : [
               {
                  title: "Checkout Date",
                  dataIndex: "checkoutDate",
                  key: "checkoutDate",
                  width: 140,
                  render: (date: string) => new Date(date).toLocaleString(),
               },
               {
                  title: "Total Amount",
                  dataIndex: "totalPrice",
                  key: "totalPrice",
                  width: 100,
               },
            ]
         : [
      {
         title: 'Create At',
         dataIndex: 'createdAt',
         key: 'createdAt',
         width: 140,
         render: (text: string, record: prodOrder) =>
            record?.checkoutDate ? new Date(record.checkoutDate).toLocaleString('en-US', { hour12: true }).replace(/:\d{2}\s/, ' ') : null,
      },]),
      {
         title: "View",
         dataIndex: "view",
         key: "view",
         width: 60,
         render: (_: unknown, record: prodOrder) => (
            <button onClick={() => showModal(record)} className="cursor-pointer">
               <BsEyeFill className="text-primary cursor-pointer text-base transition duration-300 ease-in-out hover:scale-200" />
            </button>
         ),
      },
   ].filter(Boolean);

   return (
      <DefaultLayout>
         <Breadcrumb pageName={title} />
         {ordersData && ordersData.length > 0 ? (
            <>
               <Table
                  className="xl:overflow-hidden overflow-x-scroll !dark:border-strokedark !dark:bg-boxdark !bg-transparent"
                  dataSource={ordersData}
                  columns={columns}
                  rowKey="id"
                  pagination={false}
               />

               <Modal title="Order Details" open={isModalOpen} onCancel={handleCancel} footer={null} className=''>
                  {ordersData && (
                     <div className='space-y-3 max-h-[80vh] overflow-y-auto'>
                        <p><strong>OrderId:</strong> {selectedOrder?.orderId}</p>
                        <p><strong>Name:</strong> {selectedOrder?.firstName} {selectedOrder?.lastName}</p>
                        <p><strong>Email:</strong> {selectedOrder?.email}</p>
                        <p><strong>Phone Number:</strong> {selectedOrder?.phone}</p>
                        <p><strong>Shipping Method:</strong> {selectedOrder?.shippingMethod?.name}</p>
                        <p><strong>Country:</strong> {selectedOrder?.country}</p>
                        <p><strong>Emirate:</strong> {selectedOrder?.emirate}</p>
                        <p><strong>City:</strong> {selectedOrder?.city}</p>
                        <p><strong>Address:</strong> {selectedOrder?.address}</p>
                        <p><strong>Other Notes:</strong> {selectedOrder?.note}</p>
                        <p><strong>Shippment Fee:</strong> {selectedOrder?.shipmentFee === 0 ? 'Free' : <span className="font-currency text-18 font-normal"> {selectedOrder?.shipmentFee}</span>}</p>
                        <p><strong>Total Amount:</strong> <span className="font-currency text-18 font-normal"></span> {selectedOrder?.totalPrice}</p>
                        <p><strong>{hasTransactionDate ? 'Transaction Date' : 'Checkout Date'}:</strong> {hasTransactionDate ? new Date(selectedOrder?.transactionDate || '').toLocaleString() : new Date(selectedOrder?.checkoutDate || '').toLocaleString()}</p>
                        {selectedOrder?.products.map((prod, index) => (
                           <div key={index} className='flex gap-2 justify-between items-center pe-3'>
                              <div className='flex gap-2'>
                                 <Image src={`${prod.image}`} alt={prod.name} width={50} height={50} className='h-auto' />
                                 <div>
                                    <h3 className='font-medium'>{prod.name}</h3>
                                    {prod.category === "Accessories" ? 
                                    <>
                                    <p className='font-medium'>Price per meter: <span className='font-normal'>{prod.pricePerBox.toFixed(2)}</span></p>
                                    <p className='font-medium'>Total Requirment: <span className='font-normal'>{prod.requiredBoxes}m</span></p>
                                    </>
                                    :
                                    <>
                                    <p className='font-medium'>Price per box: <span className='font-normal'>{prod.pricePerBox.toFixed(2)}</span></p>
                                    <p className='font-medium'>No. Of Boxes: <span className='font-normal'>{prod.requiredBoxes}</span> ({prod.squareMeter} SQM)</p>
                                    </>
                                    }
                                 </div>
                              </div>
                              <p className='font-medium'>{prod.totalPrice.toFixed(2)}</p>
                           </div>
                        ))}

                     </div>
                  )}
               </Modal>
            </>
         ) :
            <p className="text-primary dark:text-white">No Orders found</p>
         }
      </DefaultLayout>
   )
}

export default Order