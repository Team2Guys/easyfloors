"use client";

import { useState } from "react";
import { ProductDetailsProps } from "types/type";

const ProductDetails: React.FC<ProductDetailsProps> = ({ tabs }) => {
  const [activeTab, setActiveTab] = useState<number>(0);
  return (
    <div className="p-2 lg:p-4 font-inter">
      {/* Tab Buttons */}
      <div className="flex justify-center items-center">
        {tabs.map((tab, index) => (
          <button
            key={index}
            className={`py-2 px-3 text-14 lg:text-[24px] transition ${
              activeTab === index
                ? "text-primary font-semibold"
                : "text-[#9F9F9F] font-normal"
            }`}
            onClick={() => setActiveTab(index)}
          >
            {tab.title}
          </button>
        ))}
      </div>

      {/* Tab Content */}
      <div className="sm:mt-4">
  <h2 className="text-14 lg:text-[20px] font-inter font-medium">{tabs[activeTab].heading}</h2>
  <p className="mt-2 font-normal text-10 lg:text-[16px]">{tabs[activeTab].content}</p>
  {tabs[activeTab].bulletpoints && tabs[activeTab].bulletpoints.length > 0 && (
    <ul className="list-disc pl-5 mt-2">
      {tabs[activeTab].bulletpoints.map((point, index) => (
        <li key={index} className="text-10 lg:text-[16px]">{point}</li>
      ))}
    </ul>
  )}
  </div>
</div>
  );
};

export default ProductDetails;
