"use client";

import Link from "next/link";
import React, { useState } from "react";
import { FaChevronDown, FaChevronUp } from "react-icons/fa";
import { Category, ISUBCATEGORY } from "types/cat";

interface FooterlinksProps {
  categories: Category[];
}

const Footerlinks: React.FC<FooterlinksProps> = ({ categories }) => {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  const toggleSection = (index: number) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <>
      {/* Add loader of mobile view */}
      {categories.length > 0 ? (
        categories.map((section, index) => {
          const reCallFlag = section.recalledSubCats && section.recalledSubCats.length > 0;
          const subcategories: ISUBCATEGORY[] =
            (reCallFlag ? section.recalledSubCats : section.subcategories) as ISUBCATEGORY[];

          return (
            <div key={index} className="sm:hidden w-full">
              <div
                className="flex items-center justify-between cursor-pointer border-b-2 pb-3"
                onClick={() => toggleSection(index)}
              >
                <Link href={`/${section.custom_url}`} className="font-medium">
                  {section.name}
                </Link>
                <div>
                  {activeIndex === index ? (
                    <FaChevronUp className="text-gray-600" />
                  ) : (
                    <FaChevronDown className="text-gray-600" />
                  )}
                </div>
              </div>

              <div
                className={`overflow-hidden transition-all duration-300 ${
                  activeIndex === index ? "h-auto scale-y-100 opacity-100 mt-2" : "h-0 scale-y-0 opacity-1"
                }`}
              >
                <ul className="space-y-2">
                  {subcategories.map((item, i) => (
                    <li key={i} className="text-sm text-gray-600 hover:text-gray-900 cursor-pointer">
                      <Link
                        href={`/${section.RecallUrl}/${item.custom_url}`}
                        className="cursor-pointer hover:text-primary block"
                      >
                        {item.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          );
        })
      ) : (
        <div className="sm:hidden w-full animate-pulse">

        {[...Array(3)].map((_, i) => (
          <div key={i} className="h-6 w-full bg-gray-300 rounded mb-3"></div>
        ))}
        </div>
      )}
    </>
  );
};

export default Footerlinks;
