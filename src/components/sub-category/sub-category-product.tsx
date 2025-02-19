import Card from "components/Card/Card";
import Select from "components/ui/Select";
import { features, product } from "data/data";
import React from "react";
import { FiSearch, FiX } from "react-icons/fi";

const SubCategory = () => {
  return (
    <div className="space-y-4 font-inter mb-10 lg:mb-20">
      <div className="flex items-center border border-gray-300 px-2 py-2 w-full max-w-md focus-within:ring-2 focus-within:ring-primary hover:border-primary transition">
        <input
          type="text"
          placeholder="Search for anything..."
          className="flex-1 px-2 outline-none bg-transparent"
        />
        <FiSearch className="text-gray-500" size={20} />
      </div>
      <p className=" text-14 md:text-16 2xl:text-20 lg:leading-[26px] font-inter">
        Lorem Ipsum is simply dummy text of the printing and typesetting
        industry. Lorem Ipsum has been the industrys standard dummy text ever
        since the 1500s, when an unknown printer took a galley of type and
        scrambled it to make a type specimen book. It has survived not only five
        centuries, but also the leap into electronic typesetting, remaining
        essentially unchanged. It was popularised in the 1960s with the release
        of Letraset sheets containing Lorem Ipsum passages, and more recently
        with desktop publishing software like Aldus PageMaker including versions
        of Lorem Ipsum.
      </p>
      <div className="flex items-center justify-end gap-2 pt-4">
        <span className="text-[#191C1F] text-14 ">Sort by:</span>
        <Select options={["Most Popular", "Low to High", "High to Low"]} />
      </div>
      <div className="flex justify-between items-center bg-[#F2F4F5] p-2 md:p-3 rounded-md w-full">
        <div className="flex items-center gap-1 md:gap-3">
          <span className="text-[#191C1F] text-[8px] md:text-14">Active Filters:</span>
          <div className="flex items-center  px-3 py-1  text-[#191C1F] text-[8px] md:text-14">
            Polar Herringbone SPC - American Walnut
            <FiX className="ml-2 text-gray-500 cursor-pointer hover:text-red-500" />
          </div>
        </div>
        <p className="text-[#191C1F] text-[8px] md:text-14">
          12 <span className="text-[#5F6C72]">Results found</span>
        </p>
      </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
          {product.map((product, productIndex) => (
            <Card key={productIndex} product={product} features={features} />
          ))}
        </div>
    </div>
  );
};

export default SubCategory;
