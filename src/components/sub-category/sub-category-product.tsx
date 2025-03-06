"use client"
import Card from "components/Card/Card";
import Modal from "components/ui/modal";
import Select from "components/ui/Select";
import { features, product } from "data/data";
import React, { useState } from "react";
import { FiX } from "react-icons/fi";
import Filters from "./filters";
import { Category } from "types/cat";

const SubCategory = ({category}: {category: Category}) => {
  const [isModalOpen, setModalOpen] = useState(false);
  return (
    <div className="space-y-4 font-inter  lg:mb-20">
      {/* <div className="hidden lg:flex items-center border border-gray-300 px-2 py-2 w-full max-w-md focus-within:ring-2 focus-within:ring-primary hover:border-primary transition">
        <input
          type="text"
          placeholder="Search for anything..."
          className="flex-1 px-2 outline-none bg-transparent"
        />
        <FiSearch className="text-gray-500" size={20} />
      </div> */}
      <h1 className="text-34 font-bold">{category.name}</h1>
      <p className=" text-14 md:text-16 2xl:text-20 lg:leading-[26px] font-inter">
        {category.description}
      </p>
      <div className="flex items-center justify-between">
      <div className="">
      <button onClick={() => setModalOpen(true)}
        className=" h-9 w-24 shadow text-black rounded-md flex items-center gap-2 justify-center  lg:hidden"
      >
        Filter 
        <span><svg width="16" height="14" viewBox="0 0 16 14" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M14.6693 1H1.33594L6.66927 7.30667V11.6667L9.33594 13V10.1533V7.30667L14.6693 1Z" stroke="#232327" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
        </span>
      </button>

      <Modal isOpen={isModalOpen} onClose={() => setModalOpen(false)} className="px-2">
        <Filters/>
      </Modal>
      </div>
      <div className="flex items-center justify-end gap-2 lg:pt-4">
        <span className="text-[#191C1F] text-14 hidden lg:block">Sort by:</span>
        <Select options={["Most Popular", "Low to High", "High to Low"]} />
      </div>
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
          {product.map((products, index) => (
            <Card key={index} product={products} features={features} />
          ))}
        </div>
    </div>
  );
};

export default SubCategory;
