"use client";
import { footerData, staticMenuItems } from 'data/data';
import Image from 'next/image';
import { FaMapMarkerAlt, FaRegEnvelope, FaWhatsapp } from 'react-icons/fa';
import Container from 'components/common/container/Container';
import Link from 'next/link';
import { IoCall } from 'react-icons/io5';
import { fetchCategories } from 'config/fetch';
import { Category, ISUBCATEGORY } from 'types/cat';
import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { FETCH_HEADER_CATEGORIES } from 'graphql/queries';
import { Category as ICategory } from "types/cat";
import dynamic from 'next/dynamic';
const Footerlinks = dynamic(() => import('./Footerlinks'));

import SocialIcon from 'components/Reusable/social-icon';


const Footer = () => {
    const [categories, setCategories] = useState([]);
    useEffect(() => {
        const getCategories = async () => {
            try {
                const data = await fetchCategories(FETCH_HEADER_CATEGORIES);
                const sortedCategories = data?.sort((a: ICategory, b: ICategory) => {
                    const indexA = staticMenuItems.findIndex(
                        (item) => item.label.toLowerCase() === a.name.trim().toLowerCase()
                    );
                    const indexB = staticMenuItems.findIndex(
                        (item) => item.label.toLowerCase() === b.name.trim().toLowerCase()
                    );
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
                {categories.length > 0 ? (
                    categories.map((section: Category, index: number) => {
                        const reCallFlag = section.recalledSubCats && section.recalledSubCats.length > 0;
                        const subcategories: ISUBCATEGORY[] = (reCallFlag ? section.recalledSubCats : section.subcategories) as ISUBCATEGORY[] || [];

                        return (
                            <div key={index} className="sm:block hidden">
                                <Link href={`/${section.custom_url}`} className="lg:text-base md:text-sm font-normal lg:tracking-widest md:tracking-normal sm:tracking-normal">
                                    {section.name}
                                </Link>

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
                    })
                ) : (
                    <>
                        {[...Array(5)].map((_, index) => (
                            <div key={index} className="hidden sm:block w-full animate-pulse">
                                {[...Array(5)].map((_, i) => (
                                    <div key={i} className="h-6 w-full bg-gray-300 rounded mb-3"></div>
                                ))}
                            </div>
                        ))}
                    </>
                )}

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
                <div className="flex flex-col space-y-3 fixed right-4 bottom-10 md:right-16  z-20">

                    <Link href="tel:+971505974385" aria-label="Call +971505974385" className="bg-[#3DA162] sm:hidden text-white p-2 rounded-full shadow-lg flex items-center justify-center w-12 h-12">
                        <IoCall size={35} />
                    </Link>

                    <Link href="https://wa.me/971505974385" aria-label="WhatsApp +971505974385" className="bg-[#25D366] text-white rounded-full shadow-lg flex items-center justify-center w-12 h-12">
                        <FaWhatsapp size={35} />
                    </Link>
                </div>
            </Container>

            <div className="xs:border-t xs:border-gray-300 mt-6 py-4 flex flex-col md:flex-row sm:items-center justify-between bg-primary">
                <Container className="grid grid-cols-1 lg:grid-cols-3 gap-4 max-sm:justify-items-start max-lg:justify-items-center ">
                    <div className='hidden sm:block'>
                    <div className="flex md:space-x-4 space-x-2">
                        <SocialIcon/>
                    </div>
                    </div>
                    <div className='text-start sm:text-center hidden sm:block'>
                        <p className="text-12 sm:text-13 text-white font-inter font-medium xs:font-extralight ">
                            Easyfloors.ae ©2025
                        </p>
                    </div>
                    <div className="text-white  font-inter flex flex-wrap lg:flex-nowrap  lg:justify-end  w-full">
                    <div className='flex justify-between xs:justify-center items-center text-12 sm:text-13 font-light flex-nowrap xl:whitespace-nowrap gap-2 sm:gap-0 w-full sm:space-x-4'> <Link className='w-full text-start sm:w-fit text-nowrap xs:text-wrap xl:text-nowrap' href="/terms-and-conditions">Terms & Conditions</Link>
                     <Link className='w-full text-center sm:text-start sm:w-fit' href="/shipping-policy">Shipping Policy</Link>
                     <Link className='w-full text-start sm:w-fit' href="/privacy-policy">Privacy Policy</Link>
                     <Link className='w-full text-center sm:text-start sm:w-fit hidden sm:block ' href="/return-and-refund-policy">Return & Refund policy</Link>
                    </div>
                     <Link className='w-full text-center sm:text-start sm:w-fit block sm:hidden mt-3 text-12 sm:text-13 font-light' href="/return-and-refund-policy">Return & Refund policy</Link>
                    </div>
                    <div className='block sm:hidden w-full'>
                    <div className='flex justify-start items-center'>
                    <div className="flex space-x-2 w-[32%] xs:w-[40%]">
                        <SocialIcon/>
                    </div>
                    <p className="text-12 sm:text-13 text-white font-inter font-light w-[30%] text-nowrap xs:w-[60%]">
                            Easyfloors.ae ©2025
                    </p>
                   
                    </div>
                    </div>
                </Container>
            </div>

        </footer>
    );
};

export default Footer;
