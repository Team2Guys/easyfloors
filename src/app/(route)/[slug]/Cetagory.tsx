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

const Category = ({ catgories, categoryData, subCategoryData, isSubCategory, slug, subcategory,subdescription }: SUBNCATEGORIES_PAGES_PROPS) => {
  const [Data, setData] = useState<ISUBCATEGORY | Category>(subCategoryData || categoryData)
  const [isWaterProof, setIsWaterProof] = useState<boolean | null | undefined>(null);
  const [selectedProductFilters, setSelectedProductFilters] = useState<FilterState>({
    Colours: [],
    commercialWarranty: [],
    residentialWarranty: [],
    thicknesses: [],
    plankWidth: [],
    plankLength: []
  });
  
  const [selectedFilters, setSelectedFilters] = useState<SelectedFilter[]>([]);
  const [priceValue, setPriceValue] = useState<[number, number]>([49, 149]);
  const [filteredProducts, setFilteredProducts] = useState<IProduct[]>([]);
  const [isModalOpen, setModalOpen] = useState(false);
  const [sortOption, setSortOption] = useState<string>('Default');
  useEffect(() => {
    if (isSubCategory) {
      const filtered = categoryData.products?.filter(
        product => product.subcategory?.custom_url === subcategory
      );
      const pushMatchingProducts = {...subdescription, products: filtered}
      setData(pushMatchingProducts);
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
      <Breadcrumb imageClass="h-[70px] xs:h-auto"
       image={isSubCategory ? subdescription?.[0].BannerImage?.imageUrl :  Data.whatAmiImageBanner?.imageUrl ? Data.whatAmiImageBanner?.imageUrl : Data.BannerImage?.imageUrl ? Data.BannerImage?.imageUrl : "/assets/images/category/category-breadcrumb.png"}
        altText={Data.whatAmiImageBanner?.altText || Data.BannerImage?.altText} slug={slug} subcategory={subcategory} isImagetext
      />
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
            catSlug={slug}
          />
        </div>
        <div className="lg:w-[80%]">
          <div className="font-inter space-y-4">
        <h1 className="text-34 font-bold">{isSubCategory ? subdescription?.[0]?.name || "" : Data?.Heading || Data?.name}
        </h1>
            <p
              className="text-14 md:text-16 2xl:text-20 lg:leading-[26px] font-inter "
              dangerouslySetInnerHTML={{ 
                __html: isSubCategory 
                  ? subdescription[0].description || "" 
                  :  Data?.description || "" 
              }} 
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
                    catSlug={slug}
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
