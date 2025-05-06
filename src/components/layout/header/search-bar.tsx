import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";
import { HiOutlineSearch } from "react-icons/hi";
import { IProduct } from "types/prod";

interface SearchBarProps {
  className?: string;
  productData?: IProduct[];
}

const SearchBar = ({ className, productData }: SearchBarProps) => {
  const [searchText, setSearchText] = useState("");
  const [isProductListOpen, setIsProductListOpen] = useState(false);
  const filteredItems = productData?.sort((a,b)=>{
    const aNameMatch = a.name.toLowerCase().includes(searchText);
    const bNameMatch = b.name.toLowerCase().includes(searchText);

    if (aNameMatch && !bNameMatch) return -1;
    if (!aNameMatch && bNameMatch) return 1;
    return 0;
  })?.flatMap((product) => {
      const searchTerm = searchText.trim().toLowerCase();
      const isExplicitSearch = searchTerm.length >= 4;
      const productMatches =
        ((product.stock && product.stock > 0) || isExplicitSearch) &&
        (product.name.toLowerCase().includes(searchTerm) ||
          product.price.toString().includes(searchTerm) ||
          product.description?.toString().includes(searchTerm) ||
          product.discountPrice?.toString().includes(searchTerm) ||
          product.category.RecallUrl?.toString().includes(searchTerm) ||
          product.subcategory.custom_url?.toString().includes(searchTerm));
      const matchingAccessories =
        product.acessories?.filter(
          (acc) =>
            ((acc.stock && acc.stock > 0) || isExplicitSearch) &&
            acc.name.toLowerCase().includes(searchTerm)
        ) || [];

      return productMatches ? [product, ...matchingAccessories] : matchingAccessories;
    }) || [];



  const uniqueItems = filteredItems.filter(
    (item, index, self) =>
      item.__typename !== "Accessory" ||
      self.findIndex((acc) => acc.id === item.id) === index
  );

  return (
    <form
      className={`relative w-full max-w-[10rem] sm:max-w-[17rem] 2xl:max-w-[40rem] font-inter ${className}`}
      onSubmit={(e) => e.preventDefault()}
    >
      <input
        type="text"
        placeholder="Search"
        value={searchText}
        onClick={() => setIsProductListOpen(true)}
        onChange={(e) => {
          setSearchText(e.target.value);
          setIsProductListOpen(true);

        }}
        className="w-full pl-10 pr-4 h-8 text-14 lg:text-[10px] xl:text-14 sm:h-6 2xl:h-[31px] border border-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-400 bg-gray-100"
      />
      <div className="absolute left-3 top-1/2 transform -translate-y-1/2">
        <HiOutlineSearch className="h-5 w-5 lg:h-3 lg:w-4 xl:h-5 xl:w-5" />
      </div>

      {isProductListOpen && (
        <>
          <div className="absolute top-full left-1/2 transform -translate-x-1/2 w-[310px] sm:w-[350px] xl:w-[400px] 2xl:w-[500px] bg-white border border-[#afa183] border-opacity-30 rounded-2xl mt-2 sm:mt-6 z-20">
            <div className="flex justify-end mb-2 sticky top-0 p-2 z-30 bg-white rounded-t-2xl">
              <svg
                className="cursor-pointer"
                onClick={() => setIsProductListOpen(false)}
                width="28"
                height="28"
                viewBox="0 0 48 48"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <rect x="0.5" y="0.5" width="47" height="47" stroke="#424542" />
                <path
                  d="M8.95313 9L7.35938 10.5937L14.0625 17.2969L20.7656 24L14.0625 30.7031L7.35938 37.4062L8.98125 39.0187L10.5938 40.6406L17.2969 33.9375L24 27.2344L30.7031 33.9375L37.4063 40.6406L39.0188 39.0187L40.6406 37.4062L33.9375 30.7031L27.2344 24L33.9375 17.2969L40.6406 10.5937L39.0188 8.98125L37.4063 7.35938L30.7031 14.0625L24 20.7656L17.3156 14.0812C13.65 10.4156 10.6219 7.40625 10.5938 7.40625C10.5656 7.40625 9.825 8.12812 8.95313 9Z"
                  fill="#424542"
                />
              </svg>
            </div>

            <div className="max-h-[420px] overflow-y-scroll mb-3">
              {uniqueItems.length > 0 ? (
                uniqueItems.map((product, index) => {
                  const isAccessory = product.__typename === "Accessory";
                  return (
                    <Link
                      key={index}
                      href={isAccessory
                        ? `/accessories/${product.custom_url?.toLowerCase()}`
                        : `/${product.category.RecallUrl}/${product.subcategory.custom_url}/${product.custom_url?.toLowerCase()}`
                      }
                      onClick={() => setIsProductListOpen(false)}
                    >
                      <div className="flex border p-2 mx-1 my-2 rounded-md bg-white hover:shadow-md transition duration-300 gap-2 cursor-pointer border-[#afa183] border-opacity-30">
                        <Image
                          width={100}
                          height={100}
                          src={product.posterImageUrl.imageUrl}
                          alt={product.name}
                          className="size-20 md:size-28"
                        />
                        <div className="pt-1 w-full text-start font-inter">
                          <p className="text-17 md:text-21 capitalize font-inter">{product.name}</p>
                          <div className="flex items-center gap-1 xs:gap-4">
                            {product.discountPrice && product.discountPrice > 0 ? (
                              <>
                                <p className="text-15 font-semibold text-[#FF0000]">
                                <span className="font-currency text-18 font-normal"></span> <span>{product.discountPrice}</span>
                                </p>
                                <p className="text-[12px] text-primary-foreground font-bold line-through">
                                <span className="font-currency text-18 font-normal"></span> <span>{product.price}</span>
                                </p>
                              </>
                            ) : (
                              <p className="text-15 font-semibold">
                                <span className="font-currency text-18 font-normal"></span> <span>{product.price}</span>
                              </p>
                            )}
                          </div>
                          <p className="text-16">
                            {product.stock && product.stock > 0 ? "In Stock" : <span className="text-[#FF0000]">Out of Stock</span>}
                          </p>
                        </div>
                      </div>
                    </Link>
                  )
                })
              ) : (
                <div className="w-full animate-pulse px-2">
                  {[...Array(3)].map((_, i) => (
                    <div key={i} className="h-28 w-full bg-gray-300 rounded mb-3"></div>
                  ))}
                </div>
              )}
            </div>
          </div>
          <div
            onClick={() => setIsProductListOpen(false)}
            className="fixed inset-0 bg-black bg-opacity-0"
          />
        </>
      )}
    </form>
  );
};

export default SearchBar;
