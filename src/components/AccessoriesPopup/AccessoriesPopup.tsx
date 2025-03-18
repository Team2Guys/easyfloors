"use client";

import { features } from "data/data";
import Image from "next/image";
import { FC, useState } from "react";
import { AiOutlineClose } from "react-icons/ai";
import { AccessoriesPopupProps } from "types/types";

const AccessoriesPopup: FC<AccessoriesPopupProps> = ({ isOpen, onClose, products }) => {
  const [selectedProducts, setSelectedProducts] = useState<string[]>([]);
  const [unit, setUnit] = useState<{ [key: string]: "m" | "ft" }>({});
  const [areas, setAreas] = useState<{ [key: string]: string }>({});

  if (!isOpen) return null;

  const toggleSelect = (id: string | number) => {
    const idStr = String(id);
    setSelectedProducts((prev) =>
      prev.includes(idStr) ? prev.filter((productId) => productId !== idStr) : [...prev, idStr]
    );
  };
  
  const handleAreaChange = (id: string | number, value: string) => {
    const idStr = String(id);
    setAreas((prev) => ({
      ...prev,
      [idStr]: value,
    }));
  };
  
  const handleUnitChange = (id: string | number, value: "m" | "ft") => {
    const idStr = String(id);
    setUnit((prev) => ({
      ...prev,
      [idStr]: value,
    }));
  };
  const handleClickOutside = (e: React.MouseEvent<HTMLDivElement>) => {
    if ((e.target as HTMLElement).id === "popup-overlay") {
      onClose();
    }
  };

  return (
    <div id="popup-overlay" className="fixed -inset-3 set-0 mt-0 flex items-center justify-center bg-white/50 z-50 p-4" onClick={handleClickOutside}>
      <div className="bg-white p-6 rounded-lg shadow-xl w-full max-w-7xl overflow-y-auto max-h-[90vh] thin-scrollbar relative">
        <button className="absolute top-3 right-3 text-gray-600 hover:text-gray-900" onClick={onClose}>
          <AiOutlineClose size={20} />
        </button>
        <h2 className="text-xl font-semibold mb-4 text-left">Accessories</h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 overflow-y-auto thin-scrollbar">
          {products.map((product) => (
            <div
              key={product.id}
              className={` p-2 cursor-pointer ${
                selectedProducts.includes(String(product.id)) ? "border border-orange-500" : "border-gray-300"
              }`}
              onClick={() => toggleSelect(product.id)}
            >
              <div className="relative">
                <input
                  type="checkbox"
                  checked={selectedProducts.includes(String(product.id))}
                  onChange={() => toggleSelect(product.id)}
                  className="w-5 h-5 absolute top-3 left-3 accent-gray-500 "
                />
                
                <Image
                  width={1000}
                  height={1000}
                  src={product.posterImageUrl.imageUrl}
                  alt={product.name}
                  className="w-full h-60 object-cover border border-black"
                />
                <div className="flex justify-evenly border-b pb-2 gap-4 mt-3">
                  {features.map((feature, index) => (
                    <div key={index} className="flex items-center gap-1">
                      <Image
                        src={feature.icon}
                        alt="Icon"
                        width={feature.width}
                        height={feature.height}
                      />
                      <span className="text-sm text-gray-800">{feature.label}</span>
                    </div>
                  ))}
                </div>
              </div>
              <div className="p-2">
                <h3 className="text-md font-medium mt-1">{product.name}</h3>
                <p className="text-gray-700">Price Per m: AED {product.price}</p>
                <p className="text-lg text-gray-800 font-medium">You Require</p>

                <div className="flex gap-4 items-center my-2">
                  {["m", "ft"].map((unitType) => (
                    <label key={unitType} className="flex items-center space-x-2 cursor-pointer">
                      <input
                        type="radio"
                        value={unitType}
                        checked={unit[product.id] === unitType}
                        onChange={() => handleUnitChange(product.id, unitType as "m" | "ft")}
                        className="hidden"
                      />
                      <span
                        className={`w-4 h-4 rounded-full border-2 flex items-center justify-center ${
                          unit[product.id] === unitType ? "border-orange-500" : "border-gray-400"
                        }`}
                      >
                        {unit[product.id] === unitType && <span className="w-2 h-2 bg-orange-500 rounded-full"></span>}
                      </span>
                      <span className="text-md">{unitType === "m" ? "m" : "ft"}</span>
                    </label>
                  ))}
                </div>

                <input
                  type="number"
                  placeholder={`Enter Area (${unit[product.id] || "m"})`}
                  value={areas[product.id] || ""}
                  onChange={(e) => handleAreaChange(product.id, e.target.value)}
                  className=" p-2 border border-[#9E9E9E] focus:outline-none focus:ring-2 focus:ring-orange-500 w-[120px] sm:w-[182px] h-[41px] sm:h-[60px] bg-[#D9D9D929] shadow-xl placeholder:text-black"
                />
              </div>
            </div>
          ))}
        </div>

        <button
          className="mt-4 w-fit px-10 mx-auto py-3 bg-black text-white font-semibold flex items-center justify-center gap-2"
        >
          <Image src="/assets/images/icon/cart.png" alt="cart" width={28} height={28} />
          Add to Cart
        </button>
      </div>
    </div>
  );
};

export default AccessoriesPopup;