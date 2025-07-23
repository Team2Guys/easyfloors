'use client';
import React from 'react';
import { Swiper} from 'swiper/react';
import { Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';
import { CommonSwiperProps } from 'types/types';


const SwiperSlider = ({children,enablePagination = true,allowTouch = true,spaceBetween = 20,breakpoints,...rest}:CommonSwiperProps) => {
  return (
    <Swiper
      modules={[Pagination]}
      spaceBetween={spaceBetween}
      pagination={enablePagination ? { clickable: true } : false}
      allowTouchMove={allowTouch}
      breakpoints={breakpoints}
      {...rest}
    >
      {children}
    </Swiper>
  );
};

export default SwiperSlider;
