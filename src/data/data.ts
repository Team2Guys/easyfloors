
import { FaFacebookF, FaInstagram, FaPinterestP } from 'react-icons/fa';

export const footerData = {
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