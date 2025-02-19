import CollectionCard from "components/CollectionCard/CollectionCard";
import React from "react";
import { ProductCardProps } from "types/type";

const AllCollection: React.FC<ProductCardProps> = (props) => {
  return <CollectionCard {...props} />;
};

export default AllCollection;
