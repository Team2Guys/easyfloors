"use client";
import Image from "next/image";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { FiMinus } from "react-icons/fi";
import { GoPlus } from "react-icons/go";
import { GrCart } from "react-icons/gr";
import Link from "next/link";
import { FaArrowLeftLong } from "react-icons/fa6";
import { ICart } from "types/prod";
import { getWishlist, removeWishlistItem, getFreeSamples, removeFreeSample, openDB } from "utils/indexedDB";
import { addToCart as saveToCart } from "utils/indexedDB";
import { toast } from "react-toastify";

interface ProductTableProps {
  columns: string[];
  isSamplePage?: boolean;
}

const ProductTable: React.FC<ProductTableProps> = ({ columns, isSamplePage = false }) => {
  const pathname = usePathname();
  const [items, setItems] = useState<ICart[]>([]);

  useEffect(() => {
    const fetchItems = async () => {
      try {
        if (isSamplePage) {
          const samples = await getFreeSamples();
          setItems(samples);
        } else {
          const wishlist = await getWishlist();
          setItems(wishlist);
        }
      } catch {
        toast.error("Error fetching items.");
      }
    };

    fetchItems();
  }, [isSamplePage]);

  const updateQuantity = (id: number, index: number) => {
    setItems((prevItems) =>
      prevItems.map((item) =>
        item.id === id ? { ...item, requiredBoxes: Math.max(1, (item.requiredBoxes ?? 0) + index) } : item
      )
    );
  };

  const handleRemoveItem = async (id: number) => {
    try {
      if (isSamplePage) {
        await removeFreeSample(id);
      } else {
        await removeWishlistItem(id);
      }
      setItems((prev) => prev.filter((item) => item.id !== id));
    } catch {
      toast.error("Error removing item.");
    }
  };

  const handleAddToCart = async (product: ICart) => {
    try {
      await saveToCart(product);
      toast.success("Product added to cart successfully!");
      setItems((prev) => prev.filter((item) => item.id !== product.id));
    } catch {
      toast.error("Error adding item.");
    }
  };

  return (
    <div className={`overflow-x-auto px-4 ${!isSamplePage && items.length > 5 ? "max-h-[400px] overflow-y-auto" : ""}`}>
      {items.length === 0 ? (
        <div className="text-center">
          <h1 className="text-center xl:text-[48px]">Your Shopping Cart</h1>
          <p className="text-center text-[24px] pt-10">
            {isSamplePage ? "Free Sample list is empty" : "Wishlist is empty"}
          </p>
          <Link href="/" className="text-center text-[18px] bg-primary p-2 flex w-fit mx-auto items-center text-white gap-2 mt-4">
            <FaArrowLeftLong /> Go Back to Shop
          </Link>
        </div>
      ) : (
        <table className="min-w-full border-b border-gray-300 bg-white">
          <thead>
            <tr className="text-12 xl:text-20 2xl:text-24 font-semibold font-inter text-left border-b">
              {columns
                .filter((col) => (pathname === "/freesample" ? col !== "QTY (m/m²)" : true))
                .map((col, index) => (
                  <th key={index} className="p-3 xl:p-4 text-left">
                    {col}
                  </th>
                ))}
            </tr>
          </thead>
          <tbody>
            {items.map((product) => (
              <tr key={product.id} className="border-t">
                <td className="p-3 flex items-center gap-3">
                  <Image height={64} width={64} src={product.image || "/assets/images/default.png"} alt={product.name} className="xl:h-[151px] xl:w-[194px] object-cover" />
                  <div className="text-12 xl:text-20 font-inter font-normal">
                    <p>{product.name}</p>
                    <p>No. of boxes: {product.requiredBoxes}</p>
                    <p>Box Coverage: {product.boxCoverage}</p>
                  </div>
                </td>
                <td className="p-3 font-inter text-12 xl:text-20 font-normal">
                  {pathname === "/freesample" ? "Free" : product.price}
                </td>
                {pathname !== "/freesample" && (
                  <td className="p-3">
                    <div className="flex justify-center items-center bg-gray-200 px-3 py-2 w-fit">
                      <button onClick={() => updateQuantity(product.id, -1)} className="px-2 text-gray-700">
                        <FiMinus />
                      </button>
                      <span className="px-2 text-black font-semibold">{product.requiredBoxes}</span>
                      <button onClick={() => updateQuantity(product.id, 1)} className="px-2 text-gray-700">
                        <GoPlus />
                      </button>
                    </div>
                  </td>
                )}
                <td className="p-3 text-center font-inter text-12 xl:text-20 font-normal">
                  {product.stock > 0 ? "In Stock" : "Out of Stock"}
                </td>
                <td className="p-3">
                  <div className="flex gap-4 lg:gap-6 xl:gap-10 items-center">
                    <button onClick={() => handleAddToCart(product)} className="bg-black text-white text-10 xl:text-20 2xl:text-24 flex gap-2 items-center whitespace-nowrap px-4 py-2">
                      <GrCart /> {isSamplePage ? "Add to Cart" : "Add to Cart"}
                    </button>
                    <button onClick={() => handleRemoveItem(product.id)} className="h-5 w-5 lg:h-7 lg:w-7 xl:h-10 xl:w-10">
                      <Image src="/assets/images/Wishlist/close.svg" alt="Remove" height={1000} width={1000} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default ProductTable;
