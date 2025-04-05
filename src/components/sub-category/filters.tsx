import React, { useEffect, useState } from "react";
import Accordion from "./component/accordion";
import PriceSlider from "./component/price-slider";
import Checkbox from "components/ui/checkbox";
import RatioButtons from "components/ui/radio-button";
import { Category, FilterState, ISUBCATEGORY } from "types/cat";
import Link from "next/link";
import { FIlterprops } from "types/types";
import { usePathname } from "next/navigation";
import { AdditionalInformation } from "types/prod";



const Filters = ({
  catgories,
  category,
  setIsWaterProof,
  isWaterProof,
  selectedProductFilters,
  setSelectedProductFilters,
  setPriceValue,
  priceValue,
  className }: FIlterprops) => {

  const [uniqueFilters, setUniqueFilters] = useState({
    thicknesses: [] as string[],
    commercialWarranty: [] as string[],
    residentialWarranty: [] as string[],
    plankWidth: [] as string[],
    colors: [] as string[],
  });
  const [categoryState, setCategoryState] = useState<{
    polar?: Category;
    richmond?: Category;
  }>({});
  const path = usePathname();
  useEffect(() => {
    const polar = catgories.find(
      (cat: Category) => cat.name.toLowerCase() === "polar flooring"
    );
    const richmond = catgories.find(
      (cat: Category) => cat.name.toLowerCase() === "richmond flooring"
    );
    setCategoryState({ polar, richmond });
  }, [catgories]);

  const filterTitles = {
    colors: "Colors",
    thicknesses: "Thickness",
    commercialWarranty: "Commercial Warranty",
    residentialWarranty: "Residential Warranty",
    plankWidth: "Plank Width",
  };

  const extractUniqueAttributes = (category: Category) => {
    const thicknessSet = new Set<string>();
    const commercialWarrantySet = new Set<string>();
    const residentialWarrantySet = new Set<string>();
    const plankWidthSet = new Set<string>();
    const colorSet = new Set<string>();

    category.products?.forEach((product) => {
      if (product.thickness) thicknessSet.add(product.thickness);
      if (product.CommmericallWarranty) commercialWarrantySet.add(product.CommmericallWarranty);
      if (product.ResidentialWarranty) residentialWarrantySet.add(product.ResidentialWarranty);
      if (product.plankWidth) plankWidthSet.add(product.plankWidth);
      if (product.colors) {
        product.colors.forEach((color: AdditionalInformation) => {
          colorSet.add(color.name);
        });
      }
    });

    setUniqueFilters({
      thicknesses: Array.from(thicknessSet),
      commercialWarranty: Array.from(commercialWarrantySet),
      residentialWarranty: Array.from(residentialWarrantySet),
      plankWidth: Array.from(plankWidthSet),
      colors: Array.from(colorSet),
    });
  };

  useEffect(() => {
    extractUniqueAttributes(category);
  }, [category]);

  const handleYesWaterProof = (text: string) => {
    if (text === 'yes') {

      setIsWaterProof(isWaterProof === true ? null : true)
    } else {
      setIsWaterProof(isWaterProof === false ? null : false)
    }
  }

  const handleFilterSelection = (filterKey: keyof FilterState, value: string) => {
    setSelectedProductFilters(prevFilters => ({
      ...prevFilters,
      [filterKey]: prevFilters[filterKey].includes(value)
        ? prevFilters[filterKey].filter(item => item !== value)
        : [...prevFilters[filterKey], value],
    }));
  };

  const handleClearFilter = () => {
    setPriceValue([0, 2000])
    setSelectedProductFilters({
      colors: [],
      thicknesses: [],
      commercialWarranty: [],
      residentialWarranty: [],
      plankWidth: [],
    });
    setIsWaterProof(null)
  }
  return (
    <div className={`p-2 xl:p-4 w-full space-y-5  ${className}`}>
      <div className="border-b-2 pb-5">
        <p className="text-16 font-medium uppercase pb-2  text-[#191C1F]">Filter by Category</p>

        {catgories.map((category, index) => {
          const reCallFlag = category.recalledSubCats && category.recalledSubCats.length > 0;
          const subcategories: ISUBCATEGORY[] = (reCallFlag ? category.recalledSubCats : category.subcategories) as ISUBCATEGORY[] || [];

          return (
            <Accordion key={index} title={category.name} >
              <ul className="pl-4 text-sm text-gray-600 space-y-1">

                {subcategories?.map((subCategory: ISUBCATEGORY, i: number) => (
                  <Link href={`/${subCategory?.category?.RecallUrl || category.RecallUrl}/${subCategory.custom_url}`} key={i} className="cursor-pointer hover:text-primary block">
                    {subCategory.name}
                  </Link>
                ))}
              </ul>
            </Accordion>
          )
        }
        )}



        <Accordion title='Manufacturer' >
          <ul className="pl-4 text-sm text-gray-600 space-y-1">
            {Object.values(categoryState).map((item) => {
              return (
                <li key={item.custom_url}>
                  <Link href={`/${item.custom_url}`} className="cursor-pointer hover:text-primary block capitalize">
                    {item.name.toLowerCase()}
                  </Link>
                </li>
              );
            })}
          </ul>
        </Accordion>

        {/* <Accordion title='Style' >
          <ul className="pl-4 text-sm text-gray-600 space-y-1">
            {Object.values(categoryState).map((item) => {
              return (
                item.subcategories?.map((sub) => (
                  <li key={sub.custom_url}>
                    <Link href={`/${item.custom_url}/${sub.custom_url}`} className="cursor-pointer hover:text-primary block capitalize">
                      {item.name.toLowerCase()}
                    </Link>
                  </li>
                ))

              );
            })}
          </ul>
        </Accordion> */}
        <Accordion title="Style">
        <ul className="pl-4 text-sm text-gray-600 space-y-1">
        <li>
        <Link href="/style/eco" className="cursor-pointer hover:text-primary block capitalize">
        Eco
        </Link>
        </li>
        <li>
      <Link href="/style/heeringbone" className="cursor-pointer hover:text-primary block capitalize">
        Herringbone
      </Link>
        </li>
      <li>
      <Link href="/style/prime" className="cursor-pointer hover:text-primary block capitalize">
        Prime
      </Link>
      </li>
        </ul>
        </Accordion>

        <Accordion title="Waterproof">
          <ul className="pl-4 text-sm space-y-1">
            <li>
              <button
                className={`cursor-pointer ${isWaterProof ? 'text-primary' : 'text-gray-600 hover:text-primary'}`}
                onClick={() => handleYesWaterProof('yes')}
              >
                Yes
              </button>
            </li>
            <li>
              <button
                className={`cursor-pointer ${!isWaterProof && isWaterProof !== undefined && isWaterProof !== null ? 'text-primary' : 'text-gray-600 hover:text-primary'}`}
                onClick={() => handleYesWaterProof('no')}
              >
                No
              </button>
            </li>
          </ul>
        </Accordion>

        {Object.entries(uniqueFilters).map(([filterKey, filterValues]) => {
          // Make sure we have at least one value
          if (filterValues.length === 0) return null;

          return (
            <Accordion key={filterKey} title={filterTitles[filterKey as keyof typeof uniqueFilters]}>
              <ul className="pl-4 text-sm text-gray-600 space-y-1">
                {filterValues.map((item, i) => (
                  <li key={i}>
                    <button
                      className={`cursor-pointer ${selectedProductFilters[filterKey as keyof FilterState].some(
                        (val: string) => val === item
                      )
                        ? "text-primary"
                        : "text-gray-600 hover:text-primary"
                        }`}
                      onClick={() => handleFilterSelection(filterKey as keyof FilterState, item)}
                    >
                      {item}
                    </button>
                  </li>
                ))}
              </ul>
            </Accordion>
          );
        })}
      </div>

      <div className="border-b-2 pb-5">
        <p className="text-16 font-medium uppercase pb-5  text-[#191C1F]">Price Range</p>
        <PriceSlider priceValue={priceValue}
          setPriceValue={setPriceValue}
        />
        {(isWaterProof !== null ||
          selectedProductFilters.colors.length > 0 ||
          selectedProductFilters.thicknesses.length > 0 ||
          selectedProductFilters.commercialWarranty.length > 0 ||
          selectedProductFilters.residentialWarranty.length > 0 ||
          selectedProductFilters.plankWidth.length > 0) && (
            <div className="flex justify-center mt-4">
              <button className="border border-[#cc7644] text-[#cc7644] w-[106px] h-[40px] text-14 rounded-[3px] transition hover:bg-[#cc7644] hover:text-white font-inter" onClick={handleClearFilter}>
                Clear Filters
              </button>
            </div>)
        }

      </div>
      <div className="border-b-2 pb-5">
        <p className="text-16 font-medium uppercase pb-5  text-[#191C1F]">popular Brands</p>
        <div className="flex gap-4 flex-wrap items-center">
          <ul className="space-y-3">
            {Object.values(categoryState).map((item) => {
              return (
                <li key={item.custom_url}>
                  <Link href={`/${item.custom_url}`} className="cursor-pointer hover:text-primary block">

                    <Checkbox
                    checked={path === `/${item.custom_url}`}
                      required
                      name="terms"
                 
                      className="custom-checkbox"
                    >
                   {item.name}
                    </Checkbox>
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
      <div className="pb-5">
        <p className="text-16 font-medium uppercase pb-5 text-[#191C1F]">Popular Tag</p>
        <div className="flex items-center ">
          <RatioButtons options={catgories} />
        </div>
      </div>
    </div>
  );
};

export default Filters;
