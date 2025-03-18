"use client"
import Container from 'components/common/container/Container'
import React from 'react'
import Top from './top'
import { CiHeart } from 'react-icons/ci'
import ProductList from './productlist'


const Wishlist = () => {
  return (
    <Container>
   <Top heading="Wishlist" Icon={CiHeart} />
      <ProductList />
    </Container>
  )
}

export default Wishlist