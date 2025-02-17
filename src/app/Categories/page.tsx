import BlogCard from "components/Categories/Categories";
import Container from "components/common/container/Container";
import { blogCards, categoryData } from "data/data";
import React from "react";

export default function AmCategory() {
  return (
    <Container>
      <div className="font-inter mt-20">
        <h1
          className="relative text-center text-4xl md:max-w-xl w-full font-bold text-white py-5 mx-auto bg-cover bg-center "
          style={{ backgroundImage: `url(${categoryData.backgroundImage})` }}
        >
          {categoryData.title}{" "}
          <span className="text-[#1EBFFA] align-top text-[12px] font-normal">
            {categoryData.subtitle}
          </span>
        </h1>
        <div className="max-w-3xl mx-auto text-center text-base my-10">
          <p className="text-center text-base font-light font-inter">
            {categoryData.description}
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
