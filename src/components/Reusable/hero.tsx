import Image from "next/image";
import React from "react";
import Link from "next/link";
import { TiArrowRight } from "react-icons/ti";

interface HeroItem {
  backgroundImage: string;
  offerText: string;
  title: string;
  highlight: string;
  description: string;
  buttonText: string;
  buttonLink: string;
  priceText: string;
  flooringType: string;
  brand: string;
}

interface HeroMainProps {
  items: HeroItem[];
}

const HeroMain: React.FC<HeroMainProps> = ({ items }) => {
  return (
    <div className="relative flex flex-col w-full sm:h-[600px] xl:h-[885px]">
      {items.map((item, index) => (
        <div key={index} className="relative w-full h-[302px] sm:h-[600px] xl:h-[885px]">
          {/* Background Image */}
          <Image
            src={item.backgroundImage}
            alt="hero"
            width={1920}
            height={1080}
            className="w-full h-full object-cover"
          />

          {/* Left Content Box */}
          <div className="absolute top-[6%] sm:top-[20%] left-4 sm:left-5 md:left-10 lg:left-16 bg-background opacity-80 p-2 sm:p-6 md:p-8 w-[50%] xs:w-[70%] sm:w-[270px] md:w-[300px] lg:w-[400px] shadow-md">
            <div className="flex flex-col justify-start items-start font-inter text-black font-light space-y-1 sm:space-y-3 lg:space-y-4">
              <p className="text-[10px] sm:text-sm">{item.offerText}</p>
              <h2 className="text-14 sm:text-2xl lg:text-5xl leading-[1.2] sm:leading-[1.4] md:leading-[1.6] xl:leading-[67.2px]">
                {item.title} <br />
                <span className="font-medium">{item.highlight}</span>
              </h2>
              <p className="text-[10px] sm:text-sm md:text-base sm:leading-6 md:leading-7 w-full">
                {item.description}
              </p>
              <Link
                href={item.buttonLink}
                className="px-2 py-1 sm:px-5 sm:py-3 text-white bg-primary font-medium text-[10px] sm:text-sm transition inline-block"
              >
                {item.buttonText}
              </Link>
            </div>
          </div>

          {/* Bottom-Right Info Box */}
          <div className="absolute bottom-4 sm:bottom-5 right-3 sm:right-5 xl:right-14 bg-background opacity-80 p-1 sm:p-4 md:p-5 shadow-md w-[147px] h-[63px] sm:h-auto sm:w-[180px] md:w-[220px] lg:w-[294px] sm:space-y-1 xl:space-y-2 justify-start text-start">
            <h3 className="sm:text-sm lg:text-[28px] font-medium">
              {item.brand} <span className="font-normal">Flooring</span>
            </h3>
            <p className="text-[10px] lg:text-base">{item.flooringType}</p>
            <p className="text-xs lg:text-xl font-semibold flex justify-start items-center gap-3">
              {item.priceText}
              <span className="text-[16px] lg:text-[30px]">
                <TiArrowRight />
              </span>
            </p>
          </div>

          {/* Bottom-Center Vector Image */}
          <div className="absolute bottom-1 sm:bottom-2 xl:bottom-4 left-1/2 transform -translate-x-1/2">
            <Image
              src="/assets/images/Home/Vector.png"
              alt="vector"
              width={400}
              height={600}
              className="w-3 xl:h-4 xl:w-6"
            />
          </div>
        </div>
      ))}
    </div>
  );
};

export default HeroMain;
