import Breadcrumb from 'components/Reusable/breadcrumb'
import WhatAmICetagory from 'components/WhatAmICetagory/WhatAmICetagory'
import { fetchSubCategories } from 'config/fetch';
import { notFound } from 'next/navigation';
import React from 'react'
import { ISUBCATEGORY } from 'types/cat';
import {TrimerHandler } from 'utils/helperFunctions';
interface SlugPageProps {
  searchParams: Promise<{ subcategory?: string}>;
}


const Whatami = async({searchParams}:SlugPageProps) => {
const {subcategory} = await searchParams
const subCategories = await fetchSubCategories()

if(!subcategory){
  return notFound()
}

const subcat = subCategories.find((value:ISUBCATEGORY)=>TrimerHandler(value.custom_url)==TrimerHandler(subcategory))

  return (
 <>
    <Breadcrumb title="What Am I?" image={subcat.whatAmiImageBanner ? subcat.whatAmiImageBanner.imageUrl  :"/assets/category/header-image.png"} />
    <WhatAmICetagory subcat={subcat} />
 </>
  )
}

export default Whatami
