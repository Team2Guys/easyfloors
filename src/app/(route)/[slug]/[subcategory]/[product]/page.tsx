import React from "react";
import { fetchProducts } from "config/fetch";
import ProductDetail from "./ProductDetail";
import { IProduct } from "types/prod";
import { notFound } from "next/navigation";

const Product = async ({ params }: { params: Promise<{ slug: string, subcategory: string, product: string }> }) => {
  const { slug, subcategory, product: paramsprod } = await params;
  const [ProductInfo] = await Promise.all([fetchProducts()]);
  const productData = ProductInfo.find((product: IProduct) => (product?.custom_url?.trim() == paramsprod?.trim() && product?.category?.RecallUrl?.trim() === slug) && product.subcategory?.custom_url?.trim() == subcategory);
  if (!productData) return notFound()
  return (
    <ProductDetail MainCategory={slug} subCategory={subcategory} ProductName={paramsprod} ProductInfo={ProductInfo} productData={productData} />
  );
};

export default Product;