"use client";
import React, { useEffect, useRef, useState } from "react";
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";
import { CartSelectProps } from "types/type";

const CartSelect = ({ select, onSelect, selectedFee }: CartSelectProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedState, setSelectedState] = useState("City");
  const dropdownRef = useRef<HTMLDivElement>(null);
  const handleSelect = (state: string) => {
    setSelectedState(state);
    setIsOpen(false);
    const fee = selectedFee > 1000 ? 0 : state === 'Dubai' ? 100 : 150; 
    onSelect(state, fee);
  };
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="flex justify-between text-16 lg:text-20">
      <p>Shipping</p>
      <div>
        <div className="border bg-white text-[#BBBBBB] text-12 xl:text-15 2xl:pl-4 2xl:pr-8 2xl:px-5 2xl:py-3 px-2 py-2 w-full mb-2">
          United Arab Emirates
        </div>
        <div className="relative w-full font-inter" ref={dropdownRef}>
        <div
          className="border bg-white 2xl:px-5 2xl:py-3 px-2 py-2 w-full cursor-pointer flex justify-between items-center text-12 xl:text-15 text-[#BBBBBB]"
          onClick={() => setIsOpen(!isOpen)}
        >
          {selectedState}
          <span>{isOpen ? <IoIosArrowUp /> : <IoIosArrowDown />}</span>
        </div>

        {isOpen && (
          <div className="absolute top-full left-0 z-10 w-full bg-white border border-t-0 max-h-[90px] overflow-y-auto">
            {select.map((state, index) => (
              <div
                key={index}
                className="px-5 py-1 border-b text-[#BBBBBB] hover:text-black cursor-pointer text-12 xl:text-15"
                onClick={() => handleSelect(state.value)}
              >
                {state.value}
              </div>
            ))}
          </div>
        )}
        </div>

      </div>
      {/* <p className="hidden md:block">
        {selectedFee === 0 ? "Free" : `AED ${selectedFee}`}
      </p> */}
    </div>
  );
};

export default CartSelect;
