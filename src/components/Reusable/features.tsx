"use client"; 
import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import Slider from "react-slick";
import { BiChevronLeft, BiChevronRight } from "react-icons/bi";
import { FeaturesProps } from "types/type";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const Features: React.FC<FeaturesProps> = ({ items }) => {
  const [expandedIndex, setExpandedIndex] = useState<number | null>(null);
  const [isSmallScreen, setIsSmallScreen] = useState(false);
  const sliderRef = useRef<Slider>(null);

  useEffect(() => {
    const checkScreenSize = () => setIsSmallScreen(window.innerWidth < 768);
    checkScreenSize();
    window.addEventListener("resize", checkScreenSize);
    return () => window.removeEventListener("resize", checkScreenSize);
  }, []);

  const sliderSettings = {
    dots: false,
    infinite: items.length > 4,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
    responsive: [
      { breakpoint: 1280, settings: { slidesToShow: 4 } },
      { breakpoint: 1024, settings: { slidesToShow: 3 } },
      { breakpoint: 640, settings: { slidesToShow: 2 } },
    ],
  };

  return (
    <div className="relative bg-white w-full px-6 sm:px-6 my-7 sm:mb-10 xl:mb-14 xl:mt-7">
      <Slider ref={sliderRef} {...sliderSettings} className="w-full">
        {items.map((item, index) => {
          const isExpanded = expandedIndex === index;
          const shortText = item.description.split(" ").slice(0, 10).join(" ") + "...";
          const isLastItem = index === items.length - 1;

          return (
            <div key={index} className="px-2 !flex flex-nowrap">
              
              <div className="flex flex-col md:flex-row mx-1 items-center md:items-start text-center border border-gray-200 xl:border-none  xl:border-l-0 xl:border-t-0 xl:border-b-0 p-2 xs:p-4 rounded-lg xl:rounded-none shadow-md xl:shadow-none md:gap-3 xl:pr-4 2xl:pr-5">
                <Image
                  src={item.icon}
                  alt={item.title}
                  width={100}
                  height={100}
                  loading="lazy"
                  className="h-5 w-5 sm:h-8 sm:w-8 xl:w-[64px] xl:h-[64px]"
                />
                <div className="flex flex-col md:justify-start md:items-start font-inter">
                  <h3 className="text-12 xs:text-[16px] xl:text-18 font-semibold">{item.title}</h3>

                  <p className="text-[10px] sm:text-sm lg:text-14 2xl:text-16 font-light text-card-text md:text-start sm:block">
                    {isSmallScreen ? (isExpanded ? item.description : shortText) : item.description}
                  </p>

                  {isSmallScreen && (
                    <button
                      className="text-gray-700 text-xs mt-1"
                      onClick={() => setExpandedIndex(isExpanded ? null : index)}
                    >
                      {isExpanded ? "Read Less" : "Read More"}
                    </button>
                  )}
                </div>
              </div>
               {!isLastItem && <div className="border-r border-black h-24 hidden xl:block"/>}
            </div>
          );
        })}
      </Slider>
      <button
        onClick={() => sliderRef.current?.slickPrev()}
        className="absolute left-0 top-1/2 -translate-y-1/2 z-20 xl:hidden"
      >
        <BiChevronLeft className="text-3xl text-gray-700" />
      </button>

      <button
        onClick={() => sliderRef.current?.slickNext()}
        className="absolute right-0 top-1/2 -translate-y-1/2 z-20 xl:hidden"
      >
        <BiChevronRight className="text-3xl text-gray-700" />
      </button>
    </div>
  );
};

export default Features;
