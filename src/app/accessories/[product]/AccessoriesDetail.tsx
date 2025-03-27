"use client"
import Container from 'components/common/container/Container'
import AdditionalInfo from 'components/product-detail/additional-information'
import FaqDetail from 'components/product-detail/faq-detail'
import SkirtingProductDetail from 'components/product-detail/productinfo'
import Thumbnail from 'components/product-detail/thumbnail'
import RelatedSlider from 'components/related-slider/related-slider'
import Breadcrumb from 'components/Reusable/breadcrumb'
import Features from 'components/Reusable/features'
import { featureItems } from 'data/data'
import React, { useEffect, useState } from 'react'
import { ProductImage } from 'types/prod'
import { detailprops } from 'types/product-detail'

const AccessoriesDetail = ({ProductName,ProductInfo, productData}:detailprops) => {
  const [image, setActiveImage] = useState(productData?.productImages?.[0] || undefined);
  const [colorImages, setColorImages] = useState<ProductImage[] | undefined>([]);
  const [ selectedColor , setSelectedColor] = useState<ProductImage | undefined>()
  console.log(productData,'productData',selectedColor)

  useEffect(() => {
    if(selectedColor){
      const filterImages = productData.featureImages?.filter((item) => item.color === selectedColor.color)
      setColorImages(filterImages)
      setActiveImage(filterImages?.[0])
    }

  },[selectedColor])
  return (
    <>
    <Breadcrumb slug="Accessories" title={ProductName}/>
    <Container>
    <div className="flex flex-col lg:flex-row">
    <div className="w-full lg:w-[60%]">
    <Thumbnail ThumnailImage={colorImages || productData.productImages || []}  hideThumnailBottom imageheight onImageChange={setActiveImage} />
    </div>
    <div className="w-full lg:w-[40%]">
    <SkirtingProductDetail productData={productData} image={image} MainCategory="Accessories" setSelectedColor={setSelectedColor} selectedColor={selectedColor} />
    </div>
    </div>
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