import Container from "components/common/container/Container";
import ContactForm from "components/contact/contact-form";
import ContactInfo from "components/contact/contact-info";
import Breadcrumb from "components/Reusable/breadcrumb";
import React from "react";
import { createMetadata } from 'utils/metadataHelper';
import { pageMetadataData } from 'data/meta-data';
export const metadata = createMetadata(pageMetadataData.contact_us);
const Contact = () => {
  return (
    <>
      <Breadcrumb title="Contact Us" image="/assets/images/Contact/contact-us-banner-imag.webp"  />
      <Container className="md:mt-16 mt-10 mb-20">
        <div className=" sm:max-w-[80%] xl:max-w-[57%] 2xl:max-w-[40%] mx-auto text-center font-inter md:space-y-4">
          <h2 className="md:text-[36px] text-xl font-semibold leading-10">
            Get In Touch With Us
          </h2>
          <p className="text-[#9F9F9F] md:text-base text-sm">
          For more information about our products, please feel free to drop us a WhatsApp message or an email. Our staff are dedicated to help you find the best solution for your home/office.
          </p>
        </div>
        <div className="md:mt-16 sm:mt-10 bg-white sm:shadow-[0px_0px_69px_30px_#0000001c] p-5">
          <div className="flex flex-wrap lg:flex-nowrap sm:gap-10">
            <div className="w-full lg:w-[43%] bg-primary order-2 lg:order-1">
              <ContactInfo />
            </div>
            <div className="w-full lg:w-[57%] order-1 lg:order-2 mb-6 lg:mb-0">
              <ContactForm />
            </div>
          </div>
        </div>
      </Container>
    </>
  );
};

export default Contact;
