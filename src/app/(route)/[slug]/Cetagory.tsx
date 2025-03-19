'use client'
import Container from "components/common/container/Container";
import Breadcrumb from "components/Reusable/breadcrumb";
import Filters from "components/sub-category/filters";
import SubCategory from "components/sub-category/sub-category-product";
import Drawer from "components/ui/drawer";
import Select from "components/ui/Select";
import { useParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import { type ISUBCATEGORY, type Category } from "types/cat";
import { AdditionalInformation, IProduct } from "types/prod";
import { SelectedFilter } from "types/types";
import { ProductsSorting } from "utils/helperFunctions";

interface SUBNCATEGORIES_PAGES_PROPS{ catgories: Category[], categoryData: Category, subCategoryData?: ISUBCATEGORY, isSubCategory: boolean}

const Category = ({ catgories, categoryData, subCategoryData, isSubCategory, }: SUBNCATEGORIES_PAGES_PROPS) => {
  const [Data, setData] = useState<ISUBCATEGORY | Category>(subCategoryData || categoryData)
  const [isWaterProof, setIsWaterProof] = useState<boolean | null | undefined>(null);
  const [selectedColors, setSelectedColors] = useState<string[]>([]);
  const [selectedThicknesses, setSelectedThicknesses] = useState<string[]>([]);
  const [selectedCommmericallWarranty, setSelectedCommmericallWarranty] = useState<string[]>([]);
  const [selectedResidentialWarranty, setSelectedResidentialWarranty] = useState<string[]>([]);
  const [selectedPlankWidth, setSelectedPlankWidth] = useState<string[]>([]);
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
    filtered = filtered?.filter(product => 
      product.subcategory?.custom_url === params.subcategory
    );
  }

  const selectedFilter = [];

  filtered = filtered?.filter(product => {
    const price = parseFloat(product.price);
    return price >= priceValue[0] && price <= priceValue[1];
  });

  ProductsSorting(filtered || [], sortOption);

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
      product.colors?.some((color: AdditionalInformation) => selectedColors.includes(color.name))
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
  Data?.products,
  params.subcategory
]);


  return (
    <>
      <Breadcrumb image={Data.whatAmiImageBanner?.imageUrl ? Data.whatAmiImageBanner?.imageUrl : Data.BannerImage?.imageUrl ? Data.BannerImage?.imageUrl : "/assets/images/category/category-breadcrumb.png"} altText={Data.whatAmiImageBanner?.altText || Data.BannerImage?.altText} slug={params.slug} title={params.subcategory} isImagetext />
      <Container className="flex flex-wrap lg:flex-nowrap lg:gap-4 xl:gap-8 mt-4 lg:mt-10">
        <div className=" lg:w-[20%] ">
          <Filters
            className="hidden lg:block"
            catgories={catgories}
            category={Data}
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
            <h1 className="text-34 font-bold">{Data?.topHeading || Data?.Heading  || Data.name}</h1>
            <p
              className="text-14 md:text-16 2xl:text-20 lg:leading-[26px] font-inter"
              dangerouslySetInnerHTML={{ __html: Data?.description || "" }}
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
            categoryData={categoryData}
            subCategoryData={subCategoryData}
          />
        </div>
      </Container>
    </>
  );
};

export default Category;
