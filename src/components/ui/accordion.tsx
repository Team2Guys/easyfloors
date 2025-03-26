import React from "react";

import { AiOutlinePlus, AiOutlineMinus } from "react-icons/ai";
import { AccordionProps } from "types/types";

const Accordion = ({ label, children, isOpen, onToggle,  detailpage, showPlusMinus }: AccordionProps) => {
  return (
    <div className={`py-2 ${showPlusMinus ? '' : detailpage ? 'border px-2' : 'border-b'}`}>
      <div className="flex justify-between items-center">
        <div
          onClick={onToggle}
          className={`text-14 lg:text-16 font-semibold flex items-center w-full text-left gap-2 cursor-pointer select-none
          ${showPlusMinus ? "border-b pb-2" : ""}`}
        >
          {isOpen ? <AiOutlineMinus className="w-5 h-5 text-primary" /> : <AiOutlinePlus className="w-5 h-5 " />}
          {label}

        </div>
      </div>
      {isOpen && <div className={`mt-2 ${showPlusMinus ? '' : detailpage ? 'pl-9' : 'border-l pl-4'}`}>{children}</div>}
    </div>
  );
};

export default Accordion;
