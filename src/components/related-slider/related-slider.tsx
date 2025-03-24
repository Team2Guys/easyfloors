"use client"
import React from "react";
import Slider from "react-slick";
import Card from "components/Card/Card";
import Container from "components/common/container/Container";
import { features } from "data/data";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import {  EDIT_CATEGORY } from "types/cat";
import { IProduct } from "types/prod";

interface RelatedSliderProps {
  products: IProduct[]; 
  CategoryData?: EDIT_CATEGORY
  isAccessories?: boolean;
};

const RelatedSlider = ({ products , CategoryData,isAccessories}:RelatedSliderProps) => {
  const settings = {
    dots: true,
    infinite: false,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
    initialSlide: 0,
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
      { breakpoint: 1280, settings: { slidesToShow: 3, slidesToScroll: 1, infinite: true, dots: true } },
      { breakpoint: 1024, settings: { slidesToShow: 2.5, slidesToScroll: 1, infinite: true, dots: true } },
      { breakpoint: 600, settings: { slidesToShow: 2, slidesToScroll: 2, initialSlide: 2 } },
      { breakpoint: 480, settings: { slidesToShow: 2, slidesToScroll: 2 } },
    ],
  };

  return (
    <Container className=" sm:mt-10 font-inter w-full mb-10">
      <h2 className="text-12 sm:text-24 max-sm:font-semibold lg:text-30 2xl:text-[40px] text-center">Frequently Bought Together</h2>
      <div className="slider-container pt-4 sm:pt-10 w-full overflow-hidden">
        <Slider {...settings}>
          {products.map((product: IProduct, index: number) => (
            <div key={index} className="pb-7">
              <Card product={product} features={features} categoryData={CategoryData} sldier isAccessories={isAccessories} />
            </div>
          ))}
        </Slider>
      </div>
    </Container>
  );
};

export default RelatedSlider;
