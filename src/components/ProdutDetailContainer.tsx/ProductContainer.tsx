"use client";
import Container from "components/common/container/Container";
import PaymentMethod from "components/product-detail/payment";
import Thumbnail from "components/product-detail/thumbnail";
import AreaCalculator from "components/product-detail/AreaCalculator";
import Image from "next/image";
import { LuHeart } from "react-icons/lu";
import { calculateProductDetails, handleAddToStorage } from "lib/carthelper";
import { detailprops } from "types/product-detail";
import React, { useState } from "react";

const ProductContainer = ({ MainCategory, subCategory, productData, className }: detailprops) => {
    // console.log( MainCategory, subCategory, productData, 'className')
  const [image, setActiveImage] = useState(productData?.productImages?.[0] || null);
  const [unit, setUnit] = useState("sqm");
  const [area, setArea] = useState("");

  const {
    convertedArea,
    requiredBoxes,
    pricePerBox,
    squareMeter,
    totalPrice,
    installments,
    boxCoverage,
  } = calculateProductDetails(area, unit, productData);

  return (
    <Container className={`flex flex-wrap lg:flex-nowrap gap-5 w-full mt-10 border-b pb-5 2xl:gap-20 ${className}`}>
      <div className="w-full 2xl:w-[60%] lg:w-[55%]">
        {productData?.productImages && (
          <Thumbnail
            ThumnailImage={productData.productImages}
            ThumnailBottom={productData.featureImages}
            onImageChange={setActiveImage}
          />
        )}
      </div>
      <div className="w-full 2xl:w-[40%] lg:w-[45%] mb-2 space-y-3 xl:space-y-4">
        {productData?.name && (
          <h1 className="text-25 2xl:text-[33px] font-inter font-semibold">{productData.name}</h1>
        )}
        <div className="border-[#D9D9D9] border-b" />
        <div className="flex text-18 text-primary 2xl:text-23 font-semibold gap-2 items-center sm:gap-4">
          <p className="text-black">Price Per Sqm :</p>
          <p>
            <span>AED</span> {productData?.price}{" "}
            <span>
              /m<sup>2</sup>
            </span>
          </p>
        </div>
        <div className="flex text-19 gap-1 items-center">
          <p className="text-14 2xl:text-23 sm:text-18">
            Stock:{" "}
            <span className="text-[#008000] font-bold">
              {productData?.stock && productData?.stock > 0 ? "In Stock" : "Out of Stock"}
            </span>
          </p>
          <div className="bg-black h-5 w-[2px]" />
          <p className="text-14 2xl:text-23 font-bold sm:text-18">
            Box Coverage:{" "}
            <span className="font-normal">
              {boxCoverage} m<sup>2</sup>
            </span>
          </p>
          <div className="bg-black h-5 w-[2px]" />
          <p className="text-14 2xl:text-23 font-bold sm:text-18">
            Box: <span className="font-normal">1</span>
          </p>
        </div>
        <div className="border-[#D9D9D9] border-b" />
        <AreaCalculator
          area={area}
          unit={unit}
          setArea={setArea}
          setUnit={setUnit}
          requiredBoxes={requiredBoxes}
          convertedArea={convertedArea}
          pricePerBox={pricePerBox}
          squareMeter={squareMeter}
          accessories={productData.acessories || []}
        />
        <div className="border-[#D9D9D9] border-b" />
        <div className="flex gap-5 items-center">
          <p className="text-16 2xl:text-33 font-black lg:text-28 sm:text-20">
            Total : <span>AED</span> <span>{totalPrice.toFixed(2)}</span>
          </p>
        </div>
        <div className="flex w-full gap-1 items-center sm:gap-3">
          <button className="flex bg-primary text-12 text-white w-7/12 2xl:text-22 font-inter gap-2 items-center max-sm:h-[40px] px-2 py-2 sm:py-3 sm:text-16">
            <Image src="/assets/images/icon/measure.png" alt="box" width={30} height={30} />
            Order Now Free Sample
          </button>
          <button
            onClick={() =>
              handleAddToStorage(
                productData,
                totalPrice,
                pricePerBox,
                squareMeter,
                requiredBoxes,
                subCategory ?? "",
                MainCategory ?? "",
                "cart",
                image?.imageUrl ?? ""
              )
            }
            className="flex bg-black justify-center text-12 text-white w-5/12 2xl:text-22 font-inter gap-2 items-center max-sm:h-[40px] px-2 py-2 sm:py-3 sm:text-16"
          >
            <Image src="/assets/images/icon/cart.png" alt="box" width={28} height={28} />
            Add to Cart
          </button>
        </div>
        <button
          className="flex text-[#475156] gap-2 items-center"
          onClick={() =>
            handleAddToStorage(
              productData,
              totalPrice,
              pricePerBox,
              squareMeter,
              requiredBoxes,
              subCategory ?? "",
              MainCategory ?? "",
              "wishlist",
              image?.imageUrl ?? ""
            )
          }
        >
          <LuHeart size={20} />
          Add to Wishlist
        </button>
        <PaymentMethod installments={installments} showheading />
      </div>
    </Container>
  );
};

export default ProductContainer;
