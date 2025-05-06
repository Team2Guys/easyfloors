'use client'
import CollectionCard from 'components/CollectionCard/CollectionCard';
import Container from 'components/common/container/Container';
import Filters from 'components/sub-category/filters';
import { collectionFilter } from 'lib/helperFunctions';
import React, { useEffect, useState } from 'react'
import { FiX } from 'react-icons/fi';
import { FilterState, ISUBCATEGORY } from 'types/cat';
import { IProduct } from 'types/prod';
import { ICategory } from 'types/type';
import { SelectedFilter } from 'types/types';

const Collections = ({ sortedSubcategories, categories, slug }: { sortedSubcategories: ISUBCATEGORY[], categories: ICategory[], slug: string }) => {
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
     const [filteredProducts, setFilteredProducts] = useState<ISUBCATEGORY[] | IProduct[]>([]);
   useEffect(() => {
      const { filtered, appliedFilters } = collectionFilter({
        products: sortedSubcategories, 
        priceValue,
        selectedProductFilters,
        sortOption: '',
        isWaterProof: null,
      });
    
      setFilteredProducts(filtered);
      setSelectedFilters(appliedFilters);
    }, [
      selectedProductFilters,
      priceValue,
      sortedSubcategories,
    ]);
      const handleRemoveFilter = (item: { name: "isWaterProof"; value: boolean }
        | { name: keyof FilterState; value: string }) => {
        if (item.name === "isWaterProof") {
          setIsWaterProof(null)
        } else {
          setSelectedProductFilters((prevFilters) => ({
            ...prevFilters,
            [item.name]: (prevFilters[item.name] as string[]).filter(
              (val) => val !== item.value
            ),
          }));
        }
      };

   return (
      <Container className="flex flex-wrap lg:flex-nowrap lg:gap-4 xl:gap-8 my-4 lg:my-10">
         <div className=" lg:w-[20%] ">
            <Filters
               className="hidden lg:block"
               catgories={categories}
               sortedSubcategories={sortedSubcategories}
               isWaterProof={isWaterProof}
               setIsWaterProof={setIsWaterProof}
               selectedProductFilters={selectedProductFilters}
               setSelectedProductFilters={setSelectedProductFilters}
               priceValue={priceValue}
               setPriceValue={setPriceValue}
               catSlug={slug}
               isColection
            />
         </div>
         <div className='lg:w-[80%]'>
            <div className={`flex mb-4 ${selectedFilters.length > 0 ? 'justify-between items-center' : 'justify-end items-center'}  bg-[#F2F4F5] p-2 md:p-3 rounded-md w-full min-h-14`}>
               {selectedFilters.length > 0 &&
                  <div className="flex items-center md:gap-3">
                     <span className="text-[#191C1F] text-12 md:text-13 text-nowrap">Active Filters:</span>
                     <div className="flex items-center flex-wrap gap-x-1 gap-y-1 px-3 py-1  text-[#191C1F] text-10 md:text-14">
                        {selectedFilters.map((item, index) => (
                           <div key={index} className="flex items-center gap-1 md:gap-2 flex-nowrap">
                              <span>
                                 {item.value === true ? 'Yes' : item.value === false ? 'No' : item.value}
                              </span>
                              <FiX
                                 className="text-gray-500 cursor-pointer hover:text-red-500"
                                 onClick={() => handleRemoveFilter(item)}
                              />
                           </div>
                        ))}
                     </div>
                  </div>
               }

               <p className="text-[#191C1F] text-12 md:text-14">
                  {filteredProducts.length} <span className="text-[#5F6C72]">{filteredProducts.length === 1 ? 'Result' : 'Results'} found</span>
               </p>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-3 md:gap-6 gap-2">
               {filteredProducts.map((subcategory, index) => (
                  <div key={index}>
                     <CollectionCard subcategory={subcategory as ISUBCATEGORY} />
                  </div>
               ))}
            </div>

         </div>
      </Container>
   )
}

export default Collections