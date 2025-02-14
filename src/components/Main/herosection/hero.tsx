import Image from "next/image";
import React from "react";
import Link from "next/link";

const HeroMain = () => {
  return (
    <div className="relative flex flex-col w-full h-[400px] sm:h-[600px] xl:h-[885px]">
    {/* Background Image */}
    <div className="relative w-full h-[400px] sm:h-[600px] xl:h-[885px]">
      <Image
        src="/assets/images/Home/hero.png"
        alt="hero"
        width={1920} 
        height={1080} 
        className="w-full h-full object-cover"
      />
    </div>

      {/* Left Content Box */}
      <div className="absolute top-[8%] sm:top-[20%] left-5 sm:left-5 md:left-10 lg:left-16 bg-background opacity-80 p-4 sm:p-6 md:p-8 w-[60%] xs:w-[70%] sm:w-[350px] lg:w-[494px] shadow-md">
        <div className="flex flex-col justify-start items-start font-inter text-black font-light space-y-1 sm:space-y-3 md:space-y-4">
          <p className="text-[10px] sm:text-sm">Limited Time Offer</p>
          <h2 className="text-14 sm:text-2xl lg:text-5xl leading-[1.2] sm:leading-[1.4] md:leading-[1.6]">
            High-Quality Flooring Get <br />
            <span className="font-medium">FREE Samples</span>
          </h2>
          <p className="text-[10px] sm:text-sm md:text-base leading-5 sm:leading-6 md:leading-7 w-full">
            is simply dummy text of the printing and typesetting industry. Lorem
            Ipsum has been the industry&apos;s standard.
          </p>
          <Link
            href="/"
            className="px-2 py-2 sm:px-5 sm:py-3 text-white bg-primary font-medium text-[10px] sm:text-sm transition inline-block"
          >
            EXPLORE PRODUCTS
          </Link>
        </div>
      </div>

      {/* Bottom-Right Info Box */}
      <div className="absolute bottom-2 sm:bottom-5 right-2 sm:right-5 bg-background opacity-80  p-1 sm:p-4 md:p-5 shadow-md sm:w-[180px] md:w-[220px] lg:w-[294px] space-y-1 sm:space-y-2 text-center">
        <h3 className="sm:text-sm lg:text-[28px] font-medium">Polar Flooring</h3>
        <p className="text-[10px] lg:text-base">SPC Eco • American Walnut</p>
        <p className="text-xs lg:text-xl font-semibold mt-2 sm:mt-0">Only On AED 49/m²</p>
      </div>
      <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2">
      <Image src="/assets/images/Home/Vector.png" alt="img" width={400} height={600} className="h-3 w-3 xl:h-6 xl:w-6" />
      </div>
    </div>
  );
};

export default HeroMain;
