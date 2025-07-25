import AccessoriesComp from 'components/Accessories/Accessories';
import Breadcrumb from 'components/Reusable/breadcrumb';
import { fetchSingleCategory } from 'config/fetch';
import { defaultOrder } from 'data/accessory';
import { FIND_ONE_Accessory } from 'graphql/queries';
import { Metadata } from 'next';
import { headers } from 'next/headers';
import { notFound } from 'next/navigation';
import React from 'react';

export async function generateMetadata(): Promise<Metadata> {

  const Category = await fetchSingleCategory("accessories")
  if (!Category) return notFound()
  const headersList = await headers();
  const domain = headersList.get('x-forwarded-host') || headersList.get('host') || '';
const protoHeader = headersList.get('x-forwarded-proto');
const protocol = protoHeader && protoHeader.startsWith('https') ? 'https' : 'https';
  const pathname = headersList.get('x-invoke-path') || '/';

  const fullUrl = `${protocol}://${domain}${pathname}`;

  const ImageUrl =
    Category?.posterImageUrl.imageUrl ||
    'Easy Floor';
  const alt =
    Category?.posterImageUrl.altText ||
    'Easy Floor';

  const NewImage = [
    {
      url: ImageUrl,
      alt: alt,
    },
  ];
  const title =
    Category?.Meta_Title ||
    'Easy Floor';
  const description =
    Category?.Meta_Description ||
    'Welcome to Easy Floor';
  const url = `${fullUrl}${Category?.custom_url}`;
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
        Category?.Canonical_Tag || url,
    },
  };
}



const Accessories = async () => {
  const category = await fetchSingleCategory("accessories", FIND_ONE_Accessory, true)
  if (!category || category.status !== "PUBLISHED") {
    return notFound();
  }
  const publishedAccessories = (category.accessories || []).filter(
    acc => acc.status === "PUBLISHED"
  );
  const sortedAccessories = publishedAccessories.slice().sort((a, b) => {
    const indexA = defaultOrder.indexOf(a?.name || "");
    const indexB = defaultOrder.indexOf(b?.name || "");
    const safeIndexA = indexA === -1 ? Number.MAX_SAFE_INTEGER : indexA;
    const safeIndexB = indexB === -1 ? Number.MAX_SAFE_INTEGER : indexB;
    return safeIndexA - safeIndexB;
  });

  return (
    <>
      <Breadcrumb image={category.whatAmiImageBanner?.imageUrl} altText={category.whatAmiImageBanner?.altText || "Accessories"}  slug='ACCESSORIES' isImagetext />
      <AccessoriesComp product={sortedAccessories || []} category={category} />
    </>
  );
};

export default Accessories;
