"use client";
import { useState, useEffect, useRef } from "react";
import { Field, ErrorMessage } from "formik";
import { FiChevronDown } from "react-icons/fi";
import { SelectProps } from "types/type";

const Select = ({ name, options, label, required = false, placeholder = "Select Location" }: SelectProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [search, setSearch] = useState("");
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
        <Field name={name}>
          {({ field, form }: { field: any; form: any }) => (
            <div className="relative">
             
              <input
                type="text"
                {...field}
                value={options.find((option) => option.value === field.value)?.label || ""}
                onChange={(e) => {
                  setSearch(e.target.value);
                  form.setFieldValue(name, e.target.value); 
                }}
                onFocus={() => setIsOpen(true)}
                placeholder={placeholder}
                className="w-full px-3 h-11 border border-gray-300 bg-white focus:ring-2 focus:ring-primary text-12 font-medium font-inter outline-none"
              />

              <button
                type="button"
                onClick={() => setIsOpen(!isOpen)}
                className="absolute right-3 top-1/2 transform -translate-y-1/2"
              >
                <FiChevronDown className={`text-gray-500 transition ${isOpen ? "rotate-180" : ""}`} />
              </button>

              {isOpen && (
                <ul className="absolute left-0 w-full bg-white border border-gray-200 rounded-md mt-1 shadow-md z-20">
                  {options
                    .filter((option) => option.label.toLowerCase().includes(search.toLowerCase()))
                    .map((option, index) => (
                      <li
                        key={index}
                        className="px-4 py-2 cursor-pointer hover:bg-primary hover:text-white transition text-12 lg:text-sm"
                        onClick={() => {
                          form.setFieldValue(name, option.value);
                          setSearch(option.label);
                          setIsOpen(false);
                        }}
                      >
                        {option.label}
                      </li>
                    ))}
                </ul>
              )}
            </div>
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
