"use client";
import React, { useState } from "react";
import Slider from "react-slick";
import Card from "components/Card/Card";
import Container from "components/common/container/Container";
import { features } from "data/data";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { IProduct } from "types/prod";
import { RelatedSliderProps } from "types/types";
import SliderSkaleton from "components/skaletons/slider-skaleton";

const RelatedSlider = ({ products, isAccessories }: RelatedSliderProps) => {
  const [dragging, setDragging] = useState(false);
  const settings = {
    dots: true,
    infinite: false,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
    initialSlide: 0,
    beforeChange: () => setDragging(true),
    afterChange: () => {
      // Delay reset to avoid click right after swipe
      setTimeout(() => setDragging(false), 100);
    },
    appendDots: (dots: React.ReactNode) => (
      <div
        style={{
          borderRadius: "10px",
          padding: "10px",
        }}
      >
        <ul style={{ margin: "0px" }}>{dots}</ul>
      </div>
    ),
    customPaging: () => <div className="custom-dot"></div>,
    responsive: [
      {
        breakpoint: 1280,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
          infinite: true,
          dots: true,
        },
      },
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2.5,
          slidesToScroll: 1,
          infinite: true,
          dots: true,
        },
      },
      {
        breakpoint: 600,
        settings: { slidesToShow: 2, slidesToScroll: 2, initialSlide: 2 },
      },
      { breakpoint: 480, settings: { slidesToShow: 2, slidesToScroll: 2 } },
    ],
  };

  return (
    <Container className=" mt-5 sm:mt-10 font-inter w-full mb-10">
      <h2 className="text-18 sm:text-24 max-sm:font-semibold lg:text-30 2xl:text-[40px] text-center">
        Frequently Bought Together
      </h2>
      {products.length > 0 ? (
        <div className="slider-container pt-4 sm:pt-10 w-full overflow-hidden">
          <Slider {...settings}>
            {products.map((product: IProduct, index: number) => (
              <div key={index} className="pb-7">
                <Card
                  product={product}
                  features={features}
                  sldier
                  isAccessories={isAccessories}
                  dragging={dragging}
                />
              </div>
            ))}
          </Slider>
        </div>
      ) : (
        <SliderSkaleton />
      )}
    </Container>
  );
};

export default RelatedSlider;
