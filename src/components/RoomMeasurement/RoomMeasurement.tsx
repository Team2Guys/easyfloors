import React from "react";
import Image from "next/image";
import { MeasurementSection } from "types/types";
import { measurementData } from "data/data";

const RoomMeasurement: React.FC = () => {
  return (
    <div className="container mx-auto p-6  font-inter">
        <h2 className="text-center md:text-3xl text-xl font-bold">Measuring Your Room / Calculating the quantity</h2>
      <h2 className="md:text-xl text-lg font-bold md:mt-10 mt-4 mb-4">{measurementData[0].title}</h2>
      <p className="mb-4">{measurementData[0].description}</p>

      {measurementData.slice(1).map((section: MeasurementSection, index: number) => (
        <div key={index} className="mb-8">
          <h2 className="md:text-xl text-lg font-bold mb-2">{section.title}</h2>
          {section.description && <p className="mb-4">{section.description}</p>}
          <ul className="list-none pl-5">
            {section.steps.map((step, idx) => (
              <li key={idx} className="mb-2">
                <strong>{step.title} -</strong> {step.content}
              </li>
            ))}
          </ul>
          {section.image && (
            <div className="mt-4">
              <Image src={section.image} alt={section.title} width={600} height={400} className="rounded-lg" />
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default RoomMeasurement;
