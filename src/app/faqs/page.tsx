import React from "react";
import { faqspage } from "data/data";
import FAQsList from "components/FaqsPageComponent/Faqs";
import Breadcrumb from "components/Reusable/breadcrumb";
import { Metadata } from 'next';
import logo from "../../../public/assets/images/logo.webp"
export const metadata: Metadata = {
  title: 'SPC & LVT Flooring FAQs | Easy Floors Answers You Can Trust',
  description:
    "Do you have questions about SPC or LVT flooring? Explore our FAQ page for answers on installation, warranties, pet safety, UAE climate suitability & more.",
  openGraph: {
    title: 'SPC & LVT Flooring FAQs | Easy Floors Answers You Can Trust',
    description: "Do you have questions about SPC or LVT flooring? Explore our FAQ page for answers on installation, warranties, pet safety, UAE climate suitability & more.",
    url: 'https://easyfloors.ae/faqs',
    images: [{url: logo.src, alt: 'Easyfloors',
      },
    ],
      type:'website'
  },
  alternates: {
    canonical: 'https://easyfloors.ae/faqs',
  },
};
const FAQsPage: React.FC = () => {
    return (
        <>
        <Breadcrumb title="FAQs" />
        <section className="bg-white py-5 sm:py-7">
            <div className="container mx-auto px-6">
                <h1 className="text-[15px] sm:text-lg font-bold text-[#35332F] lg:text-4xl text-center md:mb-16 font-inter">
                    Frequently Asked Questions
                </h1>
                <FAQsList faqspage={faqspage} />
            </div>
        </section>
        </>
    );
};

export default FAQsPage;
