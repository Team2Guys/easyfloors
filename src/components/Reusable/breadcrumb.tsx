"use client";
import React from "react";
import Link from "next/link";
import Image from "next/image";
import { BreadcrumbProps } from "types/types";
import Container from "components/common/container/Container";

const Breadcrumb = ({ title, image = "", slug, subcategory }: BreadcrumbProps) => {
  return (
    <div className="relative w-full">
      {/* Conditionally display the image */}
      {!slug && !subcategory && image && (
        <Image
          className="object-cover w-full h-[200px] md:h-[332px]"
          width={1400}
          height={332}
          src={image}
          alt={title || "breadcrumb-image"}
        />
      )}
      <div className={`flex flex-col px-4 font-inter ${!image ? "bg-background text-black py-2" : "text-white absolute inset-0 justify-center text-center items-center "}`}>
        {!slug && !subcategory && !title && <h1 className="text-30 md:text-[42.6px]">{title}</h1>}
        {title && (
          <Container className=" text-lg flex items-center gap-2 ">
            {/* Home Link */}
            <Link href="/" className="hover:underline text-12 md:text-14 text-[#9F9F9F] font-inter">
              Home
            </Link>
            <svg width="7" height="12" viewBox="0 0 7 12"  className={`${!image ? "text-black fill-black" : "text-white fill-white"}`} xmlns="http://www.w3.org/2000/svg">
              <path
                d="M6.51562 6.53125L2.26562 10.7812C1.95312 11.0938 1.48438 11.0938 1.20312 10.7812L0.484375 10.0938C0.203125 9.78125 0.203125 9.3125 0.484375 9.03125L3.51562 6.03125L0.484375 3C0.203125 2.71875 0.203125 2.25 0.484375 1.9375L1.20312 1.21875C1.48438 0.9375 1.95312 0.9375 2.26562 1.21875L6.51562 5.46875C6.79688 5.78125 6.79688 6.25 6.51562 6.53125Z"
                
              />
            </svg>

            {/* Conditionally render category, subcategory, and product links */}
            {slug && subcategory ? (
              <>
                <Link href={`/${slug}`} className="hover:underline text-12 md:text-14 text-[#9F9F9F] font-inter">
                  {slug}
                </Link>
                <svg width="7" height="12" viewBox="0 0 7 12" className={`${!image ? "text-black fill-black" : "text-white fill-white"}`} xmlns="http://www.w3.org/2000/svg">
                  <path
                    d="M6.51562 6.53125L2.26562 10.7812C1.95312 11.0938 1.48438 11.0938 1.20312 10.7812L0.484375 10.0938C0.203125 9.78125 0.203125 9.3125 0.484375 9.03125L3.51562 6.03125L0.484375 3C0.203125 2.71875 0.203125 2.25 0.484375 1.9375L1.20312 1.21875C1.48438 0.9375 1.95312 0.9375 2.26562 1.21875L6.51562 5.46875C6.79688 5.78125 6.79688 6.25 6.51562 6.53125Z"
                   
                  />
                </svg>
                <Link href={`/${slug}/${subcategory}`} className="hover:underline text-12 md:text-14 text-[#9F9F9F] font-inter">
                  {subcategory}
                </Link>
                <svg width="7" height="12" viewBox="0 0 7 12" className={`${!image ? "text-black fill-black" : "text-white fill-white"}`} xmlns="http://www.w3.org/2000/svg">
                  <path
                    d="M6.51562 6.53125L2.26562 10.7812C1.95312 11.0938 1.48438 11.0938 1.20312 10.7812L0.484375 10.0938C0.203125 9.78125 0.203125 9.3125 0.484375 9.03125L3.51562 6.03125L0.484375 3C0.203125 2.71875 0.203125 2.25 0.484375 1.9375L1.20312 1.21875C1.48438 0.9375 1.95312 0.9375 2.26562 1.21875L6.51562 5.46875C6.79688 5.78125 6.79688 6.25 6.51562 6.53125Z"
                   
                  />
                </svg>
                <span className="text-12 md:text-14 font-bold">{title}</span>
              </>
            ) : (
              <span className="text-12 md:text-14">{title}</span>
            )}
          </Container>
        )}
      </div>
    </div>
  );
};

export default Breadcrumb;
