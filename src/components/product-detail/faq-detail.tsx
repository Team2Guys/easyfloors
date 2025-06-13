"use client";
import Accordion from "components/ui/accordion";
import React, { useState } from "react";

interface FAQprops {
  FAQS?: { name: string; detail: string }[];
}

const FaqDetail = ({ FAQS }: FAQprops) => {
  const [openAccordion, setOpenAccordion] = useState<string | null>(null);

  const handleToggle = (label: string) => {
    setOpenAccordion((prev) => (prev === label ? null : label)); 
  };
  return (
    <div>
      {FAQS && FAQS.length > 0 && (
        <>
          <h2 className="mx-auto max-w-[72%] text-center sm:max-w-[25%] pl-1 mb-10 text-base sm:text-24 font-inter font-medium pt-10">
            FAQ’s
          </h2>
          <div className="max-w-[90%] mx-auto mt-5 font-inter">
            {FAQS.map((faq, index) => (
              <Accordion
                key={index}
                detailpage
                label={faq.name}
                isOpen={openAccordion === faq.name} 
                onToggle={() => handleToggle(faq.name)}
              >
                <p className="text-14 lg:text-16">{faq.detail}</p>
              </Accordion>
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default FaqDetail;
