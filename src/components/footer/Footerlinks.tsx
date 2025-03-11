import React, { useState } from "react";
import { FaChevronDown, FaChevronUp } from "react-icons/fa";
import { Category } from "types/cat"; 

interface FooterlinksProps {
  categories: Category[]; 
}

const Footerlinks: React.FC<FooterlinksProps> = ({  categories }) => {
  const [activeSection, setActiveSection] = useState<string | null>(null);

  const toggleSection = (section: string) => {
    setActiveSection(activeSection === section ? null : section);
  };

  return (
    <>
      {categories.map((section, index) => (
        <div key={index} className="sm:hidden">
          <div
            className="flex items-center justify-between cursor-pointer border-b-2 pb-3"
            onClick={() => toggleSection(section.name)}
          >
            <div>{section.name}</div>
            <div>
              {activeSection === section.name ? (
                <FaChevronUp className="text-gray-600" />
              ) : (
                <FaChevronDown className="text-gray-600" />
              )}
            </div>
          </div>
          <div className={`${activeSection === section.name ? "block" : "hidden"} mt-2`}>
            <ul className="space-y-2">
              {section.subcategories?.map((item, i) => (
                <li key={i} className="text-sm text-gray-600 hover:text-gray-900 cursor-pointer">
                  {item.name}
                </li>
              ))}
            </ul>
          </div>
        </div>
      ))}
    </>
  );
};

export default Footerlinks;
