import React from "react";
import { IoChevronDown } from "react-icons/io5";
import { AiOutlinePlus, AiOutlineMinus } from "react-icons/ai";
import { AccordionProps } from "types/types";

const Accordion = ({ label, children, isOpen, onToggle, detailpage, showPlusMinus }: AccordionProps) => {
  return (
    <div className={`py-2 ${showPlusMinus ? '' : detailpage ? 'border px-2' : 'border-b'}`}>
      <div className="flex justify-between items-center">
        <div
          onClick={onToggle}
          className={`text-14 lg:text-16 font-semibold flex items-center w-full text-left gap-2 cursor-pointer select-none
          ${showPlusMinus? "border-b pb-2" :""}`}
        >
          {detailpage && <div className="h-[2px] w-6 bg-primary" />}
          {label}
          {!detailpage && (
            showPlusMinus ? (
              isOpen ? <AiOutlineMinus className="w-5 h-5 ml-auto" /> : <AiOutlinePlus className="w-5 h-5 ml-auto" />
            ) : (
              <IoChevronDown className={`w-5 h-5 ml-auto transition-transform ${isOpen ? "rotate-180" : ""}`} />
            )
          )}
        </div>
      </div>
      {isOpen && <div className={`mt-2 ${showPlusMinus ? '' : detailpage ? 'pl-8' : 'border-l pl-4'}`}>{children}</div>}
    </div>
  );
};

export default Accordion;
