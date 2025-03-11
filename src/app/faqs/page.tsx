import React from "react";
import { faqspage } from "data/data";
import FAQsList from "components/FaqsPageComponent/Faqs";

const FAQsPage: React.FC = () => {
    return (
        <section className="bg-white py-10 md:mt-32">
            <div className="container mx-auto px-6">
                <h1 className="text-2xl font-bold text-[#1B1139] lg:text-4xl text-center md:mb-16 mb-6 font-inter">
                    Frequently Asked Questions
                </h1>
                <FAQsList faqspage={faqspage} />
            </div>
        </section>
    );
};

export default FAQsPage;
