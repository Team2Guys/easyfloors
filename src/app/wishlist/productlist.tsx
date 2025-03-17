"use client";

import React, { useState } from "react";
import ProductCard from "./productcard";

interface Product {
  id: number;
  name: string;
  price: number;
  image: string;
  stockStatus: string;
}

const initialProducts: Product[] = [
  { id: 1, name: "Richmond Comfort LVT - Forest", price: 100, image: "/assets/images/wishlist/img.png", stockStatus: "Instock" },
  { id: 2, name: "Richmond Comfort LVT - American Walnut", price: 100, image: "/assets/images/wishlist/img.png", stockStatus: "Instock" },
  { id: 3, name: "Richmond Comfort LVT - Mahogany", price: 100, image: "/assets/images/wishlist/img.png", stockStatus: "Instock" },
  { id: 4, name: "Polar Herringbone SPC - Antique", price: 100, image: "/assets/images/wishlist/img.png", stockStatus: "Instock" },
  { id: 5, name: "Polar Herringbone SPC - Weathered Oak", price: 100, image: "/assets/images/wishlist/img.png", stockStatus: "Instock" },
];

const ProductList: React.FC = () => {
  const [products, setProducts] = useState<Product[]>(initialProducts);

  const removeProduct = (id: number) => {
    setProducts(products.filter(product => product.id !== id));
  };

  return (
    <div className="p-4">
    {/* Column Headings */}
    <div className="hidden md:grid md:grid-cols-[2fr_1fr_1fr_1fr_2fr] gap-4 md:gap-6 lg:gap-10 p-3 font-semibold font-inter text-xs xl:text-lg text-black border-b border-gray-300">
      <div className="text-left xl:text-24">Product</div>
      <div className="text-start xl:text-24">Price Per Box</div>
      <div className="text-center xl:text-start xl:text-24">QTY (m/m²)</div>
      <div className="text-center xl:text-start xl:text-24">Stock Status</div>
      <div className="text-center xl:text-24">Action</div>
    </div>

    {/* Product List */}
    <div className="space-y-4">
      {products.map(product => (
        <ProductCard key={product.id} product={product} onRemove={removeProduct} />
      ))}
    </div>
  </div>
);
};

export default ProductList;