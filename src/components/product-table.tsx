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
import { getWishlist, removeWishlistItem, getFreeSamples, removeFreeSample, openDB} from "utils/indexedDB";
import { addToCart as saveToCart} from "utils/indexedDB";
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

  const increment = (id: number) => updateQuantity(id, 1);
  const decrement = (id: number) => updateQuantity(id, -1);

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
      if (isSamplePage) {
        const db = await openDB();
        const tx = db.transaction("cart", "readonly");
        const store = tx.objectStore("cart");
        const existingProduct = await new Promise<ICart | undefined>((resolve, reject) => {
          const request = store.get(product.id);
          request.onsuccess = () => resolve(request.result);
          request.onerror = () => reject(request.error);
        });
  
        if (existingProduct) {
          toast.info("Product already exists in the cart."); 
          return;
        }
  
        await saveToCart(product);
        await removeFreeSample(product.id); 
        toast.success("Product added to cart successfully!");
      } else {
  
        await saveToCart(product);
        toast.success("Product added to cart successfully!");
      }
  
      setItems((prev) => prev.filter((item) => item.id !== product.id));
    } catch {
      toast.error("Error adding item.");
    }
  };

  return (
    <div className="overflow-x-auto px-4">
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
                  <th key={index} className={`${pathname === "/freesample" ? "p-3 xl:p-4" : "p-2"} ${index === columns.length - 1 ? "text-center" : "text-left"}`}>
                    {col}
                  </th>
                ))}
            </tr>
          </thead>
          <tbody>
            {items.slice(0, 5).map((product) => (
              <tr key={product.id} className="border-t">
                <td className="p-3 flex items-center gap-3 md:w-full">
                  <Image height={64} width={64} src={product.image || "/assets/images/default.png"} alt={product.name} className="xl:h-[151px] xl:w-[194px] md:h-[100px] md:w-[70px] object-cover" />
                  <div className="w-[100%] md:text-10 lg:text-12 xl:text-20 2xl:text-24 font-inter font-normal items-center">
                    <p>{product.name}</p>
                    <p className="md:text-[10px] lg:text-12 xl:text-18 2xl:tetx-20">No. of boxes: {product.requiredBoxes}</p>
                    <p className="md:text-[9px] lg:text-12 xl:text-20">Box Coverage: {product.boxCoverage}</p>
                  </div>
                </td>
                <td className="md:p-3 xl:pl-6 font-inter text-12 xl:text-20 2xl:text-24 font-normal md:w-[17%]">
                  {pathname === "/freesample" ? "Free" : product.price}
                </td>
                {pathname !== "/freesample" && (
                  <td className="md:w-[20%] xl:w-[15%]">
                    <div className="flex justify-center items-center text-12 xl:text-20 2xl:text-24 bg-gray-200 px-3 py-2 w-fit ">
                      <button onClick={() => decrement(product.id)} className="lg:px-2 text-gray-700">
                        <FiMinus />
                      </button>
                      <span className="px-2 text-black text-12 xl:text-20 2xl:text-24 font-semibold">{product.requiredBoxes}</span>
                      <button onClick={() => increment(product.id)} className="lg:px-2 text-gray-700">
                        <GoPlus />
                      </button>
                    </div>
                  </td>
                )}

                <td className="md:p-3 font-400 font-inter md:text-11 lg:text-12 xl:text-20 2xl:text-24 md:w-[15%] xl:w-[13%]">
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
