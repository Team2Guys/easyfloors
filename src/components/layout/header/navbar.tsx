"use client";
import React, { useEffect, useState } from "react";
import Container from "components/common/container/Container";
import Image from "next/image";
import Link from "next/link";
import SearchBar from "./search-bar";
import UserIcon from "./user-icon";
import Megamenu from "./Megamenu";
import { menuItems } from "data/data";
import { FaBars } from "react-icons/fa6";
import Drawer from "components/ui/drawer";
import { BiChevronDown } from "react-icons/bi";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [openMenus, setOpenMenus] = useState<{ [key: string]: boolean }>({});
  const [scrolling, setScrolling] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 0) {
        setScrolling(true); 
      } else {
        setScrolling(false);
      }
    };
    
    window.addEventListener("scroll", handleScroll);
    
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const toggleMenu = (label: string) => {
    setOpenMenus((prev) => {
      const isCurrentlyOpen = prev[label];
      const newState: { [key: string]: boolean } = {};
      menuItems.forEach((item) => {
        if (item.label === label) {
          newState[label] = !isCurrentlyOpen;
        } else {
          newState[item.label] = false;
        }
      });
      return newState;
    });
  };

  return (
    <div className={`bg-blue-400 fixed w-full z-50 ${scrolling ? 'top-0 shadow-lg' : 'top-10'} transition-all`}>
      <Container className="flex items-center max-sm:gap-4 justify-between bg-red-300 mt-1 sm:mt-3 ">
      <div className="w-2/12 lg:w-[8%] 2xl:w-[10.3%] ">
        <Link href="/">
          <Image
            width={200}
            height={200}
            className=" w-[54px] h-[24px] lg:w-[200px] lg:h-[60px] 2xl:w-auto 2xl:h-auto"
            src="/assets/images/logo/logo.png"
            alt="logo"
          />
        </Link>
      </div>
      <div className="w-8/12 lg:w-[65%] 2xl:w-[70%]  max-lg:flex max-lg:justify-center">
        <div className="hidden lg:flex items-center gap-2 2xl:gap-6 w-fit  justify-between capitalize font-light whitespace-nowrap">
          {menuItems.map((item, index) => (
            <Megamenu
              key={index}
              label={item.label}
              href={item.href}
              submenu={item.submenu}
              scrolling={scrolling}
            />
          ))}
        </div>
        <SearchBar className="block lg:hidden" />
      </div>
      <div className="w-2/12 lg:w-[25%] 2xl:w-[20%]  text-end flex items-center gap-2 justify-between max-lg:justify-end">
        <SearchBar className="lg:block hidden" />
        <UserIcon className="hidden lg:flex" />
        <div className="lg:hidden flex justify-end">
          <FaBars onClick={() => setIsOpen(true)} size={20} />
          <Drawer isOpen={isOpen} onClose={() => setIsOpen(false)}>
              {menuItems.map((item) => (
                <div key={item.label} className="border-b py-2">
                  <div className="flex justify-between items-center gap-2">
                    <Link href={item.href} className="text-14 font-semibold w-fit whitespace-nowrap" onClick={() => setIsOpen(false)}>{item.label}</Link>
                    {item.submenu && (
                      <button onClick={() => toggleMenu(item.label)} className="w-full flex justify-end">
                        <BiChevronDown className={`w-5 h-5 transition-transform  ${openMenus[item.label] ? 'rotate-180' : ''}`} />
                      </button>
                    )}
                  </div>
                  {item.submenu && openMenus[item.label] && (
                    <div className="grid grid-cols-2 gap-3 pt-2">
                    {item.submenu.map((sub,index) => (
                      <Link href={sub.href} key={index} className="py-1  text-center"  onClick={() => setIsOpen(false)}>
                        <Image  width={200} height={200} src={sub.image} alt={sub.label} className="w-full h-20" />
                        <p className="text-sm text-black hover:underline">{sub.label}</p>
                      </Link>
                    ))}
                    </div>
                  )}
                </div>
              ))}
          </Drawer>
        </div>
      </div>
      </Container>
    </div>
  );
};

export default Navbar;
