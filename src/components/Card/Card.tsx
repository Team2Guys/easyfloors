import Image from "next/image";
import Link from "next/link";
import dynamic from "next/dynamic";
import { lazy, MouseEvent, useState } from "react";
import { FiEye, FiHeart } from "react-icons/fi";
import { Category } from "types/cat";
import { productCardProps } from "types/PagesProps";
import { IProduct } from "types/prod";
import { fetchAccessories, fetchSingeProduct } from "config/fetch";
import { generateSlug } from "data/data";
import { FIND_QUICK_VIEW_PRODUCT } from "graphql/queries";
import { toast } from "react-toastify";
import { handleAddToStorage } from "lib/carthelper";
import CartIcon from "components/svg/cart-icon";
import Collapsearrow from "components/svg/collapse-arrow";
import Leftright from "components/svg/leftright";
import TwoArrow from "components/svg/twoarrow";
const FreeSample = lazy(() => import('components/svg/free-sample'))
const ProductContainer = dynamic(
  () => import("components/ProdutDetailContainer/ProductContainer")
);
const AccessoriesContainer = dynamic(
  () => import("components/accessoriesDetailProduct/AccessoriesContainer")
);
const Card: React.FC<productCardProps> = ({
  product,
  features,
  sldier,
  categoryData,
  isAccessories,
  isSoldOut = false,
  dragging
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalData, setModalData] = useState<IProduct | undefined>(undefined)
  const handleModel = async (e: MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();

    try {
      let productData;
      if (isAccessories) {
        const ProductInfo = await fetchAccessories();
        productData = ProductInfo.find((prod: IProduct) => (prod?.custom_url?.trim() == product?.custom_url?.trim() && prod?.category?.custom_url?.trim() === "accessories"));
      } else {
        productData = await fetchSingeProduct(
          product.custom_url || '',
          generateSlug((product as IProduct).category?.RecallUrl || categoryData.RecallUrl),
          generateSlug(product.subcategory?.custom_url || ''),
          true,
          FIND_QUICK_VIEW_PRODUCT
        );
      }
      setModalData(productData || undefined);
      setIsModalOpen(true);
    } catch (error) {
      toast.error("Error fetching single product");
      throw error;
    }
  };
  const handleNavigate = (product: IProduct, categoryData: Category) => {

    if (product.subcategory) {
      return `/${product.category?.RecallUrl ?? categoryData?.RecallUrl}/${product.subcategory?.custom_url ?? ''}/${product.custom_url?.toLowerCase() ?? ''}`;
    } else {
      return `/${product.category?.RecallUrl ?? categoryData?.RecallUrl}/${product.custom_url?.toLowerCase() ?? ''}`;
    }
  };

  const selectedColor = (product as IProduct)?.featureImages?.find(
    (img) => img.color === (product as IProduct)?.productImages?.[0]?.colorCode
  );


  return (
    <div className={`overflow-hidden group flex flex-col justify-between ${isAccessories ? "hover:bg-[#FFF9F5] p-2 " : "p-2 "}`}>
      <div>
        <div className="relative">
          <Link className="outline-none" onClick={(e) => {
          if (dragging) {
            e.preventDefault();
            e.stopPropagation();
          }
        }} href={isAccessories ? `/accessories/${product.custom_url?.toLowerCase() ?? ''}` : handleNavigate(product as IProduct, categoryData)}
          >
            <Image
              src={product.posterImageUrl?.imageUrl ?? ''}
              alt={product.posterImageUrl?.altText ?? " "}
              width={500}
              height={200}
              loading="lazy"
              className={`w-full object-cover ${sldier ? "h-[130px] sm:h-52" : "h-[107px] md:h-[275px]"} ${isAccessories ? "border border-gray-700 " : " "}`}
            />
          </Link>
          {isAccessories && isSoldOut && (
            <div className="bg-red-500 text-white text-xs absolute px-2 py-1 right-0 top-1">
              Sold Out
            </div>
          )}
          {!sldier &&
            <div className="flex absolute duration-300 gap-2 group-hover:opacity-100 opacity-0 right-2 top-2 transition-opacity">
              {isAccessories &&
              <button className="bg-white p-1 shadow transition free-sample-hover" onClick={() => handleAddToStorage(
                           product,
                           19,
                           19,
                           2.4, 
                           1,
                           product.subcategory?.name || "",
                           categoryData?.name || "Accessories",
                           "freeSample",
                           "productImages" in product ? product.productImages?.[0]?.imageUrl ?? "" : "",
                           product?.boxCoverage,
                           "m",
                           selectedColor,
                       
                           
                          )}
              >
                <FreeSample />
              </button>
              }
              <button className="bg-white p-1 shadow hover:bg-primary hover:text-white transition "
               onClick={() => {
                  handleAddToStorage(
                    product,
                    19,
                    19,
                    2.4, 
                    1,
                    product.subcategory?.name || "",
                    categoryData?.name || "Accessories",
                    "wishlist",
                    "productImages" in product ? product.productImages?.[0]?.imageUrl ?? "" : "",
                    product?.boxCoverage,
                    "m",
                  );
              }}
              >
                <FiHeart size={20} />
              </button>

              <button className="bg-white p-1 shadow hover:bg-primary hover:text-white transition" onClick={(e) => handleModel(e)} >
                <FiEye size={20} />
              </button>
            </div>
          }
        </div>
        {isModalOpen && (
          <div
            className="flex bg-black bg-opacity-50 justify-center px-1 py-4 xs:p-4 fixed inset-0 items-center z-50"
            onClick={() => setIsModalOpen(false)}
          >
            <div
              className="bg-white rounded-lg shadow-lg w-full xs:max-w-[90vw] max-h-[90vh] md:max-w-[1400px] overflow-x-hidden overflow-y-auto relative"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                className="bg-gray-100 rounded-full text-4xl text-gray-700 -right-1 -top-1 absolute font-bold hover:text-red-500 px-2 py-0"
                onClick={() => setIsModalOpen(false)}
              >
                &times;
              </button>
              {isAccessories ?
                <AccessoriesContainer productData={modalData as IProduct} />
                :
                <ProductContainer className="2xl:gap-0 xl:px-0"
                  MainCategory={categoryData?.name || ""}
                  subCategory={product?.subcategory?.name || ""}
                  ProductName={product?.name || ""}
                  productData={modalData as IProduct || []}
                  ProductInfo={[]}
                  isQuickView
                />

              }

            </div>
          </div>
        )}
        {product.sizes && product.sizes.length > 0 ? (
          <div
            className={`flex gap-4 py-2 border-b border-gray-100 px-2 font-inter font-light ${isAccessories ? "py-3 justify-around" : "justify-between"}`}
          >
            {product.sizes.map((feature, index) => (
              <div key={index} className="flex gap-1 xsm:gap-4 w-full justify-between">
                {feature.width &&
                <div className="flex justify-between gap-1 items-center">
                  <Leftright/>
                  <span className=" text-[7px] xs:text-[10px] text-black md:text-[12px]">{feature.width}</span>
                </div>
                } 
                {feature.thickness &&
                  <div className="flex justify-between gap-1 items-center">
                    <Collapsearrow/>
                    <span className=" text-[7px] xs:text-[10px] text-black md:text-[12px]">{feature.thickness}</span>
                  </div>}
                {feature.height &&
                <div className="flex justify-between gap-1 items-center">
                  <TwoArrow/>
                  <span className=" text-[7px] xs:text-[10px] text-black md:text-[12px]">{feature.height}</span>
                </div>
                }
              </div>
            ))}
          </div>
        ) :

          <div className={`flex gap-4 py-2 border-b border-gray-100 px-2 font-inter font-light ${isAccessories ? "py-3 justify-around" : "justify-evenly"}`}>
            {features.map((feature, index) => (
              <div className="flex gap-1 items-center" key={index}>
                <Image
                  src={feature.icon}
                  alt="Icon"
                  width={feature.width}
                  height={feature.height}
                  className="text-gray-500 cursor-pointer hover:text-red-500"
                />
                <span className="text-[7px] text-black md:text-[12px]">{feature.label}</span>
              </div>
            ))}
          </div>
        }


        <div className="p-2 font-inter font-light lg:p-4">
          <Link
            href={isAccessories ? `/accessories/${product.custom_url?.toLowerCase() ?? ''}` : handleNavigate(product as IProduct, categoryData)}
            className={`md:mt-0 mt-1 text-left font-semibold  ${isAccessories ? "text-[#594F55] text-xl" : "text-[#594F55] text-13 sm:text-base"
              }`}
          >
            {isAccessories ? `${product.name}` : product.name}
          </Link>
        </div>
      </div>
      <div className="p-2 font-inter font-light lg:p-4">
        <div className="flex flex-col justify-between w-full gap-2 items-center lg:items-center md:flex-row md:gap-4 md:items-start sm:py-2 max-sm:text-primary">
          {

            'price' in product && product.price &&

            <p className="text-12 w-full font-medium md:text-14 md:text-left md:w-full xl:text-base text-primary">
              {isAccessories ? '' : 'Only '} <span className="font-currency text-16 md:text-18 xl:text-20 font-normal"></span> <span>{product?.price}</span>
              {isAccessories ? '/m' : '/m²'}
            </p>

          }

          <div className="w-full md:text-right">
            {isSoldOut ? (
              <button disabled className="bg-[#FC3D3D] border border-[#FC3D3D] text-[10px] text-white lg:text-sm md:px-1 md:text-[10px] px-3 py-1.5 transition whitespace-nowrap xl:px-3 xl:py-2">
                Sold Out
              </button>
            ) : (product as IProduct).stock === 0 && !isAccessories ? (
              <button disabled className="bg-black border border-black text-[10px] text-white lg:text-sm md:px-1 md:text-[10px] px-3 py-1.5 transition whitespace-nowrap xl:px-3 xl:py-2">
                Out of Stock
              </button>
            ) : (
              <Link href={isAccessories ? `/accessories/${product.custom_url?.toLowerCase() ?? ''}` : handleNavigate(product as IProduct, categoryData)} className="flex justify-center items-center gap-2 border-2 border-primary text-[10px] text-nowrap text-black hover:bg-primary hover:text-white lg:text-sm md:px-3 md:py-2 md:text-[10px] px-3 py-1.5 transition whitespace-nowrap font-semibold hover:fill-white">
                <CartIcon /> Shop Now
              </Link>
            )}

          </div>
        </div>
      </div>
    </div>
  );
};

export default Card;
