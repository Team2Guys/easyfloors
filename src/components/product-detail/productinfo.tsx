"use client";
import { useState } from "react";
import Image from "next/image";
import { CiHeart } from "react-icons/ci";
import { HiOutlineShoppingCart } from "react-icons/hi";
import PaymentMethod from "components/product-detail/payment";
import { colors } from "data/data";
import { paymentcard } from "data/cart";

const SkirtingProductDetail = () => {
  const pricePerPiece = 84; // Price per piece in AED
  const fixedLength = 240; // Fixed length in cm
  
  const [length, setLength] = useState(""); // User input for required length
  const [totalPieces, setTotalPieces] = useState(0);
  const [totalAmount, setTotalAmount] = useState(0);

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
    <div className="p-1 lg:px-4">
    <div className="space-y-1 mt-5 lg:mt-0">
    <h2 className="text-18 lg:text-[33.6px] font-semibold font-inter">Skirting</h2>
    <div className="flex border-b-[1px] border-gray-300"></div>
      {/* Price and Stock Info */}
      <p className="text-14 xl:text-[23.6px] font-semibold font-inter">
        Price Per Piece: <span className="text-primary">AED {pricePerPiece}</span>
      </p>
      <p className="text-15 xl:text-[19.6px] font-inter font-normal">Stock: <span className="text-green">In Stock</span>
      </p>
      <div className="flex border-b-[1px] border-gray-300"></div>
    </div>

      {/* Color Selection */}
      <div className="w-full mt-5 h-216 border border-black p-3">
        <p className="font-semibold font-inter text-16 xl:text-[23.6px] ">Colour: <span className="font-light text-14 xl:text-[20.6px]">Chestnut</span></p>
        <div className="grid grid-cols-8 gap-2 lg:gap-4 mt-2">
        {colors.map((col, index) => (
         <div key={index} className="text-center">
         <Image alt="img" src={col.color} height={1000} width={1000} className="h-8 w-full lg:h-12 lg:w-12 mx-auto"/>
         <p className="text-[8px] sm:text-10 font-inter font-normal mt-1">{col.code}</p>
         </div>
         ))}
        </div>
      </div>

      {/* Matching Colors */}
      <div className="mt-4 p-3 border border-black">
        <p className="font-semibold text-15 xl:text-[23.6px] font-inter">Matching with:</p>
        <p className="font-inter font-light text-12 xl:text-[20.6px]">Cappuccino Colour 2369</p>
        <p className="font-inter font-light text-12 xl:text-[20.6px]">Antique Colour 2869</p>
      </div>

      {/* Length Input */}
      <div className="border border-black mt-4 p-3">
      <div className="flex items-center lg:items-start gap-2 ">
        <p className="font-semibold font-inter text-16 xl:text-[23.6px]">Length:</p>
        <input
          type="number"
          value={length}
          onChange={handleLengthChange}
          placeholder="Enter your required meter"
          className="border p-2 w-full mt-1 border-primary text-12"
        /> 
      </div>
      <p className="font-inter font-light tecxt-12 xl:text-sm mt-2">
        (Selling in fixed length of {fixedLength} cm)
      </p>
      <div className="mt-2 font-semibold text-16 lg:text-[23.6px]">
        <p>Height: <span className="font-light text-12 xl:text-[20.6px]">10 cm</span></p>
        <p>Depth: <span className="font-light text-12 xl:text-[20.6px]">1.6 cm</span></p>
      </div>
      </div>
      <div className="mt-4 p-3 border border-black font-inter text-16 xl:text-[23.6px] font-semibold">
        <p>Total Required Pieces: <span className="text-12 xl:text-[20.6px] font-light">{totalPieces} Pieces</span></p>
        <p >Price per piece: <span className="text-12 xl:text-[20.6px] font-light">AED {pricePerPiece}</span></p>
        <p>Total amount: <span className="text-12 xl:text-[20.6px] font-light">AED {totalAmount} ({totalPieces}pieces * AED {pricePerPiece})</span></p>
      </div>

      {/* Add to Cart & Wishlist */}
      <div className="mt-4 flex xl:text-[22.6px] font-normal font-inter items-center gap-4">
        <button className="bg-black text-white w-fit px-6 lg:px-4 xl:px-10 text-14 xl:text-[22.6px] py-2 flex gap-2 justify-center items-center"><HiOutlineShoppingCart size={22}/>Add to Cart</button>
        <button className="flex justify-center items-center text-14 text-[#475156] gap-1"><CiHeart size={22} /> Add to Wishlist</button>
      </div>           

      {/* Payment Options */}
      
     <p className="text-center mt-4 font-medium font-inter text-12 lg:text-[20.6px]">Guaranteed Safe Checkout</p>
     <PaymentMethod installments={200}/>
       <div className="mt-2 space-y-2">
       <p className='tetx-18 xl:text-22 font-semibold'>Buy Now, Pay Later</p>
        <div className='flex justify-between gap-2' >
        {
          paymentcard.map((array,index)=>(
            <Image className=' w-16 h-11 md:w-14 md:h-12 2xl:w-[90px] 2xl:h-[60px] shadow' key={index}  width={90} height={60} src={array.image} alt='payment-card'/>
          ))
        }
        </div>
       </div>
    </div>
  );
};

export default SkirtingProductDetail;
