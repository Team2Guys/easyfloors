import Breadcrumb from "components/Reusable/breadcrumb";
import { fetchCategories, fetchSubCategories } from "config/fetch";
import { FETCHSUBCAT } from "graphql/queries";
import React from "react";
import { Metadata } from 'next';
import { filterAndSort } from "lib/helperFunctions";
import Collections from "./Collections";
export const metadata: Metadata = {
  title: 'SPC & LVT Flooring Collection UAE | Easy Floors Dubai',
  description:
    "Browse Easy Floors’ premium SPC and LVT flooring collections. From herringbone to luxury vinyl, durable, stylish floors for homes and commercial spaces.",
  openGraph: {
    title: 'SPC & LVT Flooring Collection UAE | Easy Floors Dubai',
    description: "Browse Easy Floors’ premium SPC and LVT flooring collections. From herringbone to luxury vinyl, durable, stylish floors for homes and commercial spaces.",
    url: '/collections',
    images: [{url: "/assets/images/logo.webp", alt: 'Easyfloors',
      },
    ],
  },
  alternates: {
    canonical: '/collections',
  },
};

const AllCollection = async ({ params }: { params: Promise<{ slug: string }> }) => {
  const { slug } = await params;
  const [subcategories, categories] = await Promise.all([fetchSubCategories(FETCHSUBCAT), fetchCategories()]);
  const polarProducts = filterAndSort(subcategories, "POLAR FLOORING", "");
  const richmondSPC = filterAndSort(subcategories, "RICHMOND FLOORING", "spc");
  const richmondLVT = filterAndSort(subcategories, "RICHMOND FLOORING", "lvt");
  const sortedSubcategories = [...polarProducts, ...richmondSPC, ...richmondLVT];
console.log(sortedSubcategories,'sortedSubcategories')
  return (
    <div>
      <Breadcrumb title="All Collections" image='/assets/images/category/allcollection.png' />
      <Collections sortedSubcategories={sortedSubcategories} categories={categories} slug={slug} />
    </div>
  );
};

export default AllCollection;
