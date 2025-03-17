"use client";

import { FC, useState } from "react";
import { AiOutlineClose } from "react-icons/ai";
import { AccessoriesPopupProps } from "types/types";

const AccessoriesPopup: FC<AccessoriesPopupProps> = ({ isOpen, onClose, products }) => {
  const [selectedProducts, setSelectedProducts] = useState<string[]>([]);

  if (!isOpen) return null;

  const toggleSelect = (id: string) => {
    setSelectedProducts((prev) =>
      prev.includes(id) ? prev.filter((productId) => productId !== id) : [...prev, id]
    );
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/50 z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-[90%] max-w-2xl relative">
        {/* Close Button */}
        <button className="absolute top-3 right-3 text-gray-600 hover:text-gray-900" onClick={onClose}>
          <AiOutlineClose size={20} />
        </button>

        {/* Popup Content */}
        <h2 className="text-xl font-semibold mb-4">Select Accessories</h2>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-h-96 overflow-y-auto thin-scrollbar">
          {products.map((product) => (
            <div
              key={product.id}
              className={`border p-4 rounded-lg cursor-pointer ${
                selectedProducts.includes(product.id) ? "border-orange-500" : "border-gray-300"
              }`}
              onClick={() => toggleSelect(product.id)}
            >
              <div className="flex items-center gap-3">
                <input
                  type="checkbox"
                  checked={selectedProducts.includes(product.id)}
                  onChange={() => toggleSelect(product.id)}
                  className="w-5 h-5 accent-orange-500"
                />
                <img src={product.image} alt={product.name} className="w-16 h-16 object-cover rounded-md" />
              </div>
              <p className="text-sm mt-2 text-gray-700">{product.features}</p>
              <h3 className="text-md font-medium mt-1">{product.name}</h3>
              <p className="text-orange-500 font-semibold">AED {product.price}</p>
              <p className="text-sm text-gray-500">You Require: {product.meters}m / {product.feet}ft</p>
              <input
                type="number"
                placeholder="Enter Area (m²)"
                className="w-full mt-2 p-2 border border-gray-300 rounded-md focus:ring-orange-500 focus:border-orange-500"
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AccessoriesPopup;
