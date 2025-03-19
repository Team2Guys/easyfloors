import React from "react";
import { InputProps } from "types/types";

const InputField: React.FC<InputProps> = ({
  type,
  name,
  placeholder = "Enter text...",
  icon,
  value,
  onChange,
  onBlur,
  required,
}) => {
  return (
    <div className="relative flex items-center mt-4 p-2">
      <span className="absolute left-3 text-primary">{icon}</span>
      <input
        type={type}
        name={name}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        onBlur={onBlur}
        required={required}
        aria-label={name}
        className="w-full pl-8 p-3 border-b shadow-none focus:outline-none focus:ring-0"
      />
    </div>
  );
};

export default InputField;
