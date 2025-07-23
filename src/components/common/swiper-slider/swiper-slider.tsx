'use client';
import React, { ReactNode } from 'react';
import { Swiper, SwiperProps } from 'swiper/react';
import { Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';

interface CommonSwiperProps extends SwiperProps {
  children: ReactNode;
  enablePagination?: boolean;
  allowTouch?: boolean;
}

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
