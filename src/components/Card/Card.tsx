import ProductContainer from "components/ProdutDetailContainer.tsx/ProductContainer";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { FiEye, FiHeart } from "react-icons/fi";
import { Category } from "types/cat";
import { productCardProps } from "types/PagesProps";
import { IProduct } from "types/prod";

const Card: React.FC<productCardProps> = ({
  product,
  // productData,
  features,
  sldier,
  categoryData,
  isAccessories = false,
  isSoldOut = false,
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  console.log("Product Data:", product);
  console.log("Main Category:", categoryData?.name);
  // console.log("Accessories:", product?.acessories);



  const handleNavigate = (product: IProduct , categoryData: Category ) => {
    if (product.subcategory) {
      return `/${categoryData?.RecallUrl || product?.custom_url}/${product.subcategory?.custom_url ?? ''}/${product.custom_url?.toLowerCase() ?? ''}`;
    }  else {
      return `/${categoryData?.RecallUrl || product?.custom_url}/${product.custom_url?.toLowerCase() ?? ''}`;
    }
  };
  return (
    <div className={`overflow-hidden group ${isAccessories ? "hover:bg-[#FFF9F5] p-2 " : "p-2 "}`}>
      <div className="relative">
        <Link href={isAccessories ? `/accessories/${product.custom_url?.toLowerCase() ?? ''}` : handleNavigate(product as IProduct, categoryData)}>
          <Image
            src={product.posterImageUrl?.imageUrl ?? ''}
            alt={product.name}
            width={500}
            height={200}
            loading="lazy"
            className={`w-full object-cover ${sldier ? "h-[130px] sm:h-52" : "h-[107px] md:h-[275px]"} ${isAccessories ? "border border-gray-700 " : " "}`}
          />
        </Link>
        {isAccessories && isSoldOut && (
          <div className="absolute top-1 right-0 bg-red-500 text-white text-xs px-2 py-1 ">
            Sold Out
          </div>
        )}
        {!sldier &&
          <div className="absolute top-2 right-2 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <Link href="/wishlist" className="p-1 bg-white shadow hover:bg-primary hover:text-white transition">
              <FiHeart size={20} />
            </Link>
            <button className="p-1 bg-white shadow hover:bg-primary hover:text-white transition" onClick={() => setIsModalOpen(true)} >
              <FiEye size={20} />
            </button>
          </div>
        }
      </div>
      {isModalOpen && (
        <div
          className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50 p-4"
          onClick={() => setIsModalOpen(false)}
        >
          <div
            className="bg-white p-6 rounded-lg shadow-lg max-w-[100vw] md:max-w-7xl w-full h-auto md:max-h-[90vh] relative overflow-y-auto overflow-x-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              className="absolute -top-1 -right-1 px-2 py-0 text-gray-700 text-4xl bg-gray-100 rounded-full font-bold hover:text-red-500"
              onClick={() => setIsModalOpen(false)}
            >
              &times;
            </button>
            <ProductContainer className=" 2xl:gap-0  xl:px-0"
              MainCategory={categoryData?.name || ""}
              subCategory={(product as IProduct)?.subcategory?.name || ""}
              ProductName={product?.name || ""}
              productData={product as IProduct}
              ProductInfo={[]}
            />

          </div>
        </div>
      )}
      <div className={`flex gap-4 py-2 border-b border-gray-100 px-2 font-inter font-light  ${isAccessories ? "py-3 justify-around " : " justify-evenly"}`}>
        {features.map((feature, index) => (
          <div key={index} className="flex items-center justify-between gap-1">
            <Image
              src={feature.icon}
              alt="Icon"
              width={feature.width}
              height={feature.height}
              className="cursor-pointer text-gray-500 hover:text-red-500"
            />
            <span className="md:text-[12px] text-[7px] text-black">{feature.label}</span>
          </div>
        ))}
      </div>
      <div className="p-2 lg:p-4 font-inter font-light">
        <Link
          href={isAccessories ? `/accessories/${product.custom_url?.toLowerCase() ?? ''}` : handleNavigate(product as IProduct, categoryData)}
          className={`md:mt-0 mt-1 text-left font-semibold ${isAccessories ? "text-[#594F55] text-xl" : "text-[#594F55]"
            }`}
        >
          {isAccessories ? `${product.name}` : product.name}
        </Link>

        <div className="flex flex-col md:flex-row items-center md:items-start lg:items-center justify-between py-2 gap-2 md:gap-4 w-full">
          {'price' in product && product.price &&
            <p className="text-sm md:text-14 xl:text-base font-bold w-full md:w-full md:text-left">
              {isAccessories ? '' : 'Only '} AED <span className="text-primary">{product?.price}</span>/m<span className="align-super text-10">2</span>
            </p>
          }

          <div className="w-full md:text-right">
            {isSoldOut ? (
              <button disabled className="text-white px-3 md:px-1 xl:px-3 py-1.5 xl:py-2 text-[10px] md:text-[10px] lg:text-sm border border-[#FC3D3D] bg-[#FC3D3D] transition whitespace-nowrap">
                Sold Out
              </button>
            ) : (product as IProduct).stock === 0 && !isAccessories ? (
              <button disabled className="text-white px-3 md:px-1 xl:px-3 py-1.5 xl:py-2 text-[10px] md:text-[10px] lg:text-sm border border-black bg-black transition whitespace-nowrap">
                Out of Stock
              </button>
            ) : (
              <Link href={isAccessories ? `/accessories/${product.custom_url?.toLowerCase() ?? ''}` : handleNavigate(product as IProduct, categoryData)} className="text-black px-3 md:px-3 py-1.5 md:py-2 text-[10px] md:text-[10px] lg:text-sm border border-primary transition whitespace-nowrap hover:text-white hover:bg-primary">
                Shop Now
              </Link>
            )}

          </div>
        </div>
      </div>
    </div>
  );
};

export default Card;
