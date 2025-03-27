'use client'
import Container from 'components/common/container/Container'
import SkirtingProductDetail from 'components/product-detail/productinfo'
import Thumbnail from 'components/product-detail/thumbnail'
import React, { useEffect, useState } from 'react'
import { IProduct, ProductImage } from 'types/prod'

const AccessoriesContainer = ({ productData }: { productData: IProduct }) => {
   const [image, setActiveImage] = useState(productData?.productImages?.[0] || undefined);
   const [colorImages, setColorImages] = useState<ProductImage[] | undefined>([]);
   const [selectedColor, setSelectedColor] = useState<ProductImage | undefined>()

   useEffect(() => {
      if (selectedColor) {
         const filterImages = productData.featureImages?.filter((item) => item.color === selectedColor.color)
         setColorImages(filterImages)
         setActiveImage(filterImages?.[0])
      }else {
         setActiveImage(productData?.productImages?.[0])
      }

   }, [selectedColor])
   return (
      <Container className='py-4'>
         <div className="flex flex-col lg:flex-row">
            <div className="w-full lg:w-[60%]">
               <Thumbnail ThumnailImage={colorImages?.length ? colorImages : productData.productImages || []} hideThumnailBottom imageheight onImageChange={setActiveImage} />
            </div>
            <div className="w-full lg:w-[40%]">
               <SkirtingProductDetail productData={productData} image={image} MainCategory="Accessories" setSelectedColor={setSelectedColor} selectedColor={selectedColor} />
            </div>
         </div>
      </Container>
   )
}

export default AccessoriesContainer