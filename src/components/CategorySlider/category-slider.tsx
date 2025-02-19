"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import Link from "next/link";
import Card from "components/Card/Card";
import { features, flooringTypes } from "data/data";
import { FlooringType, Product } from "types/type";

const CategorySlider: React.FC = () => {
  return (
    <div className="md:space-y-10 space-y-8">
      {flooringTypes.map((flooring: FlooringType, index: number) => {
        const shouldEnablePagination = flooring.product.length >= 3;

        return (
          <div
            key={index}
            className="md:flex block items-center md:text-black text-white w-full overflow-hidden md:bg-background bg-primary category_slider"
          >
            <div className="p-4 text-center md:text-start w-full md:w-1/4 font-inter sm:pl-10 md:pl-12 lg:pl-20 xl:pl-24">
            <Link href="#" className="text-2xl md:text-4xl font-semibold">
                {flooring.name}
            </Link>
              <p className="text-sm md:text-base md:text-gray-700 mt-2 md:mt-3 mb-5 md:mb-4 md:w-fit md:px-3 md:py-1 md:bg-white font-light">
                Price Starting From: {flooring.price}
              </p>
              <Link
                href="#"
                className="transition md:text-black font-semibold text-white px-4 py-1 border md:border-primary border-white font-inter hover:text-white hover:bg-primary"
              >
                See All
              </Link>
            </div>
            <div className="md:w-3/4 w-full bg-white md:pr-10 md:pt-0 pt-5">
              <Swiper
                modules={[Pagination]}
                spaceBetween={20}
                pagination={shouldEnablePagination ? { clickable: true } : false}
                allowTouchMove={shouldEnablePagination}
                breakpoints={{
                  0: { slidesPerView: 2, spaceBetween: 10 },
                  480: { slidesPerView: 2, spaceBetween: 15 },
                  640: { slidesPerView: 2, spaceBetween: 15 },
                  768: { slidesPerView: 2, spaceBetween: 20 },
                  1024: { slidesPerView: 3, spaceBetween: 20 },
                  1280: { slidesPerView: 3, spaceBetween: 25 },
                }}
              >
                {flooring.product.map((product: Product) => (
                  <SwiperSlide key={product.id} className="pb-7">
                    <Card product={product} features={features} />
                  </SwiperSlide>
                ))}
              </Swiper>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default CategorySlider;
