'use client'
import Container from "components/common/container/Container";
import Breadcrumb from "components/Reusable/breadcrumb";
import Filters from "components/sub-category/filters";
import SubCategory from "components/sub-category/sub-category-product";
import Drawer from "components/ui/drawer";
import Select from "components/ui/Select";
import { productFilter } from "lib/helperFunctions";
import React, { useEffect, useState } from "react";
import { type ISUBCATEGORY, type Category, FilterState, SUBNCATEGORIES_PAGES_PROPS } from "types/cat";
import { IProduct } from "types/prod";
import { SelectedFilter } from "types/types";



const Category = ({ catgories, categoryData, subCategoryData, isSubCategory, mainCategory, slug, subcategory }: SUBNCATEGORIES_PAGES_PROPS) => {
  const [Data, setData] = useState<ISUBCATEGORY | Category>(subCategoryData || categoryData)
  const [isWaterProof, setIsWaterProof] = useState<boolean | null | undefined>(null);
  const [selectedProductFilters, setSelectedProductFilters] = useState<FilterState>({
    colors: [],
    thicknesses: [],
    commercialWarranty: [],
    residentialWarranty: [],
    plankWidth: [],
  });
  const [selectedFilters, setSelectedFilters] = useState<SelectedFilter[]>([]);
  const [priceValue, setPriceValue] = useState<[number, number]>([0, 2000]);
  const [filteredProducts, setFilteredProducts] = useState<IProduct[]>([]);
  const [isModalOpen, setModalOpen] = useState(false);
  const [sortOption, setSortOption] = useState<string>('Default');
  useEffect(() => {
    if (isSubCategory && subCategoryData) {
      setData(subCategoryData);
    } else {
      setData(categoryData)
    }
  }, [categoryData, subCategoryData])

  useEffect(() => {
    const { filtered, appliedFilters } = productFilter({
      products: Data?.products,
      priceValue,
      sortOption,
      selectedProductFilters,
      isWaterProof,
      subcategory,
    });

    setFilteredProducts(filtered);
    setSelectedFilters(appliedFilters);
  }, [
    selectedProductFilters,
    priceValue,
    sortOption,
    Data?.products,
    subcategory,
    isWaterProof,
  ]);






  return (
    <>
      <Breadcrumb image={mainCategory ? mainCategory.whatAmiImageBanner?.imageUrl : Data.whatAmiImageBanner?.imageUrl ? Data.whatAmiImageBanner?.imageUrl : Data.BannerImage?.imageUrl ? Data.BannerImage?.imageUrl : "/assets/images/category/category-breadcrumb.png"} altText={mainCategory?.whatAmiImageBanner.altText || Data.whatAmiImageBanner?.altText || Data.BannerImage?.altText} slug={slug} title={subcategory} isImagetext />
      <Container className="flex flex-wrap lg:flex-nowrap lg:gap-4 xl:gap-8 mt-4 lg:mt-10">
        <div className=" lg:w-[20%] ">
          <Filters
            className="hidden lg:block"
            catgories={catgories}
            category={Data}
            isWaterProof={isWaterProof}
            setIsWaterProof={setIsWaterProof}
            selectedProductFilters={selectedProductFilters}
            setSelectedProductFilters={setSelectedProductFilters}
            priceValue={priceValue}
            setPriceValue={setPriceValue}
          />
        </div>
        <div className="lg:w-[80%]">
          <div className="font-inter space-y-4">
            <h1 className="text-34 font-bold">{mainCategory?.topHeading || Data?.topHeading || Data?.Heading || Data.name}</h1>
            <p
              className="text-14 md:text-16 2xl:text-20 lg:leading-[26px] font-inter"
              dangerouslySetInnerHTML={{ __html: mainCategory?.description || Data?.description || "" }}
            >
            </p>
            <div className="flex items-center justify-between">
              <div className="">
                <button onClick={() => setModalOpen(true)}
                  className=" h-9 w-24 shadow text-black rounded-md flex items-center gap-2 justify-center  lg:hidden"
                >
                  Filter
                  <span>
                    <svg width="16" height="14" viewBox="0 0 16 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M14.6693 1H1.33594L6.66927 7.30667V11.6667L9.33594 13V10.1533V7.30667L14.6693 1Z" stroke="#232327" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </span>
                </button>

                <Drawer isOpen={isModalOpen} onClose={() => setModalOpen(false)} >
                  <Filters
                    catgories={catgories}
                    category={Data}
                    isWaterProof={isWaterProof}
                    setIsWaterProof={setIsWaterProof}
                    selectedProductFilters={selectedProductFilters}
                    setSelectedProductFilters={setSelectedProductFilters}
                    priceValue={priceValue}
                    setPriceValue={setPriceValue}
                  />
                </Drawer>
              </div>
              <div className="flex items-center justify-end gap-2 lg:pt-4">
                <span className="text-[#191C1F] text-14 hidden lg:block">Sort by:</span>
                <Select options={["Default", "A to Z", "Z to A", "Low to High", "High to Low"]} onChange={setSortOption} sortOption={sortOption} />
              </div>
            </div>
          </div>
          <SubCategory
            filteredProducts={filteredProducts}
            selectedFilters={selectedFilters}
            setIsWaterProof={setIsWaterProof}
            setSelectedProductFilters={setSelectedProductFilters}
            categoryData={categoryData}
            subCategoryData={subCategoryData}
          />
        </div>
      </Container>
    </>
  );
};

export default Category;
