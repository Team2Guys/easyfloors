"use client";
import React, { useState, useRef, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { MenuItemProps } from "types/types";
import Container from "components/common/container/Container";

const Megamenu: React.FC<MenuItemProps> = ({ label, href, submenu }) => {
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
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

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleLinkClick = () => {
    setIsOpen(false);
  };

  return (
    <>
    <div ref={menuRef} className="relative font-inter capitalize font-light " onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
      <Link className="text-11 xl:text-13  2xl:text-13 3xl:text-16 capitalize hover:bg-gray-light pb-6 " href={`/${href}`}>
        {label}
      </Link>  
    </div>
    <div className="relative top-[32px]">
    {submenu && submenu.length > 0 && isOpen && (
     <div
     className={`fixed top-auto left-0 transform bg-white shadow z-50 overflow-y-auto border-primary border-t ${
       submenu.length === 3 ? "w-[50%]" : "w-[100vw]"
     }`}
     onMouseEnter={handleMouseEnter}
     onMouseLeave={handleMouseLeave}
     >
     <Container className="flex gap-4 my-2 capitalize">
       {submenu.map((sub, index) => (
         <Link key={index} href={`${sub.href}`} className={`group  ${submenu.length === 3 ? "w-4/12" : "w-[20%]"}`} onClick={handleLinkClick}>
           {sub.image && (
             <Image src={sub.image} alt={sub.label} width={500} height={500} className="w-full h-[220px] object-cover" />
           )}
           <span className="text-16 font-medium group-hover:text-primary group-hover:border-b group-hover:border-b-primary">
             {sub.label}
           </span>
         </Link>
       ))}
     </Container>
     </div>
      )}
    </div>
    </>
  );
};

export default Megamenu;
