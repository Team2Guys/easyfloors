"use client";
import React from "react";
import Link from "next/link";
import Image from "next/image";
import Container from "components/common/container/Container";
import { BreadcrumbProps } from "types/PagesProps";

const Breadcrumb = ({ title, image = "", slug, subcategory, altText, isImagetext, imageClass }: BreadcrumbProps) => {
  return (
    <div className="relative w-full pt-3">
      <div className="bg-background text-black py-3 font-inter">
        <Container className="text-lg flex items-center gap-2 sm:gap-4">
          {/* Home Link */}
          <Link href="/" className="hover:underline text-[8px] sm:text-12 md:text-14 text-[#9F9F9F] font-inter">
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
                  href={`/${slug === "richmond" ? "richmond-flooring" : slug === "polar" ? "polar-flooring" : slug}`}
                  className="hover:underline text-[8px] sm:text-12 md:text-14 text-[#9F9F9F] font-inter"
                >
                  {slug}
                </Link>
              ) : (
                <span className="text-black font-inter text-[8px] sm:text-12 md:text-14 font-bold">{slug}</span>
              )}
            </>
          )}

          {subcategory && (
            <>
              <svg viewBox="0 0 7 12" className="text-black fill-black w-[5px] sm:w-[7px]" xmlns="http://www.w3.org/2000/svg">
                <path d="M6.51562 6.53125L2.26562 10.7812C1.95312 11.0938 1.48438 11.0938 1.20312 10.7812L0.484375 10.0938C0.203125 9.78125 0.203125 9.3125 0.484375 9.03125L3.51562 6.03125L0.484375 3C0.203125 2.71875 0.203125 2.25 0.484375 1.9375L1.20312 1.21875C1.48438 0.9375 1.95312 0.9375 2.26562 1.21875L6.51562 5.46875C6.79688 5.78125 6.79688 6.25 6.51562 6.53125Z" />
              </svg>
              <Link href={`/${slug}/${subcategory}`} className="hover:underline text-[8px] sm:text-12 md:text-14 text-[#9F9F9F] font-inter">
                {subcategory}
              </Link>
            </>
          )}
          {
            title &&  
            <svg viewBox="0 0 7 12" className="text-black fill-black w-[5px] sm:w-[7px]" xmlns="http://www.w3.org/2000/svg">
            <path d="M6.51562 6.53125L2.26562 10.7812C1.95312 11.0938 1.48438 11.0938 1.20312 10.7812L0.484375 10.0938C0.203125 9.78125 0.203125 9.3125 0.484375 9.03125L3.51562 6.03125L0.484375 3C0.203125 2.71875 0.203125 2.25 0.484375 1.9375L1.20312 1.21875C1.48438 0.9375 1.95312 0.9375 2.26562 1.21875L6.51562 5.46875C6.79688 5.78125 6.79688 6.25 6.51562 6.53125Z" />
            </svg>
          }
          <span className="text-[8px] sm:text-12 md:text-14 font-bold">{title}</span>
        </Container>
      </div>

      {image && (
        <div className="relative mt-2">
          <Image
            className={`object-fill w-full sm:h-[200px] xl:h-[332px] ${imageClass}`}
            width={1400}
            height={400}
            src={image}
            alt={altText || title || "breadcrumb-image"}
          />
          {!isImagetext && (
            <div className="absolute inset-0 flex justify-center items-center text-white text-center">
              <h1 className="text-30 md:text-[42.6px] font-bold">{title}</h1>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default Breadcrumb;
