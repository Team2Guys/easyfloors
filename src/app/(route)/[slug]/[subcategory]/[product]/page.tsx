import React from "react";
import { fetchProducts, fetchSubCategories } from "config/fetch";
import ProductDetail from "./ProductDetail";

const Product = async ({params}:{params:Promise<{slug:string, subcategory: string, product:string}>}) => {
  const {slug , subcategory , product} = await params;
   const [ subCategories , ProductInfo ] = await Promise.all([ fetchSubCategories() ,fetchProducts()]);
  const products = subCategories?.products || [];
 
  console.log(ProductInfo,"subCategories")

  return (
    <ProductDetail MainCategory={slug} subCategory={subcategory} product={product} ProductInfo={ProductInfo} products={products} subCat={subCategories}/>
  );
};

export default Product;