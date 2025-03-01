"use client"
import Breadcrumb from 'components/Reusable/breadcrumb'
import React from 'react'
import { useParams } from 'next/navigation'

const Product = () => {
  const params = useParams<{ slug: string; subcategory: string,product:string }>();
  const title = params.product;
  const category = params.slug;
  const subcategory = params.subcategory;

  console.log(params, "params");

 
  return (
    <div>
      <Breadcrumb title={title} slug={category} subcategory={subcategory} />
      Product
    </div>
  )
}

export default Product