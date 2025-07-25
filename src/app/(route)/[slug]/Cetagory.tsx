'use client'
import React from "react";
import dynamic from "next/dynamic";
import { useEffect, useState } from "react";
import Container from "components/common/container/Container";
import Breadcrumb from "components/Reusable/breadcrumb";
import Drawer from "components/ui/drawer";
import Select from "components/ui/Select";
import { productFilter } from "lib/helperFunctions";
import { type Category, FilterState, ISUBCATEGORY, SUBNCATEGORIES_PAGES_PROPS } from "types/cat";
const SubCategory = dynamic(()=> import("components/sub-category/sub-category-product"));
const Filters = dynamic(()=> import("components/sub-category/filters"),{ssr: false, 
  loading: () => <div className="h-full w-full bg-gray-200 rounded animate-pulse" />});
const Category = ({ catgories, categoryData,isSubCategory, slug, subcategory, subdescription }: SUBNCATEGORIES_PAGES_PROPS) => {
  const [isWaterProof, setIsWaterProof] = useState<boolean | null | undefined>(null);
  const [Data, setData] = useState<ISUBCATEGORY | Category>( categoryData)
  const [selectedProductFilters, setSelectedProductFilters] = useState<FilterState>({
    Colours: [],
    commercialWarranty: [],
    residentialWarranty: [],
    thicknesses: [],
    plankWidth: [],
    plankLength: []
  });

  const [priceValue, setPriceValue] = useState<[number, number]>([49, 149]);
  const [isModalOpen, setModalOpen] = useState(false);
  const [sortOption, setSortOption] = useState<string>('Default');
 const publishedCategories = catgories
  .filter((cat : Category) => cat.status === "PUBLISHED")
  .map((cat : Category) => ({
    ...cat,
    subcategories: cat.subcategories?.filter(sub => sub.status === "PUBLISHED") || [],
    recalledSubCats: cat.recalledSubCats?.filter(recall => recall?.status === "PUBLISHED") || [],
    products: cat.products?.filter(prod => prod.status === "PUBLISHED") || [],
  })) || [];

useEffect(() => {
  const filteredCategoryData = { ...categoryData };

  if (filteredCategoryData.subcategories) {
    filteredCategoryData.subcategories = filteredCategoryData.subcategories.filter(
      (sub) => sub.status === "PUBLISHED"
    );
  }

  if (filteredCategoryData.recalledSubCats) {
    filteredCategoryData.recalledSubCats = filteredCategoryData.recalledSubCats.filter(
      (recall) => recall.category?.status === "PUBLISHED"
    );
  }
  if (filteredCategoryData.products) {
    filteredCategoryData.products = filteredCategoryData.products.filter(
      (prod) =>
        prod.status === "PUBLISHED" &&
        prod.subcategory?.status === "PUBLISHED"
    );
  }

  if (isSubCategory) {
    const filteredProducts = filteredCategoryData.products?.filter(
      (product) => product.subcategory?.custom_url === subcategory
    );

    const subcatMatch = filteredCategoryData.subcategories?.find(
      (sub) => sub.custom_url === subcategory
    );
    if (!subcatMatch) {
      setData({ ...subdescription, products: [] });
    } else {
      const pushMatchingProducts = { ...subdescription, products: filteredProducts };
      setData(pushMatchingProducts);
    }
  } else {
    setData(filteredCategoryData);
  }
}, [categoryData, isSubCategory, subcategory, subdescription]);

    const { filtered, appliedFilters } = productFilter({
      products: Data.products,
      priceValue,
      sortOption,
      selectedProductFilters,
      isWaterProof,
      subcategory,
    });
  return (
    <>
      <Breadcrumb imageClass="h-[70px] xs:h-auto"
        image={isSubCategory ? subdescription?.[0].BannerImage?.imageUrl : Data.whatAmiImageBanner?.imageUrl ? Data.whatAmiImageBanner?.imageUrl : Data.BannerImage?.imageUrl ? Data.BannerImage?.imageUrl : "/assets/images/category/category-breadcrumb.png"}
        altText={Data.whatAmiImageBanner?.altText || Data.BannerImage?.altText} slug={slug} subcategory={subcategory} isImagetext
      />
      <Container className="flex flex-wrap lg:flex-nowrap lg:gap-4 xl:gap-8 mt-4 lg:mt-10">
          <div className=" lg:w-[20%] hidden lg:block ">
            <Filters
              catgories={publishedCategories}
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
            <h1 className="text-34 font-bold">{isSubCategory ? subdescription?.[0]?.name || "" : Data?.Heading || Data?.name}</h1>
            <p
              className="text-14 md:text-16 2xl:text-18 lg:leading-[26px] font-inter "
              dangerouslySetInnerHTML={{
                __html: isSubCategory
                  ? subdescription[0].description || ""
                  : Data?.description || ""
              }}
            >
            </p>
            <div className="flex items-center justify-between lg:justify-end">
                <div className="block lg:hidden">
                  <button onClick={() => setModalOpen(true)}
                    className=" h-9 w-24 shadow text-black rounded-md flex items-center gap-2 justify-center"
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
            filteredProducts={filtered}
            selectedFilters={appliedFilters}
            setIsWaterProof={setIsWaterProof}
            setSelectedProductFilters={setSelectedProductFilters}
            categoryData={Data}
          />
        </div>
      </Container>
    </>
  );
};

export default Category;
