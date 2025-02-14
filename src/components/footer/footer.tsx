'use client';

import Image from 'next/image';
import { FaFacebookF, FaInstagram, FaPinterestP } from 'react-icons/fa';

const footerData = {
    company: {
        name: 'easy floors',
        description:
            'Founded with a passion for quality and design. Easyfloors is committed to craftsmanship, customer satisfaction and great value for money.',
    },
    links: [
        {
            title: 'SPC FLOORING',
            items: ['Richmond SPC Eco', 'Richmond SPC Prime', 'Richmond SPC Herringbone', 'Polar SPC Herringbone', 'Polar SPC'],
        },
        {
            title: 'LVT FLOORING',
            items: ['Richmond LVT Comfort', 'Richmond LVT Luxury', 'Polar LVT'],
        },
        {
            title: 'RICHMOND FLOORING',
            items: ['Richmond SPC Eco', 'Richmond SPC Prime', 'Richmond SPC Herringbone', 'Richmond LVT Comfort', 'Richmond LVT Luxury'],
        },
        {
            title: 'POLAR FLOORING',
            items: ['Polar SPC', 'Polar SPC Herringbone', 'Polar LVT'],
        },
        {
            title: 'ACCESSORIES',
            items: ['SPC Skirting', 'Stair Nose', 'T Profile', 'Reducer', 'Quarter Round'],
        },
    ],
    contact: {
        address: 'Agsons, J1 Warehouses, Jebel Ali Industrial – Dubai',
        phone: '+971 50 597 4385',
        email: 'cs@easyfloors.ae',
    },
    social: [
        { icon: FaFacebookF, link: '#' },
        { icon: FaInstagram, link: '#' },
        { icon: FaPinterestP, link: '#' },
    ],
    paymentMethods: ['visa', 'apple-pay', 'tabby', 'mastercard', 'g-pay', 'tamara'],
};

const Footer = () => {
    return (
        <footer className="bg-gray-100 text-gray-700 pt-10 pb-5">
            <div className="container mx-auto px-6 grid grid-cols-1 md:grid-cols-7 gap-5">
                <div className="md:col-span-">
                    <Image src="/assets/images/logo.png" alt="Easyfloors" width={120} height={50} className="mb-4" />
                    <p className="mt-2 text-sm">{footerData.company.description}</p>
                </div>
                {footerData.links.map((section, index) => (
                    <div key={index} >
                        <h3 className="text-base font-semibold ">{section.title}</h3>
                        <ul className="mt-2 space-y-2">
                            {section.items.map((item, i) => (
                                <li key={i} className="text-sm hover:text-gray-900 cursor-pointer">{item}</li>
                            ))}
                        </ul>
                    </div>
                ))}
                <div className=''>
                    <h3 className="text-lg font-semibold">CONTACT US</h3>
                    <p className="text-sm mt-2">{footerData.contact.address}</p>
                    <p className="text-sm mt-2">{footerData.contact.phone}</p>
                    <p className="text-sm mt-2">{footerData.contact.email}</p>
                    <div className="grid grid-cols-3 gap-0 mt-4">
                        {footerData.paymentMethods.map((method, index) => (
                            <div key={index} className="flex justify-center ">
                                <Image src={`/assets/icons/${method}.png`} alt={method} width={100} height={100} className="" />
                            </div>
                        ))}
                    </div>
                </div>
            </div>
            <div className="border-t border-gray-300 mt-6 pt-4 flex flex-col md:flex-row items-center justify-between px-6">
                <div className="flex space-x-4 ">
                    {footerData.social.map((social, index) => (
                        <a key={index} href={social.link} className="text-gray-600 hover:text-gray-900 bg-white p-1 rounded-md">
                            <social.icon size={20} />
                        </a>
                    ))}
                </div>
                <p className="text-sm text-gray-500 mt-4 md:mt-0">Easyfloors.ae ©2024</p>
                <div />
            </div>
        </footer>
    );
};

export default Footer;
