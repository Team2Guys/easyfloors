"use client"
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Category } from 'types/cat';

interface RatioButtonsProps {
  options: Category[];
}

const RatioButtons: React.FC<RatioButtonsProps> = ({ options }) => {
  const path = usePathname()
  return (
    <div className="flex flex-wrap gap-3">
      {options.map((option,index) => (
        <Link href={`/${option.custom_url}`}
          key={index}
          className={`py-1 px-2 transition-colors duration-300 font-inter text-14 ${path === `/${option.custom_url}`
              ? 'bg-[#BF69330A] border border-primary text-[#191C1F]'
              : 'bg-transparent text-[#475156] font-medium border border-gray-300'
            }`}
        >
          {option.name}
        </Link>
      ))}
    </div>
  );
};

export default RatioButtons;
