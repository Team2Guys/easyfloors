import RelatedSlider from 'components/related-slider/related-slider';
import Breadcrumb from 'components/Reusable/breadcrumb';
import ThankYouComp from 'components/ThankYou/ThankYou';
import { fetchProducts } from 'config/fetch';
import React from 'react';

export interface PaymentQueryParams {

  success: boolean
  integrationId: string | undefined,
  orderId: string | undefined,
  pending: boolean,
  is3DSecure: string | undefined,
  pay_methodType: string | undefined
  cardLastDigits: string | undefined
  paymethod_sub_type: string | undefined

}

interface ThankYouProps {
searchParams: Promise<Record<string, string | null>>;}


const ThankYou = async ({ searchParams }: ThankYouProps) => { 
  const productData = await fetchProducts();
  const params = await searchParams

  const extractedParams: PaymentQueryParams = {
    success: params.success === 'true', 
    integrationId: params.integration_id || undefined,
    orderId: params.order || undefined, 
    pending: params.pending === 'true', 
    is3DSecure: params.is_3d_secure || undefined,
    pay_methodType: params["source_data.type"] || undefined,
    cardLastDigits: params["source_data.pan"] || undefined,
    paymethod_sub_type: params["source_data.sub_type"] || undefined
  };

  console.log(params, "extractedParams from ThankYou") 

  return (
    <>
      <Breadcrumb title="Thank You" />
      <ThankYouComp extractedParams={extractedParams} />
      <RelatedSlider  products={productData.slice(0, 5)} />
    </>
  );
};

export default ThankYou;
