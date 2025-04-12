
import React from 'react';
import { fetchAccessories, getMetaTitleData } from 'config/fetch';
import { IProduct } from "types/prod";
import { notFound } from "next/navigation";
import AccessoriesDetail from "./AccessoriesDetail";
import { headers } from 'next/headers';
import { Metadata } from 'next';

interface IParams { product: string }

export async function generateMetadata({ params }: { params: Promise<IParams> }): Promise<Metadata> {
  const { product: paramsprod } = await params;
  const productData = await getMetaTitleData(paramsprod.trim(), "accessories",)

  if (!productData) return notFound()

  const headersList = await headers();
  const domain = headersList.get('x-forwarded-host') || headersList.get('host') || '';
  const protocol = headersList.get('x-forwarded-proto') || 'https';
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
  const url = `${fullUrl}accessories/${paramsprod}`;
  return {
    title: title,
    description: description,
    openGraph: {
      title: title,
      description: description,
      url: url,
      images: NewImage,
    },
    alternates: {
      canonical:
        productData?.Canonical_Tag || url,
    },
  };
}

const ProductImageGallery = async ({ params }: { params: Promise<IParams> }) => {
  const { product: paramsprod } = await params;
  const ProductInfo = await fetchAccessories();
  const productData = ProductInfo.find((product: IProduct) => (product?.custom_url?.trim() == paramsprod?.trim() && product?.category?.custom_url?.trim() === "accessories"));
  if (!productData) return notFound()
  return (
    <AccessoriesDetail ProductName={paramsprod} ProductInfo={ProductInfo} productData={productData} />
  );
};

export default ProductImageGallery;



