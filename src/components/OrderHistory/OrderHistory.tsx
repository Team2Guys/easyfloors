'use client'
import { FaEye } from "react-icons/fa";
import Container from "components/common/container/Container";
import { Order } from "types/prod";
import { useState } from "react";
import Image from "next/image";
import { Modal } from "antd";

const OrderHistoryTable = ({ OrderHistory }: { OrderHistory: Order[] }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);

  const showModal = (record: Order) => {
    setSelectedOrder(record);
    setIsModalOpen(true);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
    setSelectedOrder(null);
  };
  return (
    <Container className="w-full mx-auto py-10">
      <h1 className="text-2xl lg:text-3xl font-medium mb-4">Order History</h1>
      <div className="overflow-x-auto bg-white shadow-md ">
        <table className="min-w-full border-collapse border border-gray-200">
          <thead>
            <tr className="bg-primary text-white text-left">
              {["Order ID", "User Email", "Address", "Phone Number", "Payment Status", "Checkout Date", "Action"].map((heading) => (
                <th key={heading} className="border border-gray-200 p-3 text-center">
                  {heading}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {OrderHistory ? (
              OrderHistory.map((order: Order) => (
                <tr key={order.orderId} className="border border-gray-200 hover:bg-gray-100 transition">
                  <td className="border border-gray-200 p-3 text-center">{order.orderId}</td>
                  <td className="border border-gray-200 p-3 text-center">{order.email}</td>
                  <td className="border border-gray-200 p-3 text-center">{order.address}</td>
                  <td className="border border-gray-200 p-3 text-center">{order.phone}</td>
                  <td className={`border border-gray-200 p-3 text-center font-semibold ${order.paymentStatus ? "text-green" : "text-red-500"}`}>
                    {order.paymentStatus ? 'Paid' : 'pending'}
                  </td>
                  <td className="border border-gray-200 p-3 text-center">{new Date(order.checkoutDate).toLocaleDateString("en-GB", {
                    year: "numeric",
                    month: "short",
                    day: "2-digit",
                  })}
                  </td>
                  <td className="border border-gray-200 p-3 text-center">
                    <button className="text-primary hover:text-primary-dark" onClick={() => showModal(order)}>
                      <FaEye size={18} />
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={7} className="text-center p-5 text-gray-500">
                  No Orders Found
                </td>
              </tr>
            )}
          </tbody>
        </table>
        <Modal title="Order Details" open={isModalOpen} onCancel={handleCancel} footer={null} className=''>
          {OrderHistory && (
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
                                    <p><strong>{selectedOrder?.transactionDate ? 'Transaction Date' : 'Checkout Date'}:</strong> {selectedOrder?.transactionDate ? new Date(selectedOrder?.transactionDate || '').toLocaleString() : new Date(selectedOrder?.checkoutDate || '').toLocaleString()}</p>
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
      </div>
    </Container>
  );
};

export default OrderHistoryTable;
