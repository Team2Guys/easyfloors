'use client'
import Image from "next/image";
import React, { useState, useRef, useMemo, useEffect } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { ExtendedThumbnailProps } from "types/product-detail";
import { FaAngleDown, FaAngleUp } from "react-icons/fa";
import { MdKeyboardArrowDown, MdKeyboardArrowUp } from "react-icons/md";

const Thumbnail = ({ ThumnailImage, ThumnailBottom, hideThumnailBottom = false, imageheight, onImageChange, stickyside, selectedColor, setSelectedColor }: ExtendedThumbnailProps) => {
  const [currentSlide, setCurrentSlide] = useState<number>(0);
  const sliderRef1 = useRef<Slider | null>(null);
  const thumbSliderRef = useRef<Slider | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [startY, setStartY] = useState(0);
  const [isSwiping, setIsSwiping] = useState(false);

  const handleMouseDown = (e: React.MouseEvent) => {
    setIsDragging(true);
    setStartY(e.clientY);
    setIsSwiping(false);
  };

  const animationFrame = useRef<number | null>(null);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging) return;

    if (animationFrame.current) {
      cancelAnimationFrame(animationFrame.current);
    }

    animationFrame.current = requestAnimationFrame(() => {
      const deltaY = startY - e.clientY;
      if (Math.abs(deltaY) > 10) {
        setIsSwiping(true);
        const direction = deltaY > 0 ? 1 : -1;
        const nextSlide = Math.min(
          Math.max(currentSlide + direction, 0),
          ThumnailImage.length - 1
        );
        if (nextSlide !== currentSlide) {
          setCurrentSlide(nextSlide);
          setSelectedColor?.({
            color: ThumnailImage[nextSlide].color || ThumnailImage[nextSlide].colorCode,
            colorCode: ThumnailImage[nextSlide].colorCode,
            altText: ThumnailImage[nextSlide].altText,
            imageUrl: ThumnailImage[nextSlide].imageUrl,
          });
          sliderRef1.current?.slickGoTo(nextSlide);
          if (stickyside) {
            thumbSliderRef.current?.slickGoTo(nextSlide);
          }
        }
        setStartY(e.clientY);
      }
    });
  };


  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const combinedImages = useMemo(() => {
    if (hideThumnailBottom) return ThumnailImage;
    return [...ThumnailImage, ...(ThumnailBottom || [])];
  }, [ThumnailImage, ThumnailBottom, hideThumnailBottom]);

  // Find the first index that matches selectedColor
  useEffect(() => {
    if (selectedColor) {
      const matchingIndex = ThumnailImage.findIndex(
        (img) => img.colorCode === selectedColor?.color
      );
      if (matchingIndex >= 0) {
        setCurrentSlide(matchingIndex);
        onImageChange?.(ThumnailImage[matchingIndex]);
        sliderRef1.current?.slickGoTo(matchingIndex);
        if (stickyside) {
          thumbSliderRef.current?.slickGoTo(matchingIndex);
        }
      }
    }
  }, [selectedColor, ThumnailImage, onImageChange, stickyside]);

  const handleThumbnailClick = (index: number) => {
    if (!isSwiping && index !== currentSlide) { // Only activate on click, not swipe
      setCurrentSlide(index);
      setSelectedColor?.({
        color: ThumnailImage[index].color || ThumnailImage[index].colorCode,
        colorCode: ThumnailImage[index].colorCode,
        altText: ThumnailImage[index].altText,
        imageUrl: ThumnailImage[index].imageUrl,
      }); // Update selected color
      onImageChange?.(combinedImages[index]);
      sliderRef1.current?.slickGoTo(index);
      if (stickyside) {
        thumbSliderRef.current?.slickGoTo(index);
      }
    }
  };

  const staticTitles = [
    "Click lock system",
    "Layers of SPC or LVT",
    "Waterproof",
    "Easy to clean",
    "Scratch resistant",
    "The packaging"
  ];

  const getStaticTitle = (index: number) => staticTitles[index] || "";

  return (
    <div className="relative">
      <button
        onClick={() => thumbSliderRef.current?.slickPrev()}
        className="absolute -top-6 2xl:left-14 xl:left-11 lg:left-10 md:left-8 sm:left-8 left-4 z-30 p-1 max-w-max"
      >
        <MdKeyboardArrowUp className="block md:hidden bg-white" size={20} />
        <MdKeyboardArrowUp className="hidden md:block font-normal text-gray-600 bg-white" size={30} />

      </button>
      <div
        className="slider-container flex gap-2 sm:gap-4 overflow-hidden"
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
      >
        <div className="w-2/12">
          {stickyside ? (
            <div className="relative h-full">



              {/* Thumbnail Slider */}
              <Slider
                ref={thumbSliderRef}
                infinite={ThumnailImage.length > 5}
                slidesToShow={5}
                vertical
                swipe={false}
                arrows={false} // We'll use our own
                focusOnSelect
                className="custom-vertical-slider h-full md:h-[90vh]"
                initialSlide={currentSlide}
              >
                {ThumnailImage.map((product, index) => (
                  <div
                    key={index}
                    onClick={() => handleThumbnailClick(index)}
                    className={`cursor-pointer p-[2px] sm:p-1 ${index === currentSlide ? "shadow-xl" : ""
                      }`}
                  >
                    <Image
                      width={150}
                      height={150}
                      src={product.imageUrl}
                      className={`w-full ${imageheight
                        ? "h-[44px] sm:h-[90px] lg:h-[93px] xl:h-[126px] 2xl:h-[150px]"
                        : "h-[35px] sm:h-[73px] md:h-[124px]"
                        }`}
                      alt={product.altText || "Thumbnail"}
                    />
                  </div>
                ))}
              </Slider>

              {/* Down Arrow */}
              <button
                onClick={() => thumbSliderRef.current?.slickNext()}
                className="absolute bottom-0 left-1/2 -translate-x-1/2 z-30 p-1 "
              >
                <MdKeyboardArrowDown className="block md:hidden bg-white" size={20} />

                <MdKeyboardArrowDown className="hidden md:block font-normal text-gray-600 bg-white" size={30} />              
              </button>
            </div>

          ) : (
            <div className="flex flex-col gap-1 sm:gap-2">
              {ThumnailImage.map((product, index) => (
                <div
                  key={index}
                  onClick={() => handleThumbnailClick(index)}
                  className={`cursor-pointer p-[2px] sm:p-1 ${index === currentSlide ? "shadow-xl" : ""
                    }`}
                >
                  <Image
                    width={150}
                    height={150}
                    src={product.imageUrl}
                    className={`w-full ${imageheight
                        ? "h-[35px] sm:h-[73px] md:h-[230px]"
                        : "h-[35px] sm:h-[73px] md:h-[124px] lg:h-[75px] xl:h-[74.5px] 2xl:h-[124px]"
                      }`}
                    alt={product.altText || "Thumbnail"}
                  />
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Main Image Viewer */}
        <div className="w-10/12">
          <Slider
            infinite={combinedImages.length > 1}
            ref={sliderRef1}
            dots={false}
            arrows={false}
            initialSlide={currentSlide}
            afterChange={(index) => {
              if (index !== currentSlide) {
                setCurrentSlide(index);
                onImageChange?.(combinedImages[index]);

                if (stickyside) {
                  thumbSliderRef.current?.slickGoTo(index);
                }
              }
            }}
          >
            {combinedImages.map((product, index) => (
              <div
                key={index}
                className={`relative ${product.plankWidth && "py-1 sm:py-0"}`}
              >
                <Image
                  width={800}
                  height={800}
                  src={product.imageUrl}
                  className={`w-full ${imageheight
                    ? "h-[273px] sm:h-[520px] lg:h-[535px] xl:h-[700px] 2xl:h-[810px]"
                      : "h-[273px] sm:h-[520px] md:h-[830px] lg:h-[535px] xl:h-[530px] 2xl:h-[830px]"
                    }`}
                  alt={product.altText || "Thumbnail"}
                />

                {/* Plank height overlay */}
                {product.plankHeight && (
                  <div className="absolute h-full top-0 flex flex-col justify-between py-4 sm:py-10 left-1/2 -translate-x-28 sm:-translate-x-36">
                    <span className="flex justify-center items-center">
                      <FaAngleUp className="text-20 sm:text-24" />
                    </span>
                    <div className="flex-1 border w-[1px] mx-auto border-black"></div>
                    <span className="h-16 sm:h-28 flex justify-center items-center font-semibold transform rotate-90 text-13 sm:text-16">
                      {product.plankHeight}
                    </span>
                    <div className="flex-1 border w-[1px] mx-auto border-black"></div>
                    <span className="flex justify-center items-center">
                      <FaAngleDown className="text-20 sm:text-24" />
                    </span>
                  </div>
                )}

                {/* Plank width overlay */}
                {product.plankWidth && (
                  <div className="absolute w-[170px] sm:w-[200px] -top-1 sm:top-0 flex justify-between mx-auto left-1/2 -translate-x-24 sm:-translate-x-28">
                    <span className="flex justify-center items-center transform -rotate-90">
                      <FaAngleUp className="text-20 sm:text-24" />
                    </span>
                    <div className="flex-1 border h-[1px] my-auto border-black"></div>
                    <span className="flex justify-center items-center text-13 sm:text-16 font-semibold px-2">
                      {product.plankWidth}
                    </span>
                    <div className="flex-1 border h-[1px] my-auto border-black"></div>
                    <span className="flex justify-center items-center transform -rotate-90">
                      <FaAngleDown className="text-20 sm:text-24" />
                    </span>
                  </div>
                )}
              </div>
            ))}
          </Slider>

          {/* Bottom thumbnails */}
          {!hideThumnailBottom && ThumnailBottom && (
            <div className="grid grid-cols-6 gap-1 sm:gap-3 pt-2 sm:pt-6">
              {ThumnailBottom.map((array, index) => {
                const globalIndex = ThumnailImage.length + index;
                return (
                  <div
                    key={index}
                    className="text-center cursor-pointer"
                    onClick={() => handleThumbnailClick(globalIndex)}
                  >
                    <Image
                      width={150}
                      height={150}
                      src={array.imageUrl}
                      alt={array.altText}
                      className={`w-full max-sm:h-[39px] object-contain ${globalIndex === currentSlide
                        ? "shadow-xl"
                        : ""
                        }`}
                    />
                    <p className="font-semibold text-[8px] md:text-14 lg:text-12 xl:text-16">
                      {getStaticTitle(index)}
                    </p>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Thumbnail;