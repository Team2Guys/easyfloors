"use client";
import Accordion from "components/ui/accordion";
import React, { useState, useEffect } from "react";

interface FAQprops {
  FAQS?: { name: string; detail: string }[];
}

const FaqDetail = ({ FAQS }: FAQprops) => {
  const [openAccordions, setOpenAccordions] = useState<string[]>([]);

  useEffect(() => {
    if (FAQS && FAQS.length > 0) {
      setOpenAccordions(FAQS.map((faq) => faq.name)); // Open all accordions by default
    }
  }, [FAQS]);

  const handleToggle = (label: string) => {
    setOpenAccordions((prev) =>
      prev.includes(label) ? prev.filter((item) => item !== label) : [...prev, label]
    );
  };

  return (
    <div>
      {FAQS && FAQS.length > 0 && (
        <>
          <p className="mx-auto max-w-[72%] sm:max-w-[25%] pl-1 mb-10 text-14 sm:text-24 font-inter font-medium pt-10">
            FAQ’s
          </p>
          <div className="max-w-[90%] mx-auto mt-5 font-inter">
            {FAQS.map((faq, index) => (
              <Accordion
                key={index}
                detailpage
                label={faq.name}
                isOpen={openAccordions.includes(faq.name)} 
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
