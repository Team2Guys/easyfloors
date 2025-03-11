'use client'
import Accordion from 'components/ui/accordion';
import { faqData } from 'data/produuct-detail';
import React, { useState } from 'react';

const FaqDetail = () => {
  const [openAccordion, setOpenAccordion] = useState<string | null>(null);

  const handleToggle = (label: string) => {
    setOpenAccordion(openAccordion === label ? null : label);
  };



  return (
    <>
    <p className='mx-auto max-w-[72%]  sm:max-w-[25%] pl-1 mb-10 text-14 sm:text-24 font-inter font-medium pt-10'>FAQ’s</p>
    <div className="max-w-[90%] mx-auto mt-5 font-inter">
      {faqData.map((faq) => (
          <Accordion
          key={faq.id}
          detailpage
          label={faq.label}
          isOpen={openAccordion === faq.id}
          onToggle={() => handleToggle(faq.id)}
          >
          <p className="text-14 lg:text-16">{faq.content}</p>
          </Accordion>
      ))}
    </div>
    </>
  );
};

export default FaqDetail;