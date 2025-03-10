'use client'
import Container from "components/common/container/Container";
import Breadcrumb from "components/Reusable/breadcrumb";
import Filters from "components/sub-category/filters";
import SubCategory from "components/sub-category/sub-category-product";
import Modal from "components/ui/modal";
import Select from "components/ui/Select";
import React, { useEffect, useState } from "react";
import type { Category } from "types/cat";
import { Product } from "types/type";
import { SelectedFilter } from "types/types";


const Category = ({ catgories, category }: { catgories: Category[], category: Category }) => {
  const [isWaterProof, setIsWaterProof] = useState<boolean | null | undefined>(null);
  const [selectedColors, setSelectedColors] = useState<string[]>([]);
  const [selectedThicknesses, setSelectedThicknesses] = useState<string[]>([]);
  const [selectedCommmericallWarranty, setSelectedCommmericallWarranty] = useState<string[]>([]);
  const [selectedResidentialWarranty, setSelectedResidentialWarranty] = useState<string[]>([]);
  const [selectedPlankWidth, setSelectedPlankWidth] = useState<string[]>([]);
  const [selectedFilters, setSelectedFilters] = useState<SelectedFilter[]>([]);
  const [priceValue, setPriceValue] = useState<[number, number]>([0, 2000]);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [isModalOpen, setModalOpen] = useState(false);
  const [sortOption, setSortOption] = useState<string>('Default');

  useEffect(() => {
    let filtered = category.products;
    const selectedFilter = []

    filtered = filtered?.filter(product => {
      const price = parseFloat(product.price);
      return price >= priceValue[0] && price <= priceValue[1];
    });
    switch (sortOption) {
      case "A to Z":
        filtered = filtered?.sort((a, b) => {
          if (!a.name || !b.name) return 0;
          return a.name.localeCompare(b.name);
        });
        break;

      case "Z to A":

        filtered = filtered?.sort((a, b) => {
          if (!a.name || !b.name) return 0;
          return b.name.localeCompare(a.name);
        });
        break;

      case "Low to High":
        filtered = filtered?.sort((a, b) => {
          const priceA = parseFloat(a.price);
          const priceB = parseFloat(b.price);

          if (isNaN(priceA)) return 1;
          if (isNaN(priceB)) return -1;

          return priceA - priceB;
        });
        break;

      case "High to Low":
        filtered = filtered?.sort((a, b) => {
          const priceA = parseFloat(a.price);
          const priceB = parseFloat(b.price);

          if (isNaN(priceA)) return -1;
          if (isNaN(priceB)) return 1;

          return priceB - priceA;
        });
        break;

      default:
        break;
    }
    if (
      sortOption &&
      selectedColors.length === 0 &&
      selectedThicknesses.length === 0 &&
      selectedCommmericallWarranty.length === 0 &&
      selectedResidentialWarranty.length === 0 &&
      selectedPlankWidth.length === 0 &&
      isWaterProof === null
    ) {
      setFilteredProducts(filtered || []);
      setSelectedFilters([]);
      return;
    }

    if (isWaterProof !== null) {
      filtered = filtered?.filter(product => product.waterproof === isWaterProof);
      selectedFilter.push({ name: "isWaterProof", value: isWaterProof });
    }

    if (selectedColors.length > 0) {
      filtered = filtered?.filter(product =>
        product.colors?.some(color => selectedColors.includes(color.name))
      );
      selectedColors.forEach(color => {
        selectedFilter.push({ name: "selectedColors", value: color });
      });

    }

    if (selectedThicknesses.length > 0) {
      filtered = filtered?.filter(product =>
        selectedThicknesses.includes(product.thickness || '')
      );
      selectedThicknesses.forEach(thickness => {
        selectedFilter.push({ name: "selectedThicknesses", value: thickness });
      });
    }

    if (selectedCommmericallWarranty.length > 0) {
      filtered = filtered?.filter(product =>
        selectedCommmericallWarranty.includes(product.CommmericallWarranty || '')
      );
      selectedCommmericallWarranty.forEach(warranty => {
        selectedFilter.push({ name: "selectedCommmericallWarranty", value: warranty });
      });
    }

    if (selectedResidentialWarranty.length > 0) {
      filtered = filtered?.filter(product =>
        selectedResidentialWarranty.includes(product.ResidentialWarranty || '')
      );
      selectedResidentialWarranty.forEach(warranty => {
        selectedFilter.push({ name: "selectedResidentialWarranty", value: warranty });
      });
    }

    if (selectedPlankWidth.length > 0) {
      filtered = filtered?.filter(product =>
        selectedPlankWidth.includes(product.plankWidth || '')
      );
      selectedPlankWidth.forEach(width => {
        selectedFilter.push({ name: "selectedPlankWidth", value: width });
      });
    }

    setFilteredProducts(filtered || []);
    setSelectedFilters(selectedFilter);
  }, [
    isWaterProof,
    selectedColors,
    selectedThicknesses,
    selectedCommmericallWarranty,
    selectedResidentialWarranty,
    selectedPlankWidth,
    priceValue,
    sortOption,
    category.products
  ]);

  return (
    <>
      <Breadcrumb image="/assets/images/category/category-breadcrumb.png" />
      <Container className="flex flex-wrap lg:flex-nowrap lg:gap-4 xl:gap-8 mt-4 lg:mt-10">
        <div className=" lg:w-[20%] ">
          <Filters
            className="hidden lg:block"
            catgories={catgories}
            category={category}
            isWaterProof={isWaterProof}
            setIsWaterProof={setIsWaterProof}
            selectedColor={selectedColors}
            setSelectedColor={setSelectedColors}
            selectedThickness={selectedThicknesses}
            setSelectedThickness={setSelectedThicknesses}
            selectedPlankWidth={selectedPlankWidth}
            setSelectedPlankWidth={setSelectedPlankWidth}
            selectedResidentialWarranty={selectedResidentialWarranty}
            setSelectedResidentialWarranty={setSelectedResidentialWarranty}
            selectedCommmericallWarranty={selectedCommmericallWarranty}
            setSelectedCommmericallWarranty={setSelectedCommmericallWarranty}
            priceValue={priceValue}
            setPriceValue={setPriceValue}
          />
        </div>
        <div className="lg:w-[80%]">
          <div className="font-inter space-y-4">
            <h1 className="text-34 font-bold">{category.name}</h1>
            <p className=" text-14 md:text-16 2xl:text-20 lg:leading-[26px] font-inter">
              {category.description}
            </p>
            <div className="flex items-center justify-between">
              <div className="">
                <button onClick={() => setModalOpen(true)}
                  className=" h-9 w-24 shadow text-black rounded-md flex items-center gap-2 justify-center  lg:hidden"
                >
                  Filter
                  <span><svg width="16" height="14" viewBox="0 0 16 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M14.6693 1H1.33594L6.66927 7.30667V11.6667L9.33594 13V10.1533V7.30667L14.6693 1Z" stroke="#232327" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                  </span>
                </button>

                <Modal isOpen={isModalOpen} onClose={() => setModalOpen(false)} className="px-2">
                  <Filters
                    catgories={catgories}
                    category={category}
                    isWaterProof={isWaterProof}
                    setIsWaterProof={setIsWaterProof}
                    selectedColor={selectedColors}
                    setSelectedColor={setSelectedColors}
                    selectedThickness={selectedThicknesses}
                    setSelectedThickness={setSelectedThicknesses}
                    selectedPlankWidth={selectedPlankWidth}
                    setSelectedPlankWidth={setSelectedPlankWidth}
                    selectedResidentialWarranty={selectedResidentialWarranty}
                    setSelectedResidentialWarranty={setSelectedResidentialWarranty}
                    selectedCommmericallWarranty={selectedCommmericallWarranty}
                    setSelectedCommmericallWarranty={setSelectedCommmericallWarranty}
                    priceValue={priceValue}
                    setPriceValue={setPriceValue}
                  />
                </Modal>
              </div>
              <div className="flex items-center justify-end gap-2 lg:pt-4">
                <span className="text-[#191C1F] text-14 hidden lg:block">Sort by:</span>
                <Select options={["Default", "A to Z", "Z to A", "Low to High", "High to Low"]} onChange={setSortOption} sortOption={sortOption} />
              </div>
            </div>
          </div>
          <SubCategory filteredProducts={filteredProducts}
            selectedFilters={selectedFilters}
            setIsWaterProof={setIsWaterProof}
            selectedColor={selectedColors}
            setSelectedColor={setSelectedColors}
            selectedThickness={selectedThicknesses}
            setSelectedThickness={setSelectedThicknesses}
            selectedPlankWidth={selectedPlankWidth}
            setSelectedPlankWidth={setSelectedPlankWidth}
            selectedResidentialWarranty={selectedResidentialWarranty}
            setSelectedResidentialWarranty={setSelectedResidentialWarranty}
            selectedCommmericallWarranty={selectedCommmericallWarranty}
            setSelectedCommmericallWarranty={setSelectedCommmericallWarranty}
          />
        </div>
      </Container>
    </>
  );
};

export default Category;
