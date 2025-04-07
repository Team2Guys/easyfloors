"use client";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { FaArrowLeftLong } from "react-icons/fa6";
import { ICart } from "types/prod";
import { FiMinus } from "react-icons/fi";
import { GoPlus } from "react-icons/go";
import { GrCart } from "react-icons/gr";
import { usePathname } from "next/navigation";
import { fetchItems, handleAddToCart, handleRemoveItem, updateQuantity } from "utils/cartutils";
import Container from "./common/container/Container";


const SmallScreen: React.FC = () => {
  const pathname = usePathname();
  const isSamplePage = pathname === "/freesample";
  const [items, setItems] = useState<ICart[]>([]);

  useEffect(() => {
    fetchItems(isSamplePage, setItems);
  }, [isSamplePage]);

  return (
    <Container>
    <div>
      {items.length === 0 ? (
        <div className="text-center mt-5 mb-10">
          <h1 className="text-2xl font-bold">
            {isSamplePage ? "Free Sample is Empty" : "Wishlist is Empty"}
          </h1>
          <Link href="/" className="text-center text-[18px] bg-primary p-2 flex w-fit mx-auto items-center text-white gap-2 mt-4">
            <FaArrowLeftLong /> Go Back to Shop
          </Link>
        </div>
      ) : (
        <div className={`space-y-6 ${!isSamplePage ? "max-h-[950px] overflow-y-auto" : ""}`}>
          {items.slice(0, isSamplePage ? 5 : items.length).map((product) => (
            <div key={product.id} className="border-b border-gray-300 py-4 flex flex-col gap-4 relative bg-white ">
              {/* Product Image */}
              <div className="flex justify-between items-start gap-2 w-full">
                <div className="flex flex-row gap-2">
                  <Image src={product.image || "/image.png"} alt={product.name} width={80} height={80} className="object-cover w-20 h-20" />
                  <div className="text-14 font-inter font-normal flex-grow">
                    <p className="font-normal text-14">{product.name}</p>
                    {!isSamplePage && (
                    <>
                   <p className="text-12 font-normal font-inter">No. of boxes: {product.requiredBoxes}</p>
                  <p className="text-12 font-normal font-inter">Box Coverage: {product.boxCoverage}</p>
                  </>
                )}
                    <p className="text-14 font-inter font-semibold font-
                    ter">
                      {isSamplePage ? "Free" : `AED ${product.price}`}
                    </p>
                    <p className="text-14 font-normal font-inter">{product.stock > 0 ? "In Stock" : "Out of Stock"}</p>
                  </div>
                </div>
                <button onClick={() => handleRemoveItem(product.id, isSamplePage, setItems)} className="text-gray-500 hover:text-red-500">
                  <svg className="w-6 h-6" width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <rect x="0.5" y="0.5" width="47" height="47" stroke="#424542" />
                    <path
                      d="M8.95313 9L7.35938 10.5937L14.0625 17.2969L20.7656 24L14.0625 30.7031L7.35938 37.4062L8.98125 39.0187L10.5938 40.6406L17.2969 33.9375L24 27.2344L30.7031 33.9375L37.4063 40.6406L39.0188 39.0187L40.6406 37.4062L33.9375 30.7031L27.2344 24L33.9375 17.2969L40.6406 10.5937L39.0188 8.98125L37.4063 7.35938L30.7031 14.0625L24 20.7656L17.3156 14.0812C13.65 10.4156 10.6219 7.40625 10.5938 7.40625C10.5656 7.40625 9.825 8.12812 8.95313 9Z"
                      fill="#424542"
                    />
                  </svg>
                </button>
              </div>
              <div className="flex gap-2 w-full justify-between mt-3">
                {!isSamplePage && (
                  <div className="flex items-center bg-[#F0F0F0] text-black px-4 py-1">
                    <button onClick={() => updateQuantity(product.id, -1, setItems)} className="p-2">
                      <FiMinus />
                    </button>
                    <span className="px-3 font-semibold">{product.requiredBoxes}</span>
                    <button onClick={() => updateQuantity(product.id, 1, setItems )} className="p-2">
                      <GoPlus />
                    </button>
                  </div>
                )}
                <button onClick={() => handleAddToCart(product, isSamplePage, setItems)} 
              className={`bg-black text-white text-14 font-inter flex items-center gap-2  py-1 ${
                !isSamplePage ? 'px-12' : 'px-14'
              }`}
              >
                  <GrCart /> Add to Cart
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
    </Container>
  );
};

export default SmallScreen;
