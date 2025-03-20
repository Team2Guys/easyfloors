"use client";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { FaArrowLeftLong } from "react-icons/fa6";
import { ICart } from "types/prod";
import { getWishlist, removeWishlistItem } from "utils/indexedDB";
import { addToCart as saveToCart } from "utils/indexedDB";
import { toast } from "react-toastify";
import { FiMinus } from "react-icons/fi";
import { GoPlus } from "react-icons/go";
import { GrCart } from "react-icons/gr";
import { usePathname } from "next/navigation";

const WishlistSmall: React.FC = () => {
   const pathname = usePathname();
  const [wishlistItems, setWishlistItems] = useState<ICart[]>([]);
    useEffect(() => {
      const fetchCartItems = async () => {
        try {
          const items = await getWishlist();
          setWishlistItems(items);
        } catch {
          toast.error("Error fetching cart items:");
        }
      };
  
      fetchCartItems();
    }, []);
  
    const handleRemoveItem = async (id: number) => {
      try {
        await removeWishlistItem(id);
        setWishlistItems((pre) => pre.filter((value) => value.id !== id))
      } catch {
        toast.error("Error removing item from cart:");
      }
    };
  
    const updateQuantity = (id: number, index: number) => {
      setWishlistItems(wishlistItems.map(item =>
        item.id === id ? { ...item, requiredBoxes: Math.max(1, (item.requiredBoxes ?? 0) + index) } : item
      ));
    };
  
    const increment = (id: number) => updateQuantity(id, 1);
    const decrement = (id: number) => updateQuantity(id, -1);

    const handleAddToCart = async (product: ICart) => {
      try {
        await saveToCart(product); // 
        setWishlistItems((prev) => prev.filter((item) => item.id !== product.id)); 
        toast.success(`Product added to cart!`);
      } catch {
        toast.error("Error adding item to cart.");
      }
    };

  return (
    <div>
      {wishlistItems.length === 0 ? (
        <div className="text-center mt-5 mb-10">
          <h1 className="text-2xl font-bold">Wishlist is Empty</h1>
          <Link href="/" className="text-center text-[18px] bg-primary p-2 flex w-fit mx-auto items-center text-white gap-2 mt-4">
            <FaArrowLeftLong /> Go Back to Shop
          </Link>
        </div>
      ) : (
        <div className="space-y-6">
          {wishlistItems.map((product) => (
            <div key={product.id} className="border-b border-gray-300 py-4 flex flex-col gap-4 relative bg-white">
              {/* ❇ Product Image */}
              <div className="flex justify-between items-start gap-2 w-full">
                <div className="flex flex-row gap-2">
                  <Image src={product.image || "/image.png"} alt={product.name} width={80} height={80} className="object-cover w-20 h-20" />
                  <div className="text-14 font-inter font-normal flex-grow">
                    <p className="font-semibold text-lg">{product.name}</p>
                    <p className="text-14 font-semibold font-inter">
                    {pathname === "/freesample" ? "Free" : `AED ${product.price}`}
                    </p>
                    <p>{product.stock > 0 ? "In Stock" : "Out of Stock"}</p>
                  </div>
                </div>
                <button onClick={() => handleRemoveItem(product.id)} className="text-gray-500 hover:text-red-500">
                  <svg className="w-6 h-6" width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <rect x="0.5" y="0.5" width="47" height="47" stroke="#424542" />
                    <path
                      d="M8.95313 9L7.35938 10.5937L14.0625 17.2969L20.7656 24L14.0625 30.7031L7.35938 37.4062L8.98125 39.0187L10.5938 40.6406L17.2969 33.9375L24 27.2344L30.7031 33.9375L37.4063 40.6406L39.0188 39.0187L40.6406 37.4062L33.9375 30.7031L27.2344 24L33.9375 17.2969L40.6406 10.5937L39.0188 8.98125L37.4063 7.35938L30.7031 14.0625L24 20.7656L17.3156 14.0812C13.65 10.4156 10.6219 7.40625 10.5938 7.40625C10.5656 7.40625 9.825 8.12812 8.95313 9Z"
                      fill="#424542"
                    />
                  </svg>
                </button>
              </div>

              {/* ❇ Quantity Selector & Add to Cart */}
              <div className="flex gap-2 w-full justify-between mt-3">
              {pathname !== "/freesample" && ( // Correct conditional rendering
    <div className="flex items-center text-14 bg-[#F0F0F0] text-black justify-center w-fit px-4 py-2">
      <button onClick={() => updateQuantity(product.id, -1)} className="p-2">
        <FiMinus />
      </button>
      <span className="px-3 font-semibold">{product.requiredBoxes}</span>
      <button onClick={() => updateQuantity(product.id, 1)} className="p-2">
        <GoPlus />
      </button>
    </div>
  )}
  
  <div className="bg-black flex gap-2 justify-center items-center text-white font-inter font-normal text-14 whitespace-nowrap">
                  <button onClick={() => handleAddToCart(product)} className="bg-black text-white flex items-center gap-2 px-4 py-2 whitespace-nowrap">
                    <GrCart /> Add to Cart
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default WishlistSmall;
