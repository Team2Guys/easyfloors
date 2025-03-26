import React from "react";
import { IoChevronDown } from "react-icons/io5";

import { AiOutlinePlus, AiOutlineMinus } from "react-icons/ai";
import { AccordionProps } from "types/types";

const Accordion = ({ label, children, isOpen, onToggle,  detailpage, showPlusMinus }: AccordionProps) => {
  return (
    <div className={`py-2 ${detailpage ? "border" : "border-b-0"}`}>
      <div className="flex justify-between items-center">
        <div
          onClick={onToggle}
          className={`text-14 lg:text-16 font-semibold flex items-center w-full text-left gap-3 px-2 transition-all
          ${isOpen ? "pb-2 border-b" : "pb-0 border-b-0"}`}
        >
          {detailpage && <div className="h-[2px] w-6 bg-primary"  />}
          {label}
          {!detailpage && (
            <IoChevronDown
              className={`w-5 h-5 ml-auto transition-transform ${isOpen ? "rotate-180" : ""}`}
            />
          )}
        </button>
      </div>
      {isOpen && <div className={`mt-2 ${detailpage ? "pl-9" : "border-l pl-4"}`}>{children}</div>}
    </div>
  );
};

export default Accordion;
