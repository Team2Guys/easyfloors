"use client"
import Container from 'components/common/container/Container'
import React from 'react'
import { CiHeart } from 'react-icons/ci'
import ProductTable from '../../components/product-table'
import WishlistSmall from '../../components/smallscreen'
import Top from '../../components/top'
import Breadcrumb from 'components/Reusable/breadcrumb'

const Wishlist = () => {
  return (
   <>
  <Breadcrumb title="Wishlist" />
  <Container>
   <Top heading="Wishlist" Icon={CiHeart} />
   <div className="hidden md:block pb-6 xl:pt-6 xl:mb-10">
   <ProductTable 
  columns={["Product", "Price Per Box", "QTY(m/m2)", "Stock Status", "Action"]}
   />
   </div>
   <div className="block md:hidden">
   <WishlistSmall />
   </div>
    </Container>
    </>
  )
}

export default Wishlist