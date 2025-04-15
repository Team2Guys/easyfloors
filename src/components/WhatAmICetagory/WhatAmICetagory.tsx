import React from "react";
import Image from "next/image";
import { ISUBCATEGORY } from "types/cat";


const WhatAmICetagory: React.FC<{ subcat: ISUBCATEGORY }> = ({ subcat }) => {
  return (
    <section className="container mx-auto px-4 py-12 font-inter">
      <h2 className="text-2xl md:text-4xl font-bold text-center md:mb-8 mb-4">
        {subcat.whatAmiTopHeading}
      </h2>

      <div className="space-y-6  mt-10">
        {subcat.whatamIdetails.map((section, index: number) => (
          <div key={index}>
            {section.name &&
              <h2 className="text-xl md:text-2xl font-semibold mb-2">{section.name}</h2>

            }
            <p>{section.detail}</p>
          </div>
        ))}
      </div>
      <div className="grid grid-cols-2 gap-2 md:gap-6 mt-10">
        {subcat?.whatAmiImage?.map((img, index) => (
          <div key={index} className="w-full">
            <Image
              src={img.imageUrl}
              alt={img.altText || "SubCategory text"}
              width={1000}
              height={1000}
              className="w-full h-[130px] md:h-[300px] lg:h-[400px] xl:h-[500px] object-fill"
            />
          </div>
        ))}
      </div>
    </section>
  );
};

export default WhatAmICetagory;
