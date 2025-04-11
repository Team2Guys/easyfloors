'use client'
import React from 'react'
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import { Pagination } from "swiper/modules";
import { ISUBCATEGORY } from 'types/cat';
import BlogCard from "components/Categories/Categories";

function CustomSwiper({subCategories}:{subCategories:ISUBCATEGORY[]}) {
  return (
    <div className="sm:hidden">
    <Swiper
      modules={[Pagination]}
      spaceBetween={20}
      pagination={{ clickable: true }}
      breakpoints={{
        0: { slidesPerView: 2, spaceBetween: 10 },
        480: { slidesPerView: 2, spaceBetween: 15 },
        640: { slidesPerView: 2, spaceBetween: 15 },
        768: { slidesPerView: 2, spaceBetween: 20 },
        1024: { slidesPerView: 3, spaceBetween: 20 },
        1280: { slidesPerView: 3, spaceBetween: 25 },
      }}
    >
      {subCategories?.map((card: ISUBCATEGORY, index: number) => (
        <SwiperSlide key={card.id}>
          <BlogCard card={card} index={index} />
        </SwiperSlide>
      ))}
    </Swiper>
    </div>
  )
}

export default CustomSwiper