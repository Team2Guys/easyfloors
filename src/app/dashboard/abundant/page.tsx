import { getOrderHistory } from 'config/handlers';
import AbundantOrder from './AbundantOrder';
import { IOrder } from 'types/type';

const Abandoned= async () => {
  const orderHistory: IOrder[] = await getOrderHistory();
  return <AbundantOrder abundantOrderData={orderHistory} />;
};

export default Abandoned;
