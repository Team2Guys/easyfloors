import React from "react";
import AreaCalculator from "./AreaCalculator";
import Image from "next/image";
import { LuHeart } from "react-icons/lu";
import PaymentMethod from "./payment";

const ProductInfo = () => {
  return (
    <div className="space-y-3 xl:space-y-4 mb-2">
      <h1 className="font-inter text-25 2xl:text-[33px] font-semibold">
        Richmond Eco SPC- Oak History
      </h1>
      <div className="border-b border-[#D9D9D9]" />
      <div className="flex items-center gap-2 sm:gap-4 text-18 2xl:text-23 font-semibold text-primary">
        <p className="text-black">Price Per Sqm :</p>
        <p>
          <span>AED</span> 55{" "}
          <span>
            /m<sup>2</sup>
          </span>
        </p>
      </div>
      <div className="flex items-center gap-1 text-19">
        <p className="text-14 sm:text-18 2xl:text-23">
          Stock: <span className="text-[#008000] font-bold">In Stock</span>
        </p>
        <div className="h-5 w-[2px] bg-black" />
        <p className="text-14 sm:text-18 2xl:text-23 font-bold">
          Box Coverage:{" "}
          <span className="font-normal">
            2.9 m<sup>2</sup>
          </span>
        </p>
        <div className="h-5 w-[2px] bg-black" />
        <p className="text-14 sm:text-18 2xl:text-23 font-bold">
          Box: <span className="font-normal">2</span>
        </p>
      </div>
      <div className="border-b border-[#D9D9D9]" />
      <AreaCalculator />
      <div className="border-b border-[#D9D9D9]" />
      <div className="flex items-center gap-5">
        <p className="font-black text-16 sm:text-20 lg:text-28 2xl:text-33">Total : <span>AED</span> <span>180.23</span></p>
        <p className="font-medium text-16 2xl:text-20">(1 packs<span> / </span>2.20<span>m<sup>2</sup></span>)</p>
      </div>
      <div className="flex items-center gap-1 sm:gap-3 w-full">
        <button className="max-sm:h-[40px] px-2 py-2 sm:py-3 text-white bg-primary flex items-center gap-2 font-inter text-12 sm:text-16 2xl:text-22 w-7/12">
            <Image src="/assets/images/icon/measure.png" alt="box" width={30} height={30} />
            Order Now Free Sample
        </button>
        <button className="max-sm:h-[40px] px-2 xl:px-10 py-2 sm:py-3 bg-black text-white  font-inter text-12 sm:text-16 2xl:text-22 flex items-center gap-2 w-5/12">
        <Image src="/assets/images/icon/cart.png" alt="box" width={28} height={28} />
          Add to Cart
        </button>
      </div>
      <button className="flex items-center gap-2 text-[#475156]"><LuHeart size={20} />Add to Wishlist</button>
      <PaymentMethod/>
    </div>
  );
};

export default ProductInfo;
