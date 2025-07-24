import Breadcrumb from "components/Reusable/breadcrumb";
import { fetchCategories, fetchSubCategories } from "config/fetch";
import { FETCHSUBCAT } from "graphql/queries";
import React from "react";
import { filterAndSort } from "lib/helperFunctions";
import Collections from "./Collections";
import { createMetadata } from 'utils/metadataHelper';
import { pageMetadataData } from 'data/meta-data';
import NotFound from "app/not-found";
import { ICategory } from "types/type";
export const metadata = createMetadata(pageMetadataData.collections);

const AllCollection = async ({ params }: { params: Promise<{ slug: string }> }) => {
  const { slug } = await params;
  const [subcategories, categories] = await Promise.all([fetchSubCategories(FETCHSUBCAT), fetchCategories()]);
  const categoriesData = categories
  .filter((cat: ICategory) => cat.status === "PUBLISHED")
  .map((cat: ICategory) => ({
    ...cat,
    subcategories: cat.subcategories?.filter(
      (sub: ICategory) => sub.status === "PUBLISHED"
    ) || [],
  }));
  const polarProducts = filterAndSort(subcategories, "POLAR FLOORING", "");
  const richmondSPC = filterAndSort(subcategories, "RICHMOND FLOORING", "spc");
  const richmondLVT = filterAndSort(subcategories, "RICHMOND FLOORING", "lvt");
  const sortedSubcategories = [...polarProducts, ...richmondSPC, ...richmondLVT];
  if (sortedSubcategories.length === 0) {
    return NotFound();
  }
  return (
    <div>
      <Breadcrumb title="All Collections" useHeadingTag image='/assets/images/category/allcollection.png' />
      <Collections sortedSubcategories={sortedSubcategories} categories={categoriesData} slug={slug} />
    </div>
  );
};

export default AllCollection;
