import CollectionCard from "components/CollectionCard/CollectionCard";
import Breadcrumb from "components/Reusable/breadcrumb";
import { fetchSubCategories } from "config/fetch";
import { FETCHSUBCAT } from "graphql/queries";
import React from "react";
import {ISUBCATEGORY } from "types/cat";

const AllCollection= async () => {
  const [subcategories]= await Promise.all([fetchSubCategories(FETCHSUBCAT)])
  return (
    <div>
      <Breadcrumb title="All Collection" image='/assets/images/category/allcollection.png' />
      <div className="container mx-auto px-4 md:mt-10 mt-8 ">
        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 md:gap-6 gap-2 justify-items-center place-items-center  w-full mx-auto">
          {subcategories && subcategories.map((subcategory: ISUBCATEGORY, index:number) => (
            <div key={index} >
              <CollectionCard subcategory={subcategory}  />
            </div>
          ))}
        </div>

      </div>
    </div>

  );
};

export default AllCollection;
