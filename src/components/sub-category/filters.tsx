import React, { useEffect, useState } from "react";
import Accordion from "./component/accordion";
import PriceSlider from "./component/price-slider";
import Checkbox from "components/ui/checkbox";
import RatioButtons from "components/ui/radio-button";
import { Category } from "types/cat";
import Link from "next/link";
import { FIlterprops } from "types/types";



const Filters = ({
  catgories,
  category,
  setIsWaterProof,
  isWaterProof,
  setSelectedColor,
  selectedColor,
  setSelectedThickness,
  selectedThickness,
  setSelectedCommmericallWarranty,
  selectedCommmericallWarranty,
  setSelectedResidentialWarranty,
  selectedResidentialWarranty,
  setSelectedPlankWidth,
  selectedPlankWidth,
  setPriceValue,
  priceValue,
  className }: FIlterprops) => {

  const [uniqueThickness, setUniqueThickness] = useState<string[]>([]);
  const [uniqueCommmericallWarranty, setUniqueCommmericallWarranty] = useState<string[]>([]);
  const [uniqueResidentialWarranty, setUniqueResidentialWarranty] = useState<string[]>([]);
  const [uniquePlankWidth, setUniquePlankWidth] = useState<string[]>([]);
  const [uniqueColors, setUniqueColors] = useState<string[]>([]);

  const extractUniqueAttributes = (category: Category) => {
    const thicknessSet = new Set<string>();
    const commmericallWarrantySet = new Set<string>();
    const residentialWarrantySet = new Set<string>();
    const plankWidthSet = new Set<string>();
    const colorSet = new Set<string>();

    category.products?.forEach((product) => {

      if (product.thickness) thicknessSet.add(product.thickness);

      if (product.CommmericallWarranty) commmericallWarrantySet.add(product.CommmericallWarranty);

      if (product.ResidentialWarranty) residentialWarrantySet.add(product.ResidentialWarranty);

      if (product.plankWidth) plankWidthSet.add(product.plankWidth);

      if (product.colors) {
        product.colors.forEach((color) => {
          colorSet.add(color.name);
        });
      }
    });

    setUniqueThickness(Array.from(thicknessSet));
    setUniqueCommmericallWarranty(Array.from(commmericallWarrantySet));
    setUniqueResidentialWarranty(Array.from(residentialWarrantySet));
    setUniquePlankWidth(Array.from(plankWidthSet));
    setUniqueColors(Array.from(colorSet));
  };
  useEffect(() => {
    extractUniqueAttributes(category);
  }, [category])

  const handleYesWaterProof = (text: string) => {
    if (text === 'yes') {
      setIsWaterProof(true)
    } else {
      setIsWaterProof(false)
    }
  }

  const handleColorSelection = (color: string) => {
    setSelectedColor(prevState => {
      if (prevState.includes(color)) {
        return prevState.filter(item => item !== color);
      } else {
        return [...prevState, color];
      }
    });
  };

  const handleThicknessSelection = (color: string) => {
    setSelectedThickness(prevState => {
      if (prevState.includes(color)) {
        return prevState.filter(item => item !== color);
      } else {
        return [...prevState, color];
      }
    });
  };

  const handleCommmericallSelection = (color: string) => {
    setSelectedCommmericallWarranty(prevState => {
      if (prevState.includes(color)) {
        return prevState.filter(item => item !== color);
      } else {
        return [...prevState, color];
      }
    });
  };

  const handlePlankWidthSelection = (color: string) => {
    setSelectedPlankWidth(prevState => {
      if (prevState.includes(color)) {
        return prevState.filter(item => item !== color);
      } else {
        return [...prevState, color];
      }
    });
  };

  const handleResidentialSelection = (color: string) => {
    setSelectedResidentialWarranty(prevState => {
      if (prevState.includes(color)) {
        return prevState.filter(item => item !== color);
      } else {
        return [...prevState, color];
      }
    });
  };

  const handleClearFilter = () => {
    setPriceValue([200, 1200])
    setSelectedPlankWidth([])
    setSelectedResidentialWarranty([])
    setSelectedCommmericallWarranty([])
    setSelectedThickness([])
    setSelectedColor([])
    setIsWaterProof(null)
  }
  return (
    <div className={`p-2 xl:p-4  w-full  space-y-5 ${className}`}>
      <div className="border-b-2 pb-5">
        <p className="text-16 font-medium uppercase pb-2  text-[#191C1F]">Filter by Category</p>

        {catgories.map((category, index) => (
          <Accordion key={index} title={category.name} >
            <ul className="pl-4 text-sm text-gray-600 space-y-1">

              {category.subcategories?.map((subcategory: Category, i: number) => (
                <Link href={subcategory.custom_url} key={i} className="cursor-pointer hover:text-primary block">
                  {subcategory.name}
                </Link>
              ))}
            </ul>
          </Accordion>
        ))}

        <Accordion title='Manufacturer' >
          <ul className="pl-4 text-sm text-gray-600 space-y-1">
            <li>
              <button className={`cursor-pointer  ? 'text-primary' : 'text-gray-600 hover:text-primary'}`}>
                Richmond
              </button>
            </li>
            <li>
              <button className={`cursor-pointer  ? 'text-primary' : 'text-gray-600 hover:text-primary'}`}>
                Polar
              </button>
            </li>
          </ul>
        </Accordion>

        <Accordion title='Style' >
          <ul className="pl-4 text-sm text-gray-600 space-y-1">
            <li>
              <button className={`cursor-pointer  ? 'text-primary' : 'text-gray-600 hover:text-primary'}`}>
                Richmond
              </button>
            </li>
            <li>
              <button className={`cursor-pointer  ? 'text-primary' : 'text-gray-600 hover:text-primary'}`}>
                Polar
              </button>
            </li>
          </ul>
        </Accordion>
        {uniqueColors &&
          <Accordion title='Colors' >
            <ul className="pl-4 text-sm text-gray-600 space-y-1">
              {uniqueColors?.map((item, i) => (
                <li key={i}>
                  <button className={`cursor-pointer ${selectedColor.some((col) => col === item) ? 'text-primary' : 'text-gray-600 hover:text-primary'}`} onClick={() => handleColorSelection(item)}>
                    {item}
                  </button>
                </li>
              ))}
            </ul>
          </Accordion>
        }
        <Accordion title="Waterproof">
          <ul className="pl-4 text-sm space-y-1">
            <li>
              <button
                className={`cursor-pointer ${isWaterProof ? 'text-primary' : 'text-gray-600 hover:text-primary'}`}
                onClick={() => handleYesWaterProof('yes')}
              >
                Yes
              </button>
            </li>
            <li>
              <button
                className={`cursor-pointer ${!isWaterProof && isWaterProof !== undefined && isWaterProof !== null ? 'text-primary' : 'text-gray-600 hover:text-primary'}`}
                onClick={() => handleYesWaterProof('no')}
              >
                No
              </button>
            </li>
          </ul>
        </Accordion>

        {uniqueThickness &&
          <Accordion title='Thickness' >
            <ul className="pl-4 text-sm text-gray-600 space-y-1">

              {uniqueThickness?.map((item, i) => (
                <li key={i}>
                  <button className={`cursor-pointer ${selectedThickness.some((col) => col === item) ? 'text-primary' : 'text-gray-600 hover:text-primary'}`} onClick={() => handleThicknessSelection(item)}>
                    {item}
                  </button>
                </li>
              ))}
            </ul>
          </Accordion>
        }
        {uniqueCommmericallWarranty &&
          <Accordion title='Commerical Warranty' >
            <ul className="pl-4 text-sm text-gray-600 space-y-1">

              {uniqueCommmericallWarranty?.map((item, i) => (
                <li key={i}>
                  <button className={`cursor-pointer ${selectedCommmericallWarranty.some((col) => col === item) ? 'text-primary' : 'text-gray-600 hover:text-primary'}`} onClick={() => handleCommmericallSelection(item)}>
                    {item}
                  </button>
                </li>
              ))}
            </ul>
          </Accordion>
        }
        {uniqueResidentialWarranty &&
          <Accordion title='Residentail Warranty' >
            <ul className="pl-4 text-sm text-gray-600 space-y-1">

              {uniqueResidentialWarranty?.map((item, i) => (
                <li key={i}>
                  <button className={`cursor-pointer ${selectedResidentialWarranty.some((col) => col === item) ? 'text-primary' : 'text-gray-600 hover:text-primary'}`} onClick={() => handleResidentialSelection(item)}>
                    {item}
                  </button>
                </li>
              ))}
            </ul>
          </Accordion>
        }
        {uniquePlankWidth &&
          <Accordion title='Plank Width' >
            <ul className="pl-4 text-sm text-gray-600 space-y-1">

              {uniquePlankWidth?.map((item, i) => (
                <li key={i}>
                  <button className={`cursor-pointer ${selectedPlankWidth.some((col) => col === item) ? 'text-primary' : 'text-gray-600 hover:text-primary'}`} onClick={() => handlePlankWidthSelection(item)}>
                    {item}
                  </button>
                </li>
              ))}
            </ul>
          </Accordion>
        }

      </div>

      <div className="border-b-2 pb-5">
        <p className="text-16 font-medium uppercase pb-5  text-[#191C1F]">Price Range</p>
        <PriceSlider priceValue={priceValue}
          setPriceValue={setPriceValue}
        />
        {(isWaterProof !== null || selectedColor.length > 0 || selectedThickness.length > 0 ||
          selectedCommmericallWarranty.length > 0 || selectedResidentialWarranty.length > 0 || selectedPlankWidth.length > 0) && (<div className="flex justify-center mt-4">
            <button className="border border-[#cc7644] text-[#cc7644] w-[106px] h-[40px] text-14 rounded-[3px] transition hover:bg-[#cc7644] hover:text-white font-inter" onClick={handleClearFilter}>
              Clear Filters
            </button>
                                                                                                                                  </div>)
        }

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
