"use client"
import Card from "components/Card/Card";
import { features } from "data/data";
import React, { useEffect, useState } from "react";
import { FiX } from "react-icons/fi";
import { FilterState } from "types/cat";
import { SubCategoryProps } from "types/types";

const SubCategory: React.FC<SubCategoryProps> = ({ filteredProducts,
  selectedFilters,
  setSelectedProductFilters,
  setIsWaterProof,
  categoryData,
}) => {
  const [products, setProducts] = useState(filteredProducts);
  useEffect(() => {
    if (filteredProducts) {
      setProducts(filteredProducts)
    }
  }, [filteredProducts])

  const handleRemoveFilter = (item: { name: "isWaterProof"; value: boolean }
    | { name: keyof FilterState; value: string }) => {
    if (item.name === "isWaterProof") {
      setIsWaterProof(null)
    } else {
      setSelectedProductFilters((prevFilters) => ({
        ...prevFilters,
        [item.name]: (prevFilters[item.name] as string[]).filter(
          (val) => val !== item.value
        ),
      }));
    }
  };
  return (
    <div className="pt-5 lg:mb-20">

      <div className={`flex ${selectedFilters.length > 0 ? 'justify-between items-center' : 'justify-end items-center'}  bg-[#F2F4F5] p-2 md:p-3 rounded-md w-full min-h-14`}>
        {selectedFilters.length > 0 &&
          <div className="flex items-center gap-1 md:gap-3">
            <span className="text-[#191C1F] text-[8px] md:text-13 text-nowrap">Active Filters:</span>
            <div className="flex items-center flex-wrap gap-x-3 gap-y-1 px-3 py-1  text-[#191C1F] text-[8px] md:text-14">
              {selectedFilters.map((item, index) => (
                <div key={index} className="flex items-center gap-2 flex-nowrap">
                  <span>
                    {item.value === true ? 'Yes' : item.value === false ? 'No' : item.value}
                  </span>
                  <FiX
                    className="text-gray-500 cursor-pointer hover:text-red-500"
                    onClick={() => handleRemoveFilter(item)}
                  />
                </div>
              ))}
            </div>
          </div>
        }

        <p className="text-[#191C1F] text-[8px] md:text-14">
          {products.length} <span className="text-[#5F6C72]">{products.length === 1 ? 'Result' : 'Results'} found</span>
        </p>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 sm:gap-4">
        {products.length > 0 ? (
          products.map((product, index) => (
            <Card
              key={index}
              product={product}
              features={features}
              categoryData={categoryData}
              isSoldOut={false}
              isAccessories={false}
            />
          ))
        ) : (
          [...Array(6)].map((_, i) => (
            <div key={i} className="w-full h-[200px] sm:h-[300px] animate-pulse rounded-md flex flex-col  mt-3">
              <div className="h-[150px] sm:h-[200px] w-full bg-gray-300 rounded-t-md"></div>
              <div className="p-3 flex flex-col gap-2">
                <div className="h-8 w-3/4 bg-gray-300 rounded"></div>
                <div className="flex gap-2">
                  <div className="h-6 w-3/4 bg-gray-300 rounded"></div>
                  <div className="h-6 w-1/4 bg-gray-300 rounded"></div>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default SubCategory;
