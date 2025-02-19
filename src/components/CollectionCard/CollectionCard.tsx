import Image from "next/image";
import Link from "next/link";
import { ProductCardProps } from "types/type";

const CollectionCard: React.FC<ProductCardProps> = ({ product, features = [] }) => {
    return (
        <div className="overflow-hidden px-2">
           <Link href="#">
           <Image
                src={product.image}
                alt={product.name}
                width={500}
                height={200}
                className="w-full h-52 object-cover"
           />
           </Link>
            <div className="flex justify-between gap-4 py-2 border-b border-gray-100 px-2 font-inter font-light">
                {features.map((feature) => (
                    <div key={feature.id} className="flex items-center justify-between gap-1">
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
            <div className="md:p-4 font-inter font-light">
                <Link href="#" className="md:text-lg md:mt-0 mt-1 text-sm text-left font-semibold text-[#594F55]">
                    {product.name}
                </Link>
                <div className="flex flex-col md:flex-row items-center md:items-start lg:items-center justify-between py-2 gap-2 md:gap-4 w-full">
                    <p className="text-sm md:text-base lg:text-base font-bold text-primary w-full md:w-full md:text-left">
                        {product.price}
                    </p>
                    <div className="w-full md:text-right">
                        <Link
                            href="#"
                            className="text-black px-3 md:px-3 py-1.5 md:py-2 text-[10px] md:text-[10px] lg:text-sm border border-primary transition whitespace-nowrap hover:text-white hover:bg-primary"
                        >
                            Shop Now
                        </Link>

                    </div>
                </div>

            </div>
        </div>
    );
};

export default CollectionCard;
