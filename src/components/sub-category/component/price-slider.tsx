"use client";
import { useState } from "react";
import ReactSlider from "react-slider";

const PriceSlider: React.FC = () => {
  const [values, setValues] = useState<[number, number]>([200, 1200]);
  const renderTrack = (props: React.HTMLProps<HTMLDivElement>, state: { index: number; value: number | readonly number[] }) => {
    const [minValue, maxValue] = state.value as [number, number];

    return (
      <div
        className="relative w-full h-[2.3px] "
        style={{
          background: `linear-gradient(to right, #d3d3d3  ${((minValue / 2000) * 100)}%, #cc7644 ${((minValue / 2000) * 100)}%, #cc7644 ${(maxValue / 2000) * 100}%, #d3d3d3 ${(maxValue / 2000) * 100}%)`,
        }}
      />
    );
  };

  return (
    <div>
      <ReactSlider
        className="w-full h-1 bg-gray-200 rounded-full relative"
        thumbClassName="w-4 h-4 bg-white border-2 border-primary rounded-full cursor-pointer shadow-md -top-1"
        trackClassName="h-1 rounded-full"
        value={values}
        min={0}
        max={2000}
        onChange={setValues}
        pearling
        minDistance={50}
        renderTrack={renderTrack} 
      />
      <p className="mt-2 pl-5 font-inter text-12 xl:text-14 pt-1">
        Price: <span className="font-normal ">{values[0]} AED — {values[1]} AED</span>
      </p>
      <div className="flex justify-center mt-3">
        <button className="border border-[#cc7644] text-[#cc7644] px-6 py-3 text-14 rounded-md transition hover:bg-[#cc7644] hover:text-white font-inter">
          Filter
        </button>
      </div>
    </div>
  );
};

export default PriceSlider;
