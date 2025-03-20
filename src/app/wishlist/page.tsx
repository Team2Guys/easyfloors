"use client"
import Container from 'components/common/container/Container'
import React from 'react'
import { CiHeart } from 'react-icons/ci'
import Top1 from './top'
import ProductTable from './product-table'
import WishlistSmall from './smallscreen'

const productData = [
  { id: 1, name: "Richmond Comfort LVT - Forest", image: "/assets/images/Wishlist/img.png", price: "AED 100", stock: 10, quantity: 2 },
  { id: 2, name: "Richmond Comfort LVT - American Walnut", image: "/assets/images/Wishlist/img.png", price: "AED 100", stock: 5, quantity: 2 },
  { id: 3, name: "Richmond Comfort LVT - Mahogany", image: "/assets/images/Wishlist/img.png", price: "AED 100", stock: 8, quantity: 2 },
  { id: 4, name: "Richmond Comfort LVT - Forest", image: "/assets/images/Wishlist/img.png", price: "AED 100", stock: 10, quantity: 2 },
  { id: 5, name: "Richmond Comfort LVT - Forest", image: "/assets/images/Wishlist/img.png", price: "AED 100", stock: 10, quantity: 2 },
  { id: 6, name: "Richmond Comfort LVT - Forest", image: "/assets/images/Wishlist/img.png", price: "AED 100", stock: 10, quantity: 2 },
];


const Wishlist = () => {
  return (
    <Container>
   <Top1 heading="Wishlist" Icon={CiHeart} />
   <div className="hidden md:block pb-6 xl:pt-6 xl:mb-10">
   <ProductTable 
  columns={["Product", "Price Per Box", "QTY(m/m2)", "Stock Status", "Action"]}
  products={productData}
   />
   </div>
   <div className="block md:hidden">
   <WishlistSmall />
   </div>
    </Container>
  )
}

export default Wishlist