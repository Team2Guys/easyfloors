import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React, { useRef, useState, useEffect, ReactNode, useCallback } from "react";
import { IoIosClose } from "react-icons/io";
import { IoCloseSharp } from "react-icons/io5";
import { LuMinus, LuPlus } from "react-icons/lu";
import { TbShoppingBag } from "react-icons/tb";
import { toast } from "react-toastify";
import { ICart } from "types/prod";
import { getCart, getWishlist, getFreeSamples, openDB, removeCartItem, removeWishlistItem, removeFreeSample } from "utils/indexedDB";

interface DropdownPanelProps {
  icon: ReactNode;
  badgeCount?: number;
  panelClassName?: string;
  cartItems: ICart[];
  type: "cart" | "wishlist" | "freeSample";
  viewLink?: string;
  emptyMessage?: string;
}

const DropdownPanel: React.FC<DropdownPanelProps> = ({
  icon,
  badgeCount = 0,
  panelClassName = "",
  cartItems,
  type,
  viewLink = "/cart",
  emptyMessage = "Cart is empty",
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [localItems, setLocalItems] = useState<ICart[]>(cartItems);
  const [isHovered, setIsHovered] = useState(false);
  const pathname = usePathname();
const closeTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  const toggleRef = useRef<HTMLDivElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (isOpen && !isHovered) {
      // Start auto-close timer
      closeTimeoutRef.current = setTimeout(() => {
        setIsOpen(false);
      }, 5000);
    }
  
    return () => {
      if (closeTimeoutRef.current) clearTimeout(closeTimeoutRef.current);
    };
  }, [isOpen, isHovered]);
  // Close when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        toggleRef.current && 
        !toggleRef.current.contains(event.target as Node) &&
        panelRef.current && 
        !panelRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  useEffect(() => {
    const isWishlistPage = pathname === "/wishlist";
    const isFreeSamplePage = pathname === "/freesample";
  
    const shouldListen =
      type === "cart" ||
      (type === "wishlist" && !isWishlistPage) ||
      (type === "freeSample" && !isFreeSamplePage && !isWishlistPage);
  
    if (shouldListen) {
      const handleUpdate = () => {
        setIsOpen(true);
      };
  
      window.addEventListener(`${type}Updated`, handleUpdate);
      return () => {
        window.removeEventListener(`${type}Updated`, handleUpdate);
      };
    }
  }, [type, pathname]);
  
  

  useEffect(() => {
    const fetchItems = async () => {
      let updatedItems;
      if (type === "cart") {
        updatedItems = await getCart();
      } else if (type === "wishlist") {
        updatedItems = await getWishlist();
      } else if (type === "freeSample") {
        updatedItems = await getFreeSamples();
      }

      setLocalItems(updatedItems || []);
    };

    fetchItems();
  }, [type, isOpen]); 

  const closePanel = () => setIsOpen(false);

  const handleRemoveItem = async (id: number) => {
    try {
      if (type === "cart") {
        await removeCartItem(id);
      } else if (type === "wishlist") {
        await removeWishlistItem(id);
      } else if (type === "freeSample") {
        await removeFreeSample(id);
      }
  
      setLocalItems(prev => prev.filter(item => item.id !== id));
      window.dispatchEvent(new Event(`${type}Updated`));
    } catch {
      toast.error(`Error removing item from ${type}`);
    }
  };
  

  const updateQuantity = useCallback(async (id: number, change: number) => {
    try {
      const item = localItems.find(item => item.id === id);
      if (!item) return toast.error("Item not found.");

      const newQty = (item.requiredBoxes || 0) + change;
      if (newQty < 1) return toast.error("Minimum quantity is 1 box.");
      if (newQty > item.stock) return toast.error(`Max ${item.stock} boxes allowed.`);

      const updatedItem = {
        ...item,
        requiredBoxes: newQty,
        totalPrice: item.pricePerBox * newQty,
        squareMeter: Number(item.boxCoverage) * newQty,
      };

      const db = await openDB();
      const tx = db.transaction(type, "readwrite");
      await tx.objectStore(type).put(updatedItem);

      setLocalItems(prev => prev.map(cartItem => 
        cartItem.id === id ? updatedItem : cartItem
      ));
      
      window.dispatchEvent(new Event(`${type}Updated`));
    } catch {
      toast.error(`Failed to update ${type}`);
    }
  }, [localItems, type]);

  const increment = (id: number) => updateQuantity(id, 1);
  const decrement = (id: number) => updateQuantity(id, -1);

  const totalAmount = localItems.reduce((acc, item) => acc + (item.totalPrice || 0), 0);

  return (
    <div className="relative group">
      <div
        ref={toggleRef}
        onClick={() => setIsOpen(!isOpen)}
        className="relative flex h-7 justify-center p-1 text-white lg:text-black hover:text-white fill-white focus:bg-white focus:fill-black items-center lg:fill-black lg:hover:bg-primary lg:hover:fill-white cursor-pointer"
      >
        {badgeCount > 0 && (
          <span className="absolute flex bg-white lg:bg-primary h-3 sm:h-4 justify-center text-black lg:text-white text-10 sm:text-xs w-3 sm:w-4 right-[2px] sm:-right-1 -top-1 font-semibold items-center">
            {badgeCount}
          </span>
        )}
        {icon}
      </div>

      {isOpen && (
        <div
          ref={panelRef}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          className={`fixed lg:absolute right-1/2 sm:right-5 lg:right-0 max-sm:translate-x-1/2 top-10 z-[999] bg-white shadow-lg rounded-lg border border-gray-200 ${panelClassName}`}
        >
          { localItems.length > 0 ?
          
          <div className="p-2 sm:w-96">
            <div className="flex items-center justify-between mb-2">
              <p className="font-bold text-md-h6">{type.toUpperCase()}</p>
              <IoIosClose size={30} onClick={closePanel} className="cursor-pointer" />
            </div>

            <div className="max-h-52 border w-[280px] sm:w-full border-slate-100 overflow-y-auto p-1 custom-scrollbar">
              {localItems.length > 0 ? (
                localItems.map((item) => (
                  <div key={item.id} className="rounded-lg border p-3 bg-white shadow-sm mb-2">
                    <div className="flex gap-3">
                      <div className="relative">
                        <div className="bg-gray-100 p-1 rounded-md">
                          <Image
                            width={80}
                            height={80}
                            src={item.image || "/default-image.png"}
                            alt={item.name}
                            className="w-16 h-16 object-contain"
                          />
                        </div>
                        <button
                          onClick={() => handleRemoveItem(item.id)}
                          className="absolute -top-2 -right-2 bg-white shadow h-4 w-4 rounded-full flex items-center justify-center text-xs"
                        >
                          <IoCloseSharp size={10} />
                        </button>
                      </div>

                      <div className="flex-1 flex flex-col justify-between text-start">
                        <h2 className="text-sm font-semibold leading-snug line-clamp-2">{item.name}</h2>
                        <p className="text-xs text-gray-700 mt-1">AED {item.price}</p>
                        {type === "cart" && (
                          <div className="flex items-center border w-28 h-8 justify-between px-2 mt-2">
                            <button onClick={() => decrement(item.id)} className="px-1 hover:text-black">
                              <LuMinus />
                            </button>
                            <span className="text-16 text-purple px-1">{item.requiredBoxes}</span>
                            <button onClick={() => increment(item.id)} className="px-1 hover:text-black">
                              <LuPlus />
                            </button>
                          </div>
                        )}
                      </div>
                    </div>
                    {type === "cart" && (
                      <div className="flex justify-between items-center mt-2">
                        <span className="text-sm font-semibold">Total:</span>
                        <span className="text-sm">AED {item.totalPrice?.toFixed(2) || "0.00"}</span>
                      </div>
                    )}
                  </div>
                ))
              ) : (
                <p className="font-bold p-4 text-start">{emptyMessage}</p>
              )}
            </div>

            <div className="text-end mt-2 mb-2 font-bold">
              {type === "cart" && `Total: AED ${totalAmount.toFixed(2)}`}
            </div>

            <div className="w-full mt-2 space-y-1">
              <Link href={viewLink} onClick={closePanel} className="w-full block text-center bg-primary text-white py-1">
                View {type === "cart" ? "Cart" : type === "wishlist" ? "Wishlist" : "Free Samples"}
              </Link>
              <button
                className="border w-full border-primary hover:bg-primary hover:text-white transition duration-300 py-1"
                onClick={closePanel}
              >
                Continue Shopping
              </button>
            </div>
          </div>:

          <div className="p-2 sm:w-96 py-10 text-center flex flex-col items-center justify-center space-y-4">
            <TbShoppingBag size={50} />
            <p className="text-center text-black capitalize text-20 font-semibold">{emptyMessage}</p>
            <div className="flex justify-center mt-2">
              <Link href="/" className="bg-primary text-white px-4 py-2">Continue Shopping</Link>
            </div>
          </div>
          }
        </div>
      )}
    </div>
  );
};

export default DropdownPanel;