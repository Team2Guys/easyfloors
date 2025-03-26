import { OrderHistory } from "types/types";
import { FaEye } from "react-icons/fa";
import Container from "components/common/container/Container";
import { orders } from "data/bin/bin";

const OrderHistoryTable = () => {
  return (
    <Container className="w-full mx-auto py-10">
      <h1 className="text-2xl lg:text-3xl font-medium mb-4">Order History</h1>
      <div className="overflow-x-auto bg-white shadow-md ">
        <table className="min-w-full border-collapse border border-gray-200">
          <thead>
            <tr className="bg-primary text-white text-left">
              {["Order ID", "User Email", "Address", "Phone Number", "Payment Status", "Created At", "Action"].map((heading) => (
                <th key={heading} className="border border-gray-200 p-3 text-center">
                  {heading}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {orders.length > 0 ? (
              orders.map((order: OrderHistory) => (
                <tr key={order.id} className="border border-gray-200 hover:bg-gray-100 transition">
                  <td className="border border-gray-200 p-3 text-center">{order.id}</td>
                  <td className="border border-gray-200 p-3 text-center">{order.email}</td>
                  <td className="border border-gray-200 p-3 text-center">{order.address}</td>
                  <td className="border border-gray-200 p-3 text-center">{order.phone}</td>
                  <td className={`border border-gray-200 p-3 text-center font-semibold ${order.paymentStatus === "Paid" ? "text-green-600" : "text-red-500"}`}>
                    {order.paymentStatus}
                  </td>
                  <td className="border border-gray-200 p-3 text-center">{order.createdAt}</td>
                  <td className="border border-gray-200 p-3 text-center">
                    <button className="text-primary hover:text-primary-dark">
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
