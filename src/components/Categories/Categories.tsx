import React from "react";
import Image from "next/image";
import { BlogCardProps } from "types/type";
import Link from "next/link";

const Categories: React.FC<BlogCardProps> = ({ card }) => {
  return (
    <div className="group relative overflow-hidden shadow-lg md:h-96 h-60 w-full text-center md:mb-0 mb-10 border-b ">
      <div className="relative h-full w-full">
        <Image
          src={card.backgroundImage}
          alt={card.title}
          fill
          style={{ objectFit: "cover" }}
          className="absolute inset-0 transition-transform duration-300 group-hover:scale-105"
        />

        <div className="relative h-full flex flex-col justify-center items-center transition-opacity duration-300 group-hover:bg-opacity-70 ">
          <h2 className="md:mb-3 md:text-6xl text-2xl font-bold text-white drop-shadow-2xl" >{card.title}</h2>
          <p
            className="mt-1 md:text-2xl text-sm font-inter text-white font-normal drop-shadow-2xl "
            dangerouslySetInnerHTML={{ __html: card.heading }}
          />
          <div className="md:mt-3">
            <Link
              href={card.Link}
              className="md:text-base text-[12px] font-medium text-white hover:bg-primary transition duration-300 underline hover:no-underline"
            >
              Click Me
            </Link>
          </div>
          <div className="absolute md:bottom-0  md:right-4 right-0 bottom-1 text-white md:text-sm md:p-4 p-2 rounded-lg opacity-0 transition-opacity duration-300 group-hover:opacity-100">
            <ul className="list-disc pl-5 text-left">
              {card.features.map((feature, index) => (
                <li className="md:text-sm text-[8px]" key={index}>{feature}</li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Categories;
