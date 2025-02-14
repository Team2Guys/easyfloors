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
    }, 500);
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
    <div ref={menuRef} className="relative" onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
      <Link className="text-11 xl:text-14 2xl:text-16 " href={href}>
        {label}
      </Link>
      {submenu && submenu.length > 0 && isOpen && (
        <div
          className="fixed left-0 top-[13%] w-[100vw] bg-white shadow z-50 overflow-y-auto"
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        >
          <Container className="grid grid-cols-5 gap-4 my-2 ">
            {submenu.map((sub, index) => (
              <Link key={index} href={sub.href} className="group"  onClick={handleLinkClick}>
                  {sub.image && (
                    <Image src={sub.image} alt={sub.label} width={500} height={500} className="w-full h-[220px]  object-cover" />
                  )}
                  <span className="text-16 font-medium group-hover:text-primary group-hover:border-b group-hover:border-b-primary">{sub.label}</span>
              </Link>
            ))}
          </Container>
        </div>
      )}
    </div>
  );
};

export default Megamenu;
