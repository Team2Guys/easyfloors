'use client'
import { Modal, Table } from 'antd'
import Breadcrumb from 'components/Dashboard/Breadcrumbs/Breadcrumb'
import DefaultLayout from 'components/Dashboard/DefaultLayout'
import Image from 'next/image'
import React, { useState } from 'react'
import { BsEyeFill } from 'react-icons/bs'
import { FiDownloadCloud } from 'react-icons/fi'
import { Order as prodOrder } from 'types/prod'
import * as XLSX from 'xlsx';


const Order = ({ title, ordersData, isfreesample, orders }: { title: string, orders: prodOrder[], ordersData: prodOrder[], isfreesample?: boolean }) => {
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


   const handleExport = () => {
      // Flatten the data (convert nested product into single row or join important values)
      const filtered_orders = orders?.map((order) => {


         return ({
            OrderID: order.orderId,
            Email: order.email,
            Name: `${order.firstName} ${order.lastName}`,
            Address: order.address,
            Phone: order.phone,
            City: order.city,
            Country: order.country,
            Emirate: order.emirate,
            checkoutDate: new Date(order.checkoutDate).toLocaleString(),
            transactionDate: new Date(order?.transactionDate).toLocaleString(),
            PaymentStatus: order.paymentStatus ? 'Paid' : 'Unpaid',
            TotalPrice: order.totalPrice,
            ProductNames: order.products.map((p) => p.name).join(', '),
            Productslength: order.products.map((p) => p.requiredBoxes).join(', '),
            squareMeter: order.products.map((p) => p.squareMeter).join(', '),
            ProductsIds: order.products.map((p) => p.id).join(', '),
            ProductsUrls: order.products.map((p) => {
               let urls = 'https://easyfloors.ae/'
               const category = p.category.trim().toLowerCase();
               console.log(category, "Accessory", p.name, p.category , order.orderId)
               if (category == "accessories" || category === 'accessory') {
                  urls += `accessories/${p.custom_url}`

               } else {
                  urls += `${p.category}/${p.subcategories}/${p.custom_url}`
               }
               return (
                  urls
               )
            }).join(', '),
            SellingPrice: order.products.map((p) => p.price).join(', '),
            Delivery_Charges: order?.shipmentFee,
            shippingMethod: order?.shippingMethod?.name,
            is3DSecure:order.is3DSecure,
            Note:order.note,
            FreeSample:order?.isfreesample,
            PaymentMethodType:order?.pay_methodType,
            paymethod_sub_type:order?.paymethod_sub_type,
            cardLastDigits:order?.cardLastDigits,
            Currency:order?.currency,
         })
      });

      const worksheet = XLSX.utils.json_to_sheet(filtered_orders);
      const workbook = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(workbook, worksheet, 'Orders-IF');
      XLSX.writeFile(workbook, 'Orders-EF.xlsx');
   };

   return (
      <DefaultLayout>
         <Breadcrumb pageName={title} />
         <button className='flex items-center gap-2' onClick={handleExport}> Export Orders <FiDownloadCloud className='text-primary' /></button>

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
                                    {prod.category?.toLowerCase().trim() === 'accessories' ? 
                                    <>
                                    <p className='font-medium'>Price per Piece: <span className='font-normal'>{prod.pricePerBox.toFixed(2)}</span></p>
                                    <p className='font-medium'>No. of Pieces: <span className='font-normal'>{prod.requiredBoxes}</span></p>
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