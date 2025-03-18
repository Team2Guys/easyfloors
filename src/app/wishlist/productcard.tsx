"use client"
import Image from "next/image";
import React, { useEffect, useState } from "react";
import { FiMinus } from "react-icons/fi";
import { GoPlus } from "react-icons/go";
import { GrCart } from "react-icons/gr";
import { toast } from "react-toastify";
import { ICart } from "types/prod";
import { getWishlist, removeWishlistItem } from "utils/indexedDB";

const ProductCard = () => {
  const [wishlistItems, setWishlistItems] = useState<ICart[]>([]);
    useEffect(() => {
      const fetchCartItems = async () => {
        try {
          const items = await getWishlist();
          setWishlistItems(items);
        } catch  {
          toast.error("Error fetching cart items:");
        }
      };
  
      fetchCartItems();
    }, []);
  
    const handleRemoveItem = async (id: number) => {
      try {
        await removeWishlistItem(id); 
        setWishlistItems((pre)=>pre.filter((value)=>value.id !==id))
      } catch {
        toast.error("Error removing item from cart:");
      }
    };

  const updateQuantity = (id: number, index: number) => {
    setWishlistItems(wishlistItems.map(item =>
      item.id === id ? { ...item, quantity: Math.max(1, (item.quantity ?? 0) + index) } : item
    ));
  };
  
  const increment = (id: number) => updateQuantity(id, 1);
  const decrement = (id: number) => updateQuantity(id, -1);


  return (
    <>
    {wishlistItems.map((product) => (
  
    <div className="flex flex-col md:grid md:grid-cols-[2fr_1fr_1fr_1fr_2fr] lg:grid-cols-[3fr_2fr_1fr_1fr_1fr] 2xl:grid-cols-[3fr_1fr_1fr_1fr_2fr] md:gap-10 items-center  border-b md:border-t md:border-b border-gray-300  py-4 md:p-4">
      {/* Product Info */}
    <div className="flex justify-between items-start md:items-center gap-2  md:gap-4 w-full flex-grow">
    <Image height={1000} width={1000} src={product.image || '/default-image.jpg'} alt={product.name} className="xl:h-[151px] xl:w-[194px] md:h-[100px] md:w-[100px] object-cover hidden md:block" />
    <span className="md:text-14 xl:text-24 font-inter font-normal flex-grow hidden md:block" >{product.name}</span>
    <div className="flex flex-row gap-2 " >
      <Image height={1000} width={1000} src={product.image || '/default-image.jpg'} alt={product.name} className="h-[61px] w-[60px] object-cover block md:hidden"/>
      <div className="text-14 font-inter font-normal flex-grow block md:hidden" >{product.name}
      <div className="text-14 font-semibold font-inter w-full block md:hidden">AED {product.price}</div>
      <p className="text-black font-inter font-normal text-14 block md:hidden">
      {product.stock <= 0 ? "Out of Stock" : "In Stock"}
      </p>
      </div>
      </div>
    <button
          onClick={() => handleRemoveItem(product.id)}
          className="items-start text-12 block md:hidden w-5"
        >
          <svg className="w-4 h-4" width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
          <rect x="0.5" y="0.5" width="47" height="47" stroke="#424542"/>
          <path d="M8.95313 9L7.35938 10.5937L14.0625 17.2969L20.7656 24L14.0625 30.7031L7.35938 37.4062L8.98125 39.0187L10.5938 40.6406L17.2969 33.9375L24 27.2344L30.7031 33.9375L37.4063 40.6406L39.0188 39.0187L40.6406 37.4062L33.9375 30.7031L27.2344 24L33.9375 17.2969L40.6406 10.5937L39.0188 8.98125L37.4063 7.35938L30.7031 14.0625L24 20.7656L17.3156 14.0812C13.65 10.4156 10.6219 7.40625 10.5938 7.40625C10.5656 7.40625 9.825 8.12812 8.95313 9Z" fill="#424542"/>
          </svg>
          </button>
  </div>

      {/* Price */}
      <div className="text-center text-12 xl:text-24 font-inter xl:text-left w-full xl:w-auto hidden md:block">AED {product.price}</div>

      {/* Quantity Selector */}
      <div className="hidden md:block">
      <div className="flex items-center text-12 xl:text-24 bg-[#F0F0F0] text-black justify-center w-fit px-3 py-3 ">
        <button
          onClick={() => decrement(product.id)}
          className=""
        ><FiMinus />
        </button>
        <span className="mx-5">{product.quantity}</span>
        <button
          onClick={() => increment(product.id)}
          className=""
        ><GoPlus /></button>
      </div></div>

      {/* Stock Status */}
      <div className="text-black font-inter font-normal text-12 xl:text-24 w-full text-center md:text-left hidden md:block">
  {product.stock <= 0 ? "Out of Stock" : "In Stock"}
</div>

      {/* Actions */}
      <div className="flex gap-2 md:gap-3 xl:gap-10 w-full justify-between md:justify-start mt-3 md:mt-0">
      <div className="block md:hidden">
      <div className="flex items-center text-14 bg-[#F0F0F0] text-black justify-center w-fit px-4 py-2 ">
        <button
          onClick={() => decrement(product.id)}
          className=""
        ><FiMinus />
        </button>
        <span className="mx-5">{product.quantity}</span>
        <button
          onClick={() => increment(product.id)}
          className=""
        ><GoPlus /></button>
      </div>
      </div>
        <div className="bg-black flex gap-2 justify-center items-center text-white font-inter font-normal text-14 md:text-[10px] whitespace-nowrap xl:text-[22.6px] px-8 md:px-4 md:py-1 lg:py-2"><GrCart className="text-14 md:text-10 lg:text-xl" /> Add to Cart</div>
        <button
          onClick={() => handleRemoveItem(product.id)}
          className="text-14 xl:text-xl hidden md:block"
        >
          <svg className="w-4 h-4 lg:w-8 lg:h-8" width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
          <rect x="0.5" y="0.5" width="47" height="47" stroke="#424542"/>
          <path d="M8.95313 9L7.35938 10.5937L14.0625 17.2969L20.7656 24L14.0625 30.7031L7.35938 37.4062L8.98125 39.0187L10.5938 40.6406L17.2969 33.9375L24 27.2344L30.7031 33.9375L37.4063 40.6406L39.0188 39.0187L40.6406 37.4062L33.9375 30.7031L27.2344 24L33.9375 17.2969L40.6406 10.5937L39.0188 8.98125L37.4063 7.35938L30.7031 14.0625L24 20.7656L17.3156 14.0812C13.65 10.4156 10.6219 7.40625 10.5938 7.40625C10.5656 7.40625 9.825 8.12812 8.95313 9Z" fill="#424542"/>
          </svg>
          </button>
      </div>
    </div>
    ))}
      </>
  );
};

export default ProductCard;
