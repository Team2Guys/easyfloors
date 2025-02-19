import React from "react";
import Accordion from "./component/accordion";
import PriceSlider from "./component/price-slider";
import { categories } from "data/data";
import Checkbox from "components/ui/checkbox";
import RatioButtons from "components/ui/radio-button";

const Filters = () => {
  return (
    <div className="p-4  w-full  space-y-5 ">
      <div className="border-b-2 pb-5">
        <p className="text-16 font-medium uppercase pb-2  text-[#191C1F]">Filter by Category</p>

        {categories.map((category, index) => (
          <Accordion key={index} title={category.title}>
            <ul className="pl-4 text-sm text-gray-600 space-y-1">
              {category.items.map((item, i) => (
                <li key={i} className="cursor-pointer hover:text-primary">
                  {item}
                </li>
              ))}
            </ul>
          </Accordion>
        ))}
      </div>

      <div className="border-b-2 pb-5">
        <p className="text-16 font-medium uppercase pb-5  text-[#191C1F]">Price Range</p>
        <PriceSlider />
      </div>
      <div className="border-b-2 pb-5">
        <p className="text-16 font-medium uppercase pb-5  text-[#191C1F]">popular Brands</p>
        <div className="flex gap-4 items-center">
        <Checkbox label="Richmond" />
        <Checkbox label="Polar" />
        </div>
      </div>
      <div className="pb-5">
        <p className="text-16 font-medium uppercase pb-5 text-[#191C1F]">Popular Tag</p>
        <div className="flex items-center ">
        <RatioButtons options={['Richmond', 'Polar', 'SPC', 'LVT']} />
        </div>
      </div>
    </div>
  );
};

export default Filters;
