"use client";

import React, { useState } from "react";
import { HiMinus, HiPlus } from "react-icons/hi";
import { FAQsListProps } from "types/types";

const FAQsList: React.FC<FAQsListProps> = ({ faqspage }) => {
    const [openIndex, setOpenIndex] = useState<number | null>(0);

    const toggleFAQ = (index: number) => {
        setOpenIndex(openIndex === index ? null : index);
    };

    const midIndex = Math.ceil(faqspage.length / 2);
    const leftColumn = faqspage.slice(0, midIndex);
    const rightColumn = faqspage.slice(midIndex);

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 md:gap-6">
            {[leftColumn, rightColumn].map((column, colIndex) => (
                <div key={colIndex} className="font-inter font-semibold">
                    {column.map((faq, index) => {
                        const actualIndex = colIndex === 1 ? index + midIndex : index;
                        return (
                            <div key={actualIndex} className="shadow-lg md:mt-6 mt-4 rounded-md md:py-5 py-3 border-gray-50">
                                <button
                                    onClick={() => toggleFAQ(actualIndex)}
                                    className="flex w-full items-center justify-between text-left focus:outline-none md:py-5 md:px-5 pt-2 px-5 font-inter font-semibold"
                                >
                                    <h2 className="md:text-xl text-base text-gray-700">
                                        <div className="flex md:items-center gap-5">
                                            <div>
                                                {openIndex === actualIndex ? (
                                                    <HiMinus size={30} className="md:w-[25px] w-[20px] font-light text-primary" />
                                                ) : (
                                                    <HiPlus size={30} className="md:w-[25px] w-[20px] font-normal text-gray-700" />
                                                )}
                                            </div>
                                            {faq.question}
                                        </div>
                                    </h2>
                                </button>
                                <div
                                    className={`overflow-hidden transition-all duration-300 ease-in-out md:px-12 px-5 ${
                                        openIndex === actualIndex ? "max-h-[500px] opacity-100 pb-2 md:pl-16 pl-16" : "max-h-0 opacity-0"
                                    }`}
                                >
                                    <p className="text-gray-700 font-normal md:text-lg text-sm md:pt-0 pt-2 text-justify md:text-left">{faq.answer}</p>
                                </div>
                            </div>
                        );
                    })}
                </div>
            ))}
        </div>
    );
};

export default FAQsList;
