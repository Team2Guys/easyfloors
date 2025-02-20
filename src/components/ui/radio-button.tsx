"use client"
import { useState } from 'react';

interface RatioButtonsProps {
  options: string[];
}

const RatioButtons: React.FC<RatioButtonsProps> = ({ options }) => {
  const [selected, setSelected] = useState<string>('');

  return (
    <div className="flex flex-wrap gap-3">
      {options.map((option) => (
        <button
          key={option}
          onClick={() => setSelected(option)}
          className={`py-1 px-2 transition-colors duration-300 font-inter text-14 ${
            selected === option
              ? 'bg-white border border-primary text-[#191C1F]'
              : 'bg-transparent text-[#475156] font-medium border border-gray-300'
          }`}
        >
          {option}
        </button>
      ))}
    </div>
  );
};

export default RatioButtons;
