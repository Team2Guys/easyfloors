import { blocksData } from 'data/data';
import React from 'react';
import Image from 'next/image';

const Layers: React.FC = () => {
  return (
    <div className="grid grid-cols-2 md:grid-cols-2 mt-10 md:mt-16 border border-b-1 mb-10">
      {blocksData.map((block, index) => (
        <div
          key={block.id}
          className={`${index === 0 ? 'border-r-2' : ''}`}
        >
          <h2 className="md:text-5xl text-2xl font-inter font-bold mb-4 bg-primary text-white text-center p-4">
            {block.heading}
          </h2>
          <div className="flex justify-center">
            <div className="text-left md:py-5">
              <ul className="list-disc md:pl-20 pl-7 mb-4 font-inter font-light px-2">
                {block.points.map((point, index) => (
                  <li key={index} className="md:text-xl text-[12px] md:py-1.5 py-1">
                    {point}
                  </li>
                ))}
              </ul>
              <Image
                src={block.imageUrl}
                alt={block.heading}
                width={500} 
                height={300} 
                className="w-full h-auto md:px-0 px-10"
              />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Layers;
