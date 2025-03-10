'use client'
import React, { useState } from "react";

const AreaCalculator = () => {
  const [unit, setUnit] = useState("sqm");
  const [area, setArea] = useState(""); 
  const boxCoverage = 2.9;
  const convertedArea = unit === "sqft" ? parseFloat((parseFloat(area) * 0.092903).toFixed(2)) : parseFloat(area);
  const requiredBoxes = area ? Math.ceil(convertedArea / boxCoverage) : 0;

  return (
    <div className="space-y-3 my-4">
 <div className="flex sm:flex-col max-sm:items-center gap-4 sm:space-y-3">
 <p className="text-lg font-semibold">Area:</p>
      <div className="flex gap-4 items-center">
        <label className="flex items-center space-x-2 cursor-pointer">
          <input
            type="radio"
            value="sqm"
            checked={unit === "sqm"}
            onChange={() => setUnit("sqm")}
            className="hidden"
          />
          <span
            className={`w-4 h-4 rounded-full border-2 flex items-center justify-center ${
              unit === "sqm" ? "border-orange-500" : "border-gray-400"
            }`}
          >
            {unit === "sqm" && <span className="w-2 h-2 bg-orange-500 rounded-full"></span>}
          </span>
          <span className="text-md">m²</span>
        </label>

        <label className="flex items-center space-x-2 cursor-pointer">
          <input
            type="radio"
            value="sqft"
            checked={unit === "sqft"}
            onChange={() => setUnit("sqft")}
            className="hidden"
          />
          <span
            className={`w-4 h-4 rounded-full border-2 flex items-center justify-center ${
              unit === "sqft" ? "border-orange-500" : "border-gray-400"
            }`}
          >
            {unit === "sqft" && <span className="w-2 h-2 bg-orange-500 rounded-full"></span>}
          </span>
          <span className="text-md">ft²</span>
        </label>
      </div>

      {/* Input Field */}
      <input
        type="number"
        
        placeholder={`Enter Area ${unit === "sqm" ? "m²" : "ft²"}`}
        value={area}
        onChange={(e) => setArea(e.target.value)}
        className=" p-2 border border-[#9E9E9E] focus:outline-none focus:ring-2 focus:ring-orange-500 w-[120px] sm:w-[182px] h-[41px] sm:h-[60px] bg-[#D9D9D929] shadow-xl placeholder:text-black"
      />
 </div>

      <div>
      <p className="text-16 2xl:text-20 font-medium mt-2">
          You require {requiredBoxes} Box{requiredBoxes > 1 ? "es" : ""} ({convertedArea ?convertedArea : "0"} m²)
      </p>
        <p className="text-16 2xl:text-20 font-light">No. Of Boxes:0 (0 Square Meter)</p>
        <p className="text-16 2xl:text-20 font-light">Price Per Box :  <span className="font-medium">AED <span>180.21</span></span></p>
      </div>
    </div>
  );
};

export default AreaCalculator;
