"use client";
import Link from "next/link";
import { FaArrowLeftLong } from "react-icons/fa6";
import {  handleAddToCart, handleRemoveItem, updateQuantity } from "utils/cartutils";
import Container from "./common/container/Container";
import ItemCard from "./itemcard";
import { ProductTableProps } from "types/type";


const SmallScreen = ({isSamplePage = false, items,setItems }:ProductTableProps) => {
  const accessoryItems = (items ?? []).filter((item) => item.category === "Accessories");
  const productItems = (items ?? []).filter((item) => item.category !== "Accessories");

  return (
    <Container>
      <div>
        {items?.length === 0 ? (
          <div className="text-center mt-5 mb-10">
            <h3 className="text-2xl font-bold">
              {isSamplePage ? "Free Sample is Empty" : "Wishlist is Empty"}
            </h3>
            <Link
              href="/"
              className="text-center text-[18px] bg-primary p-2 flex w-fit mx-auto items-center text-white gap-2 mt-4"
            >
              <FaArrowLeftLong /> Go Back to Shop
            </Link>
          </div>
        ) : (
          <div>
            {/* Product Section */}
            {productItems.length > 0 && (
              <div className={`space-y-6 ${!isSamplePage ? "max-h-[950px] overflow-y-auto" : ""}`}>
                {productItems.slice(0, isSamplePage ? 5 : productItems.length).map((product, index) => (
                  <div key={product.id}>
                     {index === 0 && (
                    <p className="font-inter font-semibold text-12">Product</p>
                  )}
                    <ItemCard
                      product={product}
                      isSamplePage={isSamplePage}
                      onRemove={(id) => setItems && handleRemoveItem(Number(id), isSamplePage, setItems)}
                      onQuantityChange={(id, delta) => setItems && setItems((prevItems) => updateQuantity(Number(id), delta, prevItems))}
                      onAddToCart={(product) => setItems && handleAddToCart(product, isSamplePage, setItems)}
                    />
                  </div>
                ))}
              </div>
            )}

            {/* Accessories Section */}
            {accessoryItems.length > 0 && (
              <div className={`space-y-6 ${!isSamplePage ? "max-h-[950px] overflow-y-auto" : ""}`}>
              {accessoryItems.slice(0, isSamplePage ? 5 : accessoryItems.length).map((product, index) => (
                <div key={product.id}>
                  {index === 0 && (
                    <p className="font-inter font-semibold text-12 mt-7">Accessories</p>
                  )}
                  <ItemCard
                    product={product}
                    isSamplePage={isSamplePage}
                    onRemove={(id) => setItems && handleRemoveItem(Number(id), isSamplePage, setItems)}
                    onQuantityChange={(id, delta) =>
                      setItems?.((prevItems) => updateQuantity(Number(id), delta, prevItems))
                    }
                    
                    onAddToCart={(product) => setItems && handleAddToCart(product, isSamplePage, setItems)}
                  />
                </div>
              ))}
              </div>
            )}
          </div>
        )}
      </div>
      <Link href="/collections" className='bg-black text-white px-4 py-2 gap-2  justify-center items-center w-fit mt-5 flex md:hidden my-10'><FaArrowLeftLong /> Continue shopping</Link>
    </Container>
  );
};

export default SmallScreen;
