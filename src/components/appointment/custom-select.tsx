"use client";
import { useState, useEffect, useRef } from "react";
import { FiChevronDown } from "react-icons/fi";

interface Option {
   value: string;
   label: string;
   disabled?: boolean;
}

interface SelectProps {
   name: string;
   label: string;
   options: Option[];
   required?: boolean;
   placeholder?: string;
   value: string;
   onChange: React.Dispatch<React.SetStateAction<string>>;
}

const CustomSelect = ({
   name,
   label,
   options,
   required = false,
   placeholder,
   value,
   onChange,
}: SelectProps) => {
   const [isOpen, setIsOpen] = useState(false);
   const dropdownRef = useRef<HTMLDivElement | null>(null);

   useEffect(() => {
      const handleClickOutside = (event: MouseEvent) => {
         if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
            setIsOpen(false);
         }
      };
      document.addEventListener("mousedown", handleClickOutside);
      return () => {
         document.removeEventListener("mousedown", handleClickOutside);
      };
   }, []);

   return (
      <div className="flex flex-col mb-1">
         <label htmlFor={name} className="text-13 font-medium font-inter">
            {label} {required && <span className="text-red-500">*</span>}
         </label>

         <div ref={dropdownRef} className="relative w-full mt-1">
            <button
               type="button"
               onClick={() => setIsOpen(!isOpen)}
               className="flex justify-between items-center w-full px-3 h-11 border border-gray-300 bg-white focus:ring-2 focus:ring-primary text-12 font-medium font-inter"
            >
               {value ? options.find((opt) => opt.value === value)?.label : placeholder}
               <FiChevronDown className={`text-gray-500 transition ${isOpen ? "rotate-180" : ""}`} />
            </button>

            {isOpen && (
               <ul className="absolute left-0 w-full bg-white border border-gray-200 rounded-md mt-1 shadow-md z-20 max-h-[255px] h-auto overflow-y-auto">
                  {options.map((option, index) => (
                     <li
                        key={index}
                        className={`px-4 py-2 cursor-pointer hover:bg-primary hover:text-white transition text-12 lg:text-sm ${option.disabled ? "cursor-not-allowed opacity-50" : ""}`}
                        onClick={() => {
                           if (!option.disabled) {
                              onChange(option.value);
                              setIsOpen(false);
                           }
                        }}
                     >
                        {option.label}
                     </li>
                  ))}
               </ul>
            )}
         </div>
      </div>
   );
};

export default CustomSelect;
