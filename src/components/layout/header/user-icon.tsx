"use client";
import React, { useState, useEffect, useRef, lazy } from "react";
import CartIcon from "components/svg/cart-icon";
const FreeSample = lazy(() => import('components/svg/free-sample'))
import ProfileIcon from "components/svg/user-icon";
import Link from "next/link";
import { LuHeart } from "react-icons/lu";
import Image from "next/image";
import { useSession, signOut } from "next-auth/react";
import { useRouter } from "next/navigation";
import { Divider } from "antd";
import DropdownPanel from "./DropdownPanel";
import { ICart } from "types/prod";
import { getCart, getFreeSamples, getWishlist } from "utils/indexedDB";
import { toast } from "react-toastify";

interface UserIconProps {
  className?: string;

}

const UserIcon = ({ className }: UserIconProps) => {
  const { data: session } = useSession();
  const [imgSrc] = useState(session?.user?.image || "/assets/images/dummy-avatar.jpg");
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const router = useRouter();
      const [cartTotal, setCartTotal] = useState<ICart[]>();
      const [wishlistTotal, setWishlistTotal] = useState<ICart[]>();
      const [freeSampleTotal, setfreeSampleTotal] = useState<ICart[]>();
      
      useEffect(() => {
        const fetchItems = async () => {
          try {
            const items = await getCart();
            const wishlist = await getWishlist();
            const freesample = await getFreeSamples();
            setCartTotal(items);
            setWishlistTotal(wishlist);
            setfreeSampleTotal(freesample);
          } catch {
            toast.error("Error fetching items");
          }
        };
    
        fetchItems();
        const handleCartUpdate = () => fetchItems();
        const handleWishlistUpdate = () => fetchItems();
        const handlefreeSampleUpdate = () => fetchItems();
    
        window.addEventListener("cartUpdated", handleCartUpdate);
        window.addEventListener("wishlistUpdated", handleWishlistUpdate);
        window.addEventListener("freeSampleUpdated", handlefreeSampleUpdate);
    
        return () => {
          window.removeEventListener("cartUpdated", handleCartUpdate);
          window.removeEventListener("wishlistUpdated", handleWishlistUpdate);
          window.removeEventListener("freeSampleUpdated", handlefreeSampleUpdate);
        };
    
      }, []);

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

  const logoutHandler = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    await signOut();
    setIsOpen(false);
  };
  return (
    <div className={`flex items-center 2xl:space-x-1 ${className} relative`}>
      <button
        onClick={handleProfileClick}
        className="relative flex items-center space-x-2 h-7 p-1 fill-white focus:bg-white focus:fill-black lg:fill-black lg:hover:fill-white lg:hover:bg-primary"
      >
        {session ? (
          <Image
          src={imgSrc}
            alt="User Profile"
            width={50}
            height={50}
            className="rounded-full h-full w-5 lg:w-40 xl:w-32 xl:h-7 "
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

      <DropdownPanel
        icon={<LuHeart className="size-4 xl:size-5" />}
        badgeCount={wishlistTotal?.length ?? 0}
        cartItems={wishlistTotal ?? []}
        type="wishlist"
        viewLink="/wishlist"
        emptyMessage="wishlist is empty"
      />
      <div className="border-l-2 border-white h-4 lg:border-[#464646] md:h-6" />

      {/* Free Sample */}

      <DropdownPanel
        icon={<FreeSample />}
        badgeCount={freeSampleTotal?.length ?? 0}
        cartItems={freeSampleTotal ?? []}
        type="freeSample"
        viewLink="/freesample"
        emptyMessage="free sample is empty"
      />
      <div className="border-l-2 border-white h-4 lg:border-[#464646] md:h-6" />
       {/* Cart */}
      <DropdownPanel
        icon={<CartIcon />}
        type="cart"
        badgeCount={cartTotal?.length ?? 0}
        cartItems={cartTotal ?? []}
      />
    </div>
  );
};

export default UserIcon;
