
import Image from "next/image";
import React, { useState, useEffect, useRef } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { ThumbnailProps } from "types/product-detail";


const Thumbnail: React.FC<ThumbnailProps> = ({ ThumnailImage, ThumnailBottom }) => {
  const [nav1, setNav1] = useState<Slider | null>(null);
  const [nav2, setNav2] = useState<Slider | null>(null);
  const [currentSlide, setCurrentSlide] = useState<number>(0);

  const sliderRef1 = useRef<Slider | null>(null);
  const sliderRef2 = useRef<Slider | null>(null);

  useEffect(() => {
    setNav1(sliderRef1.current);
    setNav2(sliderRef2.current);
  }, []);

  const handleBeforeChange = (current: number, next: number) => {
    setCurrentSlide(next);
  };

  return (
    <div className="slider-container flex gap-2 sm:gap-4 overflow-hidden">
      <div className="w-2/12">
        <Slider
          asNavFor={nav1 || undefined}
          ref={sliderRef2}
          slidesToShow={6}
          swipeToSlide
          focusOnSelect
          vertical
          verticalSwiping
          dots={false}
          arrows={false}
          beforeChange={handleBeforeChange}
        >
          {ThumnailImage.map((product, index) => (
            <div key={index} className={index === currentSlide ? " p-[2px] sm:p-1 shadow-xl" : "p-[2px] sm:p-1"}>
              <Image width={150} height={150} src={product.image} className="w-full h-[35px] sm:h-[73px] md:h-[124px]" alt="image" />
            </div>
          ))}
        </Slider>
      </div>
      <div className="w-10/12">
        <Slider asNavFor={nav2 || undefined} ref={sliderRef1} dots={false} arrows={false}>
          {ThumnailImage.map((product, index) => (
            <div key={index}>
              <Image width={800} height={800} src={product.image} className="w-full h-[273px] sm:h-[520px] md:h-[830px]" alt="image" />
            </div>
          ))}
        </Slider>
        <div className="grid grid-cols-6 gap-1 sm:gap-3 pt-2 sm:pt-6">
        {
        ThumnailBottom.map((array,index)=>(
            <div key={index} className="text-center">
                <Image width={150} height={150} src={array.image} alt={array.title} className="w-full max-sm:h-[39px] object-contain "/>
                <p className="font-semibold text-[8px] md:text-14 lg:text-16">{array.title}</p>
            </div>
            ))
        }
        </div>
      </div>
    </div>
  );
};

export default Thumbnail;


