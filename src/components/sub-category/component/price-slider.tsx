'use client';

import React from 'react';
import ReactSlider from 'react-slider';

const PriceSlider = ({
  setPriceValue,
  priceValue,
}: {
  setPriceValue: React.Dispatch<React.SetStateAction<[number, number]>>;
  priceValue: [number, number];
}) => {
  const min = 49;
  const max = 149;

  const renderTrack = (
    props: React.HTMLProps<HTMLDivElement>,
    state: { index: number; value: number | readonly number[] }
  ) => {
    const [minVal, maxVal] = state.value as [number, number];
    const range = max - min;

    const left = ((minVal - min) / range) * 100;
    const right = ((maxVal - min) / range) * 100;

    return (
      <div
        {...props}
        className="relative w-full h-[1.1px]"
        style={{
          background: `linear-gradient(to right, #E4E7E9 0%, #E4E7E9 ${left}%, #cc7644 ${left}%, #cc7644 ${right}%, #E4E7E9 ${right}%, #E4E7E9 100%)`,
        }}
      />
    );
  };

  return (
    <>
      <ReactSlider
        className="w-full h-[1px] rounded-full relative"
        thumbClassName="w-4 h-4 bg-white border-2 border-[#cc7644] rounded-full cursor-pointer shadow-md -top-[6px]"
        trackClassName="h-[1px] rounded-full"
        value={priceValue}
        min={min}
        max={max}
        onChange={setPriceValue}
        pearling
        minDistance={10}
        renderTrack={renderTrack}
      />

      <p className="mt-2 xl:pl-5 font-inter text-12 xl:text-14 pt-1 text-[#475156]">
        Price:{' '}
        <span className="font-normal">
          <span className="font-currency font-normal text-18"></span>{' '}
          {priceValue[0]}/m² —{' '}
          <span className="font-currency font-normal text-18"></span>{' '}
          {priceValue[1]}/m²
        </span>
      </p>
    </>
  );
};

export default PriceSlider;
