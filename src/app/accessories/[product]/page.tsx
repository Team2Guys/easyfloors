
import React from 'react';
import { fetchAccessories } from 'config/fetch';
import { IProduct } from "types/prod";
import { notFound } from "next/navigation";
import AccessoriesDetail from "./AccessoriesDetail";

interface IParams {product: string }

const ProductImageGallery = async ({ params }: { params: Promise<IParams> }) => {
  const { product: paramsprod } = await params;
  const ProductInfo = await fetchAccessories();
  const productData = ProductInfo.find((product: IProduct) => (product?.custom_url?.trim() == paramsprod?.trim() && product?.category?.custom_url?.trim() === "accessories"));
    if (!productData) return notFound()
  return (
    <AccessoriesDetail  ProductName={paramsprod} ProductInfo={ProductInfo} productData={productData}/>
  );
};

export default ProductImageGallery;
