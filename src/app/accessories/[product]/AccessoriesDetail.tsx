"use client"
import AccessoriesContainer from 'components/accessoriesDetailProduct/AccessoriesContainer'
import Container from 'components/common/container/Container'
import AdditionalInfo from 'components/product-detail/additional-information'
import FaqDetail from 'components/product-detail/faq-detail'
import RelatedSlider from 'components/related-slider/related-slider'
import Breadcrumb from 'components/Reusable/breadcrumb'
import Features from 'components/Reusable/features'
import { featureItems } from 'data/data'
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
    <RelatedSlider products={ProductInfo.slice(0,5)} isAccessories/>
    </>
  )
}

export default AccessoriesDetail