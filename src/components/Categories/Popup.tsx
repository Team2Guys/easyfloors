
"use client"
import React, { useState, useEffect } from "react";
import { CardData } from "types/type";
import { IoMdClose } from "react-icons/io";
import {categoryData, popupCards } from "data/data";

function Popup() {

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
      setIsExpanded((prev) => !prev);
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
  <>
      <h1
          className="relative text-center  md:text-5xl text-2xl md:max-w-3xl w-full font-bold text-white py-7 mx-auto bg-cover bg-center"
          style={{ 
            backgroundImage: `url(${categoryData.backgroundImage})`,
            backgroundSize: "100%", 
            backgroundRepeat: "no-repeat", 
            backgroundPosition: "center" 
          }}
      >
        <div className="flex justify-center items-center gap-3">
          {categoryData.title}{" "}
          <span
            onClick={handleOpenModal}
            className="text-[#1EBFFA] align-top text-base font-normal cursor-pointer"
          >
            {categoryData.subtitle}
          </span>
          </div>
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
            {isMobile && (
              <button
                onClick={handleReadMoreClick}
                className="text-primary underline ml-2 font-semibold xs:font-medium"
              >
                {isExpanded ? "Read Less" : "Read More"}
              </button>
            )}
          </p>
        </div>

  </>
  )
}

export default Popup