import { formatAED } from "lib/helperFunctions";
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
import { getCart, openDB, removeCartItem, removeWishlistItem, removeFreeSample, getFreeSamplesCart, cartremoveFreeSample, getWishlist, getFreeSamples } from "utils/indexedDB";

interface DropdownPanelProps {
  icon: ReactNode;
  badgeCount?: number;
  panelClassName?: string;
  cartItems: ICart[];
  type: "cart" | "wishlist" | "freeSample" | "cartfreeSample";
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
    const handleUpdate = () => {
      const isCartPage = pathname === "/cart";
      const isWishlistPage = pathname === "/wishlist";
      const isFreeSamplePage = pathname === "/freesample";
      const isFreeSampleCheckoutPage = pathname === "/freesample-checkout";
      const isCheckoutPage = pathname === "/checkout";

      if (type === "freeSample" && isFreeSampleCheckoutPage) {
        return;
      }

      // ✅ Prevent cart modal on checkout page
      if (type === "cart" && isCheckoutPage) {
        return;
      }
      // Special case: On free sample page, only show cart popup for cart updates
      if (isFreeSamplePage && type === "cart") {
        setIsOpen(true);
      }
      // Normal cases for other pages
      else if (!isFreeSamplePage) {
        const shouldShowPanel =
          (type === "cart" && !isCartPage) ||
          (type === "wishlist" && !isWishlistPage) ||
          (type === "freeSample" && !isWishlistPage);

        if (shouldShowPanel) {
          setIsOpen(true);
        }
      }
    };

    window.addEventListener(`${type}Updated`, handleUpdate);
    return () => {
      window.removeEventListener(`${type}Updated`, handleUpdate);
    };
  }, [type, pathname]);

  useEffect(() => {
    const fetchItems = async () => {
      let updatedItems: ICart[] = [];

      if (type === "cart") {
        const normalCart = (await getCart()) || [];
        const freeCart = (await getFreeSamplesCart()) || [];
        const markedFreeCart = freeCart.map(item => ({
          ...item,
          isfreeSample: true
        }));

        updatedItems = [...normalCart, ...markedFreeCart];
      } else if (type === "wishlist") {
        updatedItems = (await getWishlist()) || [];
      } else if (type === "freeSample") {
        updatedItems = (await getFreeSamples()) || [];
      }

      setLocalItems(updatedItems);
    };

    fetchItems();
    const handleUpdate = () => {
      fetchItems();
    };

    window.addEventListener(`${type}Updated`, handleUpdate);
    return () => {
      window.removeEventListener(`${type}Updated`, handleUpdate);
    };
  }, [type, isOpen]);

  const closePanel = () => { setIsOpen(false) };

  const handleRemoveItem = async (id: number, isFreeSample: boolean) => {
    try {
      if (isFreeSample) {
        if (type === "freeSample") {
          await removeFreeSample(id); // Remove from free samples list
        } else if (type === "cart") {
          await cartremoveFreeSample(id); // Remove from cart's free samples
        }
      } else {
        if (type === "cart") {
          await removeCartItem(id);
        } else if (type === "wishlist") {
          await removeWishlistItem(id);
        }
      }

      // Update local items
      setLocalItems(prev => prev.filter(item =>
        !(item.id === id && (item.isfreeSample === isFreeSample))
      ));

      // Dispatch appropriate update events
      window.dispatchEvent(new Event(`${type}Updated`));

      // If removing from cart, also update free samples if needed
      if (type === "cart" && isFreeSample) {
        window.dispatchEvent(new Event('cartfreeSampleUpdated'));
      }
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
          className={`fixed lg:absolute right-2 sm:right-5 lg:right-0  top-10 z-[999] bg-white shadow-lg rounded-lg border border-gray-200 ${panelClassName}`}
        >
          {localItems.length > 0 ?

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
                            onClick={() => handleRemoveItem(Number(item.id), item.isfreeSample || false)}
                            className="absolute -top-2 -right-2 bg-white shadow h-4 w-4 rounded-full flex items-center justify-center text-xs"
                          >
                            <IoCloseSharp size={10} />
                          </button>
                        </div>

                        <div className="flex-1 flex flex-col justify-between text-start">
                          <h2 className="text-sm font-semibold leading-snug line-clamp-2">{item.name}</h2>
                          {
                            item.isfreeSample ? "free" :
                              <p className=" text-base sm:text-xs mt-1"><span className="font-currency text-20 sm:text-14 font-normal"></span> {item.price}</p>
                          }
                          {!item.isfreeSample && type === "cart" && (
                            <div className="flex items-center border w-28 h-8 justify-between px-2 mt-2">
                              <button onClick={() => decrement(Number(item.id))} className="px-1 hover:text-black">
                                <LuMinus />
                              </button>
                              <span className="text-16 text-purple px-1">{item.requiredBoxes}</span>
                              <button onClick={() => increment(Number(item.id))} className="px-1 hover:text-black">
                                <LuPlus />
                              </button>
                            </div>
                          )}
                        </div>
                      </div>
                      {type === "cart" && (
                        <div className="flex justify-between items-center mt-2">
                          <span className="text-sm font-semibold">Total:</span>
                          {
                            item.isfreeSample ? "free" :
                              <span className="text-sm"><span className="font-currency text-18 font-normal"></span> {formatAED(item.totalPrice) || "0.00"}</span>
                          }
                        </div>
                      )}
                    </div>
                  ))
                ) : (
                  <p className="font-bold p-4 text-start">{emptyMessage}</p>
                )}
              </div>

              <div className="text-end mt-2 mb-2 font-bold">
                {type === "cart" && <p>Total:  <span className="font-currency text-20 font-normal"></span> {formatAED(totalAmount)}</p>}
              </div>

              <div className="w-full mt-2 space-y-1">
                <Link href={viewLink} onClick={closePanel} className="w-full block text-center bg-primary text-white py-1">
                  View {type === "cart" ? "Cart" : type === "wishlist" ? "Wishlist" : "Free Samples"}
                </Link>

                <div className="border text-center w-full border-primary hover:bg-primary hover:text-white transition duration-300 py-1">
                  <Link href="/collections" onClick={closePanel} className=" text-center  px-4 py-2">Continue Shopping</Link>
                </div>
              </div>


            </div> :

            <div className="p-2 sm:w-96 py-10 text-center flex flex-col items-center justify-center space-y-4">
              <TbShoppingBag size={50} />
              <p className="text-center text-black capitalize text-20 font-semibold">{emptyMessage}</p>
              <div className="flex justify-center mt-2">
                <Link href="/collections" onClick={closePanel} className="bg-primary text-white px-4 py-2">Continue Shopping</Link>
              </div>
            </div>
          }
        </div>
      )}
    </div>
  );
};

export default DropdownPanel;