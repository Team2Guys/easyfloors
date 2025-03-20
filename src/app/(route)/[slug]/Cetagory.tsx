'use client'
import Container from "components/common/container/Container";
import Breadcrumb from "components/Reusable/breadcrumb";
import Filters from "components/sub-category/filters";
import SubCategory from "components/sub-category/sub-category-product";
import Drawer from "components/ui/drawer";
import Select from "components/ui/Select";
import { useParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import { type ISUBCATEGORY, type Category, FilterState, SUBNCATEGORIES_PAGES_PROPS } from "types/cat";
import { IProduct } from "types/prod";
import { SelectedFilter } from "types/types";
import { ProductsSorting } from "utils/helperFunctions";



const Category = ({ catgories, categoryData, subCategoryData, isSubCategory, mainCategory }: SUBNCATEGORIES_PAGES_PROPS) => {
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
  const params = useParams<{ slug: string; subcategory: string }>()
  useEffect(() => {
    if (isSubCategory && subCategoryData) {
      setData(subCategoryData);
    } else {
      setData(categoryData)
    }
  }, [categoryData, subCategoryData])

  useEffect(() => {
    let filtered = Data?.products;
  
    if (params.subcategory) {
      filtered = filtered?.filter(
        product => product.subcategory?.custom_url === params.subcategory
      );
    }
  
    const appliedFilters: SelectedFilter[] = [];
  
    filtered = filtered?.filter(product => {
      const price = parseFloat(product.price);
      return price >= priceValue[0] && price <= priceValue[1];
    });
  
    ProductsSorting(filtered || [], sortOption);
  
    const { colors, thicknesses, commercialWarranty, residentialWarranty, plankWidth } = selectedProductFilters;
  
    if (
      sortOption &&
      colors.length === 0 &&
      thicknesses.length === 0 &&
      commercialWarranty.length === 0 &&
      residentialWarranty.length === 0 &&
      plankWidth.length === 0 &&
      isWaterProof === null
    ) {
      setFilteredProducts(filtered || []);
      setSelectedFilters([]);
      return;
    }
  
    if (isWaterProof === true || isWaterProof === false) {
      filtered = filtered?.filter(product => product.waterproof === isWaterProof);
      appliedFilters.push({ name: "isWaterProof", value: isWaterProof });
    }
  
    const filterMapping: { key: keyof FilterState; productKey: string }[] = [
      { key: "colors", productKey: "colors" },
      { key: "thicknesses", productKey: "thickness" },
      { key: "commercialWarranty", productKey: "CommmericallWarranty" },
      { key: "residentialWarranty", productKey: "ResidentialWarranty" },
      { key: "plankWidth", productKey: "plankWidth" },
    ];
  
    filterMapping.forEach(({ key, productKey }) => {
      if (selectedProductFilters[key].length > 0) {
        filtered = filtered?.filter(product =>
          selectedProductFilters[key].includes(product[productKey] || "")
        );
        selectedProductFilters[key].forEach((value: string) => {
          appliedFilters.push({ name: key, value });
        });
      }
    });
  
    setFilteredProducts(filtered || []);
    setSelectedFilters(appliedFilters);
  }, [selectedProductFilters, priceValue, sortOption, Data?.products, params.subcategory, isWaterProof]);
  





  return (
    <>
      <Breadcrumb image={mainCategory ? mainCategory.whatAmiImageBanner?.imageUrl : Data.whatAmiImageBanner?.imageUrl ? Data.whatAmiImageBanner?.imageUrl : Data.BannerImage?.imageUrl ? Data.BannerImage?.imageUrl : "/assets/images/category/category-breadcrumb.png"} altText={mainCategory?.whatAmiImageBanner.altText || Data.whatAmiImageBanner?.altText || Data.BannerImage?.altText} slug={params.slug} title={params.subcategory} isImagetext />
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
                  <span><svg width="16" height="14" viewBox="0 0 16 14" fill="none" xmlns="http://www.w3.org/2000/svg">
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
