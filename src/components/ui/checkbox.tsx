"use client";

import { useEffect, useState } from "react";
import { CheckboxProps } from "types/types";

const Checkbox = ({ label, isActive, onChange }:CheckboxProps) => {
  const [isChecked, setIsChecked] = useState<boolean>(false);

  useEffect(() => {
    setIsChecked(isActive || false);
  }, [isActive]);

  const handleChange = () => {
    const newCheckedState = !isChecked;
    setIsChecked(newCheckedState);
    onChange?.(newCheckedState);
  };

  return (
    <label className="flex items-center cursor-pointer space-x-2" onClick={handleChange}>
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
      <span className={`text-black font-inter text-14 ${isChecked ? "font-medium" : "font-normal"}`}>
        {label}
      </span>
    </label>
  );
};

export default Checkbox;
