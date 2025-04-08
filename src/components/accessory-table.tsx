"use client"
import React, { useState } from 'react';

import Image from 'next/image';

interface AccessoryItem {
  name: string;
  pricePerM: number;
  totalQty: number;
  image: string;
}

const accessories: AccessoryItem[] = [
  {
    name: 'Skirting',
    pricePerM: 100,
    totalQty: 2,
    image: '/images/skirting.png',
  },
  {
    name: 'Stair Nose',
    pricePerM: 100,
    totalQty: 2,
    image: '/images/stair-nose.png',
  },
  {
    name: 'T Profile',
    pricePerM: 100,
    totalQty: 2,
    image: '/images/t-profile.png',
  },
  {
    name: 'Reducer',
    pricePerM: 100,
    totalQty: 2,
    image: '/images/reducer.png',
  },
  {
    name: 'Quarter Round',
    pricePerM: 100,
    totalQty: 2,
    image: '/images/quarter-round.png',
  },
];

const AccessoryTable = () => {
  const [quantities, setQuantities] = useState<{ [key: number]: number }>(
    Object.fromEntries(accessories.map((_, i) => [i, 2]))
  );

  const updateQty = (index: number, amount: number) => {
    setQuantities((prev) => ({
      ...prev,
      [index]: Math.max(1, prev[index] + amount),
    }));
  };

  return (
    <div className="overflow-x-auto p-4">
      <table className="w-full text-left border-collapse">
        <thead>
          <tr className="border-b">
            <th className="p-2">Accessories</th>
            <th className="p-2">Price Per m</th>
            <th className="p-2">QTY m</th>
            <th className="p-2">Stock Status</th>
            <th className="p-2">Action</th>
          </tr>
        </thead>
        <tbody>
          {accessories.map((item, index) => (
            <tr key={index} className="border-b">
              <td className="p-2 flex items-center gap-3">
                <Image
                  src={item.image}
                  alt={item.name}
                  width={50}
                  height={50}
                  className="rounded"
                />
                <div>
                  <p className="font-semibold">{item.name}</p>
                  <p className="text-xs text-gray-500">
                    Price Per m: AED 135
                    <br />Total Required QTY: {item.totalQty}m
                  </p>
                </div>
              </td>
              <td className="p-2">AED {item.pricePerM}</td>
              <td className="p-2">
                <div className="flex items-center border rounded w-fit">
                  <button
                    className="text-gray-500 hover:text-gray-700"
                    onClick={() => updateQty(index, -1)}
                  >
                    -
                  </button>
                  <span className="px-3">{quantities[index]}</span>
                  <button
                    className="text-gray-500 hover:text-gray-700"
                    onClick={() => updateQty(index, 1)}
                  >
                    +
                  </button>
                </div>
              </td>
              <td className="p-2 text-green-600">Instock</td>
              <td className="p-2 flex gap-2 items-center">
                <button className="bg-black text-white hover:bg-gray-800">Add to Cart</button>
                <button className="text-xl bg-transparent border-none">&#10005;</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AccessoryTable;
