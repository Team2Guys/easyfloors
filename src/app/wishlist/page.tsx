import dynamic from 'next/dynamic';
import React from 'react'
import { CiHeart } from 'react-icons/ci'
// Dynamic Imports
const ProductTable = dynamic(() => import("components/product-table"));
const WishlistSmall = dynamic(() => import("components/smallscreen"));
const Container = dynamic(() => import("components/common/container/Container"));
const Breadcrumb = dynamic(() => import("components/Reusable/breadcrumb"));
const Top = dynamic(() => import("components/top"));

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
        <div className="block md:hidden mb-5">
          <WishlistSmall/>
        </div>
      </Container>
    </>
  )
}

export default Wishlist