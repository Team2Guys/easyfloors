"use client";
import React, { useState } from "react";
import { HiMinus, HiPlus } from "react-icons/hi";
import { FAQItem } from "types/type";

interface FaqsProps {
    data: FAQItem[];
    className?:string;
  }
  
  const Faqs: React.FC<FaqsProps> = ({ data,className }) => {
    const [openIndex, setOpenIndex] = useState<number | null>(0);

    const toggleFAQ = (index: number) => {
        setOpenIndex(openIndex === index ? null : index);
    };

    return (
        <section className={`bg-white py-10 md:mt-10 ${className}`}>
                <h1 className="text-2xl font-semibold font-inter text-[#1B1139] lg:text-3x text-center md:mb-10 mb-6">
                    FAQ’S
                </h1>

                <div className="border font-inter font-semibold">
                    {data.map((faq, index) => (
                        <div key={faq.id}>
                            <button
                                onClick={() => toggleFAQ(index)}
                                className="flex w-full items-center justify-between text-left focus:outline-none p-4"
                            >
                                <h2 className="md:text-xl text-base text-gray-700 ">
                                    <div className="flex md:items-center gap-3">
                                        <div>
                                            {openIndex === index ? (
                                                <HiMinus size={30} className="md:w-[25px] w-[20px] font-light text-primary" />
                                            ) : (
                                                <HiPlus size={30} className="md:w-[25px] w-[20px] font-normal text-gray-700" />
                                            )}
                                        </div>
                                        {faq.question}
                                    </div>
                                </h2>
                            </button>
                            {openIndex === index && (
                                <div className="pt-5 pb-4 flex gap-4 pl-5 text-gray-700  border-t font-normal md:text-lg text-sm">
                                    <span>A.</span> {faq.answer}
                                </div>
                            )}
                            <hr className="border-gray-200 " />
                        </div>
                    ))}
                </div>
        </section>
    );
};

export default Faqs;
