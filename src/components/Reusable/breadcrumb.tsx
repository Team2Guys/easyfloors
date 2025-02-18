"use client";
import React from "react";
import Link from "next/link";
import Image from "next/image";
import { BreadcrumbProps } from "types/types";

const Breadcrumb = ({ title, image = ""}: BreadcrumbProps) => {
  return (
    <div className="relative w-full">
      <Image
        className="object-cover w-full h-[200px]  md:h-[332px]"
        width={1400}
        height={332}
        src={image}
        alt={title}
      />
      <div className="absolute inset-0 flex flex-col items-center justify-center text-white text-center px-4 font-inter">
        <h1 className="text-30 md:text-[42.6px]">{title}</h1>
        <nav className=" md:mt-2 text-lg flex items-center gap-2 font-bold">
          <Link href="/" className="hover:underline text-12 md:text-14">
            Home
          </Link>
          <svg width="7" height="12" viewBox="0 0 7 12" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M6.51562 6.53125L2.26562 10.7812C1.95312 11.0938 1.48438 11.0938 1.20312 10.7812L0.484375 10.0938C0.203125 9.78125 0.203125 9.3125 0.484375 9.03125L3.51562 6.03125L0.484375 3C0.203125 2.71875 0.203125 2.25 0.484375 1.9375L1.20312 1.21875C1.48438 0.9375 1.95312 0.9375 2.26562 1.21875L6.51562 5.46875C6.79688 5.78125 6.79688 6.25 6.51562 6.53125Z" fill="white"/>
          </svg>
          <span className="text-12 md:text-14">{title}</span>
        </nav>
      </div>
    </div>
  );
};

export default Breadcrumb;
