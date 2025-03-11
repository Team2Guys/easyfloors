import React from "react";
import ProductPage from "./ProductPage";
import { fetchProducts } from "config/fetch";

const Product = async () => {
  const [product] = await Promise.all([

    fetchProducts(),
    
  ]);

  return (
   <ProductPage ProductInfo={product}/>
  );
};

export default Product;
