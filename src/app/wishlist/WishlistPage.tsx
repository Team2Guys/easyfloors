"use client";
import dynamic from 'next/dynamic';
import React, { useEffect, useState } from 'react';
import { CiHeart } from 'react-icons/ci';
import { ICart } from 'types/prod';
import { fetchItems } from 'utils/cartutils';
import Link from 'next/link';
import { FaArrowLeftLong } from 'react-icons/fa6';

// Dynamic Imports
const ProductTable = dynamic(() => import("components/product-table"));
const WishlistSmall = dynamic(() => import("components/smallscreen"));
const Container = dynamic(() => import("components/common/container/Container"));
const Breadcrumb = dynamic(() => import("components/Reusable/breadcrumb"));
const Top = dynamic(() => import("components/top"));

const WishlistPage = () => {
  const [items, setItems] = useState<ICart[]>([]);

  useEffect(() => {
    fetchItems(false, setItems); 
  }, []);

  const products = items.filter((item) => item.category !== "Accessories");
  const accessories = items.filter(
    (item) => item.category === "Accessories" || item.category === "Accessory"
  );

  if (items.length === 0) {
    return (
      <Container>
        <Breadcrumb title="Wishlist" />
        <Top heading="Wishlist" Icon={CiHeart} />
        <div className="text-center my-7">
          <h2 className="text-center xl:text-[48px]">Your Shopping Cart</h2>
          <p className="text-center text-[24px] pt-10">Wishlist is empty</p>
          <Link
            href="/"
            className="text-center text-[18px] bg-primary p-2 flex w-fit mx-auto items-center text-white gap-2 mt-4"
          >
            <FaArrowLeftLong /> Go Back to Shop
          </Link>
        </div>
      </Container>
    );
  }
  
  return (
    <>
      <Breadcrumb title="Wishlist" />
      <Container>
        <Top heading="Wishlist" Icon={CiHeart} />
        {products.length > 0 && (
        <div className="hidden md:block pb-6 xl:pt-6 xl:mb-10">
          <ProductTable
            columns={["Product","Price Per Box","QTY(m/m2)","Availability", "Action"]}
            items={products} 
            setItems={setItems} 
          />
        </div>
         )}

        {accessories.length > 0 && (
        <div className="hidden md:block pb-6 xl:pt-6 xl:mb-10 ">
          <ProductTable
            columns={["Accessories","Price Per m","QTY m", "Availability", "Action"]}
            items={accessories} 
            setItems={setItems} 
          />
        </div>
        )}
        <div className="block md:hidden mb-5">
          <WishlistSmall items={items} setItems={setItems} />
        </div>
      </Container>
    </>
  );
};

export default WishlistPage;
