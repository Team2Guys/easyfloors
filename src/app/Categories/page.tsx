"use client"
import BlogCard from "components/Categories/Categories";
import Container from "components/common/container/Container";
import { blogCards, categoryData } from "data/data";
import React, { useState } from "react";

export default function AmCategory() {
  const [isExpanded, setIsExpanded] = useState(false);
  const shortText = categoryData.description.split(" ").slice(0, 25).join(" ") + ". ";

  return (
    <Container>
      <div className="font-inter mt-20">
        <h1
          className="relative text-center max-w-[95%] md:text-4xl xl:max-w-[65%] 2xl:max-w-4xl w-full font-bold text-white py-5 mx-auto bg-contain sm:bg-cover bg-center text-16 bg-no-repeat"
          style={{ backgroundImage: `url(${categoryData.backgroundImage})` }}
        >
          {categoryData.title}{" "}
          <span className="text-[#1EBFFA] align-middle md:align-top text-[8px] sm:text-[12px] font-normal">
            {categoryData.subtitle}
          </span>
        </h1>
        <div className="max-w-4xl mx-auto text-center text-base my-2 sm:my-10 hidden sm:block">
          <p className="text-center text-12 sm:text-base font-normal sm:font-light font-inter max-sm:leading-5">
            {categoryData.description}
          </p>
        </div>

        <div className="max-w-[95%] sm:max-w-3xl mx-auto text-center text-base my-2 sm:my-10 block sm:hidden">
          <p className="text-center text-12 sm:text-base font-normal sm:font-light font-inter max-sm:leading-5">
            {isExpanded ? categoryData.description : shortText}
            <span
            className="text-primary text-[10px] cursor-pointer font-semibold"
            onClick={() => setIsExpanded(!isExpanded)}
            >
            {isExpanded ? "Read Less" : "Read More"}
            </span>
          </p>
          
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {blogCards.map((card) => (
            <BlogCard key={card.id} card={card} />
          ))}
        </div>
      </div>
    </Container>
  );
}