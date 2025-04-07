"use client";
import { useState, useRef, useEffect } from "react";
import { ErrorMessage, useFormikContext } from "formik";
import { FiChevronDown } from "react-icons/fi";

interface Option {
  value: string;
  label: string;
}

interface SelectProps {
  name: string;
  options: Option[];
  label?: string;
  required?: boolean;
  placeholder?: string;
}

const Select = ({ name, options, label, required = false, placeholder = "Select Location" }: SelectProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const { values, setFieldValue } = useFormikContext<{ [key: string]: string }>();

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="flex flex-col mb-1">
      {label && (
        <label htmlFor={name} className="text-13 font-medium font-inter">
          {label} {required && <span className="text-red-500">*</span>}
        </label>
      )}

      <div ref={dropdownRef} className="relative w-full mt-1">
        <button
          type="button"
          onClick={() => setIsOpen(!isOpen)}
          className="flex justify-between items-center w-full px-3 h-11 border border-gray-300 bg-white text-12 font-medium font-inter"
        >
          {values[name] ? options.find(opt => opt.value === values[name])?.label : placeholder}
          <FiChevronDown className={`text-gray-500 transition ${isOpen ? "rotate-180" : ""}`} />
        </button>

        {isOpen && (
          <ul className="absolute left-0 w-full bg-white border border-gray-200 rounded-md mt-1 shadow-md z-20 max-h-40 overflow-auto">
            {options.map((option) => (
              <li
                key={option.value}
                className="px-4 py-2 cursor-pointer hover:bg-primary hover:text-white transition text-12 lg:text-sm"
                onClick={() => {
                  setFieldValue(name, option.value);
                  setIsOpen(false);
                }}
              >
                {option.label}
              </li>
            ))}
          </ul>
        )}
      </div>

      <ErrorMessage name={name}>
        {(msg) => <div className="text-red-500 text-sm">{msg}</div>}
      </ErrorMessage>
    </div>
  );
};

export default Select;