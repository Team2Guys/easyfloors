"use client";

import CartIcon from "components/svg/cart-icon";
import FreeSample from "components/svg/free-sample";
import ProfileIcon from "components/svg/user-icon";
import Link from "next/link";
import React, { useState, useEffect, useRef } from "react";
import { LuHeart } from "react-icons/lu";
import Image from "next/image";
import { useSession, signOut } from "next-auth/react";
import { useRouter } from "next/navigation";
import { Divider } from "antd";

interface UserIconProps {
  className?: string;
  cartTotal?: number;
  wishlistTotal?: number;
  freeSampleTotal?:number;
}

const UserIcon = ({ className, cartTotal, wishlistTotal,freeSampleTotal }: UserIconProps) => {
  const { data: session } = useSession();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const router = useRouter();

  const handleProfileClick = () => {
    if (!session) {
      router.push("/login");
    } else {
      setIsOpen((prev) => !prev);
    }
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const logoutHandler = async () => {
    await signOut();
    setIsOpen(false);
  };

  return (
    <div className={`flex items-center 2xl:space-x-1 ${className} relative`}>
      <button
        onClick={handleProfileClick}
        className="relative flex items-center space-x-2 h-7 p-1 fill-white focus:bg-white focus:fill-black lg:fill-black lg:hover:fill-white lg:hover:bg-primary"
      >
        {session?.user?.image ? (
          <Image
          src={session?.user?.image || "/assets/images/dummy-avatar.jpg"}
          // src={session?.user?.image ? session.user.imageurl : "/assets/images/dummy-avatar.jpg"}
            alt="User Profile"
            width={50}
            height={50}
            className="rounded-full h-full w-5 md:w-32 "
          />
        ) : (
          <ProfileIcon />
        )}
      </button>

      {session && isOpen && (
        <div
          ref={dropdownRef}
          className="absolute  right-12 top-10 md:top-12 z-[999] w-48 bg-white shadow-lg rounded-lg overflow-hidden border border-gray-200"
        >
          {session?.user && (
            <div className="bg-primary text-white p-4 flex justify-content-start items-center gap-2">
              <span className="text-12 font-medium">
                {session.user.name ?? "Guest User"}
              </span>
            </div>
          )}

          {/* Menu Items */}
          <div className="flex flex-col text-start p-2 space-y-1">
            <Link
              href="/profile"
              className="block px-4 py-2 border text-sm font-medium text-gray-700 hover:bg-primary hover:text-white rounded transition"
              onClick={() => setIsOpen(false)}
            >
              Profile
            </Link>
            <Link
              href="/order-history"
              className="block px-4 py-2 border text-sm font-medium text-gray-700 hover:bg-primary hover:text-white rounded transition"
              onClick={() => setIsOpen(false)}
            >
              Order History
            </Link>
            <Link
              href="/about-us"
              className="block px-4 py-2 border text-sm font-medium text-gray-700 hover:bg-primary hover:text-white rounded transition"
              onClick={() => setIsOpen(false)}
            >
              About Us
            </Link>
            <Divider />
            <button
              onClick={logoutHandler}
              className="w-full text-start px-4 py-2 text-sm font-medium text-red-600 hover:bg-red-100 hover:text-red-800 rounded transition"
            >
              Log Out
            </button>
          </div>
        </div>
      )}

      <div className="border-l-2 border-white h-4 lg:border-[#464646] md:h-6" />

      {/* Wishlist */}
      <Link
        href="/wishlist"
        aria-label="Go to wishlist page"
        className="relative flex h-7 justify-center p-1 text-white active:text-black focus:text-black hover:text-white items-center lg:bg-white lg:hover:bg-primary lg:text-black max-lg:focus:bg-white"
      >
        {(wishlistTotal ?? 0) > 0 && (
          <span className="absolute flex bg-white lg:bg-primary h-3 sm:h-4 justify-center text-black lg:text-white text-xs w-3 sm:w-4 -right-1 -top-1 font-semibold items-center">
            {wishlistTotal}
          </span>
        )}
        <LuHeart className="size-4 xl:size-5" />
      </Link>

      <div className="border-l-2 border-white h-4 lg:border-[#464646] md:h-6" />

      {/* Free Sample */}
      <Link
        href="/freesample"
        aria-label="Go to free sample page"
        className="relative flex h-7 justify-center p-1 fill-white focus:bg-white focus:fill-black items-center lg:fill-black lg:hover:bg-primary lg:hover:fill-white"
      >
        {(freeSampleTotal ?? 0) > 0 && (
          <span className="absolute flex bg-white lg:bg-primary h-3 sm:h-4 justify-center text-black lg:text-white text-xs w-3 sm:w-4 right-1 sm:-right-1 -top-1 font-semibold items-center">
            {freeSampleTotal}
          </span>
        )}
        <FreeSample />
      </Link>

      <div className="border-l-2 border-white h-4 lg:border-[#464646] md:h-6" />

      {/* Cart */}
      <Link
        href="/cart"
        aria-label="Go to cart page"
        className="relative flex h-7 justify-center p-1 fill-white focus:bg-white  focus:fill-black items-center lg:fill-black lg:hover:bg-primary lg:hover:fill-white"
      >
        {(cartTotal ?? 0) > 0 && (
          <span className="absolute flex bg-white lg:bg-primary h-3 sm:h-4 justify-center text-black lg:text-white text-10 sm:text-xs w-3 sm:w-4 -right-1 -top-1 font-semibold items-center">
            {cartTotal}
          </span>
        )}
        <CartIcon />
      </Link>
    </div>
  );
};

export default UserIcon;
