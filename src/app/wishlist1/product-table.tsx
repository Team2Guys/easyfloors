"use client";
import Image from "next/image";
import { useState } from "react";
import { FiMinus } from "react-icons/fi";
import { GoPlus } from "react-icons/go";
import { GrCart } from "react-icons/gr";
import Link from "next/link";
import { FaArrowLeftLong } from "react-icons/fa6";

interface Product {
  id: number;
  name: string;
  image: string;
  price: string;
  stock: number;
  quantity: number;
}

interface ProductTableProps {
  columns: string[];
  products: Product[];
  isSamplePage?: boolean; // ✅ New prop to check if it's the Sample page
}

const ProductTable: React.FC<ProductTableProps> = ({ columns, products, isSamplePage = false }) => {
  const [productList, setProductList] = useState<Product[]>(products);

  const updateQuantity = (id: number, change: number) => {
    setProductList((prev) =>
      prev.map((product) =>
        product.id === id
          ? { ...product, quantity: Math.max(1, product.quantity + change) }
          : product
      )
    );
  };

  const removeProduct = (id: number) => {
    setProductList((prev) => prev.filter((product) => product.id !== id));
  };

  return (
    <div className="overflow-x-auto px-4">
      {productList.length === 0 ? (
        <div className="text-center">
          <h1 className="text-center xl:text-[48px]">Your Shopping Cart</h1>
          <p className="text-center text-[24px] pt-10">Cart is empty</p>
          <Link href="/" className="text-center text-[18px] bg-primary p-2 flex w-fit mx-auto items-center text-white gap-2 mt-4">
            <FaArrowLeftLong /> Go Back to Shop
          </Link>
        </div>
      ) : (
        <table className="min-w-full border border-gray-300 bg-white">
          <thead>
            <tr className="text-12 xl:text-24 font-semibold font-inter text-left border-b">
              {columns
                .filter((col) => col !== "QTY (m/m²)") // ✅ Remove this column
                .map((col, index) => (
                  <th key={index} className="p-2 xl:p-6">{col}</th>
                ))}
            </tr>
          </thead>
          <tbody>
            {productList.slice(0, 5).map((product) => (
              <tr key={product.id} className="border-t">
                {/* ✅ Product Name & Image */}
                <td className="p-3 flex items-center gap-3 w-[250px] lg:w-[360px]">
                  <Image height={64} width={64} src={product.image} alt={product.name} className="w-16 h-16 object-cover" />
                  <div className="text-12 xl:text-24 font-inter font-normal items-center w-full">{product.name}</div>
                </td>

                {/* ✅ Price Column (Shows 'Free' on Sample Page) */}
                <td className="lg:p-3 xl:pl-6 font-inter text-12 xl:text-24 font-normal">
                  {isSamplePage ? "Free" : product.price}
                </td>

                {/* ✅ Stock Status */}
                <td className="lg:p-3 xl:pl-10 font-400 font-inter text-12 xl:text-24">
                  {product.stock > 0 ? "In Stock" : "Out of Stock"}
                </td>

                {/* ✅ Action Buttons */}
                <td className="p-3">
                  <div className="flex gap-4 lg:gap-6 xl:gap-10 items-center">
                    <button className="bg-black text-white text-12 xl:text-24 flex gap-2 items-center whitespace-nowrap px-4 py-2">
                      <GrCart /> Add to Cart
                    </button>
                    <button onClick={() => removeProduct(product.id)} className="h-6 w-6 lg:h-7 lg:w-7 xl:h-10 xl:w-10">
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
