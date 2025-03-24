import Image from "next/image";
import Link from "next/link";
import { ISUBCATEGORY } from "types/cat";

const CollectionCard = ({ subcategory }: { subcategory: ISUBCATEGORY }) => {
  return (
    <div className="overflow-hidden md:px-2 hover:bg-[#FFF9F5]">
      <Link 
             href={`/${subcategory.category.RecallUrl}/${subcategory.custom_url}`}
             
      >
        <Image
          src={subcategory.posterImageUrl?.imageUrl || '/default-image.jpg'}
          alt={subcategory.posterImageUrl?.altText || subcategory.name}
          width={800}
          height={200}
          className="md:w-[553px] w-full md:h-80 h-full object-cover overflow-hidden"
        />
      </Link>
      <div className="md:p-4 font-inter font-light">
        <div className="md:mb-3">
          <Link
                href={`/${subcategory.category.RecallUrl}/${subcategory.custom_url}`}
            className="md:text-lg md:mt-0 mt-1 text-[12px] text-left font-semibold text-[#594F55] "
          >
            {subcategory.name}
          </Link>
        </div>
        <div className="flex flex-col md:flex-row items-center md:items-start lg:items-center justify-between md:py-2 py-1 gap-2 md:gap-4 w-full">
          <p className="text-sm md:text-base lg:text-base font-bold text-primary w-full md:w-full md:text-left">
            {subcategory.products?.length} {`${subcategory?.products && subcategory?.products?.length > 1 ? "Items":"Item"}`}
          </p>
          <div className="w-full md:text-right">
            <Link
              href={`/${subcategory.category.RecallUrl}/${subcategory.custom_url}`}
              className="text-black px-3 md:px-9 py-1.5 md:py-4 text-[10px] md:text-[10px] lg:text-sm border border-primary transition whitespace-nowrap hover:text-white hover:bg-primary font-inter font-semibold"
            >
              View All
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CollectionCard;
