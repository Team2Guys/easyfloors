
import React from "react";
import ProductCard from "./productcard";


const ProductList = () => {

  return (
    <div className="pb-8">
      {/* Column Headings */}
      <div className="hidden md:grid md:grid-cols-[2fr_1fr_1fr_1fr_2fr] lg:grid-cols-[2fr_1fr_1fr_1fr_1fr] 2xl:grid-cols-[3fr_1fr_1fr_1fr_2fr] gap-4 md:gap-6 xl:gap-10 p-3 font-semibold font-inter text-xs xl:text-lg text-black border-b border-gray-300">
        <div className="text-left xl:text-24">Product</div>
        <div className="text-start lg:text-center xl:text-start xl:text-24">Price Per Box</div>
        <div className="text-center xl:text-center 2xl:text-start xl:text-24">QTY (m/m²)</div>
        <div className="text-center lg:text-start xl:text-24">Stock Status</div>
        <div className="text-center xl:text-24">Action</div>
      </div>

      {/* Product List */}
      <div className="space-y-4">
        <ProductCard />
      </div>
    </div>
  );
};

export default ProductList;