import Image from "next/image";
import Link from "next/link";
import { FiEye, FiHeart } from "react-icons/fi";
import { Category } from "types/cat";
import { productCardProps } from "types/PagesProps";
import { IProduct } from "types/prod";

const Card: React.FC<productCardProps> = ({
  product,
  features = [],
  sldier,
  categoryData,
  subCategoryData
}) => {
  
  const handleNavigate = (product: IProduct , categoryData: Category , subCategoryData?: Category) => {
    if(subCategoryData){
      return `/${categoryData?.RecallUrl ||categoryData?.custom_url}/${subCategoryData.custom_url}/${product.custom_url}`;
    } else {
      return `/${categoryData?.RecallUrl ||categoryData?.custom_url}/${product.subCategory?.custom_url}/${product.custom_url}`;
    }
    
    }
  return (
    <div className={`overflow-hidden group  ${sldier ? "px-2" : " hover:bg-background p-2"}`}>
     <div className="relative">
      <Link href={handleNavigate(product , categoryData , subCategoryData)}>
        <Image
          src={product.posterImageUrl.imageUrl}
          alt={product.name}
          width={500}
          height={200}
          className={`w-full  object-cover ${sldier ? " h-[130px] sm:h-52" : "h-[107px] md:h-[275px]"}`}
        />
      </Link>

      <div className="absolute top-2 right-2 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
        <Link href="/wishlist" className="p-1 bg-white  shadow hover:bg-primary hover:text-white transition">
          <FiHeart size={20}  />
        </Link>
        <button className="p-1 bg-white  shadow hover:bg-primary hover:text-white transition">
          <FiEye size={20}  />
        </button>
      </div>
     </div>
      <div
        className={`flex  gap-4 py-2 border-b border-gray-100 px-2 font-inter font-light  ${ sldier ? "justify-between" : "justify-evenly"}`}
      >
        {features.map((feature,index) => (
          <div key={index} className="flex items-center justify-between gap-1" >
            <Image
              src={feature.icon}
              alt="Icon"
              width={feature.width}
              height={feature.height}
              className="cursor-pointer text-gray-500 hover:text-red-500"
            />
            <span className="md:text-[12px] text-[7px] text-black">
              {feature.label}
            </span>
          </div>
        ))}
      </div>
      <div className="p-2 lg:p-4 font-inter font-light">
        <Link
          href={product.custom_url|| ''}
          className={` md:mt-0 mt-1 text-left font-semibold text-[#594F55] ${
            sldier ? "text-sm md:text-lg" : " text-12 sm:text-14 md:text-16 xl:text-24 2xl:text-31 max-sm:leading-3"
          }`}
        >
          {product.name}
        </Link>
        <div className="flex flex-col md:flex-row items-center md:items-start lg:items-center justify-between py-2 gap-2 md:gap-4 w-full">
          <p className="text-sm md:text-14 xl:text-base font-bold  w-full md:w-full md:text-left">
           Only AED <span className="text-primary">{product.price}</span>/m<span className="align-super text-10">2</span>
          </p>
          <div className="w-full md:text-right">
            {product.stock === 0 ? (
              <button disabled className="text-white px-3 md:px-1 xl:px-3 py-1.5 xl::py-2 text-[10px] md:text-[10px] lg:text-sm border border-black bg-black transition whitespace-nowrap">
                Out of Stock
              </button>
            ) : (
              <Link
              href={product.custom_url || ''}className="text-black px-3 md:px-3 py-1.5 md:py-2 text-[10px] md:text-[10px] lg:text-sm border border-primary transition whitespace-nowrap hover:text-white hover:bg-primary"
              >
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
