"use client";

import { features } from "data/data";
import { handleAddToStorage } from "lib/carthelper";
import Image from "next/image";
import { useState } from "react";
import { AiOutlineClose } from "react-icons/ai";
import { AccessoriesPopupProps } from "types/types";

const AccessoriesPopup = ({ isOpen, onClose, products }: AccessoriesPopupProps) => {
  const [selectedProducts, setSelectedProducts] = useState<string[]>([]);
  const [areas, setAreas] = useState<{ [key: string]: string }>({});
  const [requiredBoxes, setRequiredBoxes] = useState<{ [key: string]: number }>({});
  const [totalPrice, setTotalPrice] = useState<{ [key: string]: number }>({});
  if (!isOpen) return null;

  const boxCoverage = 1; // Coverage in square meters

  const toggleSelect = (id: string | number) => {
    const idStr = String(id);
    setSelectedProducts((prev) =>
      prev.includes(idStr) ? prev.filter((productId) => productId !== idStr) : [...prev, idStr]
    );
  };

  const recalculateBoxesAndPrice = (idStr: string, value: string) => {
    const areaValue = parseFloat(value);
    if (!isNaN(areaValue)) {
      const product = products.find((p) => String(p.id) === idStr);
      if (!product) return;

      const pieces = Math.ceil(areaValue / boxCoverage);
      const total = areaValue * product.price;
  
      setRequiredBoxes((prev) => ({
        ...prev,
        [idStr]: pieces,
      }));
  
      setTotalPrice((prev) => ({
        ...prev,
        [idStr]: parseFloat(total.toFixed(2)),
      }));
    } else {
      setRequiredBoxes((prev) => ({ ...prev, [idStr]: 0 }));
      setTotalPrice((prev) => ({ ...prev, [idStr]: 0 }));
    }
  };
  
  const handleAreaChange = (id: string | number, value: string) => {
    const idStr = String(id);
    setAreas((prev) => ({
      ...prev,
      [idStr]: value,
    }));
  
    if (value.trim() !== "" && !selectedProducts.includes(idStr)) {
      setSelectedProducts((prev) => [...prev, idStr]);
    } else if (value.trim() === "") {
      setSelectedProducts((prev) => prev.filter((productId) => productId !== idStr));
    }
  
    recalculateBoxesAndPrice(idStr, value);
  };

  const handleClickOutside = (e: React.MouseEvent<HTMLDivElement>) => {
    if ((e.target as HTMLElement).id === "popup-overlay") {
      onClose();
    }
  };

  const resetForm = () => {
    setSelectedProducts([]);
    setAreas({});
    setRequiredBoxes({});
    setTotalPrice({});
  };

  const handleAddSelectedToCart = () => {
    selectedProducts.forEach((productId) => {
      const product = products.find((p) => String(p.id) === productId);
      if (product) {
        const squareMeter = boxCoverage * (requiredBoxes[productId] || 1);
  
        handleAddToStorage(
          product,
          totalPrice[productId] || 0,
          product.price,
          squareMeter,
          requiredBoxes[productId] || 1,
          "m",
          product.category?.name ?? product?.__typename,
          "cart",
          product.posterImageUrl.imageUrl ?? "",
          String(boxCoverage),
          "m",
          product.selectedColor
        );
      }
    });
    resetForm();
    onClose();
  };

  return (
    <div id="popup-overlay" className="fixed -inset-3 set-0 mt-0 flex items-center justify-center bg-white/50 z-50 p-4" onClick={handleClickOutside}>
      <div className="bg-white p-6 rounded-lg shadow-xl w-full max-w-5xl relative pb-20">
        <button className="absolute top-3 right-3 text-gray-600 hover:text-gray-900" onClick={onClose}>
          <AiOutlineClose size={20} />
        </button>
        <h2 className="text-xl font-semibold mb-4 text-left">Accessories</h2>
        {products.length === 0 ? (
          <p className="text-center text-gray-700">No accessory available.</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 overflow-y-auto max-h-[50vh] 2xl:max-h-[65vh] thin-scrollbar">
            {products.map((product) => (
              <div key={product.id} className={`p-2 ${selectedProducts.includes(String(product.id)) ? "" : "border-gray-300"}`}>
                <div className="relative">
                  <input
                    type="checkbox"
                    checked={selectedProducts.includes(String(product.id))}
                    onChange={() => toggleSelect(product.id)}
                    className={`w-5 h-5 absolute top-3 left-3 accent-white ${Number(product.stock) > 0 ? "cursor-pointer" : "cursor-not-allowed"}`}
                    disabled={Number(product.stock) <= 0}
                  />
                  <Image width={1000} height={1000} src={product.posterImageUrl.imageUrl} alt={product.name} className="w-full h-48 object-cover border border-black" />
                  <div className="flex justify-evenly border-b pb-2 gap-4 mt-3">
                    {features.map((feature, index) => (
                      <div key={index} className="flex items-center gap-1">
                        <Image src={feature.icon} alt="Icon" width={feature.width} height={feature.height} />
                        <span className="text-sm text-gray-800">{feature.label}</span>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="py-2">
                  <h3 className="text-lg font-bold mt-1 text-gray-700">{product.name}</h3>
                  <p className="text-gray-700 font-medium">
                    Price Per m: AED {product.price}
                  </p>

                  <p className="text-base text-gray-800 font-medium mb-2">You Require:</p>
                  <input
                    type="number"
                    placeholder="Enter Area (m)"
                    value={areas[product.id] || ""}
                    onChange={(e) => handleAreaChange(product.id, e.target.value)}
                    min="0"
                    className="p-2 border border-[#9E9E9E] focus:outline-none focus:ring-1 focus:ring-[#9E9E9E] w-[120px] sm:w-[182px] h-[41px] sm:h-[60px] bg-[#D9D9D929] shadow-xl placeholder:text-black"
                  />
                </div>
              </div>
            ))}
          </div>
        )}
        <div>
        <button
          className={`mt-2 w-fit sm:px-10 px-5 mx-auto py-3 font-semibold flex items-center justify-center gap-2 fixed left-1/2 -translate-x-1/2 ${selectedProducts.length > 0 ? "bg-black text-white cursor-pointer" : "bg-black text-white cursor-not-allowed"}`}
          onClick={handleAddSelectedToCart}
          disabled={selectedProducts.length === 0}
        >
          <Image src="/assets/images/icon/cart.png" alt="cart" width={28} height={28} />
          Add to Cart
        </button>
        </div>
      </div>
    </div>
  );
};

export default AccessoriesPopup;