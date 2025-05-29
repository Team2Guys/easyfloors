import { cookies } from "next/headers";
import { fetchOrders } from "config/fetch";
import Order from "../abundant/Order";
import { FETCH_ALL_FREE_SAMPLE_ORDERS } from "graphql/queries";




const OrdersPage= async () => {
   const allCookies = await cookies();
   const token =
     allCookies.get("super_admin_access_token")?.value ||
     allCookies.get("admin_access_token")?.value;
   
  const ordersData = await fetchOrders(token , FETCH_ALL_FREE_SAMPLE_ORDERS);
  return <Order title="Free Sample Orders" ordersData={ordersData} />
};

export default OrdersPage;
