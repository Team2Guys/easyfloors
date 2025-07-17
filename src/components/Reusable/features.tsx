"use client";
import { FC, useRef } from "react";
import Image from "next/image";
import Slider from "react-slick";
import { FeaturesProps } from "types/type";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { MdKeyboardArrowLeft, MdKeyboardArrowRight } from "react-icons/md";
import Link from "next/link";

const Features: FC<FeaturesProps> = ({ items }) => {
  const sliderRef = useRef<Slider>(null);
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
    <div className="relative bg-white w-full px-3 my-7 sm:mb-10 xl:mb-14 xl:mt-7 overflow-hidden">
      <Slider ref={sliderRef} {...sliderSettings} className="w-full p-2">
        {items.map((item, index) => {
          const isLastItem = index === items.length - 1;

          return (
            <div key={index} className="sm:px-1 lg:px-2 !flex flex-nowrap">

              <div className="flex flex-col md:flex-row mx-1 items-center md:items-start text-center border border-[#0000001F] xl:border-none  xl:border-l-0 xl:border-t-0 xl:border-b-0 p-2 md:p-4 h-[156px] xs:h-[140px] sm:h-[200px] md:h-[193px] lg:h-[200px] md:gap-3 xl:pr-4 2xl:pr-5">
                <Image
                  src={item.icon}
                  alt={item.title}
                  width={100}
                  height={100}
                  loading="lazy"
                  className="h-7 w-6 sm:h-8 sm:w-8 xl:w-[64px] xl:h-[64px] object-contain"
                />
                <div className="flex flex-col md:justify-start md:items-start font-inter">
                  <h3 className="text-14 lg:text-18 font-bold font-inter mt-1">{item.title}</h3>
                  <p className="text-11 sm:text-sm lg:text-14 2xl:text-16 font-light text-card-text sm:block mt-1 leading-3 text-justify">
                  {item.description} {index < 3 && item.buttonLink && item.buttonText && (<Link className="text-primary" href={item.buttonLink}>{item.buttonText}</Link>)}
                  </p>
                </div>
              </div>
              {!isLastItem && <div className="border-r border-black h-24 hidden xl:block" />}
            </div>
          );
        })}
      </Slider>
      <button
        onClick={() => sliderRef.current?.slickPrev()}
        className="absolute -left-1 xs:left-0 top-1/2 -translate-y-1/2 z-20 xl:hidden"
        aria-label="Previous slide"
        aria-hidden="true"
      >
        <MdKeyboardArrowLeft className="h-6 w-6 sm:h-5 sm:w-5  " />
      </button>
      <button
        onClick={() => sliderRef.current?.slickNext()}
        className="absolute -right-1 xs:right-0 top-1/2 -translate-y-1/2 z-20 xl:hidden"
        aria-label="Next slide"
        aria-hidden="true"
      >
        <MdKeyboardArrowRight className="h-6 w-6 sm:h-5 sm:w-5 "  />

      </button>
    </div>
  );
};

export default Features;
