import Breadcrumb from "components/Reusable/breadcrumb";
import OrderTracking from "components/TrackOrders/Order-Tracking";
import { fetchSingleOrder } from "config/fetch";
import React from "react";

interface IParams { id: string}

const TrackOrder= async({ params }: { params: Promise<IParams> }) => {
  const {id} = await params;
  const data  = await fetchSingleOrder(id)

  return (
    <>
      <Breadcrumb title="Track Order" />
      <OrderTracking data={data} />
    </>
  );
};

export default TrackOrder;
