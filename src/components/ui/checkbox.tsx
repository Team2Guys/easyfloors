"use client";

import { useEffect, useState } from "react";
import { ReactNode } from "react";

export interface CheckboxProps {
  name?: string; 
  checked?: boolean; 
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void; //eslint-disable-line
  children?: ReactNode; 
  className?: string; 
  required?: boolean; 
}

const Checkbox = ({
  name,
  checked,
  onChange,
  children,
  className,
  required,
  
}: CheckboxProps) => {
  const [isChecked, setIsChecked] = useState<boolean>(checked || false);

  useEffect(() => {
    setIsChecked(checked || false);
  }, [checked]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newCheckedState = e.target.checked;
    setIsChecked(newCheckedState);
    if (onChange) {
      onChange(e); 
    }
  };

  return (
    <label className={`flex items-center cursor-pointer space-x-2 ${className || ''}`}>
      <input
        type="checkbox"
        name={name}
        checked={isChecked}
        onChange={handleChange}
        required={required}
        className="hidden" 
      />
      <div
        className={`w-5 h-5 border-2 flex items-center justify-center transition-colors duration-200 ${
          isChecked ? "bg-orange-600 border-orange-600 text-white" : "border-primary"
        }`}
      >
        {isChecked && (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="w-4 h-4 text-white"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={3}
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
          </svg>
        )}
        {!isChecked && (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="w-4 h-4 text-primary"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={3}
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
          </svg>
        )}
      </div>
      {children && (
        <span
          className={`text-black font-inter text-14 ${
            isChecked ? "font-medium" : "font-normal"
          }`}
        >
          {children}
        </span>
      )}
    </label>
  );
};

export default Checkbox;