"use client"
import Card from "components/Card/Card";
import { features } from "data/data";
import React, { useEffect, useState } from "react";
import { FiX } from "react-icons/fi";
import { SelectedFilter, SubCategoryProps } from "types/types";

const SubCategory: React.FC<SubCategoryProps> = ({ filteredProducts,
  selectedFilters,
  setSelectedColor,
  selectedColor,
  setSelectedThickness,
  selectedThickness,
  setSelectedCommmericallWarranty,
  selectedCommmericallWarranty,
  setSelectedResidentialWarranty,
  selectedResidentialWarranty,
  setSelectedPlankWidth,
  selectedPlankWidth,
  setIsWaterProof,
  categoryData,
  subCategoryData
}) => {
  const [products, setProducts] = useState(filteredProducts);
  useEffect(() => {
    if (filteredProducts) {
      setProducts(filteredProducts)
    }
  }, [filteredProducts])

  const handleRemoveFilter = (item: SelectedFilter) => {
    if (item.name === "selectedColors") {
      const filterColors = selectedColor.filter((col) => col !== item.value);
      setSelectedColor(filterColors)
    } else if (item.name === "selectedThicknesses") {
      const filterThickness = selectedThickness.filter((col) => col !== item.value);
      setSelectedThickness(filterThickness)
    } else if (item.name === "selectedCommmericallWarranty") {
      const filterCommmerical = selectedCommmericallWarranty.filter((col) => col !== item.value);
      setSelectedCommmericallWarranty(filterCommmerical)
    } else if (item.name === "selectedResidentialWarranty") {
      const filterResidential = selectedResidentialWarranty.filter((col) => col !== item.value);
      setSelectedResidentialWarranty(filterResidential)
    } else if (item.name === "selectedPlankWidth") {
      const filterPlankWidth = selectedPlankWidth.filter((col) => col !== item.value);
      setSelectedPlankWidth(filterPlankWidth)
    } else if (item.name === "isWaterProof") {
      setIsWaterProof(null)
    }
  }
  console.log(products,"products")
  return (
    <div className="pt-5 lg:mb-20">
      {/* <div className="hidden lg:flex items-center border border-gray-300 px-2 py-2 w-full max-w-md focus-within:ring-2 focus-within:ring-primary hover:border-primary transition">
        <input
          type="text"
          placeholder="Search for anything..."
          className="flex-1 px-2 outline-none bg-transparent"
        />
        <FiSearch className="text-gray-500" size={20} />
      </div> */}

      <div className={`flex ${selectedFilters.length > 0 ? 'justify-between items-center' : 'justify-end items-center'}  bg-[#F2F4F5] p-2 md:p-3 rounded-md w-full min-h-14`}>
        {selectedFilters.length > 0 &&
          <div className="flex items-center gap-1 md:gap-3">
            <span className="text-[#191C1F] text-[8px] md:text-13 text-nowrap">Active Filters:</span>
            <div className="flex items-center flex-wrap gap-x-3 gap-y-1 px-3 py-1  text-[#191C1F] text-[8px] md:text-14">
              {selectedFilters.map((item, index) => (
                <div key={index} className="flex items-center gap-2 flex-nowrap">
                  <span>{item.value === true ? 'Yes' : item.value === false ? 'No' : item.value}</span>
                  <FiX className="text-gray-500 cursor-pointer hover:text-red-500" onClick={() => handleRemoveFilter(item)} />
                </div>
              ))}
            </div>
          </div>
        }

        <p className="text-[#191C1F] text-[8px] md:text-14">
          {products.length} <span className="text-[#5F6C72]">{products.length === 1 ? 'Result' : 'Results'} found</span>
        </p>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
  {products.length > 0 ? (
    products.map((product, index) => (
      <Card 
        key={index} 
        product={product} 
        features={features} 
        categoryData={categoryData} 
        subCategoryData={subCategoryData} 
        isSoldOut={false} 
        isAccessories={false} 
      />
    ))
  ) : (
    <p>No Product found</p>
  )}
      </div>
    </div>
  );
};

export default SubCategory;
