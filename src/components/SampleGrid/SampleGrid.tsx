"use client";

import Image from "next/image";
import { SampleGridProps } from "types/types";

const SampleGrid: React.FC<SampleGridProps> = ({ sections }) => {
  return (
    <div className="grid grid-cols-1 xl:grid-cols-2 pb-8 md:pb-12">
      {sections.map((section, index) => (
        <div
        key={section.id}
        className="flex flex-row items-center w-full"
        >
          <div
          className={`w-full md:w-1/2 text-center md:text-left flex flex-col h-full md:items-start justify-center xl:justify-between space-y-4 p-6 md:p-10 ${
          index % 2 === 0 ? "bg-primary text-white" : "bg-[#FFF9F5] text-black"
            }`}
          >
            <h2 className="text-14 sm:text-2xl md:text-3xl font-semibold">{section.title}</h2>
            <p className="text-10 sm:text-base lg:text-xl font-normal font-inter">{section.description}</p>
            <button
            className={`px-1 py-2 sm:px-6 sm:py-4 text-12 sm:text-xl md:text-2xl xl:text-22 w-full font-semibold transition ${
            index % 2 === 0
                  ? "bg-white text-black hover:bg-gray-300"
                  : "bg-black text-white hover:bg-gray-800"
              }`}
            >
              {section.buttonText}
            </button>
          </div>
            <div className="w-full h-full md:w-1/2 flex items-center">
            <Image
              src={section.image}
              alt={section.alt}
              width={500}
              height={500}
              className="w-full h-full object-cover "
            />
          </div>
       
        </div>
      ))}
    </div>
  );
};

export default SampleGrid;
