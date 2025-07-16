import React from 'react';
import { boxData } from 'data/data';
import Link from 'next/link';
import Image from 'next/image';  

const NeedHelp = () => {
    return (
    <div className="grid grid-cols-2 justify-center lg:gap-10 sm:gap-5 gap-2 container px-2 sm:px-4 mx-auto">
    {boxData.map((box,index) => (
    <div key={index} className="md:py-10 py-4 md:px-0 px-2 text-center border-[#CCCCCC] border-2 font-inter flex flex-col justify-between">
        <div>
         <Image src={box.icon} alt={box.title} width={64} height={64}  className="mx-auto mb-1 sm:mb-4 w-full sm:h-16 h-6 object-contain"/>
        <div className='max-w-xl mx-auto'>
            <h2 className="text-12 sm:text-base md:text-3xl font-semibold">{box.title}</h2>
            <p className="px-2 xl:px-0 md:text-lg text-12 sm:text-sm mt-1 md:mt-4 text-justify">{box.description}</p>
        </div>
        </div>
        <Link href={box.link} className="md:text-lg text-[9px] sm:px-12 px-2 py-3 bg-primary w-fit mx-auto mt-2 text-white" >{box.buttonText}</Link>
    </div>
        ))}
    </div>
    );
};

export default NeedHelp;
