import React from "react";
import Image from "next/image";
import { WhatAmICategoryData, SubSection } from "types/types";

const WhatAmICetagory: React.FC<{ data: WhatAmICategoryData }> = ({ data }) => {
  return (
    <section className="container mx-auto px-4 py-12 font-inter">
      <h1 className="text-2xl md:text-4xl font-bold text-center md:mb-8 mb-4">
        {data.categoryHeading}
      </h1>
      <p>{data.categorycontent}</p>

      <div className="space-y-6  mt-10">
        {data.subSections.map((section: SubSection, index: number) => (
          <div key={index}>
            <h2 className="text-xl md:text-2xl font-semibold mb-2">{section.subHeading}</h2>
            <p>{section.content}</p>
          </div>
        ))}
      </div>
      <div className="flex flex-col md:flex-row justify-center gap-6 mt-10">
        {data.images.map((image, index) => (
          <div key={index} className="w-full md:w-1/2">
            <Image
              src={image.src}
              alt={image.alt}
              width={1000}
              height={1000}
              className="w-full h-auto"
            />
          </div>
        ))}
      </div>
    </section>
  );
};

export default WhatAmICetagory;
