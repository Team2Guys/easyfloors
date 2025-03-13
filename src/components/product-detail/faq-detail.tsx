'use client'
import Accordion from 'components/ui/accordion';
import React, { useState } from 'react';

interface FAQprops {
  FAQS: { name: string; detail: string }[];
}

const FaqDetail = ({FAQS}:FAQprops) => {
  const [openAccordion, setOpenAccordion] = useState<string | null>(null);

  const handleToggle = (label: string) => {
    setOpenAccordion(openAccordion === label ? null : label);
  };



  return (
    <>
    <p className='mx-auto max-w-[72%]  sm:max-w-[25%] pl-1 mb-10 text-14 sm:text-24 font-inter font-medium pt-10'>FAQ’s</p>
    <div className="max-w-[90%] mx-auto mt-5 font-inter">
      {FAQS.map((faq,index) => (
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
  );
};

export default FaqDetail;