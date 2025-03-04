"use client";
import Breadcrumb from "components/Reusable/breadcrumb";
import React from "react";
import { useParams } from "next/navigation";
import Container from "components/common/container/Container";
import ProductInfo from "components/product-detail/product-info";
import AdditionalInfo from "components/product-detail/additional-information";
import FaqDetail from "components/product-detail/faq-detail";
import Features from "components/Reusable/features";
import { featureItems } from "data/data";
import RelatedSlider from "components/related-slider/related-slider";
import Thumbnail from "components/product-detail/thumbnail";

const Product = () => {
  const params = useParams<{
    slug: string;
    subcategory: string;
    product: string;
  }>();
  const title = params.product;
  const category = params.slug;
  const subcategory = params.subcategory;

  console.log(params, "params");

  return (
    <div className="mb-10">
      <Breadcrumb title={title} slug={category} subcategory={subcategory} />
      <Container className="flex flex-wrap lg:flex-nowrap gap-5 w-full mt-10 border-b pb-5 2xl:gap-20">
        <div className=" w-full  lg:w-[55%] 2xl:w-[60%]">
          <Thumbnail />
        </div>
        <div className="w-full lg:w-[45%] 2xl:w-[40%]">
          <ProductInfo />
        </div>
      </Container>
      <div className="mb-10 max-w-[95%] sm:max-w-[90%] lg:max-w-[80%] mx-auto">
        <AdditionalInfo />
        <FaqDetail />
      </div>

      <Container>
      <Features items={featureItems} />
                             
      </Container>
      <RelatedSlider/>
    </div>
  );
};

export default Product;
