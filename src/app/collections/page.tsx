import CollectionCard from "components/CollectionCard/CollectionCard";
import Container from "components/common/container/Container";
import Breadcrumb from "components/Reusable/breadcrumb";
import { fetchSubCategories } from "config/fetch";
import { FETCHSUBCAT } from "graphql/queries";
import React from "react";
import {ISUBCATEGORY } from "types/cat";
import { Metadata } from 'next';
export const metadata: Metadata = {
  title: 'SPC & LVT Flooring Collection UAE | Easy Floors Dubai',
  description:
    "Browse Easy Floors’ premium SPC and LVT flooring collections. From herringbone to luxury vinyl, durable, stylish floors for homes and commercial spaces.",
  openGraph: {
    title: 'SPC & LVT Flooring Collection UAE | Easy Floors Dubai',
    description: "Browse Easy Floors’ premium SPC and LVT flooring collections. From herringbone to luxury vinyl, durable, stylish floors for homes and commercial spaces.",
    url: '/collections',
    images: [{url: "/assets/images/logo.png", alt: 'Easyfloors',
      },
    ],
  },
  alternates: {
    canonical: '/collections',
  },
};
const AllCollection= async () => {
  const [subcategories]= await Promise.all([fetchSubCategories(FETCHSUBCAT)])
  return (
    <div>
      <Breadcrumb title="All Collections" image='/assets/images/category/allcollection.png' />
      <Container className="md:mt-10 mt-8 mb-10">
        <div className="grid grid-cols-2 md:grid-cols-3 md:gap-6 gap-2 w-full">
          {subcategories && subcategories.map((subcategory: ISUBCATEGORY, index:number) => (
            <div key={index} >
              <CollectionCard subcategory={subcategory}  />
            </div>
          ))}
        </div>

      </Container>
    </div>

  );
};

export default AllCollection;
