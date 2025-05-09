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
import { getSubcategoryOrder } from "data/home-category";



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
  className,
  isColection,
  sortedSubcategories
}: FIlterprops) => {

  const [uniqueFilters, setUniqueFilters] = useState({ commercialWarranty: [] as string[], residentialWarranty: [] as string[], thicknesses: [] as string[], plankWidth: [] as string[], plankLength: [] as string[], Colours: [] as string[] });
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
    commercialWarranty: "Commercial Warranty",
    residentialWarranty: "Residential Warranty",
    thicknesses: "Plank Thickness",
    plankWidth: "Plank Width",
    plankLength: "Plank Length"
  };

  const extractUniqueAttributes = (category: Category) => {
    const commercialWarrantySet = new Set<string>();
    const residentialWarrantySet = new Set<string>();
    const thicknessSet = new Set<string>();
    const plankWidthSet = new Set<string>();
    const plankLengthSet = new Set<string>();
    const colorSet = new Set<string>();
    if (!isColection) {
      category.products?.forEach((product) => {
        if (product.thickness) thicknessSet.add(product.thickness);
        if (product.CommmericallWarranty) commercialWarrantySet.add(product.CommmericallWarranty);
        if (product.ResidentialWarranty) residentialWarrantySet.add(product.ResidentialWarranty);
        if (product.plankWidth) plankWidthSet.add(product.plankWidth);
        if (product.sizes && product.sizes[0].height) plankLengthSet.add(product.sizes[0].height);
        if (product.colors) {
          product.colors.forEach((color: AdditionalInformation) => {
            colorSet.add(color.name);
          });
        }
      });
    } else {
      sortedSubcategories?.forEach((category: ISUBCATEGORY) => {
        if (category.sizes && category.sizes[0].height) plankLengthSet.add(category.sizes[0].height);
        if (category.sizes && category.sizes[0].width) plankWidthSet.add(category.sizes[0].width);
        if (category.sizes && category.sizes[0].thickness) thicknessSet.add(category.sizes[0].thickness);
      });
    }

    setUniqueFilters({
      commercialWarranty: Array.from(commercialWarrantySet),
      residentialWarranty: Array.from(residentialWarrantySet),
      thicknesses: Array.from(thicknessSet),
      plankWidth: Array.from(plankWidthSet),
      plankLength: Array.from(plankLengthSet),
      Colours: Array.from(colorSet),
    });
  };



  useEffect(() => {
    extractUniqueAttributes(category);
  }, [category]);


  const getColorCount = (targetColor: string): number => {
    return category.products?.filter((product: IProduct) =>
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
    setPriceValue([49, 149])
    setSelectedProductFilters({
      Colours: [],
      commercialWarranty: [],
      residentialWarranty: [],
      thicknesses: [],
      plankWidth: [],
      plankLength: []
    });
    setIsWaterProof(null)
  }

  const filtervalues: IfilterValues = {
    commercialWarranty: "CommmericallWarranty",
    residentialWarranty: "ResidentialWarranty",
    thicknesses: "thickness",
    plankWidth: "plankWidth",
    plankLength: "plankLength"
  }


  const filterProductsCountHanlder = (key: keyof IfilterValues, ValuesType: string) => {
    if(isColection){
      const filterprod = sortedSubcategories?.filter((product: ISUBCATEGORY) => {
          if(key === 'thicknesses'){
            const values = product.sizes?.[0].thickness
            return values == ValuesType;
          } else if(key === 'plankWidth'){
            const values = product.sizes?.[0].width
            return values == ValuesType;
          } else if(key === 'plankLength'){
            const values = product.sizes?.[0].height
            return values == ValuesType;
          }
          
      })
  
      return filterprod?.length || 0
    }
    const filterprod = category?.products?.filter((product: IProduct) => {
      if (key === 'plankLength') {
        const values = product.sizes?.[0].height
        return values == ValuesType;
      }
      const values = product[filtervalues[key] as keyof IProduct]
      return values == ValuesType;
    })

    return filterprod.length || 0


  }



  return (
    <div className={`p-2 xl:p-4 w-full space-y-5  ${className}`}>
      <div className="border-b-2 pb-5">
        <p className="text-16 font-medium uppercase pb-2  text-[#191C1F] font-inter">Filter by Category</p>

        {orderedCategories.map((category, index) => {
          const reCallFlag = category.recalledSubCats && category.recalledSubCats.length > 0;
          if(isColection && category.name === 'ACCESSORIES') return;
          let subcategories: ISUBCATEGORY[] = (reCallFlag ? category.recalledSubCats : category.subcategories) as ISUBCATEGORY[] || [];
          subcategories = [...subcategories].sort((a, b) => {
            return getSubcategoryOrder(a.name) - getSubcategoryOrder(b.name);
          });
          subcategories = [...subcategories].sort((a, b) => {
              const orderA = getSubcategoryOrder(a.name);
              const orderB = getSubcategoryOrder(b.name);
              if (orderA !== orderB) {
                return orderA - orderB;
              } else {
                return (Number(a.price) || 0) - (Number(b.price) || 0);
              }
            });
          
          return (
            <Accordion key={index} title={category.name} >
              <ul className="pl-4 text-sm text-gray-600 space-y-1 font-inter">

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
          <ul className="pl-4 text-sm text-gray-600 space-y-1 font-inter">
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
          <ul className="pl-4 text-sm text-gray-600 space-y-1 font-inter">
            {(catSlug === 'richmond-flooring' || catSlug === 'lvt-flooring' || catSlug === 'spc-flooring' || catSlug === 'richmond') && (
              <li>
                <Link
                  href={`/${catSlug === 'spc-flooring' ? 'polar' : 'richmond'
                    }/spc-eco`}
                  className="cursor-pointer hover:text-primary block capitalize"
                >
                  Eco
                </Link>
              </li>
            )}
            <li>
              <Link
                href={`/${catSlug === 'spc-flooring' ? 'polar' :
                  catSlug === 'polar-flooring' ? 'polar' :
                    'richmond'
                  }/spc-herringbone`}
                className="cursor-pointer hover:text-primary block capitalize"
              >
                herringbone
              </Link>
            </li>
            {(catSlug === 'richmond-flooring' || catSlug === 'lvt-flooring' || catSlug === 'spc-flooring' || catSlug === 'richmond') && (
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


        {!isColection && (
          <Accordion title="Waterproof">
            <ul className="pl-4 text-sm space-y-1 font-inter">
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
        )}


        {Object.entries(uniqueFilters).map(([filterKey, filterValues]) => {
          if (filterValues.length === 0) return null;



          return (
            <Accordion key={filterKey} title={filterTitles[filterKey as keyof typeof uniqueFilters]}>
              <ul className="pl-4 text-sm text-gray-600 space-y-1 font-inter">
                {filterValues.map((item, i) => {
                  let length;
                  let remaingCategory
                  if (filterKey === 'Colours') {
                    length = getColorCount(item)
                  } else {
                    remaingCategory = filterProductsCountHanlder(filterKey as keyof IfilterValues, item)
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
                        {item + (length ? ` (${length})` : remaingCategory ? ` (${remaingCategory})` : "")}
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
        <p className="text-16 font-medium uppercase pb-5  text-[#191C1F] font-inter">Price Range</p>
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
        <p className="text-16 font-medium uppercase pb-5  text-[#191C1F] font-inter">popular Brands</p>
        <div className="flex gap-4 flex-wrap items-center">
          <ul className="space-y-3 font-inter">
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
        <p className="text-16 font-medium uppercase pb-5 text-[#191C1F] font-inter">Popular Tag</p>
        <div className="flex items-center ">
          <RatioButtons options={orderedCategories} />
        </div>
      </div>
    </div>
  );
};

export default Filters;
