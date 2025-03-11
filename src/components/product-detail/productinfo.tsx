"use client";
import { useState } from "react";
import Image from "next/image";
import Container from "components/common/container/Container";

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
    <Container className="max-w-2xl mx-auto p-4">
    <h2 className="text-[33.6px] font-semibold font-inter">Skirting</h2>
    <div className="flex border-b-[1px] border-gray-300"></div>
      {/* Price and Stock Info */}
      <p className="text-[23.6px] font-semibold font-inter">
        Price Per Piece: <span className="text-primary">AED {pricePerPiece}</span>
      </p>
      <p className="text-[19.6px] font-inter font-normal">Stock: <span className="inline-block text-green-600">In Stock</span>
      </p>
      <div className="flex border-b-[1px] border-gray-300"></div>

      {/* Color Selection */}
      <div className="mt-4 h-216 border border-black p-5">
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
      <div className="mt-4 p-3 border border-black rounded">
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
          className="border p-2 w-full mt-1 boredr border-primary"
        /> 
      </div>
      <p className="font-inter font-light text-sm mt-2">(Selling in fixed length of {fixedLength} cm)</p>
      <div className="mt-2">
        <p className="font-semibold text-[23.6px]">Height: <span className="font-light text-[20.6px]">10 cm</span></p>
        <p className="font-semibold text-[23.6px]">Depth: <span className="font-light text-[20.6px]">1.6 cm</span></p>
      </div>
      </div>
      <div className="mt-4 p-3 border rounded">
        <p><strong>Total Required Pieces:</strong> {totalPieces} Pieces</p>
        <p><strong>Price per piece:</strong> AED {pricePerPiece}</p>
        <p><strong>Total amount:</strong> AED {totalAmount}</p>
      </div>

      {/* Add to Cart & Wishlist */}
      <div className="mt-4 flex gap-4">
        <button className="bg-black text-white px-6 py-2 rounded">🛒 Add to Cart</button>
        <button className="border px-6 py-2 rounded">❤️ Add to Wishlist</button>
      </div>

      {/* Payment Options */}
      <p className="text-center mt-4 font-semibold">Guaranteed Safe Checkout</p>
      <div className="flex gap-2 justify-center mt-2">
        <Image src="/assets/icons/visa.png" alt="Visa" width={50} height={30} />
        <Image src="/assets/icons/mastercard.png" alt="Mastercard" width={50} height={30} />
        <Image src="/assets/icons/applepay.png" alt="Apple Pay" width={50} height={30} />
        <Image src="/assets/icons/googlepay.png" alt="Google Pay" width={50} height={30} />
      </div>
    </Container>
  );
};

export default SkirtingProductDetail;
