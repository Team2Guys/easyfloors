import React from "react";

interface InputProps {
  type: string;
  name: string;
  placeholder: string;
  icon: React.ReactNode;
  value: string;
  onChange: (_e: React.ChangeEvent<HTMLInputElement>) => void;

};

const InputField: React.FC<InputProps> = ({ type, name, placeholder, icon, value, onChange }) => {
  return (
    <div className="relative mb-4">
      <div className="absolute left-0 bottom-4 text-primary">{icon}</div>
      <input
        type={type}
        name={name}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        className="w-full pl-8 p-3 border-b shadow-none focus:outline-none focus:ring-0"
      />
    </div>
  );
};

export default InputField;
