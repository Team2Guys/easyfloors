"use client";
import ReactSlider from "react-slider";

const PriceSlider = ({ setPriceValue, priceValue }: {
  setPriceValue: React.Dispatch<React.SetStateAction<[number, number]>>;
  priceValue: [number, number];
}) => {
  // const [values, setValues] = useState<[number, number]>([200, 1200]);
  const renderTrack = (props: React.HTMLProps<HTMLDivElement>, state: { index: number; value: number | readonly number[] }) => {
    const [minValue, maxValue] = state.value as [number, number];

    return (
      <div
      key={state.index}
        className="relative w-full h-[1.1px] "
        style={{
          background: `linear-gradient(to right, #E4E7E9  ${((minValue /  maxValue) * 100)}%, #cc7644 ${((minValue / maxValue) * 100)}%, #cc7644 ${(maxValue /  maxValue) * 100}%, #E4E7E9 ${(maxValue /  maxValue) * 100}%)`,
        }}
      />
    );
  };

  return (
    <div>
      <ReactSlider
        className="w-full h-[1px] bg-gray-200 rounded-full relative"
        thumbClassName="w-4 h-4 bg-white border-2 border-primary rounded-full cursor-pointer shadow-md -top-[6px]"
        trackClassName="h-[1px] rounded-full"
        value={priceValue}
        min={0}
        max={149}
        onChange={setPriceValue}
        pearling
        minDistance={50}
        renderTrack={renderTrack}
      />
      <p className="mt-2 pl-5 font-inter text-12 xl:text-14 pt-1 text-[#475156]">
        Price: <span className="font-normal"><span className="font-currency font-normal text-18"></span>  {priceValue[0]}/m² — <span className="font-currency font-normal text-18"></span> {priceValue[1]}/m²</span>
      </p>
    </div>
  );
};

export default PriceSlider;
