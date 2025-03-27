import Breadcrumb from "components/Reusable/breadcrumb";
import OrderTracking from "components/TrackOrders/Order-Tracking";
import { getOrderData } from "data/bin/bin";
import React from "react";

const TrackOrder: React.FC = () => {
  return (
    <>
      <Breadcrumb title="Track Order" />
      <OrderTracking order={getOrderData()} />
    </>
  );
};

export default TrackOrder;
