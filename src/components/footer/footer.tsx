"use client";
import { footerData, staticMenuItems } from 'data/data';
import Image from 'next/image';
import { FaMapMarkerAlt, FaRegEnvelope, FaWhatsapp } from 'react-icons/fa';
import Container from 'components/common/container/Container';
import Link from 'next/link';
import { IoCall } from 'react-icons/io5';
import Footerlinks from './Footerlinks';
import { fetchCategories } from 'config/fetch';
import { Category, ISUBCATEGORY } from 'types/cat';
import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { FETCH_HEADER_CATEGORIES } from 'graphql/queries';
import { Category as ICategory } from "types/cat";


const Footer = () => {
    const [categories, setCategories] = useState([]);
    useEffect(() => {
        const getCategories = async () => {
            try {
                const data = await fetchCategories(FETCH_HEADER_CATEGORIES);
                  const sortedCategories = data?.sort((a:ICategory, b:ICategory) => {
                    const indexA = staticMenuItems.findIndex(item => item.label.toLowerCase() === a.name.trim().toLowerCase());
                    const indexB = staticMenuItems.findIndex(item => item.label.toLowerCase() === b.name.trim().toLowerCase());
                    
                    // If the category is not found in staticMenuItems, move it to the end
                    return (indexA === -1 ? Infinity : indexA) - (indexB === -1 ? Infinity : indexB);
                  });
                setCategories(sortedCategories);
            } catch {
                toast.error("Error fetching categories:");
            }
        };
        getCategories();
    }, []);
    return (
        <footer className="bg-gray-100 text-gray-700 pt-10 mt-20 px-0 mx-0 relative">
            <Container className=" mx-auto grid sm:grid-cols-4 lg:grid-cols-7 md:grid-cols-4 gap-5 font-inter font-light" >
                <div className="md:col-span- lg:col-span- ">
                    <Image src="/assets/images/logo.png" alt="Easyfloors" width={120} height={50} className="mb-4" />
                    <p className="mt-2 text-sm">{footerData.company.description}</p>
                </div>
                <Footerlinks categories={categories} />

                {categories.map((section: Category, index: number) => {
                    const reCallFlag = section.recalledSubCats && section.recalledSubCats.length > 0;
                    const subcategories: ISUBCATEGORY[] = (reCallFlag ? section.recalledSubCats : section.subcategories) as ISUBCATEGORY[] || [];

                    return (
                        <div key={index} className="sm:block hidden">
                            <h3 className="lg:text-base md:text-sm font-normal lg:tracking-widest md:tracking-normal sm:tracking-normal">
                                {section.name}
                            </h3>
                            <ul className="mt-4 space-y-2">
                                {section.name === "ACCESSORIES" ? (
                                    (section.accessories ?? []).map((item, i) => (
                                        <li key={i} className="text-sm text-[#00000099] hover:text-gray-900 cursor-pointer font-normal">
                                            <Link href={`/accessories/${item.custom_url}`} className="cursor-pointer hover:text-primary block">
                                                {item.name}
                                            </Link>
                                        </li>
                                    ))
                                ) : (
                                    (subcategories ?? []).map((item, i) => (
                                        <li key={i} className="text-sm text-[#00000099] hover:text-gray-900 cursor-pointer font-normal">
                                            <Link href={`/${item?.category?.RecallUrl || section.RecallUrl}/${item.custom_url}`} className="cursor-pointer hover:text-primary block">
                                                {item.name}
                                            </Link>
                                        </li>
                                    ))
                                )}
                            </ul>
                        </div>

                    )
                })}

                <div className="sm:block ">
                    <h3 className=" font-normal tracking-widest md:text-base text-sm">CONTACT US</h3>
                    <div className="text-sm mt-3 flex items-start gap-2">
                        <div className='' >
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
                        <div className=''>
                            <IoCall size={16} className="text-black" />
                        </div>
                        <Link href="tel:+971505974385" className="text-gray-700 hover:text-gray-900">
                            {footerData.contact.phone}
                        </Link>
                    </div>
                    <div className="text-sm mt-2 flex items-center gap-2">
                        <div className=''>
                            <FaRegEnvelope size={16} className="text-black" />
                        </div>
                        <Link href="mailto:cs@easyfloors.ae" className="text-gray-700 hover:text-gray-900">
                            {footerData.contact.email}
                        </Link>
                    </div>
                    <div className="grid grid-cols-6 md:grid-cols-3 w-4/5 gap-3 mt-4 items-center">
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

                    <Link href="tel:+971505974385" aria-label="Call +971505974385" className="bg-[#3DA162] sm:hidden text-white p-2 rounded-full shadow-lg flex items-center justify-center w-12 h-12">
                        <IoCall size={35} />
                    </Link>

                    <Link href="https://wa.me/971505974385" aria-label="WhatsApp +971505974385" className="bg-[#25D366] text-white rounded-full shadow-lg flex items-center justify-center w-12 h-12">
                        <FaWhatsapp size={35} />
                    </Link>
                </div>
            </Container>

            <div className="xs:border-t xs:border-gray-300 mt-6 py-4 flex flex-col md:flex-row items-center justify-between bg-primary">
                <Container className="flex items-center justify-between">
                    <div className="flex md:space-x-4 space-x-2">
                        {footerData.social.map((social, index) => (
                            <a key={index} href={social.link} aria-label={`Visit our ${social.name} page`} className="text-gray-600 h-6 w-6 hover:text-gray-900 bg-white p-1">
                                <social.icon />
                            </a>
                        ))}
                    </div>

                    <div className="sm:absolute left-1/2 transform sm:-translate-x-1/2">
                        <p className="text-sm text-white font-inter font-medium xs:font-extralight text-center">
                            Easyfloors.ae ©2025
                        </p>
                    </div>

                </Container>
            </div>

        </footer>
    );
};

export default Footer;
