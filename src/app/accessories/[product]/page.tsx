
import React from 'react';
import { fetchAccessories } from 'config/fetch';
import { IProduct } from "types/prod";
import { notFound } from "next/navigation";
import AccessoriesDetail from "./AccessoriesDetail";
import { headers } from 'next/headers';
import { Metadata } from 'next';
import { gql } from '@apollo/client';
import client from 'config/apolloClient';


interface IParams { product: string }

const FETCH_META_TITLE = gql`
  query FetchMetaTitle($custom_url: String!, $category: String!) {
    fetchMetatTitle(custom_url: $custom_url, category: $category) {
        name
        Canonical_Tag
        Meta_Description
        Meta_Title
        posterImageUrl,

    }
  }
`;

export const getMetaTitleData = async (custom_url: string, category: string) => {
  try {
    const { data } = await client.query({
      query: FETCH_META_TITLE,
      variables: {
        custom_url,
        category,
      },
    });
    return data?.fetchMetatTitle;
  
  } catch (error: any) { //eslint-disable-line
    // Log complete error structure

    // Extract useful error details
    if (error?.graphQLErrors?.length) {
      console.error("GraphQL Error:", error.graphQLErrors[0].message);
    } else if (error?.networkError?.result?.errors?.length) {
      console.error("Network Error:", error.networkError.result.errors[0].message);
    } else {
      console.error("Unknown Apollo error:", error.message);
    }

    return null;
  }
};


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
