"use client";
import React, { useState, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { MenuItemProps } from "types/types";
import Container from "components/common/container/Container";


const Megamenu: React.FC<MenuItemProps> = ({ label, href, submenu, products }) => {
  const [isOpen, setIsOpen] = useState(false);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  const handleMouseEnter = () => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    setIsOpen(true);
  };

  const handleMouseLeave = () => {
    timeoutRef.current = setTimeout(() => {
      setIsOpen(false);
    }, 200);
  };

  const handleLinkClick = () => {
    setTimeout(() => {
      setIsOpen(false);
    }, 50);
  };
  return (
    <>
      <div
        className="relative font-inter capitalize font-light"
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        onClick={handleMouseLeave}
      >
        <Link
          className="text-11 xl:text-13 2xl:text-13 3xl:text-16 capitalize hover:bg-gray-light pb-6"
          href={`/${href}`}
        >
          {label}
        </Link>
      </div>

      <div className="relative top-[32px]">
        {label === "Accessories" && isOpen && (
          <div
            className="fixed top-auto left-0 transform bg-white shadow z-50 overflow-y-auto border-primary border-t w-[100vw]"
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
          >
            <Container className="flex gap-4 my-2 capitalize">
              {products?.map((product, index) => (
                <Link
                  key={index}
                  href={`/accessories/${product.custom_url}`}
                  className="group w-[20%]"
                  onClick={handleLinkClick}
                >
                  {product.posterImageUrl && (
                    <Image
                      src={product.posterImageUrl.imageUrl}
                      alt={product.posterImageUrl.altText ?? "Accessories"}
                      width={500}
                      height={500}
                      className="w-full h-[220px] object-cover"
                    />
                  )}
                  <span className="text-16 font-medium group-hover:text-primary group-hover:border-b group-hover:border-b-primary">
                    {product.name}
                  </span>
                </Link>
              ))}
            </Container>
          </div>
        )}

        {label !== "Accessories" && submenu && isOpen && (
          <div
            className={`fixed top-auto left-0 transform bg-white shadow z-50 overflow-y-auto border-primary border-t ${
              submenu.length === 3 ? "w-[50%]" : "w-[100vw]"
            }`}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
          >
            {submenu.length > 0 ? (
              <Container className="flex gap-4 my-2 capitalize">
                {submenu.map((sub, index) => (
                  <Link
                    key={index}
                    href={sub.href}
                    className={`group ${
                      submenu.length === 3 ? "w-4/12" : "w-[20%]"
                    }`}
                    onClick={handleLinkClick}
                  >
                    {sub.image && (
                      <Image
                        src={sub.image}
                        alt={sub.label}
                        width={500}
                        height={500}
                        className="w-full h-[220px] object-cover"
                      />
                    )}
                    <span className="text-16 font-medium group-hover:text-primary group-hover:border-b group-hover:border-b-primary">
                      {sub.label}
                    </span>
                  </Link>
                ))}
              </Container>
            ) : (
              <Container className="w-full animate-pulse px-2 flex gap-4 my-2">
                {[...Array(submenu.length === 3 ? 3 : 5)].map((_, i) => (
                  <div
                    key={i}
                    className={`h-[220px] ${
                      submenu.length === 3 ? "w-4/12" : "w-[20%]"
                    } bg-gray-300 rounded mb-3`}
                  >
                  </div>
                ))}
              </Container>
            )}
          </div>
        )}
      </div>
    </>
  );
};

export default Megamenu;

