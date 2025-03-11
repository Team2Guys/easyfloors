"use client"
import Container from 'components/common/container/Container';
import AdditionalInfo from 'components/product-detail/additional-information';
import AreaCalculator from 'components/product-detail/AreaCalculator';
import FaqDetail from 'components/product-detail/faq-detail';
import PaymentMethod from 'components/product-detail/payment';
import Thumbnail from 'components/product-detail/thumbnail';
import RelatedSlider from 'components/related-slider/related-slider';
import Breadcrumb from 'components/Reusable/breadcrumb';
import Features from 'components/Reusable/features';
import { featureItems, generateSlug, ThumnailBottom } from 'data/data';
import Image from 'next/image';
import React, { useState } from 'react'
import { LuHeart } from 'react-icons/lu';
import { toast } from 'react-toastify';
import { Category } from 'types/cat';
import { IProduct } from 'types/prod';
import { addToCart, addToWishlist, getCart, getWishlist } from 'utils/indexedDB';

interface detailprops{
    product: string;
    ProductInfo: IProduct[];
    products: IProduct[];
    slug: string;
    subCategory: string;
    subCat:Category;
}

const ProductDetail = ({slug,subCategory,product,ProductInfo,products,subCat}:detailprops) => {
    const [unit, setUnit] = useState("sqm");
    const [area, setArea] = useState(""); 

    const productData = ProductInfo.filter((productdata: IProduct) => generateSlug(productdata.name) === generateSlug(product))[0];
    const handleAddToCart = async () => {
      if (productData) {
        const cartItem = {
          id: Number(productData.id),
          name: productData.name,
          price: productData.price,
          stock: productData.stock,
          quantity: 1,
          image: productData.productImages?.[0]?.imageUrl || "",
          subcategories: productData.subcategory ? [{ name: productData.subcategory.name }] : undefined,
          category: productData.category ? [{ name: productData.category.name }] : undefined,
          totalPrice:totalPrice,
          pricePerBox:pricePerBox,
          squareMeter:squareMeter,
          requiredBoxes:requiredBoxes,
        };
        try {
          await addToCart(cartItem);  
          const updatedCart = await getCart();
          console.log("Updated cart:", updatedCart);
          toast.success("Product added to cart!")
        } catch {
          toast.error("Error adding product to cart"); 
        }
      } else {
          toast.success("Product is undefined");
      }
    };
    const handleAddToWishlist = async () => {
      if (productData) {
        const wishlistItem = {
          id: Number(productData.id),
          name: productData.name,
          price: productData.price,
          stock: productData.stock,
          quantity: 1,
          image: productData.productImages?.[0]?.imageUrl || "",
          subcategories: productData.subcategory ? [{ name: productData.subcategory.name }] : undefined,
          category: productData.category ? [{ name: productData.category.name }] : undefined,
          totalPrice:totalPrice,
          pricePerBox:pricePerBox,
          squareMeter:squareMeter,
          requiredBoxes:requiredBoxes,
        };
        try {
          await addToWishlist(wishlistItem);  
          const updatedWishlist = await getWishlist();
          console.log("Updated Wishlist:", updatedWishlist);
          toast.success("Product added to Wishlist!")
        } catch {
          toast.error("Error adding product to Wishlist");
        }
      } else {
          toast.success("Product is undefined");
      }
    };
  
    console.log(product,"productfilter")

    const boxCoverage = 2.9;
    const convertedArea = unit === "sqft" ? parseFloat((parseFloat(area) * 0.092903).toFixed(2)) : parseFloat(area);
    const requiredBoxes = area ? Math.ceil(convertedArea / boxCoverage) : 0;
    const pricePerBox = productData ? (boxCoverage * productData.price) : 0;
    const squareMeter = requiredBoxes * boxCoverage;
    const totalPrice = productData ? (requiredBoxes * pricePerBox) : 0;
    const installments = totalPrice/4;
  
  
    return (
      <div className="mb-10">
        <Breadcrumb title={product} slug={slug} subcategory={subCategory} />
        <Container className="flex flex-wrap lg:flex-nowrap gap-5 w-full mt-10 border-b pb-5 2xl:gap-20">
          <div className=" w-full  lg:w-[55%] 2xl:w-[60%]">
            <Thumbnail ThumnailImage={productData.productImages}  ThumnailBottom={ThumnailBottom}/>
          </div>
          <div className="w-full lg:w-[45%] 2xl:w-[40%] space-y-3 xl:space-y-4 mb-2">
  
        <h1 className="font-inter text-25 2xl:text-[33px] font-semibold">
          {productData.name}
        </h1>
        <div className="border-b border-[#D9D9D9]" />
        <div className="flex items-center gap-2 sm:gap-4 text-18 2xl:text-23 font-semibold text-primary">
          <p className="text-black">Price Per Sqm :</p>
          <p>
            <span>AED</span> {productData.price}{" "}
            <span>
              /m<sup>2</sup>
            </span>
          </p>
        </div>
        <div className="flex items-center gap-1 text-19">
          <p className="text-14 sm:text-18 2xl:text-23">
            Stock: <span className="text-[#008000] font-bold">{productData.stock > 0 ? "In Stock" :"Out of Stock"}</span>
          </p>
          <div className="h-5 w-[2px] bg-black" />
          <p className="text-14 sm:text-18 2xl:text-23 font-bold">
            Box Coverage:{" "}
            <span className="font-normal">
              {boxCoverage} m<sup>2</sup>
            </span>
          </p>
          <div className="h-5 w-[2px] bg-black" />
          <p className="text-14 sm:text-18 2xl:text-23 font-bold">
            Box: <span className="font-normal">1</span>
          </p>
        </div>
        <div className="border-b border-[#D9D9D9]" />
        <AreaCalculator area={area} unit={unit} setArea={setArea} setUnit={setUnit} requiredBoxes={requiredBoxes} convertedArea={convertedArea} pricePerBox={pricePerBox} squareMeter={squareMeter}/>
        <div className="border-b border-[#D9D9D9]" />
        <div className="flex items-center gap-5">
          <p className="font-black text-16 sm:text-20 lg:text-28 2xl:text-33">Total : <span>AED</span> <span>{totalPrice}</span></p>
          <p className="font-medium text-16 2xl:text-20">(1 packs<span> / </span>{boxCoverage}<span>m<sup>2</sup></span>)</p>
        </div>
        <div className="flex items-center gap-1 sm:gap-3 w-full">
          <button className="max-sm:h-[40px] px-2 py-2 sm:py-3 text-white bg-primary flex items-center gap-2 font-inter text-12 sm:text-16 2xl:text-22 w-7/12">
              <Image src="/assets/images/icon/measure.png" alt="box" width={30} height={30} />
              Order Now Free Sample
          </button>
          <button onClick={handleAddToCart} className="max-sm:h-[40px] px-2 xl:px-10 py-2 sm:py-3 bg-black text-white  font-inter text-12 sm:text-16 2xl:text-22 flex items-center gap-2 w-5/12">
          <Image src="/assets/images/icon/cart.png" alt="box" width={28} height={28} />
            Add to Cart
          </button>
        </div>
        <button className="flex items-center gap-2 text-[#475156]" onClick={handleAddToWishlist}><LuHeart size={20} />Add to Wishlist</button>
        <PaymentMethod installments={installments} showheading/>
          </div>
        </Container>
        <div className="mb-10 max-w-[95%] sm:max-w-[90%] lg:max-w-[80%] mx-auto">
          <AdditionalInfo description={productData.description} AdditionalInformation={productData.AdditionalInformation} subcategory={productData.subcategory?.name || ""} />
          <FaqDetail />
        </div>
  
        <Container>
        <Features items={featureItems} />
                               
        </Container>
        <RelatedSlider products={products.slice(0,5)} CategoryData={subCat} />
      </div>
    );
  };
export default ProductDetail