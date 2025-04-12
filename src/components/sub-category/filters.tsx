import React, { useEffect, useState } from "react";
import Accordion from "./component/accordion";
import PriceSlider from "./component/price-slider";
import Checkbox from "components/ui/checkbox";
import RatioButtons from "components/ui/radio-button";
import { Category, FilterState, ISUBCATEGORY } from "types/cat";
import Link from "next/link";
import { FIlterprops } from "types/types";
import { usePathname } from "next/navigation";
import { AdditionalInformation, IProduct } from "types/prod";
import { IfilterValues } from "types/type";



const Filters = ({
  catgories,
  category,
  setIsWaterProof,
  isWaterProof,
  selectedProductFilters,
  setSelectedProductFilters,
  setPriceValue,
  priceValue,
  catSlug,
  className }: FIlterprops) => {

  const [uniqueFilters, setUniqueFilters] = useState({thicknesses: [] as string[],commercialWarranty: [] as string[],residentialWarranty: [] as string[],plankWidth: [] as string[],Colours: [] as string[]});
  const [categoryState, setCategoryState] = useState<{
    polar?: Category;
    richmond?: Category;
  }>({});
  const path = usePathname();
  const desiredCategoryOrder = [
    "SPC FLOORING",
    "LVT FLOORING",
    "POLAR FLOORING",
    "RICHMOND FLOORING"
  ];
  
  const orderedCategories = [...catgories].sort((a, b) => {
    return desiredCategoryOrder.indexOf(a.name.toUpperCase()) - desiredCategoryOrder.indexOf(b.name.toUpperCase());
  });
  useEffect(() => {
    const richmond = catgories.find(
      (cat: Category) => cat.name.toLowerCase() === "richmond flooring"
    );
    const polar = catgories.find(
      (cat: Category) => cat.name.toLowerCase() === "polar flooring"
    );
    setCategoryState({ polar, richmond });
  }, [catgories]);

  const filterTitles = {
    Colours: "Colours",
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
      Colours: Array.from(colorSet),
    });
  };



  useEffect(() => {
    extractUniqueAttributes(category);
  }, [category]);


  const getColorCount = (targetColor: string): number => {
    return category.products?.filter((product:IProduct) =>
      product.colors?.some(color => color.name.trim().toLowerCase() === targetColor.toLowerCase())
    ).length || 0;
  };
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
    setPriceValue([0, 149])
    setSelectedProductFilters({
      Colours: [],
      thicknesses: [],
      commercialWarranty: [],
      residentialWarranty: [],
      plankWidth: [],
    });
    setIsWaterProof(null)
  }

  const filtervalues:IfilterValues  ={
    commercialWarranty: "CommmericallWarranty",
    residentialWarranty : "ResidentialWarranty",
    thicknesses: "thickness",
    plankWidth: "plankWidth",
  }


  const filterProductsCountHanlder = (key:keyof IfilterValues,ValuesType:string)=>{
      const filterprod = category?.products?.filter((product:IProduct)=>{
        const values =  product[filtervalues[key] as keyof IProduct]
        return values  == ValuesType;
      })

      return filterprod.length  ||0


  }

  

  return (
    <div className={`p-2 xl:p-4 w-full space-y-5  ${className}`}>
      <div className="border-b-2 pb-5">
        <p className="text-16 font-medium uppercase pb-2  text-[#191C1F]">Filter by Category</p>

        {orderedCategories.map((category, index) => {
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
        
        <Accordion title="Style">
        <ul className="pl-4 text-sm text-gray-600 space-y-1">
          {(catSlug === 'richmond-flooring' || catSlug === 'lvt-flooring' || catSlug === 'spc-flooring'|| catSlug === 'richmond') && (
              <li>
                <Link
                  href={`/${
                    catSlug === 'spc-flooring' ? 'polar' : 'richmond'
                  }/spc-eco`}
                  className="cursor-pointer hover:text-primary block capitalize"
                >
                  Eco
                </Link>
              </li>
            )}
            <li>
              <Link
                href={`/${
                  catSlug === 'spc-flooring' ? 'polar' :
                  catSlug === 'polar-flooring' ? 'polar' :
                  'richmond'
                }/spc-herringbone`}
                className="cursor-pointer hover:text-primary block capitalize"
              >
                herringbone
              </Link>
            </li>
            {(catSlug === 'richmond-flooring' || catSlug === 'lvt-flooring' || catSlug === 'spc-flooring'|| catSlug === 'richmond') && (
              <li>
                <Link
                  href="/richmond/spc-prime"
                  className="cursor-pointer hover:text-primary block capitalize"
                >
                  Prime
                </Link>
              </li>
            )}
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
          if (filterValues.length === 0) return null;
     


          return (
            <Accordion key={filterKey} title={filterTitles[filterKey as keyof typeof uniqueFilters]}>
              <ul className="pl-4 text-sm text-gray-600 space-y-1">
                {filterValues.map((item, i) => {
                       let length;
                       let remaingCategory
                       if(filterKey === 'Colours') {
                         length=  getColorCount(item)
                      }else {
                        remaingCategory =  filterProductsCountHanlder(filterKey as keyof IfilterValues, item)
                      }

                  return (
                  <li key={i}>
                    <button
                      className={`cursor-pointer ${selectedProductFilters[filterKey as keyof FilterState]?.some(
                        (val: string) => val === item
                      )
                        ? "text-primary"
                        : "text-gray-600 hover:text-primary"
                        }`}
                      onClick={() => handleFilterSelection(filterKey as keyof FilterState, item)}
                    >
                      {item + (length ? ` (${length})` : remaingCategory ? ` (${remaingCategory})`: "" )} 
                    </button>
                  </li>

                  )
        })}
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
          selectedProductFilters?.Colours?.length > 0 ||
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
          <RatioButtons options={orderedCategories} />
        </div>
      </div>
    </div>
  );
};

export default Filters;
