"use client";
import Link from "next/link";
import { useEffect, useState } from "react";
import { FaArrowLeftLong } from "react-icons/fa6";
import { ICart } from "types/prod";
import { usePathname } from "next/navigation";
import { fetchItems, handleAddToCart, handleRemoveItem, updateQuantity } from "utils/cartutils";
import Container from "./common/container/Container";
import ItemCard from "./itemcard";


const SmallScreen: React.FC = () => {
  const pathname = usePathname();
  const isSamplePage = pathname === "/freesample";
  const [items, setItems] = useState<ICart[]>([]);

  useEffect(() => {
    fetchItems(isSamplePage, setItems);
  }, [isSamplePage]);

  const accessoryItems = items.filter((item) => item.category === "Accessories");
  const productItems = items.filter((item) => item.category !== "Accessories");

  return (
    <Container>
      <div>
        {items.length === 0 ? (
          <div className="text-center mt-5 mb-10">
            <h1 className="text-2xl font-bold">
              {isSamplePage ? "Free Sample is Empty" : "Wishlist is Empty"}
            </h1>
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
                      onRemove={(id) => handleRemoveItem(Number(id), isSamplePage, setItems)}
                      onQuantityChange={(id, delta) => updateQuantity(Number(id), delta, setItems)}
                      onAddToCart={(product) => handleAddToCart(product, isSamplePage, setItems)}
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
          onRemove={(id) => handleRemoveItem(Number(id), isSamplePage, setItems)}
          onQuantityChange={(id, delta) => updateQuantity(Number(id), delta, setItems)}
          onAddToCart={(product) => handleAddToCart(product, isSamplePage, setItems)}
        />
      </div>
    ))}
              </div>
            )}
          </div>
        )}
      </div>
    </Container>
  );
};

export default SmallScreen;
