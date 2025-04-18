import Image from "next/image";
import React from "react";
import Link from "next/link";
import { TiArrowRight } from "react-icons/ti";
import { HeroMainProps } from "types/type";

const HeroMain: React.FC<HeroMainProps> = ({ items }) => {
  return (
    <div className="relative flex flex-col w-full sm:h-[600px] xl:h-[885px]">
      {items.map((item, index) => (
        <div
          key={index}
          className="relative w-full h-[302px] sm:h-[600px] xl:h-[885px]"
        >
          <Image
            src={item.backgroundImage}
            alt="hero"
            priority
            width={1920}
            height={1080}
            loading="eager"
            className="w-full h-full object-cover"
          />
          <div className="bg-background">
            <div className="absolute top-[6%] sm:top-[20%] lg:top-[14%] bg-background left-4 sm:left-0 opacity-90 xs:opacity-95 p-2 sm:p-6 md:p-8 w-[50%] xs:w-[35%] sm:w-[270px] md:w-[300px] lg:w-[400px] xl:w-[500px] shadow-md">
              <div className="flex flex-col justify-start items-start font-inter text-black font-light space-y-1 sm:space-y-3 lg:space-y-4 sm:pl-4 md:pl-5 lg:pl-12 xl:pl-16">
                <p className="text-[10px] sm:text-sm">{item.offerText}</p>
                <h2 className="text-14 sm:text-2xl lg:text-[35px] xl:text-5xl leading-[1.2] sm:leading-[1.4] md:leading-[1.6] xl:leading-[67.2px] font-currency"dangerouslySetInnerHTML={{ __html: item.title }} />
                <p className="text-[10px] sm:text-sm md:text-base sm:leading-6 md:leading-7 w-full">
                  {item.description}
                </p>
                <Link
                  href={item.buttonLink}
                  className="px-2 py-1 sm:px-5 sm:py-3 xl:px-16 lg:px-6 lg:py-7 text-white bg-primary font-semibold xs:font-medium text-[9px] sm:text-sm lg:text-20 transition inline-block"
                >
                  {item.buttonText}
                </Link>
              </div>
            </div>
          </div>

          <div className="absolute bottom-4 sm:bottom-5 right-3 sm:right-5 xl:right-14 bg-background opacity-90 xs:opacity-95 p-1 sm:p-4 md:p-5 shadow-md w-[170px] sm:h-auto sm:w-[180px] md:w-[220px] lg:w-[314px] sm:space-y-1 xl:space-y-2 justify-start text-start">
            <Link
              href="/polar-flooring"
              aria-label="Visit american walnut product page"
            >
              <h3 className="text-14 sm:text-sm lg:text-[28px] font-medium">
                {item.brand}
              </h3>
              <div className=" flex justify-start items-center gap-2 mt-1 lg:mt-3 ">
                <span dangerouslySetInnerHTML={{ __html: item.priceText }}/>
                <p className="text-[16px] lg:text-[30px]">
                  <TiArrowRight />
                </p>
              </div>
            </Link>
          </div>
        </div>
      ))}
    </div>
  );
};

export default HeroMain;
