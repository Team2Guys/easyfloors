"use client"
import ProductTable from 'components/product-table';
import WishlistSmall from 'components/smallscreen';
import Top1 from 'components/top'
import Container from 'components/common/container/Container'
import Image from 'next/image';
import React from 'react'
import Breadcrumb from 'components/Reusable/breadcrumb';

const FreeSample = () => {
  return (
    <>
    <Breadcrumb title="Free Samples" />
    <Container>
   <Top1 heading="Free Samples" Icon={() => <Image src="/assets/images/Wishlist/sample.svg" alt="Sample" width={24} height={24} className="h-10 w-10 lg:h-14 lg:w-14" />}/>
   <div className=" hidden md:block pb-6 xl:pt-6 xl:mb-10">
   <ProductTable
        columns={["Product", "Price Per Piece", "Stock Status", "Action"]}
        isSamplePage 
   />
   </div>
   <div className="block md:hidden">
   <WishlistSmall />
   </div>
    </Container>
    </>
  )
}

export default FreeSample