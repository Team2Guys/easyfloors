"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import Container from "components/common/container/Container";
import { BreadcrumbProps } from "types/PagesProps";

const Breadcrumb = ({ title = "", image = "", slug, subcategory, altText, imageClass }: BreadcrumbProps) => {
    const [isScrolled, setIsScrolled] = useState(false);
  
    useEffect(() => {
      const handleScroll = () => {
        setIsScrolled(window.scrollY > 20);
      };
  
      handleScroll();
      window.addEventListener("scroll", handleScroll);
  
      return () => {
        window.removeEventListener("scroll", handleScroll);
      };
    }, []);
  return (
    <div className={` w-full pt-3  `}>
      <div className={`bg-background text-black py-3 font-inter z-40 ${isScrolled ? "bg-white text-black top-9 lg:top-[76px] fixed w-full border-b" : "bg-white text-black sticky top-0"}`}>
        <Container className="text-lg flex items-center gap-2 sm:gap-4">
          {/* Home Link */}
          <Link href="/" className="hover:underline text-[9px] xs:text-11 sm:text-12 md:text-14 text-[#9F9F9F] font-inter capitalize">
            Home
          </Link>

          <svg viewBox="0 0 7 12" className="text-black fill-black w-[5px] sm:w-[7px]" xmlns="http://www.w3.org/2000/svg">
            <path d="M6.51562 6.53125L2.26562 10.7812C1.95312 11.0938 1.48438 11.0938 1.20312 10.7812L0.484375 10.0938C0.203125 9.78125 0.203125 9.3125 0.484375 9.03125L3.51562 6.03125L0.484375 3C0.203125 2.71875 0.203125 2.25 0.484375 1.9375L1.20312 1.21875C1.48438 0.9375 1.95312 0.9375 2.26562 1.21875L6.51562 5.46875C6.79688 5.78125 6.79688 6.25 6.51562 6.53125Z" />
          </svg>

          {slug && (
            <>
            {/* slug name */}
              {subcategory ? (
                <Link
                  href={`/${slug === "richmond" ? "richmond-flooring" : slug === "polar" ? "polar-flooring" : slug?.toUpperCase()}`}
                  className="hover:underline text-[9px] xs:text-11 sm:text-12 md:text-14 text-[#9F9F9F] font-inter capitalize"
                >
                  {slug}
                </Link>
              ) : (
                <span className="text-black font-inter text-[9px] xs:text-11 sm:text-12 md:text-14 font-bold capitalize">{slug.replace(/-/g, " ")}</span>
              )}
            </>
          )}

            {subcategory && (
              <>
              {slug &&  
                <svg viewBox="0 0 7 12" className="text-black fill-black w-[5px] sm:w-[7px]" xmlns="http://www.w3.org/2000/svg">
                  <path d="M6.51562 6.53125L2.26562 10.7812C1.95312 11.0938 1.48438 11.0938 1.20312 10.7812L0.484375 10.0938C0.203125 9.78125 0.203125 9.3125 0.484375 9.03125L3.51562 6.03125L0.484375 3C0.203125 2.71875 0.203125 2.25 0.484375 1.9375L1.20312 1.21875C1.48438 0.9375 1.95312 0.9375 2.26562 1.21875L6.51562 5.46875C6.79688 5.78125 6.79688 6.25 6.51562 6.53125Z" />
                </svg>
              }
                
                {title ? (
                  <>
                    <Link href={subcategory === "accessories" ? "/accessories" : `/${slug}/${subcategory}`} className="hover:underline text-[9px] xs:text-11 sm:text-12 md:text-14 text-[#9F9F9F] font-inter capitalize">
                    {subcategory}
                    </Link>
                    <svg viewBox="0 0 7 12" className="text-black fill-black w-[5px] sm:w-[7px]" xmlns="http://www.w3.org/2000/svg">
                    <path d="M6.51562 6.53125L2.26562 10.7812C1.95312 11.0938 1.48438 11.0938 1.20312 10.7812L0.484375 10.0938C0.203125 9.78125 0.203125 9.3125 0.484375 9.03125L3.51562 6.03125L0.484375 3C0.203125 2.71875 0.203125 2.25 0.484375 1.9375L1.20312 1.21875C1.48438 0.9375 1.95312 0.9375 2.26562 1.21875L6.51562 5.46875C6.79688 5.78125 6.79688 6.25 6.51562 6.53125Z" />
                    </svg>
                  </>
                ) : (
                  <span className="text-black font-inter text-[9px] xs:text-11 sm:text-12 md:text-14 font-bold capitalize">{subcategory.replace(/-/g, " ")}</span>
                
                )}
              </>
            )}
          <span className="text-[9px] xs:text-11 sm:text-12 md:text-14 font-bold capitalize">{title.replace(/-/g, " ")}</span>
        </Container>
      </div>

      {image && (
        <div className="relative mt-2">
          <Image
            className={`object-fill w-full h-[110px] sm:h-[200px] xl:h-[332px] ${imageClass}`}
            width={1400}
            height={400}
            src={image}
            alt={altText || title || "breadcrumb-image"}
          />
      
        </div>
      )}
    </div>
  );
};

export default Breadcrumb;
