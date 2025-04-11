import React from "react";
import Image from "next/image";
import { MeasurementSection } from "types/types";
import { measurementData } from "data/data";
import Link from "next/link";

const RoomMeasurement: React.FC = () => {
  return (
    <div className="container mx-auto p-6  font-inter">
      <h2 className="text-center md:text-3xl text-xl font-bold">How to Measure Your Room & Calculate Flooring Quantity        </h2>
      <h2 className="md:text-xl text-lg font-bold md:mt-10 mt-4 mb-4">{measurementData[0].title}</h2>
      <p className="mb-4">{measurementData[0].description}</p>

      {measurementData.slice(1).map((section: MeasurementSection, index: number) => {
        const emailRegex = /([a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,})/g;
        return (

          <div key={index} className="mb-8">
            <h2 className="md:text-xl text-lg font-bold mb-2">{section.title}</h2>
            {section.description && <p className="mb-4">
              {section.description.split(emailRegex).map((part, index) =>
                emailRegex.test(part) ? (
                  <Link key={index} target="_blank"
                  rel="noopener noreferrer"
                   href="mailto:cs@easyfloors.ae" className="text-blue-600 underline"
                  >
                    {part}
                  </Link>
                ) : (
                  part
                )
              )}
                                    </p>}
            {section.stepsHeading && <h2 className="md:text-xl  my-5 text-lg font-bold mb-2">{section.stepsHeading}</h2>}
            <ul className="list-none ">
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

        )
      })}
    </div>
  );
};

export default RoomMeasurement;
