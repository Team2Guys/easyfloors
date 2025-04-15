import { blocksData } from 'data/data';
import React from 'react';
import Image from 'next/image';

const Layers = () => {
  return (
    <div className="grid grid-cols-2 mt-10 md:mt-16 border border-b-1 mb-10">
      {blocksData.map((block, index) => (
        <div
          key={block.id}
          className={`${index === 0 ? 'border-r-2 pb-4' : ''}`}
        >
          <h2 className="md:text-5xl text-lg font-inter font-bold mb-4 bg-primary text-white text-center p-4">
            {block.heading}
          </h2>
          <div className="flex flex-col justify-between sm:justify-left md:pl-5">
            <div className="mx-auto md:py-5">
              <ul className="list-disc md:pl-20 pl-7 mb-4 font-inter font-medium sm:font-light px-2">
                {block.points.map((point, index) => (
                  <li key={index} className="md:text-xl text-10 sm:text-[12px] md:py-1.5 py-1">
                    {point}
                  </li>
                ))}
              </ul>
            </div>
              <Image
                src={block.imageUrl}
                alt={block.heading}
                loading='lazy'
                width={500} 
                height={300} 
                className="w-full h-[100px]  md:h-[300px] px-2 md:px-0 object-contain "
              />
          </div>
        </div>
      ))}
    </div>
  );
};

export default Layers;
