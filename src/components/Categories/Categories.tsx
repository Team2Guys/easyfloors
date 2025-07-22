import React from "react";
import Image from "next/image";
import Link from "next/link";
import { BlogCardProps } from "types/type";
import { categoriesFeatures } from "data/data";
import { CategoryFeatures } from "types/types";

interface Props extends BlogCardProps {
  index: number;
}

const Categories: React.FC<Props> = ({ card, index }) => {
  const featureObj: CategoryFeatures | undefined = categoriesFeatures[index];

  return (
    <div className="group relative overflow-hidden shadow-lg md:h-96 h-60 w-full text-center md:mb-0 mb-10 border-b">
      <div className="relative h-full w-full">
          <Image
          src={card?.homePageImage?.imageUrl || ""}
          alt={card?.homePageImage?.altText || "easy Floor"}
          fill
          quality={80}
          loading="lazy"
          style={{ objectFit: "cover", width: "100%", height: "100%" }}
          className="absolute inset-0 transition-transform duration-300 group-hover:scale-105"
          />

        <div className="relative h-full flex flex-col justify-center items-center transition-opacity duration-300 group-hover:bg-opacity-70">
          <p className="md:mb-3 md:text-6xl text-2xl font-bold text-white drop-shadow-[0_0_10px_rgba(0,0,0,0.8)]">
            I Am
          </p>
          <h3 className="mt-1 md:text-2xl text-sm font-inter text-white font-normal drop-shadow-[0_0_10px_rgba(0,0,0,0.8)]">
            {card.name}
          </h3>
            <Link
              href={`what-am-i?flooring=${card.whatIamEndpoint}`}
              className="md:text-base text-[12px] font-medium text-white hover:bg-primary transition duration-300 underline hover:no-underline"
            >
              Click Me
            </Link>
          {featureObj && (
            <div className="absolute md:bottom-0 block right-1/2 bottom-1 text-white md:text-sm md:p-4 p-2 rounded-lg opacity-100 xsm:opacity-0 transition-opacity duration-300 group-hover:opacity-100 translate-x-1/2 w-fit whitespace-nowrap">
              <ul className="list-disc pl-5 text-left">
                {featureObj.features.map((feature, i) => (
                  <li className="text-[8px] md:text-sm lg:text-11 xl:text-sm" key={i}>
                    {feature}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Categories;
