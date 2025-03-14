'use client'
import Image from "next/image";
import React, { useState, useRef } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { ExtendedThumbnailProps } from "types/product-detail";

const Thumbnail = ({ ThumnailImage, ThumnailBottom, hideThumnailBottom = false, imageheight }:ExtendedThumbnailProps) => {
  const [currentSlide, setCurrentSlide] = useState<number>(0);
  const sliderRef1 = useRef<Slider | null>(null);

  const handleThumbnailClick = (index: number) => {
    setCurrentSlide(index);
    if (sliderRef1.current) {
      sliderRef1.current.slickGoTo(index); 
    }
  };

  return (
    <div className="slider-container flex gap-2 sm:gap-4 overflow-hidden">
      <div className="w-2/12">
        <div className="flex flex-col gap-1 sm:gap-2">
          {ThumnailImage.map((product, index) => (
            <div
              key={index}
              onClick={() => handleThumbnailClick(index)}
              className={`cursor-pointer p-[2px] sm:p-1 ${
                index === currentSlide ? "shadow-xl" : ""
              }`}
            >
              <Image
                width={150}
                height={150}
                src={product.imageUrl}
                className={`w-full ${
                  imageheight
                    ? "h-[35px] sm:h-[73px] md:h-[230px]"
                    : "h-[35px] sm:h-[73px] md:h-[124px]"
                }`}
                alt={product.altText || 'ThumnailImage'}
              />
            </div>
          ))}
        </div>
      </div>

      <div className="w-10/12">
        <Slider infinite={ThumnailImage.length > 1} ref={sliderRef1} dots={false} arrows={false}>
          {ThumnailImage.map((product, index) => (
            <div key={index}>
              <Image
                width={800}
                height={800}
                src={product.imageUrl}
                className={`w-full ${
                  imageheight
                    ? "h-[273px] sm:h-[520px] md:h-[1218px]"
                    : "h-[273px] sm:h-[520px] md:h-[830px]"
                }`}
                alt={product.altText || 'ThumnailImage'}
              />
            </div>
          ))}
        </Slider>

        {!hideThumnailBottom && ThumnailBottom && (
          <div className="grid grid-cols-6 gap-1 sm:gap-3 pt-2 sm:pt-6">
            {ThumnailBottom.map((array, index) => (
              <div key={index} className="text-center">
                <Image
                  width={150}
                  height={150}
                  src={array.imageUrl}
                  alt={array.altText}
                  className="w-full max-sm:h-[39px] object-contain"
                />
                <p className="font-semibold text-[8px] md:text-14 lg:text-16">
                  {array.title}
                </p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Thumbnail;