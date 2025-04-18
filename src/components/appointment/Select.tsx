"use client";
import { useState, useRef, useEffect } from "react";
import { ErrorMessage, useFormikContext } from "formik";
import { FiChevronDown, FiX } from "react-icons/fi";

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
  initialValue?: string;
}

const Select = ({ name, options, label, required = false, placeholder = "Select Location",initialValue }: SelectProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const dropdownRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const { values, setFieldValue } = useFormikContext<{ [key: string]: string }>();

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
        setSearchTerm("");
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isOpen]);

  const filteredOptions = options.filter(option =>
    option.label.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleSelectClick = () => {
    setIsOpen(!isOpen);
    setSearchTerm("");
  };

  const handleOptionSelect = (option: Option) => {
    setFieldValue(name, option.value);
    setIsOpen(false);
    setSearchTerm("");
  };

  const handleClearSearch = () => {
    setSearchTerm("");
    if (inputRef.current) {
      inputRef.current.focus();
    }
  };
  useEffect(() => {
    if (initialValue) {
      setFieldValue(name, initialValue);
    }
  }, [initialValue, name, setFieldValue]);
  const displayValue = values[name] 
    ? options.find(opt => opt.value === values[name])?.label 
    : placeholder;

  return (
    <div className="flex flex-col mb-1">
      {label && (
        <label htmlFor={name} className="text-13 font-medium font-inter">
          {label} {required && <span className="text-red-500">*</span>}
        </label>
      )}

      <div ref={dropdownRef} className="relative w-full mt-1">
        <div
          onClick={handleSelectClick}
          className="flex justify-between items-center w-full px-3 h-11 border border-gray-300 bg-white text-12 font-medium font-inter cursor-pointer"
        >
          {isOpen ? (
            <input
              ref={inputRef}
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder={displayValue}
              className="w-full focus:outline-none flex-1"
              onClick={(e) => e.stopPropagation()}
            />
          ) : (
            <span className={`truncate flex-1 text-left ${!values[name] ? 'text-gray-400' : ''}`}>
              {displayValue}
            </span>
          )}
          <div className="flex items-center">
            {isOpen && searchTerm && (
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  handleClearSearch();
                }}
                className="text-gray-400 hover:text-gray-600 mr-1"
              >
                <FiX size={16} />
              </button>
            )}
            <FiChevronDown className={`text-gray-500 transition ${isOpen ? "rotate-180" : ""}`} />
          </div>
        </div>

        {isOpen && (
          <ul className="absolute left-0 w-full bg-white border border-gray-200 rounded-b-md shadow-md z-20 max-h-60 overflow-y-auto">
            {filteredOptions.length > 0 ? (
              filteredOptions.map((option) => (
                <li
                  key={option.value}
                  className="px-4 py-2 cursor-pointer hover:bg-primary hover:text-white transition text-12 lg:text-sm"
                  onClick={() => handleOptionSelect(option)}
                >
                  {option.label}
                </li>
              ))
            ) : (
              <li className="px-4 py-2 text-12 text-gray-500">
                No options found
              </li>
            )}
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