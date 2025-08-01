"use client";
import Card from "components/Card/Card";
import { features } from "data/data";
import React, { useEffect, useRef, useState, useCallback } from "react";
import { FiX } from "react-icons/fi";
import { FilterState } from "types/cat";
import { SubCategoryProps } from "types/types";

const PRODUCTS_PER_PAGE = 9;

const SubCategory: React.FC<SubCategoryProps> = ({
  filteredProducts,
  selectedFilters,
  setSelectedProductFilters,
  setIsWaterProof,
  categoryData,
}) => {
  const [visibleCount, setVisibleCount] = useState(PRODUCTS_PER_PAGE);
  const [showNoProductsMessage, setShowNoProductsMessage] = useState(false);

  const observerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (filteredProducts.length === 0) {
      const timer = setTimeout(() => {
        setShowNoProductsMessage(true);
      }, 5000);
      return () => clearTimeout(timer);
    } else {
      setShowNoProductsMessage(false);
    }
  }, [filteredProducts]);

  useEffect(() => {
    setVisibleCount(PRODUCTS_PER_PAGE);
  }, [filteredProducts]);

  const loadMore = useCallback(() => {
    setVisibleCount((prev) =>
      Math.min(prev + PRODUCTS_PER_PAGE, filteredProducts.length)
    );
  }, [filteredProducts]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && visibleCount < filteredProducts.length) {
          loadMore();
        }
      },
      { threshold: 1.0 }
    );

    if (observerRef.current) {
      observer.observe(observerRef.current);
    }

    return () => {
      if (observerRef.current) {
        observer.unobserve(observerRef.current);
      }
    };
  }, [loadMore, visibleCount, filteredProducts.length]);

  const handleRemoveFilter = (
    item:
      | { name: "isWaterProof"; value: boolean }
      | { name: keyof FilterState; value: string }
  ) => {
    if (item.name === "isWaterProof") {
      setIsWaterProof(null);
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
      <div
        className={`flex ${
          selectedFilters.length > 0
            ? "justify-between items-center"
            : "justify-end items-center"
        } bg-[#F2F4F5] p-2 md:p-3 rounded-md w-full min-h-14`}
      >
        {selectedFilters.length > 0 && (
          <div className="flex items-center md:gap-3">
            <span className="text-[#191C1F] text-12 md:text-13 text-nowrap">
              Active Filters:
            </span>
            <div className="flex items-center flex-wrap gap-x-1 gap-y-1 px-3 py-1 text-[#191C1F] text-10 md:text-14">
              {selectedFilters.map((item, index) => (
                <div
                  key={index}
                  className="flex items-center gap-1 md:gap-2 flex-nowrap"
                >
                  <span>
                    {item.value === true
                      ? "Yes"
                      : item.value === false
                      ? "No"
                      : item.value}
                  </span>
                  <FiX
                    className="text-gray-500 cursor-pointer hover:text-red-500"
                    onClick={() => handleRemoveFilter(item)}
                  />
                </div>
              ))}
            </div>
          </div>
        )}

        <p className="text-[#191C1F] text-12 md:text-14">
          {filteredProducts.length}{" "}
          <span className="text-[#5F6C72]">
            {filteredProducts.length === 1 ? "Result" : "Results"} found
          </span>
        </p>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 sm:gap-4">
        {filteredProducts.length > 0 ? (
          filteredProducts.map((product, index) => (
            <div
              key={index}
              className={index < visibleCount ? "block" : "hidden"}
            >
              <Card
                product={product}
                features={features}
                categoryData={categoryData}
                isSoldOut={false}
                isAccessories={false}
              />
            </div>
          ))
        ) : !showNoProductsMessage ? (
          [...Array(6)].map((_, i) => (
            <div
              key={i}
              className="w-full h-[200px] sm:h-[300px] animate-pulse rounded-md flex flex-col mt-3"
            >
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
        ) : (
          <div className="col-span-full text-center text-gray-500 py-10">
            No products found.
          </div>
        )}
      </div>

      {visibleCount < filteredProducts.length && (
        <div ref={observerRef} className="h-10 mt-5 flex justify-center items-center">
          <span className="text-sm text-gray-400">Loading more products...</span>
        </div>
      )}
    </div>
  );
};

export default SubCategory;
