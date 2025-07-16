import { useEffect, useState } from "react";
import Accordion from "./component/accordion";
import PriceSlider from "./component/price-slider";
import Checkbox from "components/ui/checkbox";
import RatioButtons from "components/ui/radio-button";
import { CategoriesFilter, Category, FilterState, ISUBCATEGORY } from "types/cat";
import Link from "next/link";
import { FIlterprops } from "types/types";
import { usePathname } from "next/navigation";
import { IfilterValues } from "types/type";
import { getSubcategoryOrder } from "data/home-category";
import { desiredCategoryOrder, filterTitles } from "data/filter";
import { extractUniqueAttributes, filterProductsCountHanlder, getColorCount, handleClearFilter, handleFilterSelection } from "lib/filterhelper";

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
  const [orderedCategories, setOrderedCategories] = useState<CategoriesFilter[]>([]);
  const path = usePathname();

    useEffect(() => {
    if (!catgories?.length) return;

    const sorted = [...catgories]
      .filter(cat => !(isColection && cat.name.toUpperCase() === "ACCESSORIES"))
      .sort((a, b) => {
        return desiredCategoryOrder.indexOf(a.name.toUpperCase()) - desiredCategoryOrder.indexOf(b.name.toUpperCase());
      })
      .map(category => {
        const reCallFlag = category.recalledSubCats && category.recalledSubCats.length > 0;
        let subcategories: ISUBCATEGORY[] = (reCallFlag ? category.recalledSubCats : category.subcategories) || [];

        subcategories = [...subcategories].sort((a, b) => {
          const orderA = getSubcategoryOrder(a.name);
          const orderB = getSubcategoryOrder(b.name);
          if (orderA !== orderB) {
            return orderA - orderB;
          } else {
            return (Number(a.price) || 0) - (Number(b.price) || 0);
          }
        });

        return {
          ...category,
          sortedSubcategories: subcategories,
        };
      });

    setOrderedCategories(sorted);
  }, [catgories, isColection]);

  useEffect(() => {
    const richmond = catgories.find(
      (cat: Category) => cat.name.toLowerCase() === "richmond flooring"
    );
    const polar = catgories.find(
      (cat: Category) => cat.name.toLowerCase() === "polar flooring"
    );
    setCategoryState({ polar, richmond });
  }, [catgories]);


useEffect(() => {
  if(!category && (sortedSubcategories && sortedSubcategories.length > 0 )) return;
  const {
    commercialWarrantySet,
    residentialWarrantySet,
    thicknessSet,
    plankWidthSet,
    plankLengthSet,
    colorSet,
  } = extractUniqueAttributes(category, sortedSubcategories, isColection);

  setUniqueFilters({
    commercialWarranty: Array.from(commercialWarrantySet),
    residentialWarranty: Array.from(residentialWarrantySet),
    thicknesses: Array.from(thicknessSet),
    plankWidth: Array.from(plankWidthSet),
    plankLength: Array.from(plankLengthSet),
    Colours: Array.from(colorSet),
  });
}, [category, sortedSubcategories, isColection]);


  return (
    <div className={`p-2 xl:p-4 w-full space-y-5  ${className}`}>
      <div className="border-b-2 pb-5">
        <p className="text-16 font-medium uppercase pb-2  text-[#191C1F] font-inter">Filter by Category</p>

        {orderedCategories.map((category, index) => (
        <Accordion key={index} title={category.name}>
          <ul className="pl-4 text-sm text-gray-600 space-y-1 font-inter">
            {category.sortedSubcategories?.map((subCategory, i) => (
              <Link
                key={i}
                href={`/${subCategory?.category?.RecallUrl || category.RecallUrl}/${subCategory.custom_url}`}
                className="cursor-pointer hover:text-primary block"
              >
                {subCategory.name}
              </Link>
            ))}
          </ul>
        </Accordion>
      ))}
        <Accordion title='Manufacturer' >
          <ul className="pl-4 text-sm text-gray-600 space-y-1 font-inter">
            {Object.values(categoryState ?? {}).map((item) => {
              if (!item) return null;
              return (
                <li key={item.custom_url}>
                  <Link href={`/${item.custom_url ?? ""}`} className="cursor-pointer hover:text-primary block capitalize">
                    {item.name.toLowerCase()}
                  </Link>
                </li>
              );
            })}
          </ul>
        </Accordion>

        <Accordion title="Style">
          <ul className="pl-4 text-sm text-gray-600 space-y-1 font-inter">

            {/* ECO Logic */}
            {(catSlug === 'polar-flooring' || catSlug === 'spc-flooring' || catSlug === 'lvt-flooring' || catSlug === 'richmond-flooring' || catSlug === 'richmond') && (
              <li>
                <Link
                  href={`/${catSlug === 'polar-flooring' ? 'polar'
                      : catSlug === 'spc-flooring' ? 'polar'
                        : 'richmond'
                    }/spc-eco`}
                  className="cursor-pointer hover:text-primary block capitalize"
                >
                  Eco
                </Link>
              </li>
            )}

            {/* Herringbone */}
            <li>
              <Link
                href={`/${catSlug === 'spc-flooring' || catSlug === 'polar-flooring' ? 'polar' : 'richmond'
                  }/spc-herringbone`}
                className="cursor-pointer hover:text-primary block capitalize"
              >
                Herringbone
              </Link>
            </li>

            {/* Only for Polar */}
            {catSlug === 'polar-flooring' && (
              <li>
                <Link
                  href="/polar/lvt"
                  className="cursor-pointer hover:text-primary block capitalize"
                >
                  Comfort
                </Link>
              </li>
            )}

            {/* Prime – Only for Richmond, LVT, SPC */}
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
                  onClick={() => setIsWaterProof(isWaterProof === true ? null : true)}
                >
                  Yes
                </button>
              </li>
              <li>
                <button
                  className={`cursor-pointer ${!isWaterProof && isWaterProof !== undefined && isWaterProof !== null ? 'text-primary' : 'text-gray-600 hover:text-primary'}`}
                  onClick={() => setIsWaterProof(isWaterProof === false ? null : false)}
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
                    length = getColorCount(item , category)
                  } else {
                    remaingCategory = filterProductsCountHanlder(filterKey as keyof IfilterValues, item ,category , sortedSubcategories)
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
                        onClick={() => handleFilterSelection(filterKey as keyof FilterState, item , setSelectedProductFilters)}
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
              <button className="border border-[#cc7644] text-[#cc7644] w-[106px] h-[40px] text-14 rounded-[3px] transition hover:bg-[#cc7644] hover:text-white font-inter" onClick={() => handleClearFilter(setPriceValue, setSelectedProductFilters, setIsWaterProof)} >
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
