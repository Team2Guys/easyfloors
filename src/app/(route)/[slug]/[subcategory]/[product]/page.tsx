import React from "react";
import { fetchProducts, fetchSingeProduct } from "config/fetch";
import ProductDetail from "./ProductDetail";
import { IProduct } from "types/prod";
import { notFound } from "next/navigation";
import { Metadata } from "next";
import { headers } from "next/headers";

interface IParams { slug: string, subcategory: string, product: string }

export async function generateMetadata({ params }: { params: Promise<IParams> }): Promise<Metadata> {
  const { slug, subcategory, product: paramsprod } = await params;
  const productData = await fetchSingeProduct(paramsprod.trim(),slug.trim(), subcategory.trim())   
  if (!productData) return notFound()

  const headersList = await headers();
  const domain = headersList.get('x-forwarded-host') || headersList.get('host') || '';
const protoHeader = headersList.get('x-forwarded-proto');
const protocol = protoHeader && protoHeader.startsWith('https') ? 'https' : 'https';
  const pathname = headersList.get('x-invoke-path') || '/';

  const fullUrl = `${protocol}://${domain}${pathname}`;

  const ImageUrl =
    productData?.posterImageUrl.imageUrl ||
    'Easy Floor';
  const alt =
    productData?.posterImageUrl.altText ||
    'Easy Floor';

  const NewImage = [
    {
      url: ImageUrl,
      alt: alt,
    },
  ];
  const title =
    productData?.Meta_Title ||
    'Easy Floor';
  const description =
    productData?.Meta_Description ||
    'Welcome to Easy Floor';
  const url = `${fullUrl}${slug}/${subcategory}/${paramsprod}`;
  return {
    title: title,
    description: description,
    openGraph: {
      title: title,
      description: description,
      url: url,
      images: NewImage,
            type:'website'

    },
    alternates: {
      canonical:
        productData?.Canonical_Tag || url,
    },
  };
}


const Product = async ({ params }: { params: Promise<IParams> }) => {
  const { slug, subcategory, product: paramsprod } = await params;
  const [ProductInfo] = await Promise.all([fetchProducts()]);
  const productData = ProductInfo.find((product: IProduct) => (product?.custom_url?.trim() == paramsprod?.trim() && product?.category?.RecallUrl?.trim() === slug) && product.subcategory?.custom_url?.trim() == subcategory);
  if (!productData) return notFound()

   const products = ProductInfo.filter((product: IProduct) => (product?.category?.RecallUrl?.trim() === slug) && product.subcategory?.custom_url?.trim() == subcategory);

  return (
    <ProductDetail MainCategory={slug} subCategory={subcategory} ProductName={paramsprod} ProductInfo={products} productData={productData} />
  );
};

export default Product;