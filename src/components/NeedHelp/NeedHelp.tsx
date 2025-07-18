'use client';

import Container from 'components/common/container/Container';
import { boxData } from 'data/data';
import Link from 'next/link';
import Image from 'next/image';

const NeedHelp = () => {
  return (
    <Container>
      <div className="grid grid-cols-2 justify-center gap-2 xsm:gap-4 sm:gap-5 md:gap-10 pt-6 xsm:pt-0">
        {boxData.map((box, index) => (
          <div
            key={index}
            className="flex flex-col justify-between border-2 border-[#CCCCCC] py-4 px-2 xsm:p-4 sm:p-6 md:py-10 text-center font-inter bg-white"
          >
            {/* Image Section with fixed aspect ratio */}
            <div className="flex flex-col items-center mb-4 gap-2">
              <div className="relative w-16 h-16 xsm:w-20 xsm:h-20 mb-2 aspect-square">
                <Image
                  src={box.icon}
                  alt={box.title}
                  fill
                  className="object-contain"
                  sizes="(max-width: 640px) 64px, 80px"
                  priority // prioritize above-the-fold
                />
              </div>

              {/* Heading with min-height to prevent jump */}
              <h2 className="text-xs sm:text-base md:text-3xl font-semibold leading-tight min-h-[1.75rem] md:min-h-[2.5rem]">
                {box.title}
              </h2>
            </div>

            {/* Description with consistent text size */}
            <div className="flex-1 max-w-xl mx-auto">
              <p className="text-xs sm:text-sm md:text-base lg:text-lg text-justify mt-2 px-2 xl:px-0 leading-relaxed">
                {box.description}
              </p>
            </div>

            {/* Button with consistent size */}
            <div className="mt-6">
              <Link
                href={box.link}
                className="inline-block py-2 sm:py-2.5 md:py-3 px-2 xsm:px-4 md:px-10 text-xs sm:text-sm md:text-base bg-primary text-white font-medium text-center min-h-[2rem] xsm:min-h-[2.5rem] leading-snug"
              >
                {box.buttonText}
              </Link>
            </div>
          </div>
        ))}
      </div>
    </Container>
  );
};

export default NeedHelp;
