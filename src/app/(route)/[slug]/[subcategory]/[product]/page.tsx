import React from "react";
import { fetchProducts, fetchSubCategories } from "config/fetch";
import ProductDetail from "./ProductDetail";

const Product = async ({params}:{params:Promise<{slug:string, subcategory: string, product:string}>}) => {
  const {slug , subcategory , product} = await params;
  const subCategories = await fetchSubCategories()
  const ProductInfo = await fetchProducts()
  const products = subCategories?.products || [];


  return (
    <ProductDetail slug={slug} subCategory={subcategory} product={product} ProductInfo={ProductInfo} products={products} subCat={subCategories}/>
  );
};

export default Product;