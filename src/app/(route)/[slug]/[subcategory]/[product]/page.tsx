"use client";
import Breadcrumb from "components/Reusable/breadcrumb";
import React from "react";
import { useParams } from "next/navigation";
import Container from "components/common/container/Container";
import AdditionalInfo from "components/product-detail/additional-information";
import FaqDetail from "components/product-detail/faq-detail";
import Features from "components/Reusable/features";
import { featureItems } from "data/data";
import RelatedSlider from "components/related-slider/related-slider";
import Thumbnail from "components/product-detail/thumbnail";
import AreaCalculator from "components/product-detail/AreaCalculator";
import Image from "next/image";
import PaymentMethod from "components/product-detail/payment";
import { LuHeart } from "react-icons/lu";
import { flooringTypes, ThumnailBottom, ThumnailImage } from "data/produuct-detail";

const Product = () => {
  const params = useParams<{
    slug: string;
    subcategory: string;
    product: string;
  }>();
  const title = params.product;
  const category = params.slug;
  const subcategory = params.subcategory;

 const relatedProducts = flooringTypes.flatMap((flooring) => flooring.product).slice(0, 5);
  return (
    <div className="mb-10">
      <Breadcrumb title={title} slug={category} subcategory={subcategory} />
      <Container className="flex flex-wrap lg:flex-nowrap gap-5 w-full mt-10 border-b pb-5 2xl:gap-20">
        <div className=" w-full  lg:w-[55%] 2xl:w-[60%]">
          <Thumbnail ThumnailImage={ThumnailImage}  ThumnailBottom={ThumnailBottom}/>
        </div>
        <div className="w-full lg:w-[45%] 2xl:w-[40%] space-y-3 xl:space-y-4 mb-2">

      <h1 className="font-inter text-25 2xl:text-[33px] font-semibold">
        Richmond Eco SPC- Oak History
      </h1>
      <div className="border-b border-[#D9D9D9]" />
      <div className="flex items-center gap-2 sm:gap-4 text-18 2xl:text-23 font-semibold text-primary">
        <p className="text-black">Price Per Sqm :</p>
        <p>
          <span>AED</span> 55{" "}
          <span>
            /m<sup>2</sup>
          </span>
        </p>
      </div>
      <div className="flex items-center gap-1 text-19">
        <p className="text-14 sm:text-18 2xl:text-23">
          Stock: <span className="text-[#008000] font-bold">In Stock</span>
        </p>
        <div className="h-5 w-[2px] bg-black" />
        <p className="text-14 sm:text-18 2xl:text-23 font-bold">
          Box Coverage:{" "}
          <span className="font-normal">
            2.9 m<sup>2</sup>
          </span>
        </p>
        <div className="h-5 w-[2px] bg-black" />
        <p className="text-14 sm:text-18 2xl:text-23 font-bold">
          Box: <span className="font-normal">2</span>
        </p>
      </div>
      <div className="border-b border-[#D9D9D9]" />
      <AreaCalculator />
      <div className="border-b border-[#D9D9D9]" />
      <div className="flex items-center gap-5">
        <p className="font-black text-16 sm:text-20 lg:text-28 2xl:text-33">Total : <span>AED</span> <span>180.23</span></p>
        <p className="font-medium text-16 2xl:text-20">(1 packs<span> / </span>2.20<span>m<sup>2</sup></span>)</p>
      </div>
      <div className="flex items-center gap-1 sm:gap-3 w-full">
        <button className="max-sm:h-[40px] px-2 py-2 sm:py-3 text-white bg-primary flex items-center gap-2 font-inter text-12 sm:text-16 2xl:text-22 w-7/12">
            <Image src="/assets/images/icon/measure.png" alt="box" width={30} height={30} />
            Order Now Free Sample
        </button>
        <button className="max-sm:h-[40px] px-2 xl:px-10 py-2 sm:py-3 bg-black text-white  font-inter text-12 sm:text-16 2xl:text-22 flex items-center gap-2 w-5/12">
        <Image src="/assets/images/icon/cart.png" alt="box" width={28} height={28} />
          Add to Cart
        </button>
      </div>
      <button className="flex items-center gap-2 text-[#475156]"><LuHeart size={20} />Add to Wishlist</button>
      <PaymentMethod showheading/>
        </div>
      </Container>
      <div className="mb-10 max-w-[95%] sm:max-w-[90%] lg:max-w-[80%] mx-auto">
        <AdditionalInfo />
        <FaqDetail />
      </div>

      <Container>
      <Features items={featureItems} />
                             
      </Container>
      <RelatedSlider products={relatedProducts}/>
    </div>
  );
};

export default Product;
