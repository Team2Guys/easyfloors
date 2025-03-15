"use client";
import Card from "components/Card/Card";
import Container from "components/common/container/Container";
import Select from "components/ui/Select";
import { accessoriesText, features } from "data/data";
import React, { useState, useEffect } from "react";
import { IProduct } from "types/prod";

interface ProductCardProps {
  product: IProduct[];
}

const AccessoriesComp: React.FC<ProductCardProps> = ({ product }) => {
  const [sortOption, setSortOption] = useState<string>("Default");
  const [sortedProducts, setSortedProducts] = useState<IProduct[]>(product);

  useEffect(() => {
    let sortedArray = [...product];
    switch (sortOption) {
      case "A to Z":
        sortedArray.sort((a, b) => a.name.localeCompare(b.name));
        break;
      case "Z to A":
        sortedArray.sort((a, b) => b.name.localeCompare(a.name));
        break;
      case "Low to High":
        sortedArray.sort((a, b) => (a.price ?? 0) - (b.price ?? 0));
        break;
      case "High to Low":
        sortedArray.sort((a, b) => (b.price ?? 0) - (a.price ?? 0));
        break;
      default:
        sortedArray = product;
    }

    setSortedProducts(sortedArray);
  }, [sortOption, product]);

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
        {sortedProducts?.map((product, index) => (
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
