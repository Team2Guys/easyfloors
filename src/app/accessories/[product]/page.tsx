"use client";
import { useState } from "react";
import Container from "components/common/container/Container";
import Breadcrumb from "components/Reusable/breadcrumb";
// import Thumbnail from "components/product-detail/thumbnail";
import SkirtingProductDetail from "components/product-detail/productinfo";


const ProductImageGallery = () => {
  const images = [
    { src: "/assets/images/accessories/product/1.png", alt: "Thumbnail 1" },
    { src: "/assets/images/accessories/product/2.png", alt: "Thumbnail 2" },
    { src: "/assets/images/accessories/product/3.png", alt: "Thumbnail 3" },
    { src: "/assets/images/accessories/product/4.png", alt: "Thumbnail 4" },
    { src: "/assets/images/accessories/product/5.png", alt: "Thumbnail 5" },
  ];
  const [mainImage, setMainImage] = useState(images[0].src);

  return (
    <Container>
    <Breadcrumb />
    <div className="flex">
    <div className="w-8/12">
    {/* <Thumbnail ThumnailImage={mainImage} ThumnailBottom=""/> */}
    </div>
    <div className="w-4/12">
    <SkirtingProductDetail />
    </div>
    </div>
  
    </Container>
  );
};

export default ProductImageGallery;
