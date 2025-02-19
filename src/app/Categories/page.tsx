"use client";
import React, { useState, useEffect } from "react";
import BlogCard from "components/Categories/Categories";
import Container from "components/common/container/Container";
import { blogCards, categoryData, popupCards } from "data/data";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import { Pagination } from "swiper/modules";
import { CardData } from "types/type";
import { IoMdClose } from "react-icons/io";

export default function AmCategory() {
  const [isExpanded, setIsExpanded] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleReadMoreClick = () => {
    setIsExpanded(true);
  };

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    handleResize();

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <Container>
      <div className="font-inter md:mt-20 mt-10 category_slider">
        <h1
          className="relative text-center md:text-5xl text-2xl md:max-w-2xl w-full font-bold text-white py-5 mx-auto bg-cover bg-center"
          style={{ backgroundImage: `url(${categoryData.backgroundImage})` }}
        >
          {categoryData.title}{" "}
          <span
            onClick={handleOpenModal}
            className="text-[#1EBFFA] align-top text-base font-normal cursor-pointer"
          >
            {categoryData.subtitle}
          </span>
        </h1>

        {isModalOpen && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50 font-inter">
            <div className="bg-white md:p-8 p-3 shadow-lg w-full max-w-3xl md:max-w-7xl max-h-full overflow-y-auto">
              <div className="flex justify-end items-center">
                <button
                  onClick={handleCloseModal}
                  className="text-gray-500 hover:text-gray-900"
                >
                  <IoMdClose size={25} className="text-black" />
                </button>
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 md:gap-6 md:mt-6 mt-2">
                {popupCards.map((card: CardData) => (
                  <div key={card.id} className="border border-gray-500 md:p-4 p-2">
                    <h3
                      className="text-center md:text-lg text-sm text-primary border-b-2 border-gray-500 md:p-3 p-1 font-inter font-normal"
                      dangerouslySetInnerHTML={{
                        __html: card.heading,
                      }}
                    />
                    <ul className="list-disc px-5 py-2">
                      {card.content.map((item, index) => (
                        <li
                          key={index}
                          className="md:text-sm text-[10px] ml-3 py-0.5 font-light"
                        >
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        <div className="max-w-3xl mx-auto text-center text-base md:my-10 my-4">
          <p className="text-center md:text-base text-sm font-normal font-inter">
            {isExpanded || !isMobile
              ? categoryData.description
              : `${categoryData.description.substring(0, 150)}...`}
            {isMobile && !isExpanded && (
              <button
                onClick={handleReadMoreClick}
                className="text-primary font-medium underline"
              >
                Read More
              </button>
            )}
          </p>
        </div>

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
            {blogCards.map((card) => (
              <SwiperSlide key={card.id}>
                <BlogCard card={card} />
              </SwiperSlide>
            ))}
          </Swiper>
        </div>

        <div className="hidden sm:grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {blogCards.map((card) => (
            <BlogCard key={card.id} card={card} />
          ))}
        </div>
      </div>
    </Container>
  );
}
