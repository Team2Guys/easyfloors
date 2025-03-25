import { orders } from "data/data";
import { OrderHistory } from "types/types";
import { FaEye } from "react-icons/fa";
import Container from "components/common/container/Container";

const OrderHistoryTable = () => {
  return (
    <Container className="w-full mx-auto py-10">
      <h1 className="text-2xl lg:text-3xl font-medium mb-4">Order History</h1>
      <div className="overflow-x-auto bg-white ">
        <table className="min-w-full ">
          <thead>
            <tr className="bg-primary text-white text-left">
              <th className="border border-gray-200 p-3">Order ID</th>
              <th className="border border-gray-200 p-3">User Email</th>
              <th className="border border-gray-200 p-3">Address</th>
              <th className="border border-gray-200 p-3">Phone Number</th>
              <th className="border border-gray-200 p-3">Payment Status</th>
              <th className="border border-gray-200 p-3">Created At</th>
              <th className="border border-gray-200 p-3">Action</th>
            </tr>
          </thead>
          <tbody>
            {orders.length > 0 ? (
              orders.map((order: OrderHistory) => (
                <tr key={order.id} className="border border-gray-200">
                  <td className="border border-gray-200 p-3">{order.id}</td>
                  <td className="border border-gray-200 p-3">{order.email}</td>
                  <td className="border border-gray-200 p-3">{order.address}</td>
                  <td className="border border-gray-200 p-3">{order.phone}</td>
                  <td className={`border border-gray-200 p-3 ${order.paymentStatus === "Paid" ? "text-green-600" : "text-red-500"}`}>
                    {order.paymentStatus}
                  </td>
                  <td className="border border-gray-200 p-3">{order.createdAt}</td>
                  <td className="border border-gray-200 p-3 text-start">
                    <button className="text-primary text-start hover:text-primary">
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
      </div>
    </Container>
  );
};

export default OrderHistoryTable;