"use client";
import { useState } from "react";
import Image from "next/image";
import { CiHeart } from "react-icons/ci";
import { HiOutlineShoppingCart } from "react-icons/hi";

const SkirtingProductDetail = () => {
  const pricePerPiece = 84; // Price per piece in AED
  const fixedLength = 240; // Fixed length in cm

  const [length, setLength] = useState(""); // User input for required length
  const [totalPieces, setTotalPieces] = useState(0);
  const [totalAmount, setTotalAmount] = useState(0);

  const colors = [
    { code: "3897", color: "/assets/bin/colors/c1.png" },
    { code: "3895", color: "/assets/bin/colors/c2.png" },
    { code: "2868", color: "/assets/bin/colors/c3.png"},
    { code: "6661", color: "/assets/bin/colors/c4.png" },
    { code: "2636", color: "/assets/bin/colors/c5.png" },
    { code: "X8355-9", color: "/assets/bin/colors/c6.png" },
    { code: "3896", color: "/assets/bin/colors/c7.png" },
    { code: "3891", color: "/assets/bin/colors/c8.png" },
    { code: "3895", color: "/assets/bin/colors/c9.png" },
    { code: "2869", color: "/assets/bin/colors/c10.png" },
    { code: "6661", color: "/assets/bin/colors/c11.png" },
    { code: "2634", color: "/assets/bin/colors/c12.png" },
    { code: "X8365-9", color: "/assets/bin/colors/c13.png"},
    { code: "FC5943", color: "/assets/bin/colors/c14.png" },
    { code: "FC5943", color: "/assets/bin/colors/c15.png" },
    { code: "FC5943", color: "/assets/bin/colors/c16.png" },
  ];

  const handleLengthChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setLength(value);

    // Calculate required pieces based on entered length
    const meters = parseFloat(value);
    if (!isNaN(meters) && meters > 0) {
      const pieces = Math.ceil((meters * 100) / fixedLength);
      setTotalPieces(pieces);
      setTotalAmount(pieces * pricePerPiece);
    } else {
      setTotalPieces(0);
      setTotalAmount(0);
    }
  };

  return (
    <div className="w-4/12 p-4">
    <h2 className="text-[33.6px] font-semibold font-inter">Skirting</h2>
    <div className="flex border-b-[1px] border-gray-300"></div>
      {/* Price and Stock Info */}
      <p className="text-[23.6px] font-semibold font-inter">
        Price Per Piece: <span className="text-primary">AED {pricePerPiece}</span>
      </p>
      <p className="text-[19.6px] font-inter font-normal">Stock: <span className="text-green">In Stock</span>
      </p>
      <div className="flex border-b-[1px] border-gray-300"></div>

      {/* Color Selection */}
      <div className="mt-4 h-216 border border-black p-3">
        <p className="font-semibold font-inter text-[23.6px] ">Colour: <span className="font-light text-[20.6px]">Chestnut</span></p>
        <div className="flex flex-wrap gap-2 mt-2">
          {colors.map((col, index) => (
            <div key={index}>
              <Image alt="img" src={col.color} height={1000} width={1000} className="h-12 w-12"/>
              <p className="text-10 font-inter font-normal my-1 text-center">{col.code}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Matching Colors */}
      <div className="mt-4 p-3 border border-black">
        <p className="font-semibold text-[23.6px] font-inter">Matching with:</p>
        <p className="font-inter font-light">Cappuccino Colour 2369</p>
        <p className="font-inter font-light">Antique Colour 2869</p>
      </div>

      {/* Length Input */}
      <div className="border border-black mt-4 p-3">
      <div className="flex gap-2 ">
        <p className="font-semibold font-inter text-[23.6px]">Length:</p>
        <input
          type="number"
          value={length}
          onChange={handleLengthChange}
          placeholder="Enter your required meter"
          className="border p-2 w-full mt-1 border-primary"
        /> 
      </div>
      <p className="font-inter font-light text-sm mt-2">
        (Selling in fixed length of {fixedLength} cm)
      </p>
      <div className="mt-2 font-semibold text-[23.6px]">
        <p>Height: <span className="font-light text-[20.6px]">10 cm</span></p>
        <p>Depth: <span className="font-light text-[20.6px]">1.6 cm</span></p>
      </div>
      </div>
      <div className="mt-4 p-3 border border-black font-inter text-[23.6px] font-semibold">
        <p>Total Required Pieces:<span className="text-[20.6px] font-light">{totalPieces} Pieces</span></p>
        <p >Price per piece: <span className="text-[20.6px] font-light">AED {pricePerPiece}</span></p>
        <p>Total amount: <span className="text-[20.6px] font-light">AED {totalAmount} ({totalPieces}pieces * AED {pricePerPiece})</span></p>
      </div>

      {/* Add to Cart & Wishlist */}
      <div className="mt-4 flex text-[22.6px] font-normal font-inter justify-between items-center gap-2">
        <button className="bg-black text-white w-fit px-4 py-2 flex gap-2 justify-center items-center"><HiOutlineShoppingCart size={22}/>Add to Cart</button>
        <button className="flex justify-center items-center text-14 text-[#475156]"><CiHeart size={22} /> Add to Wishlist</button>
      </div>

      {/* Payment Options */}
      <p className="text-center mt-4 font-medium font-inter text-[20.6px]">Guaranteed Safe Checkout</p>
      <p className="font-inter text-[22.6px] font-semibold">Buy Now, Pay Later</p>
      <div className="flex gap-5 mt-2">
        <Image src="/assets/icons/visa1.png" alt="Visa" width={1000} height={1000} className="w-16 h-12" />
        <Image src="/assets/icons/Maestro.png" alt="Mastercard" width={1000} height={1000} className="w-16 h-12"  />
        <Image src="/assets/icons/pay.png" alt="Apple Pay" width={1000} height={1000} className="w-16 h-12"  />
        <Image src="/assets/icons/Gpay.png" alt="Google Pay" width={1000} height={1000} className="w-16 h-12"  />
      </div>
    </div>
  );
};

export default SkirtingProductDetail;
