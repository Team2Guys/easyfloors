'use client';

import { SetStateAction, useEffect, useState } from "react";
import Image from "next/image";
import PaymentMethod from "components/product-detail/payment";
import { paymentcard } from "data/cart";
import { IProduct, IProductAccessories, ProductImage } from "types/prod";
import { handleAddToStorage } from "lib/carthelper";
import { LuHeart } from "react-icons/lu";
import { formatAED } from "lib/helperFunctions";

const SkirtingProductDetail = ({ productData, MainCategory, image, selectedColor, setSelectedColor }: { productData: IProductAccessories, MainCategory: string, image?: { imageUrl: string }, setSelectedColor: React.Dispatch<SetStateAction<ProductImage | undefined>>, selectedColor: ProductImage | undefined }) => {

  const [length, setLength] = useState("");
  const [requiredBoxes, setRequiredBoxes] = useState(0);
  const [totalPrice, setTotalPrice] = useState(0);
  const [uniqueFeatureImages, setUniqueFeatureImages] = useState<ProductImage[]>([]);
  const [matchingColor, setMatchingColor] = useState<IProduct[]>([]);
  const boxCoverage = 2.4;
  const calculateSquareMeter = (boxes: number) => {
    return boxCoverage * boxes;
  };

  const squareMeter = calculateSquareMeter(requiredBoxes);

  const handleLengthChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setLength(value);

    const meters = parseFloat(value);
    if (!isNaN(meters) && meters > 0) {
      const pieces = Math.ceil(meters);
      setRequiredBoxes(pieces);
      setTotalPrice(pieces * productData.price);
    } else {
      setRequiredBoxes(0);
      setTotalPrice(0);
    }
  };

  useEffect(() => {
    const uniqueFeatureImages = productData?.featureImages?.filter(
      (image, index, self) =>
        index === self.findIndex((img) => img.color === image.color)
    ) || [];
    setUniqueFeatureImages(uniqueFeatureImages);
    if (uniqueFeatureImages.length > 0) {
      setSelectedColor(uniqueFeatureImages[0]);
    } else {
      const baseImage: ProductImage = productData?.productImages?.[0] ?? { imageUrl: '', public_id: '' };
      setSelectedColor({
        ...baseImage,
        color: 'fff',
        colorName: 'White',
      });
    }
  }, [productData?.featureImages]);


  useEffect(() => {
    if (selectedColor?.color) {
      const filterColor = productData?.products?.filter((item: IProduct) => item.colors?.some((col) => col.detail === selectedColor.color)) || [];
      setMatchingColor(filterColor || []);
    }
  }, [selectedColor, productData]);

  const handleColorClick = (color: ProductImage) => {
    setSelectedColor(color);
  };
  return (
    <div className="p-1 lg:px-4">
      <div className="space-y-1 mt-5 lg:mt-0">
        <h1 className="text-18 lg:text-[33.6px] font-semibold font-inter">{productData.name}</h1>
        <div className="flex border-b-[1px] border-gray-300"></div>
        <p className="text-14 xl:text-[23.6px] font-semibold font-inter">
          Price Per Piece: <span className="text-primary"><span className="font-currency font-normal text-18 xl:text-28"></span> {productData.price}</span>
        </p>
        <p className="text-15 xl:text-[19.6px] font-inter font-normal">Stock: <span className="text-green">In Stock</span>
        </p>
        <div className="flex border-b-[1px] border-gray-300"></div>
      </div>

      {uniqueFeatureImages && uniqueFeatureImages.length > 0 &&
        <div className="w-full mt-1 h-216 border border-black px-3 pb-1">
          <p className="font-semibold font-inter text-16 xl:text-20 ">Colour: <span className="font-light text-14 xl:text-19">{selectedColor?.colorName}</span></p>
          <div className="grid grid-cols-8 gap-2 lg:gap-2 mt-1">
            {uniqueFeatureImages.map((col, index) => (
              <div key={index} className={`text-center border cursor-pointer w-full lg:w-12 ${selectedColor?.color === col.color ? 'border-primary' : 'border-transparent'}`} onClick={() => handleColorClick(col)}>
                <Image alt="img" src={col.imageUrl} height={100} width={100} quality={70} className="h-auto w-full lg:h-12" />
                <p className="text-[8px] sm:text-10 font-inter font-normal text-nowrap">{col.color}</p>
              </div>
            ))}
          </div>
        </div>
      }
      {matchingColor && matchingColor.length > 0 &&
        <div
          className={`mt-3 p-3 border border-black h-36 ${matchingColor.length > 3 ? 'overflow-auto' : 'overflow-hidden'
            }`}
        >
          <p className="font-semibold text-15 xl:text-[23.6px] font-inter">Matching with:</p>
          {matchingColor.map((item, index) => (
            <p className="font-inter font-light text-14 xl:text-16" key={index}>
              {item.name}
            </p>
          ))
          }
        </div>
      }
      {/* Length Input */}
      <div className="border border-black mt-2 p-3">
        <div className="flex items-center gap-2 ">
          <p className="font-semibold font-inter text-16 xl:text-[23.6px]">Pieces:</p>
          <input
            type="number"
            value={length}
            onChange={handleLengthChange}
            placeholder="No. of Required Pieces"
            min="0"
            className="border px-2 py-1 font-light font-inter text-black w-[60%] mt-1 border-primary text-12 xl:text-14"
          />
        </div>
        <div className="mt-2 font-semibold text-16 lg:text-18">
          <p>
            {productData.lengthPrice ? <>Length Per Piece: <span className="font-light text-14 xl:text-18">{productData.lengthPrice}</span></> : <span className="font-light text-14 xl:text-18">Selling in fixed length of 240cm</span>}
          </p>
          <p>Height: <span className="font-light text-14 xl:text-18">10 cm</span></p>
          <p>Depth: <span className="font-light text-14 xl:text-18">1.6 cm</span></p>
        </div>
      </div>
      <div className="mt-2 px-3 border border-black font-inter text-16 xl:text-18 font-semibold">
        <p>Total Required: <span className="text-14 xl:text-17 font-light">{requiredBoxes} Pieces</span></p>
        <p >Price Per Piece: <span className="text-14 xl:text-17 font-light"><span className="font-currency font-normal text-18 xl:text-20"></span> {productData.price}</span></p>
        <p>Total Amount: <span className="text-14 xl:text-17 font-light"><span className="font-currency font-normal text-18 xl:text-20"></span> {formatAED(totalPrice)} ({requiredBoxes < 1 ? `${requiredBoxes} Piece` : `${requiredBoxes} Pieces`} * <span className="font-currency text-18 xl:text-20 font-normal"></span> {productData.price})</span></p>
      </div>

      <div className="my-3 flex w-full gap-1 items-center sm:gap-3">
        <button onClick={() => handleAddToStorage(productData, totalPrice, productData.price, squareMeter, requiredBoxes, "", MainCategory ?? "", "cart", image?.imageUrl ?? "", boxCoverage.toString(), 'm', selectedColor)}
          className="flex bg-black justify-center text-11 xs:text-12 text-white w-6/12 2xl:text-22 font-inter gap-2 items-center max-sm:h-[40px] px-2 py-2 sm:py-3 sm:text-16"
          id="AddToCart"
        >
          <Image src="/assets/images/icon/cart.png" alt="box" width={28} height={28} className="size-5 xs:size-7 text-11 xs:text-14 xl:text-20" />
          Add to Cart
        </button>
        <button
          id="AddToWishlist"
          className="flex bg-black justify-center text-11 xs:text-12 text-white w-6/12 2xl:text-22 font-inter gap-2 items-center max-sm:h-[40px] px-2 py-2 sm:py-3 sm:text-16"
          onClick={() => handleAddToStorage(productData, totalPrice, productData.price, squareMeter, requiredBoxes, "", MainCategory ?? "", "wishlist", image?.imageUrl ?? "", boxCoverage.toString(), 'm', selectedColor)}
        >
          <LuHeart size={25} />
          Add to Wishlist
        </button>
      </div>

      <p className='text-18 xl:text-22 font-semibold text-center'>Buy Now, Pay Later</p>
      <PaymentMethod installments={totalPrice / 4} />
      <div className="mt-2 space-y-2 text-center">
        <p className="text-center mt-4 font-medium font-inter text-18 lg:text-[20.6px]">Guaranteed Safe Checkout</p>
        <div className='flex justify-between lg:justify-center items-center gap-2 lg:gap-10' >
          {
            paymentcard.map((array, index) => (
              <Image className=' w-16  md:w-14 2xl:w-[50px] h-auto shadow' key={index} width={90} height={60} src={array.image} alt='payment-card' />
            ))
          }
        </div>
      </div>
    </div>
  );
};

export default SkirtingProductDetail;
