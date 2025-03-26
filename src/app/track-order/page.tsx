import RelatedSlider from 'components/related-slider/related-slider';
import Breadcrumb from 'components/Reusable/breadcrumb';
import OrderTracking from 'components/TrackOrders/Order-Tracking';
import { fetchProducts } from 'config/fetch';
import { getOrderData } from 'data/bin/bin';
import React from 'react';


const TrackOrder = async () => { 
  const productData = await fetchProducts();


  return (
    <>
      <Breadcrumb title="Track Order" />
      <OrderTracking order={getOrderData()} />

      <RelatedSlider  products={productData.slice(0, 5)} />
    </>
  );
};

export default TrackOrder;
