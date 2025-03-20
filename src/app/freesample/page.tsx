"use client"
import ProductTable from 'app/wishlist1/product-table';
import Top1 from 'app/wishlist1/top'
import Container from 'components/common/container/Container'
import React from 'react'
import { CiHeart } from 'react-icons/ci'


const productData = [
    { id: 1, name: "Richmond Comfort LVT - Forest", image: "/assets/images/Wishlist/img.png", price: "AED 100", stock: 10, quantity: 2 },
    { id: 2, name: "Richmond Comfort LVT - American Walnut", image: "/assets/images/Wishlist/img.png", price: "AED 100", stock: 5, quantity: 2 },
    { id: 3, name: "Richmond Comfort LVT - Mahogany", image: "/assets/images/Wishlist/img.png", price: "AED 100", stock: 8, quantity: 2 },
    { id: 4, name: "Polar Herringbone SPC - Antique", image: "/assets/images/Wishlist/img.png", price: "AED 120", stock: 12, quantity: 1 },
  { id: 5, name: "Polar Herringbone SPC - Weathered Oak", image: "/assets/images/Wishlist/img.png", price: "AED 110", stock: 6, quantity: 3 },
  { id: 6, name: "Polar Herringbone SPC - Weathered Oak", image: "/assets/images/Wishlist/img.png", price: "AED 110", stock: 6, quantity: 3 },
  ];

const FreeSample = () => {
  return (
    <Container>
   <Top1 heading="Free Samples" Icon={CiHeart} />
   <div className="p-6">
   <ProductTable
        columns={["Product", "Price Per Piece", "Stock Status", "Action"]}
        products={productData}
        isSamplePage 
   />
   </div>
    </Container>
  )
}

export default FreeSample