import React from "react";
import { fetchProducts } from "config/fetch";
import ProductDetail from "./ProductDetail";

const Product = async ({params}:{params:Promise<{slug:string, subcategory: string, product:string}>}) => {
  const {slug , subcategory , product} = await params;
   const [ ProductInfo ] = await Promise.all([ fetchProducts()]);
  return (
    <ProductDetail MainCategory={slug} subCategory={subcategory} ProductName={product} ProductInfo={ProductInfo} />
  );
};

export default Product;