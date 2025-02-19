"use client";
import { useState, useEffect, useRef } from "react";
import { FiChevronDown } from "react-icons/fi";

const Select = ({ options }: { options: string[] }) => {
  const [selected, setSelected] = useState(options[0]);
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement | null>(null);
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {setIsOpen(false); }};
        document.addEventListener("mousedown", handleClickOutside);
        return () => {document.removeEventListener("mousedown", handleClickOutside);};}, []);

  return (
    <div ref={dropdownRef} className="relative w-48 z-40">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex justify-between items-center w-full px-4 py-2 border border-gray-300 rounded-md bg-white hover:border-primary transition font-inter text-14"
      >
        {selected}
        <FiChevronDown
          className={`text-gray-500 transition ${isOpen ? "rotate-180" : ""}`}
        />
      </button>
      {isOpen && (
        <ul className="absolute left-0 w-full bg-white border border-gray-200 rounded-md mt-1 shadow-md">
          {options.map((option, index) => (
            <li
              key={index}
              className="px-4 py-2 cursor-pointer hover:bg-primary hover:text-white transition font-inter text-14"
              onClick={() => {
                setSelected(option);
                setIsOpen(false);
              }}
            >
              {option}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Select;
