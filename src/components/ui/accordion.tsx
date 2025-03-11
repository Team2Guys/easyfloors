import React from "react";
import { IoChevronDown } from "react-icons/io5";
interface AccordionProps {
  label: string;
  children: React.ReactNode;
  isOpen: boolean;
  onToggle: () => void;
  detailpage?: boolean;
}

const Accordion = ({ label, children, isOpen, onToggle,detailpage }: AccordionProps) => {
  return (
    <div className={` py-2 ${detailpage ? 'border px-2 ' : 'border-b'}`}>
      <div className="flex justify-between items-center">
        <button
          onClick={onToggle}
          className=" text-14 lg:text-16 font-semibold flex items-center w-full text-left gap-2"
        >
          {detailpage && <div className="h-[2px] w-6 bg-primary"/>}
          {label}
          {!detailpage && 
          <IoChevronDown
          className={`w-5 h-5 ml-auto transition-transform ${
            isOpen ? "rotate-180" : ""
          }`}
          />}
        </button>
      </div>
      {isOpen && <div className={`mt-2  ${detailpage ? 'pl-8' : 'border-l pl-4'}`}>{children}</div>}
    </div>
  );
};

export default Accordion;
