import { ReactNode } from "react";

interface InputProps {
  type: string;
  name: string;
  placeholder: string;
  icon: ReactNode;
  required?: boolean; 
}

const InputField = ({ type, name, placeholder, icon, required }: InputProps) => {
  return (
    <div className="relative flex items-center mt-4 p-2">
      <span className="absolute left-3 text-primary">{icon}</span>
      <input
        type={type}
        name={name}
        placeholder={placeholder}
        required={required} 
        className="w-full pl-8 p-3 border-b shadow-none focus:outline-none focus:ring-0"
      />
    </div>
  );
};

export default InputField;
