"use client"
import AccessoriesContainer from 'components/accessoriesDetailProduct/AccessoriesContainer'
import Container from 'components/common/container/Container'
const AdditionalInfo = dynamic(()=> import("components/product-detail/additional-information"),{ssr: false});
const FaqDetail = dynamic(()=> import("components/product-detail/faq-detail"),{ssr: false});
const Features = dynamic(()=> import("components/Reusable/features"),{ssr: false});
import RelatedSlider from 'components/related-slider/related-slider'
import Breadcrumb from 'components/Reusable/breadcrumb'
import { featureItems } from 'data/data'
import dynamic from 'next/dynamic';
import React from 'react'
import { IProduct } from 'types/prod'
import { detailprops } from 'types/product-detail'

const AccessoriesDetail = ({ProductName,ProductInfo, productData}:detailprops) => {

  return (
    <>
    <Breadcrumb subcategory="accessories" title={ProductName}/>
    <AccessoriesContainer productData={productData as IProduct} />
    <Container>
    <div className="mb-10 max-w-[95%] sm:max-w-[90%] lg:max-w-[80%] mx-auto">
      <AdditionalInfo description={productData.description || ""} AdditionalInformation={productData.AdditionalInformation} subcategory={productData.subcategory?.name || ""} />
      <FaqDetail FAQS={productData.FAQS} />
    </div>
  
    </Container>
    <Features items={featureItems} />
    <RelatedSlider products={ProductInfo?.slice(0,5) || []} isAccessories/>
    </>
  )
}

export default AccessoriesDetail