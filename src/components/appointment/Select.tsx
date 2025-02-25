"use client";
import { useState, useEffect, useRef } from "react";
import { Field, ErrorMessage } from "formik";
import { FiChevronDown } from "react-icons/fi";

interface Option {
  value: string;
  label: string;
  disabled?: boolean;
}

interface SelectProps {
  name: string;
  options: Option[];
  label: string;
  required?: boolean;
  placeholder?: string;
}

const Select = ({ name, options, label, required = false, placeholder = "Select Location" }: SelectProps) => {
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
    <div className="flex flex-col mb-2">
      <label htmlFor={name} className="text-13 font-medium font-inter">
        {label} {required && <span className="text-red-500">*</span>}
      </label>

      <div ref={dropdownRef} className="relative w-full  mt-2">
        
        <Field name={name}>
          {({ field, meta }: { field: any; meta: { touched: boolean; error?: string } }) => ( // eslint-disable-line
            <>
              <button
                type="button"
                onClick={() => setIsOpen(!isOpen)}
                className="flex justify-between items-center w-full px-3 h-11 border border-gray-300 bg-white focus:ring-2 focus:ring-primary text-12 font-medium font-inter"
              >
                {field.value || placeholder}
                <span className="block lg:hidden">
                  <svg
                    width="12"
                    height="16"
                    viewBox="0 0 12 16"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M9.32255 12.0478V6.38313H7.66021V12.0478H5.1667L8.49138 15.272L11.8161 12.0478H9.32255ZM3.50436 0.726562L0.179688 3.9508H2.67319V9.61545H4.33553V3.9508H6.82904L3.50436 0.726562ZM9.32255 12.0478V6.38313H7.66021V12.0478H5.1667L8.49138 15.272L11.8161 12.0478H9.32255ZM3.50436 0.726562L0.179688 3.9508H2.67319V9.61545H4.33553V3.9508H6.82904L3.50436 0.726562Z"
                      fill="#232327"
                    />
                  </svg>
                </span>
                <span className="hidden lg:block">
                  <FiChevronDown className={`text-gray-500 transition ${isOpen ? "rotate-180" : ""}`} />
                </span>
              </button>

              {isOpen && (
                <ul className="absolute left-0 w-full bg-white border border-gray-200 rounded-md mt-1 shadow-md z-20">
                  {options.map((option, index) => (
                    <li
                      key={index}
                      className={`px-4 py-2 cursor-pointer hover:bg-primary hover:text-white transition text-12 lg:text-sm ${option.disabled ? "cursor-not-allowed opacity-50" : ""}`}
                      onClick={() => {
                        if (!option.disabled) {
                          field.onChange({ target: { name, value: option.value } });
                          setIsOpen(false);
                        }
                      }}
                    >
                      {option.label}
                    </li>
                  ))}
                </ul>
              )}

            </>
          )}
        </Field>
        <ErrorMessage name={name}>
          {(msg) => <div className="text-red-500 text-sm">{msg}</div>}
        </ErrorMessage>
      </div>
    </div>
  );
};

export default Select;
