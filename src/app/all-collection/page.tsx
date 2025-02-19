import CollectionCard from "components/CollectionCard/CollectionCard";
import Breadcrumb from "components/Reusable/breadcrumb";
import { collectionFeatures, collectionProducts } from "data/data";
import React from "react";
import { CollectionProduct } from "types/type";

const AllCollection: React.FC = () => {
  return (
    <div>
      <Breadcrumb title="All Collection" image='/assets/images/category/allcollection.png' />
      <div className="container mx-auto px-4 md:mt-10 mt-8 ">
        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 md:gap-6 gap-2">
          {collectionProducts.map((collectionProduct: CollectionProduct) => (
            <div key={collectionProduct.id}    className="max-w-sm w-full">
              <CollectionCard product={collectionProduct} features={collectionFeatures} />
            </div>
          ))}
        </div>
      </div>
    </div>

  );
};

export default AllCollection;
