"use client";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { FiMinus } from "react-icons/fi";
import { GoPlus } from "react-icons/go";
import Link from "next/link";
import { FaArrowLeftLong, FaArrowRightLong } from "react-icons/fa6";
import { handleAddToCart, handleRemoveItem, updateQuantity } from "utils/cartutils";
import { ProductTableProps } from "types/type";
import { generateSlug } from "data/data";

const ProductTable: React.FC<ProductTableProps> = ({ columns, isSamplePage = false, items = [], setItems }) => {
  const pathname = usePathname();

  return (
    <div className={`overflow-x-auto px-4 ${!isSamplePage ? "max-h-[950px] overflow-y-auto" : ""}`}>
      {items.length === 0 && pathname === "/freesample" ? (
        <div className="text-center">
          <p className="text-center text-[24px] ">
            {isSamplePage ? "Free Sample list is empty" : "Wishlist is empty"}
          </p>
          <Link href="/" className="text-center text-[18px] bg-primary p-2 flex w-fit mx-auto items-center text-white gap-2 mt-4">
            <FaArrowLeftLong /> Go Back to Shop
          </Link>
        </div>
      ) : (
        <table className="min-w-full border-b border-gray-300 bg-white">
          <thead>
            <tr className="text-12 font-semibold font-inter text-left border-b">
              {(columns ?? [])
                .filter((col) => (pathname === "/freesample" ? col !== "QTY (m/m²)" : true))
                .map((col, index) => (
                  <th key={index} className={`${isSamplePage  ? "xl:text-20 2xl:text-24 p-3 xl:p-2 text-left whitespace-nowrap " : "md:text-12 md:text-nowrap lg:text-14 xl:text-18 2xl:text-24 p-3 md:p-2 lg:p-3 2xl:p-4 justify-start text-left "} ${index==0 ? " w-[70%] lg:w-[60%] 2xl:w-[35%] 3xl:w-[35%]" : "w-[20%] lg:w-[20%] 2xl:w-[22%] 3xl:w-[25%]"} ${index==3 ? "text-center" : ""} ${index==4 ? "text-center" : ""} ${pathname === "/freesample" && col =='Stock Status' ? "text-center" : ""}`}>
                    {col}
                  </th>
                ))}
            </tr>
          </thead>
          <tbody>
            {items.map((product) => {
   
              return (
                <tr key={product.id} className="border-t w-full">
                  <td className="p-3 flex items-center justify-start gap-3">
                    <Image height={64} width={64} src={product.image || "/assets/images/default.png"} alt={product.name} className="lg:h-[100px] lg:w-[100px] 2xl:h-[151px] 2xl:w-[194px] object-cover" />
                    <div className="text-12 xl:text-20 font-inter font-normal w-10/12" >
                      <Link href={`${product.category === "Accessories" ? `/accessories` : `/${generateSlug(product.category)}/${generateSlug(product.subcategories)}`}/${product.custom_url}`} className="font-medium">{product.name}</Link>
                      {!isSamplePage && (
                        product.category === "Accessories" ? (
                          <>
                            <p className='text-12 sm:text-16'>Price Per m: <span className="font-semibold"><span className="font-currency font-normal text-18"></span> {product.price}</span></p>
                            <p className='text-12 sm:text-16'>Total Required QTY: <span className="font-semibold">{product.requiredBoxes}m</span></p>
                          </>
                        ) : (
                          <>
                            <p className='text-12 sm:text-16'>Price Per Box: {pathname === "/freesample" ? "Free" : product.pricePerBox.toFixed(2)}</p>
                            <p className='text-12 sm:text-16'>
                              No. Of Boxes: <span className='font-bold'>{product.requiredBoxes}</span> ({product.squareMeter.toFixed(2)} {product.unit === "sqft" ? "ft²" : "SQM"})
                            </p>
                          </>
                        )
                      )}
                    </div>
                  </td>
                  
                  {pathname !== "/freesample" && (
                  <td className="p-3">
                        <div className="flex flex-col">
                          <div className="flex justify-center items-center text-12 xl:text-20 bg-gray-200 px-3 py-2 w-fit">
                            <button 
                              onClick={() => setItems?.((prevItems) => updateQuantity(Number(product.id), -1, prevItems))} 
                              className="px-2 text-gray-700"
                            >
                              <FiMinus />
                            </button>
                            <span className="px-2 text-black font-semibold">
                              {product.category === "Accessories" 
                                ? product.requiredBoxes 
                                : (product.squareMeter === 0 ? '0.00' : product.squareMeter)}
                            </span>
                            <button
                              onClick={() => setItems?.((prevItems) => updateQuantity(Number(product.id), 1, prevItems))} 
                              className="px-2 text-gray-700"
                            >
                              <GoPlus />
                            </button>
                          </div>
                        </div>
                  </td>
                  )}

                  <td className="p-3 font-inter text-12 xl:text-20 font-normal">
                    {pathname === "/freesample" ? "Free" :  product.totalPrice.toFixed(2)}
                  </td>
                  <td className="p-3 text-center font-inter text-12 xl:text-20 font-normal">
                    {product.stock > 0 ? "In Stock" : "Out of Stock"}
                  </td>
                  <td className="p-3">
                    <div className="flex gap-4 lg:gap-6 xl:gap-10 items-center justify-center">
                      {!isSamplePage && 
                      <button 
                        id="AddToCart" 
                        onClick={() => handleAddToCart(product, setItems ?? (() => {}))} 
                        className="bg-black text-white text-10 xl:text-20 2xl:text-24 flex gap-2 items-center whitespace-nowrap px-4 py-2"
                      >
                        Add to Cart
                      </button>}
                      <button 
                        onClick={() => handleRemoveItem(Number(product.id), setItems ?? (() => {}), isSamplePage)} 
                        className="h-5 w-5 lg:h-7 lg:w-7 xl:h-10 xl:w-10"
                      >
                        <Image src="/assets/images/Wishlist/close.svg" alt="Remove" height={1000} width={1000} />
                      </button>
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      )}
      <div className={`flex items-center ${isSamplePage ? 'justify-between' : 'justify-start'}`}>
      <Link href="/collections" className='bg-black text-white px-4 py-2 gap-2 justify-center items-center w-fit mt-5 hidden md:flex'>
        <FaArrowLeftLong /> Continue shopping
      </Link>
      {isSamplePage && 
      <Link href="/freesample-checkout" className='bg-black text-white px-4 py-2 gap-2 justify-center items-center w-fit mt-5 hidden md:flex'>
        Checkout <FaArrowRightLong />
      </Link>}
      </div>
    </div>
  );
};

export default ProductTable;