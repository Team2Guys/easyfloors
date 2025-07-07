'use client'
import { Modal, Table } from 'antd'
import Breadcrumb from 'components/Dashboard/Breadcrumbs/Breadcrumb'
import DefaultLayout from 'components/Dashboard/DefaultLayout'
import ProtectedRoute from 'hooks/AuthHookAdmin'
import Image from 'next/image'
import React, { useState } from 'react'
import { FaRegEye } from 'react-icons/fa'
import { Order as prodOrder } from 'types/prod'

const Order = ({ title, ordersData }: { title: string, ordersData: prodOrder[] }) => {
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
         width: 200,
         render: (_: number, record: prodOrder) => `${record.firstName} ${record.lastName}`
      },
      {
         title: "Email",
         dataIndex: "email",
         key: "email",
         width: 250,
      },
      {
         title: "Phone Number",
         dataIndex: "phone",
         key: "phone",
         width: 150,
      },
      {
         title: "Country",
         dataIndex: "country",
         key: "country",
         width: 200,
      },

      {
         title: "Emirate",
         dataIndex: "emirate",
         key: "emirate",
         width: 100,
      },
      {
         title: "Address",
         dataIndex: "address",
         key: "address",
         width: 120,
      },
      {
         title: "View",
         dataIndex: "view",
         key: "view",
         width: 100,
         render: (_: unknown, record: prodOrder) => (
            <button onClick={() => showModal(record)}>
               <FaRegEye />
            </button>
         ),
      },
   ];

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
                        {selectedOrder?.products.map((prod, index) => (
                           <div key={index} className='flex gap-2 justify-between items-center pe-3'>
                              <div className='flex gap-2'>
                              <Image src={`${prod.image}`} alt={prod.name} width={50} height={50} className='h-auto' />
                              <div>
                                 <h3 className='font-medium'>{prod.name}</h3>
                                 <p className='font-medium'>Price per box: <span className='font-normal'>{prod.pricePerBox.toFixed(2)}</span></p>
                                 <p className='font-medium'>No. Of Boxes: <span className='font-normal'>{prod.requiredBoxes}</span> ({prod.squareMeter} SQM)</p>
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

export default ProtectedRoute(Order)