import { cookies } from "next/headers";
import { fetchOrders } from "config/fetch";
import { Order as ProdOrder } from "types/prod";
import Order from "../abundant/Order";





const OrdersPage= async () => {
   const allCookies = await cookies();
   const token =
     allCookies.get("super_admin_access_token")?.value ||
     allCookies.get("admin_access_token")?.value;
   
  const ordersData = await fetchOrders(token);
  const abandonedOrder = ordersData.filter((item: ProdOrder) => (item.paymentStatus === true) && (item.checkout === false));
  console.log(abandonedOrder, "abandonedOrder", ordersData)
  return <Order title="Order" ordersData={abandonedOrder} />
};

export default OrdersPage;
