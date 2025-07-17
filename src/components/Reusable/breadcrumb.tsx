"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import Container from "components/common/container/Container";
import { BreadcrumbProps } from "types/PagesProps";

const Breadcrumb = ({ title = "", image = "", slug, subcategory, altText,isImagetext, imageClass }: BreadcrumbProps) => {
  const [isScrolled, setIsScrolled] = useState(false);
  
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 5);
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);


  return (
    <div className={` w-full pt-3  `}>
     <div className={`z-30 w-full py-3 bg-white border-b ${isScrolled ? "fixed top-[35px] sm:top-[45px] lg:top-[76px] shadow-md" : ""}`}>
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
        <div className="relative h-[110px] sm:h-[200px] xl:h-[332px]">
          <Image
            className={`object-fill w-full  ${imageClass}`}
            fill
            src={image}
            alt={altText || title || "breadcrumb-image"}
            sizes="100wv"
            priority
            fetchPriority="high"
          />
       {!isImagetext && (
            <div className="absolute inset-0 flex justify-center items-center text-white text-center">
              <p className="text-25 md:text-[42.6px] font-bold">{title}</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default Breadcrumb;
