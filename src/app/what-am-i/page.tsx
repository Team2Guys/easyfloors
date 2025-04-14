import Breadcrumb from 'components/Reusable/breadcrumb'
import WhatAmICetagory from 'components/WhatAmICetagory/WhatAmICetagory'
import { fetchSubCategories } from 'config/fetch';
import { FETCH_ALL_WHAT_AM_I } from 'graphql/queries';
import { notFound } from 'next/navigation';
import React from 'react'
import { ISUBCATEGORY } from 'types/cat';
import { TrimerHandler } from 'utils/helperFunctions';
interface SlugPageProps {
  searchParams: Promise<{ flooring?: string }>;
}


const Whatami = async ({ searchParams }: SlugPageProps) => {
  const { flooring } = await searchParams
  const subCategories = await fetchSubCategories(FETCH_ALL_WHAT_AM_I)

  if (!flooring) {
    return notFound()
  }

  const subcat = subCategories.find((value: ISUBCATEGORY) => TrimerHandler(value?.whatIamEndpoint || value.custom_url) == TrimerHandler(flooring))


  return (
    <>
      <Breadcrumb title="What Am I?" image={subcat.whatAmiImageBanner ? subcat.whatAmiImageBanner.imageUrl : "/assets/category/header-image.png"}
        altText={subcat.whatAmiImageBanner && subcat.whatAmiImageBanner?.altText}
      />
      <WhatAmICetagory subcat={subcat} />
    </>
  )
}

export default Whatami
