"use client";
import Card from "components/Card/Card";
import Container from "components/common/container/Container";
import Select from "components/ui/Select";
import { accessoriesText, features } from "data/data";
import React, { useState } from "react";
import { IProduct } from "types/prod";

interface ProductCardProps {
  product: IProduct[];
}

const AccessoriesComp: React.FC<ProductCardProps> = ({ product }) => {
  const [sortOption, setSortOption] = useState<string>("Default");

  return (
    <Container>
      <div className="lg:mt-14 mt-5 py-4 font-inter">
        <p className="text-lg leading-relaxed" dangerouslySetInnerHTML={{ __html: accessoriesText }} />
      </div>
      <div className="flex items-center justify-end gap-2 lg:py-8">
        <span className="text-[#191C1F] text-14 hidden lg:block">Sort by:</span>
        <Select
          options={["Default", "A to Z", "Z to A", "Low to High", "High to Low"]}
          onChange={setSortOption}
          sortOption={sortOption}
        />
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 lg:mb-16">
        {product?.map((product, index) => (
          <Card 
            key={index} 
            product={product} 
            categoryData={product.category} 
            isAccessories 
            isSoldOut={index === 0}
            features={features}
          />
        ))}
      </div>
    </Container>
  );
};

export default AccessoriesComp;
