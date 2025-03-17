"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import Link from "next/link";
import Card from "components/Card/Card";
import { features } from "data/data";
import { Category } from "types/cat";

const CategorySlider = ({categories}: {categories: Category[]}) => {
  return (
    <div className="space-y-8">
      {categories?.filter((category) => category.name !== "ACCESSORIES").map((category: Category, index: number) => {
        const shouldEnablePagination = category.subcategories && category.subcategories.length >= 0;
        return (
          <div
            key={index}
            className="md:flex block items-center md:text-black text-white w-full overflow-hidden md:bg-background bg-primary category_slider"
          >
            <div className="p-4 text-center md:text-start w-full md:w-1/4 font-inter sm:pl-10 md:pl-12 lg:pl-20 xl:pl-24">
            <Link href={`/${category?.RecallUrl}`} className="text-2xl md:text-4xl font-semibold">
                {category.name}
            </Link>
              <p className="text-sm md:text-base md:text-gray-700 mt-2 md:mt-3 mb-5 md:mb-4 md:w-fit md:px-3 md:py-1 md:bg-white font-light">
                Price Starting From: {category.name === "SPC FLOORING" ? 'AED 150m²' : category.name === "LVT FLOORING" ? 'AED 180m²' : category.name === "POLAR FLOORING" ? 'AED 200m²' : category.name === "RICHMOND FLOORING" ? 'AED 220m²' : '' }
              </p>
              <Link
                href="/all-collection"
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
                {category.subcategories?.map((product: Category, index) => {
                return (
                  <SwiperSlide key={index} className="pb-7">
                    <Card product={product} categoryData={category} features={features} sldier />
                  </SwiperSlide>
                );
              })}
              </Swiper>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default CategorySlider;
