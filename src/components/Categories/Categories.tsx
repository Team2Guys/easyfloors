import React from "react";
import Image from "next/image";
import { TBlogCard } from "types/type";
import Link from "next/link";

interface BlogCardProps {
  card: TBlogCard;
}

const Categories: React.FC<BlogCardProps> = ({ card }) => {
  return (
    <div className="group relative overflow-hidden shadow-lg h-96 w-full text-center">
        <div className="relative h-full w-full">
          <Image
            src={card.backgroundImage}
            alt={card.title}
            layout="fill"
            objectFit="cover"
            className="absolute inset-0 transition-transform duration-300 group-hover:scale-105"
          />
          
         
          <div className="relative h-full flex flex-col justify-center items-center transition-opacity duration-300 group-hover:bg-opacity-70">
            <h2 className="mb-3 text-6xl font-bold text-white">{card.title}</h2>
            <p className="mt-1 text-2xl font-inter text-white font-normal">{card.heading}</p>
            
           
            <div className="mt-3">
              <Link
                href={card.Link}
                className="text-base font-medium text-white px-4 py-2 hover:bg-primary transition duration-300"
              >
                Click Me
              </Link>
            </div>
         
            <div className="absolute bottom-4 right-4   text-white text-sm p-4 rounded-lg opacity-0 transition-opacity duration-300 group-hover:opacity-100">
              <ul className="list-disc pl-5 text-left">
                <li>Waterproof</li>
                <li>Scratch proof</li>
                <li>Durable</li>
                <li>Easy to clean</li>
              </ul>
            </div>
          </div>
        </div>
    </div>
  );
};

export default Categories;
