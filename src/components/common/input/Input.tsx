import React from "react";
import { TextInputProps } from "types/types";

const Input: React.FC<TextInputProps> = ({ label, name, required = false, placeholder = "" , type= "text"}) => {
  return (
    <div className="flex flex-col mb-2">
      <label htmlFor={name} className="text-14 md:text-20 font-medium font-inter">
        {label} {required && <span className="text-red-500">*</span>}
      </label>
      <input
        type={type}
        id={name}
        name={name}
        required={required}
        placeholder={placeholder}
        className=" p-2 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary mt-5"
      />
    </div>
  );
};

export default Input;
