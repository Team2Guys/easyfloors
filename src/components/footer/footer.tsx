"use client"
import { useState } from 'react';
import { footerData } from 'data/data';
import Image from 'next/image';
import { FaChevronDown, FaChevronUp, FaMapMarkerAlt, FaRegEnvelope, FaWhatsapp } from 'react-icons/fa';
import Container from 'components/common/container/Container';
import Link from 'next/link';
import { IoCall } from 'react-icons/io5';

const Footer = () => {
    const [activeSection, setActiveSection] = useState<string | null>(null);

    const toggleSection = (section: string) => {
        setActiveSection(activeSection === section ? null : section);
    };

    return (
        <footer className="bg-gray-100 text-gray-700 pt-10 mt-20 px-0 mx-0 relative">
            <Container className=" mx-auto grid sm:grid-cols-4 lg:grid-cols-7 md:grid-cols-4 gap-5 font-inter font-light" >
                <div className="md:col-span- lg:col-span- ">
                    <Image src="/assets/images/logo.png" alt="Easyfloors" width={120} height={50} className="mb-4" />
                    <p className="mt-2 text-sm">{footerData.company.description}</p>
                </div>

                {footerData.links.map((section, index) => (
                    <div key={index} className="sm:hidden">
                        <div
                            className="flex items-center justify-between flex-wrap md:text-base text-sm font-normal lg:tracking-widest md:tracking-normal sm:tracking-normal cursor-pointer md:border-none border-b-2 pb-3"
                            onClick={() => toggleSection(section.title)}
                        >
                            <div>{section.title}</div>
                            <div>
                                {activeSection === section.title ? (
                                    <FaChevronUp className="text-gray-600" />
                                ) : (
                                    <FaChevronDown className="text-gray-600" />
                                )}
                            </div>
                        </div>
                        <div
                            className={`${activeSection === section.title ? 'max-h-screen' : 'max-h-0'
                                } overflow-hidden transition-all duration-300 ease-in-out md:mt-4 space-y-2`}
                        >
                            <ul>
                                {section.items.map((item, i) => (
                                    <li key={i} className="text-sm text-[#00000099] hover:text-gray-900 cursor-pointer font-normal md:mt-0 mt-2">
                                        {item}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                ))}

                {footerData.links.map((section, index) => (
                    <div key={index} className="sm:block hidden">
                        <h3 className="lg:text-base md:text-sm font-normal lg:tracking-widest md:tracking-normal sm:tracking-normal">{section.title}</h3>
                        <ul className="mt-4 space-y-2">
                            {section.items.map((item, i) => (
                                <li key={i} className="text-sm text-[#00000099] hover:text-gray-900 cursor-pointer font-normal">
                                    {item}
                                </li>
                            ))}
                        </ul>
                    </div>
                ))}

                <div className="sm:block ">
                    <h3 className=" font-normal tracking-widest md:text-base text-sm">CONTACT US</h3>
                    <div className="text-sm mt-3 flex items-start gap-2">
                        <div className='p-1 bg-white border' >
                            <FaMapMarkerAlt size={16} className="text-black" />
                        </div>
                        <Link
                            href="https://www.google.com/maps/place/J1+Warehouses/@24.9871787,55.0799029,13z/data=!4m6!3m5!1s0x3e5f43c5045ac9ab:0xe8fe6b6d3731e2f9!8m2!3d24.9871066!4d55.1211025!16s%2Fg%2F11fsb5fcvx?entry=ttu&g_ep=EgoyMDI1MDIxMi4wIKXMDSoJLDEwMjExNDUzSAFQAw%3D%3D"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-gray-700 hover:text-gray-900 md:full w-60"
                        >
                            {footerData.contact.address}
                        </Link>
                    </div>
                    <div className="text-sm mt-2 flex items-center gap-2">
                        <div className='p-1 bg-white border'>
                            <IoCall size={16} className="text-black" />
                        </div>
                        <Link href="tel:+971505974385" className="text-gray-700 hover:text-gray-900">
                            {footerData.contact.phone}
                        </Link>
                    </div>
                    <div className="text-sm mt-2 flex items-center gap-2">
                        <div className='p-1 bg-white border'>
                            <FaRegEnvelope size={16} className="text-black" />
                        </div>
                        <Link href="mailto:cs@easyfloors.ae" className="text-gray-700 hover:text-gray-900">
                            {footerData.contact.email}
                        </Link>
                    </div>
                    <div className="grid grid-cols-6 md:grid-cols-3 w-4/5 gap-0 mt-4 items-center">
                        {footerData.paymentMethods.map((method, index) => (
                            <div key={index} className="flex justify-start">
                                <Image
                                    src={`/assets/icons/${method}.png`}
                                    alt={method}
                                    width={500}
                                    height={500}
                                    className="h-auto w-full"
                                />
                            </div>
                        ))}
                    </div>

                </div>
                <div className="flex flex-col space-y-3 fixed right-4 bottom-32 md:right-16  z-20">

                    <Link href="tel:+971505974385" className="bg-[#3DA162] sm:hidden text-white p-2 rounded-full shadow-lg flex items-center justify-center w-12 h-12">
                        <IoCall size={35} />
                    </Link>

                    <Link href="https://wa.me/971505974385" className="bg-[#25D366] text-white rounded-full shadow-lg flex items-center justify-center w-12 h-12">
                        <FaWhatsapp size={35} />
                    </Link>
                </div>
            </Container>

            <div className="border-t border-gray-300 mt-6 pt-4 flex flex-col md:flex-row items-center justify-between px-6 bg-primary pb-4">
                <div className="container mx-auto md:px-6 flex items-center justify-between w-full">
                    <div className="flex md:space-x-4 space-x-2">
                        {footerData.social.map((social, index) => (
                            <a key={index} href={social.link} className="text-gray-600 h-6 w-6 hover:text-gray-900 bg-white p-1">
                                <social.icon />
                            </a>
                        ))}
                    </div>

                    <div className="absolute left-1/2 transform -translate-x-1/2">
                        <p className="text-sm text-white font-inter font-extralight text-center">
                            Easyfloors.ae ©2025
                        </p>
                    </div>

                </div>
            </div>

        </footer>
    );
};

export default Footer;
