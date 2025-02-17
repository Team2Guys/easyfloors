"use client"; // Required for Next.js App Router

import React, { useRef, useState, useEffect } from "react";
import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import { BiChevronLeft, BiChevronRight } from "react-icons/bi";
import "swiper/css";
import "swiper/css/navigation";
import { FeaturesProps } from "types/type";



const Features: React.FC<FeaturesProps> = ({ items }) => {
  const prevRef = useRef(null);
  const nextRef = useRef(null);
  const [expandedIndex, setExpandedIndex] = useState<number | null>(null);
  const [isSmallScreen, setIsSmallScreen] = useState(false);

  useEffect(() => {
    const checkScreenSize = () => setIsSmallScreen(window.innerWidth < 768);
    checkScreenSize();
    window.addEventListener("resize", checkScreenSize);
    return () => window.removeEventListener("resize", checkScreenSize);
  }, []);

  return (
    <div className="relative bg-white w-full px-6 sm:px-6 my-5 xl:my-7">
      <Swiper
        modules={[Navigation]}
        spaceBetween={10}
        slidesPerView={2}
        breakpoints={{
          640: { slidesPerView: 2 },
          1024: { slidesPerView: 3 },
          1280: { slidesPerView: 4 },
        }}
        loop
        navigation={{
          prevEl: prevRef.current,
          nextEl: nextRef.current,
        }}
        onSwiper={(swiper) => {
          setTimeout(() => {
            if (swiper.params.navigation && typeof swiper.params.navigation !== "boolean") {
              swiper.params.navigation.prevEl = prevRef.current;
              swiper.params.navigation.nextEl = nextRef.current;
              swiper.navigation.init();
              swiper.navigation.update();
            }
          });
        }}
        className="w-full"
      >
        {items.map((item, index) => {
          const isExpanded = expandedIndex === index;
          const shortText = item.description.split(" ").slice(0, 10).join(" ") + "...";

          return (
            <SwiperSlide key={index}>
              <div className="flex flex-col md:flex-row mx-1 items-center md:items-start text-center border border-gray-200 xl:border-r-black xl:border-l-0 xl:border-t-0 xl:border-b-0 p-2 xs:p-4 rounded-lg xl:rounded-none shadow-md xl:shadow-none md:gap-3 md:p-5">
                <Image
                  src={item.icon}
                  alt={item.title}
                  width={60}
                  height={60}
                  className="h-5 w-5 sm:h-8 sm:w-8"
                />
                <div className="flex flex-col md:justify-start md:items-start">
                  <h3 className="text-12 xs:text-[16px] font-semibold">{item.title}</h3>

                  <p className="text-[10px] sm:text-sm text-card-text md:text-start sm:block">
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
            </SwiperSlide>
          );
        })}
      </Swiper>

      <button ref={prevRef} className="absolute left-0 top-1/2 -translate-y-1/2 z-20">
        <BiChevronLeft className="text-3xl text-gray-700" />
      </button>

      <button ref={nextRef} className="absolute right-0 top-1/2 -translate-y-1/2 z-20">
        <BiChevronRight className="text-3xl text-gray-700" />
      </button>
    </div>
  );
};

export default Features;
