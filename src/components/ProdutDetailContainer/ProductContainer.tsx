"use client";
import React, { useState } from "react";
import dynamic from "next/dynamic";
import Container from "components/common/container/Container";
import PaymentMethod from "components/product-detail/payment";
const Thumbnail = dynamic(()=> import("components/product-detail/thumbnail"),{ssr: false});
const AreaCalculator = dynamic(()=> import("components/product-detail/AreaCalculator"),{ssr: false});
import Image from "next/image";
import { LuHeart } from "react-icons/lu";
import { calculateProductDetails, handleAddToStorage } from "lib/carthelper";
import { detailprops } from "types/product-detail";
import { paymentcard } from "data/cart";
import { formatAED } from "lib/helperFunctions";
const ProductContainer = ({ MainCategory, subCategory, productData, className, isQuickView }: detailprops) => {
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
  const filteredProducts = (productData?.acessories ?? []).map((product) => {
    const selectedColor = product.featureImages?.find((img) => img.color === productData.productImages?.[0]?.colorCode || ""
    );
    const matchedProductImages = product.productImages?.filter((img) => img.colorCode === productData.productImages?.[0]?.colorCode || ""
    );

    return {
      ...product,
      selectedColor,
      matchedProductImages,
    };
  });
  const selectedColor = productData?.featureImages?.find(
    (img) => img.color === productData?.productImages?.[0]?.colorCode
  );

  const matchedProductImages = productData.productImages?.find((img) => img.colorCode === productData.productImages?.[0]?.colorCode || "");
  return (
    <Container className={`flex flex-wrap lg:flex-nowrap gap-5 w-full mt-10 border-b pb-5 ${isQuickView ? '2xl:gap-10' : '2xl:gap-20'}  ${className}`}>
      <div className={`w-full ${!isQuickView && '2xl:w-[60%]'} lg:w-[55%]`}>
        {productData?.productImages && (
          <Thumbnail
            ThumnailImage={productData.productImages}
            ThumnailBottom={productData.featureImages}
          // onImageChange={setActiveImage}
          />
        )}
      </div>
      <div className={`w-full ${!isQuickView && '2xl:w-[40%]'} lg:w-[45%] mb-2 space-y-3 xl:space-y-4`}>
        {productData?.name && (
          <h1 className="text-18 sm:text-25 2xl:text-[33px] font-inter font-semibold">{productData.name}</h1>
        )}{productData.colors?.[0] && (
          <p className="text-14 sm:text-lg font-semibold">
            Colour Code: <span className="font-normal">{productData.colors[0].detail}</span>
          </p>
        )}

        <div className="border-[#D9D9D9] border-b" />
        <div className="flex text-16 sm:text-18 text-primary 2xl:text-23 font-semibold gap-1 items-center sm:gap-1">
          <p className="text-black">Price :</p>
          <p>
            <span className="font-currency font-normal text-18 sm:text-20 2xl:text-26"> </span>
            {unit === "sqm"
              ? productData?.price
              : (productData?.price / 10.764).toFixed(2)}
            <span>
              {unit === "sqm" ? "/m²" : "/ft²"}
            </span>
          </p>
        </div>
        <div className="flex text-19 gap-1 items-center">
          <p className="text-12 xs:text-14 2xl:text-23 sm:text-18">
          Stock:{" "}
           <span className={`font-bold ${ productData?.stock && productData?.stock > 0 ? "text-[#008000]" : "text-red-500"}`}>
            {productData?.stock && productData?.stock > 0 ? "In Stock" : "Out of Stock"}
           </span>
          </p>
          <div className="bg-black h-5 w-[2px]" />
          <p className="text-12 xs:text-14 2xl:text-20 font-bold sm:text-18">
            Box Coverage:{" "}
            <span className="font-normal">
              {unit === "sqm"
                ? `${(parseFloat(boxCoverage ?? "0") || 0).toFixed(2)} m²`
                : `${(parseFloat(boxCoverage ?? "0") * 10.764).toFixed(2)} ft²`}
            </span>
          </p>
          <div className="bg-black h-5 w-[2px]" />
          <p className="text-14 sm:text-lg font-semibold">
            Box: <span className="font-normal">1</span>
          </p>
        </div>
        <div className="border-[#501E1E] border-b" />
        <AreaCalculator
          area={area}
          unit={unit}
          setArea={setArea}
          setUnit={setUnit}
          requiredBoxes={requiredBoxes}
          convertedArea={convertedArea}
          pricePerBox={pricePerBox}
          squareMeter={squareMeter}
          accessories={filteredProducts}
        />
        <div className="border-[#D9D9D9] border-b" />
        <div className="flex gap-5 items-center">
          <p className="text-16 2xl:text-33 font-black lg:text-28 sm:text-20">
            Total : <span className="font-currency font-normal text-18 2xl:text-37 lg:text-30 sm:text-20"></span> <span>{formatAED(totalPrice)}</span>
          </p>
        </div>
        <div className="grid grid-cols-2 w-full gap-1 items-center sm:gap-3">

          <button
            id="AddToCart"
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
                productData?.productImages?.[0]?.imageUrl,
                // image?.imageUrl ?? "",
                boxCoverage,
                unit,
                selectedColor
              )
            }
            className="flex bg-black justify-center text-11 xs:text-12 text-white  2xl:text-22 font-inter gap-2 items-center max-sm:h-[40px] px-2 py-2 sm:py-3 sm:text-16"
          >
            <Image src="/assets/images/icon/cart.png" alt="box" width={28} height={28} className="size-5 xs:size-7 text-11 xs:text-14 xl:text-20" />
            Add to Cart
          </button>
          <button
            id="AddToWishlist"
            className="flex bg-black justify-center text-11 xs:text-12 text-white 2xl:text-22 font-inter gap-2 items-center max-sm:h-[40px] px-2 py-2 sm:py-3 sm:text-16"
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
                productData?.productImages?.[0]?.imageUrl,
                // image?.imageUrl ?? "",
                boxCoverage,
                unit,
                selectedColor,
                matchedProductImages
              )
            }
          >
            <LuHeart size={25} />
            Add to Wishlist
          </button>
          <button className="flex justify-center bg-primary text-10 xs:text-12 text-white 2xl:text-18 font-inter gap-1 xs:gap-2 items-center max-sm:h-[40px] px-2 py-2 sm:py-3 md:text-14 lg:text-12" onClick={() =>
            handleAddToStorage(
              productData,
              totalPrice,
              pricePerBox,
              squareMeter,
              requiredBoxes,
              subCategory ?? "",
              MainCategory ?? "",
              "freeSample",
              productData?.productImages?.[0]?.imageUrl,
              boxCoverage,
              unit,
              selectedColor,
              matchedProductImages,
              // true
            )
          }
          >
            <Image src="/assets/images/icon/measure.png" alt="box" width={30} height={30} className="size-5 xs:size-7" />
            <p className=" whitespace-nowrap">Order <strong><em>Free</em></strong> Sample</p>
          </button>
        </div>
        <PaymentMethod installments={installments} showheading />
        <div className="mt-2 space-y-2 text-center">
          <p className="text-center text-sm xs:text-base lg:text-xs xl:text-base font-semibold">Guaranteed Safe Checkout</p>
          <div className='flex justify-between lg:justify-center items-center gap-2 lg:gap-10' >
            {
              paymentcard.map((array, index) => (
                <Image className=' w-16  md:w-14 2xl:w-[50px] h-auto shadow' key={index} width={90} height={60} src={array.image} alt='payment-card' />
              ))
            }
          </div>
        </div>
      </div>
    </Container>
  );
};
export default ProductContainer;