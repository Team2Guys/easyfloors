import React, { useState } from "react";
import { FiMinus } from "react-icons/fi";
import { GoPlus } from "react-icons/go";
import { GrCart } from "react-icons/gr";

interface ProductCardProps {
  product: {
    id: number;
    name: string;
    price: number;
    image: string;
    stockStatus: string;
  };
  onRemove: (id: number) => void;
}

const ProductCard: React.FC<ProductCardProps> = ({ product, onRemove }) => {
  const [quantity, setQuantity] = useState(2);

  return (
    <div className="flex flex-col md:grid md:grid-cols-[2fr_1fr_1fr_1fr_2fr] md:gap-10 items-center border-t border-b border-gray-300 p-4">
      {/* Product Info */}
      <div className="flex items-center gap-4 w-full flex-grow">
    <img src={product.image} alt={product.name} className="h-16 xl:min-h-[155px] object-cover" />
    <span className="text-11 xl:text-24 font-inter font-normal flex-grow">{product.name}</span>
  </div>

      {/* Price */}
      <div className="text-center text-12 xl:text-24 font-inter xl:text-left w-full xl:w-auto">AED {product.price}</div>

      {/* Quantity Selector */}
      <div className="flex items-center text-12 xl:text-24 bg-[#F0F0F0] text-black justify-center w-fit px-3 py-3">
        <button
          onClick={() => setQuantity(qty => Math.max(qty - 1, 1))}
          className=""
        ><FiMinus />
        </button>
        <span className="mx-5">{quantity}</span>
        <button
          onClick={() => setQuantity(qty => qty + 1)}
          className=""
        ><GoPlus /></button>
      </div>

      {/* Stock Status */}
      <div className="text-black font-inter font-normal text-12 xl:text-24 w-full text-center md:text-left">{product.stockStatus}</div>

      {/* Actions */}
      <div className="flex gap-3 xl:gap-10 w-full justify-center md:justify-start">
        <div className="bg-black flex gap-2 justify-center items-center text-white font-inter font-normal text-[10px] whitespace-nowrap xl:text-[22.6px] px-4 py-1 lg:py-2"><GrCart className="text-10 lg:text-xl" /> Add to Cart</div>
        <button
          onClick={() => onRemove(product.id)}
          className="text-12 xl:text-xl"
        >
          <svg className="w-4 h-4 lg:w-8 lg:h-8" width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
          <rect x="0.5" y="0.5" width="47" height="47" stroke="#424542"/>
          <path d="M8.95313 9L7.35938 10.5937L14.0625 17.2969L20.7656 24L14.0625 30.7031L7.35938 37.4062L8.98125 39.0187L10.5938 40.6406L17.2969 33.9375L24 27.2344L30.7031 33.9375L37.4063 40.6406L39.0188 39.0187L40.6406 37.4062L33.9375 30.7031L27.2344 24L33.9375 17.2969L40.6406 10.5937L39.0188 8.98125L37.4063 7.35938L30.7031 14.0625L24 20.7656L17.3156 14.0812C13.65 10.4156 10.6219 7.40625 10.5938 7.40625C10.5656 7.40625 9.825 8.12812 8.95313 9Z" fill="#424542"/>
          </svg>
          </button>
      </div>
    </div>
  );
};

export default ProductCard;
