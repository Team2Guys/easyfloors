"use client"
import dynamic from "next/dynamic";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import { ICart } from "types/prod";
import { fetchItems } from "utils/cartutils";

// Dynamic Imports
const ProductTable = dynamic(() => import("components/product-table"));
const WishlistSmall = dynamic(() => import("components/smallscreen"));
const Container = dynamic(() => import("components/common/container/Container"));
const Breadcrumb = dynamic(() => import("components/Reusable/breadcrumb"));
const Top = dynamic(() => import("components/top"));
const FreeSample = () => {
  const [items, setItems] = useState<ICart[]>([]);
  
    useEffect(() => {
      fetchItems(false, setItems); // Assuming 'false' is the appropriate value for the first argument
    }, []);
  return (
    <>
      <Breadcrumb title="freesample" />
      <Container>
      <Top heading="Free Samples" Icon={() => <Image src="/assets/images/Wishlist/sample.svg" alt="Sample" width={24} height={24} className="h-10 w-10 lg:h-14 lg:w-14" />} />
      <div className=" hidden md:block pb-6 xl:pt-6 xl:mb-10">
      <ProductTable columns={["Product", "Price Per Piece", "Stock Status", "Action"]} items={items} setItems={setItems} isSamplePage/>
      </div>
      <div className="block md:hidden">
      <WishlistSmall />
      </div>
      </Container>
    </>
  )
}

export default FreeSample