import RelatedSlider from 'components/related-slider/related-slider';
import Breadcrumb from 'components/Reusable/breadcrumb';
import ThankYouComp from 'components/ThankYou/ThankYou';
import { fetchProducts } from 'config/fetch';
import React from 'react';

export interface PaymentQueryParams {
  id: string | null;
  amount_cents: string | null;
  success: string | null
  integration_id: string | null,
  currency: string | null,
  is_refund: string | null,
  order_id: string | null,
  pending: string | null,
  is_3d_secure: string | null,
  created_at: string | null

}

const ThankYou = async () => { 
  const productData = await fetchProducts();


  return (
    <>
      <Breadcrumb title="Thank You" />
      <ThankYouComp />
      <RelatedSlider  products={productData.slice(0, 5)} />
    </>
  );
};

export default ThankYou;
