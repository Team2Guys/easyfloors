import React from "react";
import { IoChevronDown } from "react-icons/io5";
interface AccordionProps {
  label: string;
  children: React.ReactNode;
  isOpen: boolean;
  onToggle: () => void;
}

const Accordion = ({ label, children, isOpen, onToggle }: AccordionProps) => {
  return (
    <div className="border-b py-2">
      <div className="flex justify-between items-center">
        <button
          onClick={onToggle}
          className=" text-14 lg:text-16 font-semibold flex items-center w-full text-left"
        >
          {label}
          <IoChevronDown
            className={`w-5 h-5 ml-auto transition-transform ${
              isOpen ? "rotate-180" : ""
            }`}
          />
        </button>
      </div>
      {isOpen && <div className="mt-2 pl-4 border-l">{children}</div>}
    </div>
  );
};

export default Accordion;
