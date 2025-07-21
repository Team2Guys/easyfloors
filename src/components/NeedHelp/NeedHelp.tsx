
import React from 'react';
import { boxData } from 'data/data';
import Link from 'next/link';
import Image from 'next/image';

const NeedHelp = () => {
  return (
    <div className='container mx-auto px-2 sm:px-4 grid grid-cols-2 gap-2 md:gap-10'>
      {boxData.map((box, index) => (
      <div className='border-2 border-[#CCCCCC] px-2 py-10 flex flex-col justify-between text-center font-inter space-y-2 sm:space-y-4' key={index}>
        <div>
        <div className="relative size-12 xsm:size-16 mb-2 mx-auto">
          <Image
            src={box.icon}
            alt={box.title}
            fill
            className="object-contain"
          />
        </div>
        <h2 className="text-xs sm:text-base md:text-3xl font-semibold">
          {box.title}
        </h2>
        </div>
        <p className="text-xs sm:text-sm md:text-base lg:text-lg text-justify max-w-xl mx-auto">
        {box.description}
        </p>
          <Link
            href={box.link}
            className="block w-fit mx-auto text-xs sm:text-sm md:text-base bg-primary text-white sm:ont-medium px-4 py-2 mt-6"
          >
            {box.buttonText}
          </Link>
      </div>
      ))}
    </div>
  );
};

export default NeedHelp;
