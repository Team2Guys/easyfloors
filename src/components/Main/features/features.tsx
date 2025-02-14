"use client"; // Required if using Next.js App Router

import React, { useRef, useState } from "react";
import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import { BiChevronLeft, BiChevronRight } from "react-icons/bi";
import "swiper/css";
import "swiper/css/navigation";

const items = [
  {
    title: "Free Samples",
    description: "Spread the cost of your new wood flooring via our low rate finance options 0% interest available at checkout with PayPal credit.",
    icon: "/assets/images/Home/free.png",
  },
  {
    title: "Easy payment",
    description: "Spread the cost of your new wood flooring via our low rate finance options 0% interest available at checkout with PayPal credit.",
    icon: "/assets/images/Home/card.png",
  },
  {
    title: "Delivery",
    description: "Spread the cost of your new wood flooring via our low rate finance options 0% interest available at checkout with PayPal credit.",
    icon: "/assets/images/Home/truck.png",
  },
  {
    title: "Factory Prices",
    description: "Spread the cost of your new wood flooring via our low rate finance options 0% interest available at checkout with PayPal credit.",
    icon: "/assets/images/Home/factory.png",
  },
];

const Features = () => {
  const prevRef = useRef(null);
  const nextRef = useRef(null);
  const [expandedIndex, setExpandedIndex] = useState<number | null>(null); 

  return (
    <div className="relative bg-white w-full  px-6 sm:px-6 my-5 xl:my-7">
      <Swiper
      
        modules={[Navigation]}
        spaceBetween={2}
        slidesPerView={2}
        breakpoints={{
          640: { slidesPerView: 2 },
          1024: { slidesPerView: 3 },
          1280: { slidesPerView: 4 },
        }}
        autoplay={{ delay: 3000, disableOnInteraction: false }}
        loop
        navigation={{
          prevEl: prevRef.current,
          nextEl: nextRef.current,
        }}
        onInit={(swiper) => {
          if (swiper.params.navigation) {
            swiper.params.navigation.prevEl = prevRef.current;
            swiper.params.navigation.nextEl = nextRef.current;
            swiper.navigation.init();
            swiper.navigation.update();
          }
        }}
        className="w-full"
      >
        {items.map((item, index) => {
          const isExpanded = expandedIndex === index;
          const shortText = item.description.split(" ").slice(0, 10).join(" ") + "..."; // First 10 words

          return (
            <SwiperSlide key={index}>
              <div className="flex flex-col mx-1 items-center text-center border border-gray-200 p-2 xs:p-4 rounded-lg shadow-md">
                <Image
                  src={item.icon}
                  alt={item.title}
                  width={60}
                  height={60}
                  className="h-8 w-8 sm:h-14 sm:w-14"
                />
                <h3 className="text-[16px] font-semibold mt-2">{item.title}</h3>

                {/* Description with Read More button for small screens */}
                <p className="text-[10px] sm:text-sm text-gray-600 sm:block">
                  {isExpanded ? item.description : shortText}
                </p>
                <button
                  className="text-blue-600 text-xs sm:hidden mt-1"
                  onClick={() =>
                    setExpandedIndex(isExpanded ? null : index)
                  }
                >
                  {isExpanded ? "Read Less" : "Read More"}
                </button>
              </div>
            </SwiperSlide>
          );
        })}
      </Swiper>

      {/* Custom Navigation Buttons */}
      <button
        ref={prevRef}
        className="absolute left-0 top-1/2 -translate-y-1/2 z-20"
      >
        <BiChevronLeft className="text-3xl text-gray-700" />
      </button>

      <button
        ref={nextRef}
        className="absolute right-0 top-1/2 -translate-y-1/2 z-20"
      >
        <BiChevronRight className="text-3xl text-gray-700" />
      </button>
    </div>
  );
};

export default Features;
