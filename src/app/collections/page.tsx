import Breadcrumb from "components/Reusable/breadcrumb";
import { fetchCategories, fetchSubCategories } from "config/fetch";
import { FETCHSUBCAT } from "graphql/queries";
import React from "react";
import { filterAndSort } from "lib/helperFunctions";
import Collections from "./Collections";
import { createMetadata } from 'utils/metadataHelper';
import { pageMetadataData } from 'data/meta-data';
export const metadata = createMetadata(pageMetadataData.collections);

const AllCollection = async ({ params }: { params: Promise<{ slug: string }> }) => {
  const { slug } = await params;
  const [subcategories, categories] = await Promise.all([fetchSubCategories(FETCHSUBCAT), fetchCategories()]);
  const polarProducts = filterAndSort(subcategories, "POLAR FLOORING", "");
  const richmondSPC = filterAndSort(subcategories, "RICHMOND FLOORING", "spc");
  const richmondLVT = filterAndSort(subcategories, "RICHMOND FLOORING", "lvt");
  const sortedSubcategories = [...polarProducts, ...richmondSPC, ...richmondLVT];
  return (
    <div>
      <Breadcrumb title="All Collections" useHeadingTag image='/assets/images/category/allcollection.png' />
      <Collections sortedSubcategories={sortedSubcategories} categories={categories} slug={slug} />
    </div>
  );
};

export default AllCollection;
