"use client";
import React from "react";

interface TopProps {
  heading: string;
  Icon: React.ElementType;
}

const Top1: React.FC<TopProps> = ({ heading, Icon }) => {
  return (
    <div className="flex flex-col items-center justify-center h-[100px] lg:h-[200px]">
      <div className="text-3xl transition-colors duration-300">
        <Icon className="h-10 w-10 lg:h-14 lg:w-14" />
      </div>
      <p className="mt-1 lg:mt-6 text-xl font-semibold font-inter lg:text-[48px] text-black">
        {heading}
      </p>
    </div>
  );
};

export default Top1;
