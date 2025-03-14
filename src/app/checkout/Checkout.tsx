"use client";

import { useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import PhoneInput from "react-phone-number-input";
import "react-phone-number-input/style.css";
import Image from "next/image";
import Container from "components/common/container/Container";
import Link from "next/link";
import { Checkbox, Collapse } from "antd";
import productImg from '../../../public/assets/home page images/Group 481.png'
import secureImg from '../../../public/assets/icons/safe-icon-1.png'
import lightImg from '../../../public/assets/icons/light1(traced).png'
import light_2Img from '../../../public/assets/icons/light-02-(traced).png'
import deliveryImg from '../../../public/assets/icons/delivery-truck 2 (traced).png'
import locationImg from '../../../public/assets/icons/location 1 (traced).png'
import visa1Img from '../../../public/assets/icons/visa1.png'
import mastercardImg from '../../../public/assets/icons/mastercard.png'
import payImg from '../../../public/assets/icons/pay.png'
import GpayImg from '../../../public/assets/icons/Gpay.png'
import { CiDeliveryTruck } from "react-icons/ci";
import { AiOutlineMinus, AiOutlinePlus } from "react-icons/ai";

const cities = ["Dubai", "Abu Dhabi", "Sharjah", "Ajman", "Fujairah", "Ras Al Khaimah", "Umm Al Quwain"];
const emirates = ["Dubai", "Abu Dhabi", "Sharjah", "Ajman", "Fujairah", "Ras Al Khaimah", "Umm Al Quwain"];

const Checkout = () => {
    const [termsAccepted, setTermsAccepted] = useState(false);
    const { Panel } = Collapse;

    const formik = useFormik({
        initialValues: {
            fullName: "",
            email: "",
            phone: "",
            country: "AE",
            city: "",
            emirate: "",
            address: "",
            additionalInfo: "",
        },
        validationSchema: Yup.object({
            fullName: Yup.string().required("Full name is required"),
            email: Yup.string().email("Invalid email address").required("Email is required"),
            phone: Yup.string().required("Phone number is required"),
            city: Yup.string().required("City is required"),
            emirate: Yup.string().required("Emirate is required"),
            address: Yup.string().required("Address is required"),
        }),
        onSubmit: (values) => {
            if (!termsAccepted) {
                alert("You must agree to the terms and conditions.");
                return;
            }
            console.log("Form Data:", values);
        },
    });

    return (
        <Container>
            <h1 className='text-4xl text-center my-2'>Checkout</h1>
            <div className='flex items-center gap-2 sm:gap-4 mb-2'>
                <span className='text-16 sm:text-20'>Shipping Information</span>
                <svg width="7" height="12" viewBox="0 0 7 12" className="text-black fill-black" xmlns="http://www.w3.org/2000/svg">
                    <path d="M6.51562 6.53125L2.26562 10.7812C1.95312 11.0938 1.48438 11.0938 1.20312 10.7812L0.484375 10.0938C0.203125 9.78125 0.203125 9.3125 0.484375 9.03125L3.51562 6.03125L0.484375 3C0.203125 2.71875 0.203125 2.25 0.484375 1.9375L1.20312 1.21875C1.48438 0.9375 1.95312 0.9375 2.26562 1.21875L6.51562 5.46875C6.79688 5.78125 6.79688 6.25 6.51562 6.53125Z" />
                </svg>
                <span className='text-13 sm:text-slate-500'>Payment</span>
            </div>
            <form onSubmit={formik.handleSubmit} className="grid grid-cols-1 2md:grid-cols-2 gap-5 lg:gap-10 min-h-screen mb-20">
                {/* Left: Form */}
                <div className="bg-white  py-4 px-2 sm:px-0 sm:py-8 shadow-lg rounded-lg sm:shadow-none">
                    <div className="space-y-4">
                        <div>
                            <label className="flex justify-between items-center"><span className="font-medium">Full Name <span className="text-primary">*</span></span><span className="font-thin text-11 xs:text-14 sm:text-16">Do you have an account? <Link href='/' className="text-primary">Login</Link></span></label>
                            <input
                                type="text"
                                placeholder="Enter full name"
                                name="fullName"
                                className="w-full p-2 border rounded"
                                onChange={formik.handleChange}
                                value={formik.values.fullName}
                                required
                            />
                        </div>

                        <div>
                            <label className="block font-medium">Email Address <span className="text-primary">*</span></label>
                            <input
                                type="email"
                                placeholder="Enter email address"
                                name="email"
                                className="w-full p-2 border rounded"
                                onChange={formik.handleChange}
                                value={formik.values.email}
                                required
                            />
                        </div>

                        <div>
                            <label className="block font-medium">Phone Number <span className="text-primary">*</span></label>
                            <PhoneInput
                                international
                                defaultCountry="AE"
                                name="phone"
                                className="w-full p-2 border rounded"
                                onChange={(value) => formik.setFieldValue("phone", value)}
                                value={formik.values.phone}
                                required
                            />
                        </div>
                        <div className="flex-1">
                            <label className="block font-medium">Country <span className="text-primary">*</span></label>
                            <select
                                name="emirate"
                                className="w-full p-2 pe-4 border rounded"
                                onChange={formik.handleChange}
                                value={formik.values.country}
                                required
                            >
                                <option value='AE' selected>United Arab Emirates</option>
                            </select>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <div className="flex-1">
                                <label className="block font-medium">City <span className="text-primary">*</span></label>
                                <select
                                    name="city"
                                    className="w-full p-2 border rounded"
                                    onChange={formik.handleChange}
                                    value={formik.values.city}
                                    required
                                >
                                    <option value="">Select City</option>
                                    {cities.map((city) => (
                                        <option key={city} value={city}>{city}</option>
                                    ))}
                                </select>
                            </div>

                            <div className="flex-1">
                                <label className="block font-medium">Emirate <span className="text-primary">*</span></label>
                                <select
                                    name="emirate"
                                    className="w-full p-2 border rounded"
                                    onChange={formik.handleChange}
                                    value={formik.values.emirate}
                                    required
                                >
                                    <option value="">Select Emirate</option>
                                    {emirates.map((emirate) => (
                                        <option key={emirate} value={emirate}>{emirate}</option>
                                    ))}
                                </select>
                            </div>
                        </div>

                        <div>
                            <label className="block font-medium">Address <span className="text-primary">*</span></label>
                            <input
                                type="text"
                                placeholder="Enter Your Full Address"
                                name="address"
                                className="w-full p-2 border rounded"
                                onChange={formik.handleChange}
                                value={formik.values.address}
                                required
                            />
                        </div>
                        <div>
                            <label className="block font-medium">Additional Information</label>
                            <input
                                type="text"
                                placeholder="Apartment Suite Etc. "
                                name="additionalInfo"
                                className="w-full p-2 border rounded"
                                onChange={formik.handleChange}
                                value={formik.values.additionalInfo}
                            />
                        </div>
                        <div className="flex items-center">
                            <Checkbox onChange={() => setTermsAccepted(!termsAccepted)} className="custom-checkbox text-10 xs:text-12 sm:text-16" checked={termsAccepted}>I have read and agree to the Terms and Conditions</Checkbox>
                        </div>
                    </div>
                </div>
                <div className="bg-[#FFF9F5] p-2 xs:p-4 sm:p-8 w-full">
                    <div className="flex items-baseline gap-4 mb-4 border-b">
                        <h2 className="text-xl xs:text-2xl mb-4">Order Summary</h2>
                        <span>
                            (<span className="text-red-600">*Total 3 Items</span>)
                        </span>
                    </div>
                    <div className="space-y-4 max-h-[210px] overflow-y-auto px-1 xs:px-3">
                        {[1, 2, 3].map((item, index) => (
                            <div key={index} className="flex items-center border-b pb-4">
                                <div className="p-1 bg-white border rounded-md">
                                    <Image src={productImg} alt="Product" width={80} height={80} />
                                </div>
                                <div className="ml-4">
                                    <p className="font-semibold text-13 xs:text-16">Richmond SPC Eco - Oak History</p>
                                    <p className="text-sm text-gray-600 text-12 xs:text-14">No. of Boxes: 2 (2.009 SQM)</p>
                                </div>
                                <p className="ml-auto font-medium text-nowrap text-13 xs:text-16">AED 357.66</p>
                            </div>
                        ))}
                    </div>

                    <div className="mt-4 text-right border-t py-4 px-3">
                        <p className="text-gray-600 flex justify-between">Subtotal <span className="text-black">AED 894.15</span></p>
                        <p className="text-gray-600 flex justify-between"><span className="flex items-center gap-2">Shipping <CiDeliveryTruck size={16} className="mt-1" /></span> <span className="text-black">Enter shipping address</span></p>
                        <p className="text-lg font-semibold mt-2 flex justify-between">Total Incl. VAT: <span>AED 894.15</span></p>
                    </div>
                    <button
                        type="submit"
                        className="w-full bg-primary text-white p-2"
                    >
                        Pay Now
                    </button>
                    <div className="flex justify-center items-center gap-2 mt-4">
                        <Image src={secureImg} alt="secure img" className="w-4 xs:w-7 h-5 xs:h-8" />
                        <p className="text-13 xs:text-15 sm:text-17">Secure shopping with SSL data encryption</p>
                    </div>
                    <div>
                        <Collapse accordion defaultActiveKey={["1"]} bordered={false} expandIcon={({ isActive }) => (isActive ? <AiOutlineMinus size={18} /> : <AiOutlinePlus size={18} />)} expandIconPosition="end" className="w-full bg-transparent custom-collapse">
                            <Panel
                                header={<span className="text-slate-500">Shipping Options</span>}
                                key="1"
                                className="!border-b-0"
                            >
                                <div className="bg-white p-2 mt-2 flex gap-2 items-center">
                                    <Image src={lightImg} alt="icon" className="size-12 xs:size-16" />
                                    <div>
                                        <strong className="text-15 xs:text-20">Express Shipping:</strong>
                                        <p className="text-11 xs:text-16">Receive within <strong>one working day</strong></p>
                                        <p className="text-11 xs:text-16">
                                            <span>Delivery Cost:</span> <strong>AED 150</strong>
                                        </p>
                                    </div>
                                </div>
                                <div className="bg-white p-2 mt-2 flex gap-2 items-center">
                                    <Image src={deliveryImg} alt="icon" className="size-12 xs:size-16" />
                                    <div>
                                        <strong className="text-15 xs:text-20">Standard Shipping:</strong>
                                        <p className="text-11 xs:text-16">Receive within <strong>3-4 working days</strong></p>
                                        <p className="text-11 xs:text-16">
                                            <span>Delivery Cost:</span> <strong>Free Shipping Over AED 1500  Only In Dubai  </strong>
                                        </p>
                                    </div>
                                </div>
                                <div className="bg-white p-2 mt-2 flex gap-2 items-center">
                                    <Image src={locationImg} alt="icon" className="size-12 xs:size-16" />
                                    <div>
                                        <strong className="text-15 xs:text-20">Self-Collect:</strong>
                                        <p className="text-11 xs:text-16">Collection Monday-Saturday <strong>(10am-6pm)</strong></p>
                                        <p className="text-11 xs:text-16">
                                            <span>Location:</span> <strong><a target="_blank" rel="noopener noreferrer" href="https://www.google.com/maps/place/J1+Warehouses/@24.9871787,55.0799029,13z/data=!4m6!3m5!1s0x3e5f43c5045ac9ab:0xe8fe6b6d3731e2f9!8m2!3d24.9871066!4d55.1211025!16s%2Fg%2F11fsb5fcvx?entry=ttu&amp;g_ep=EgoyMDI1MDIxMi4wIKXMDSoJLDEwMjExNDUzSAFQAw%3D%3D">Agsons, J1 Warehouses, Jebel Ali  Industrial – Dubai</a></strong>
                                        </p>
                                    </div>
                                </div>
                            </Panel>

                            <Panel
                                header={<span className="text-slate-500">Shipping Options</span>}
                                key="2"
                                className="!border-b-0"
                            >
                                <div className="bg-white p-2 mt-2 flex gap-2 items-center">
                                    <Image src={light_2Img} alt="icon" className="size-12 xs:size-16" />
                                    <div>
                                        <strong className="text-15 xs:text-20">Installation Information:</strong>
                                        <p className="text-11 xs:text-16">Installation Information is simply dummy text of the printing and</p>
                                        <p className="text-11 xs:text-16">
                                            <span>Delivery Cost:</span> <strong>AED 150</strong>
                                        </p>
                                    </div>
                                </div>
                            </Panel>

                            <Panel header={<span className="text-slate-500">Return Policy</span>} key="5">
                                <p className="text-gray-500">
                                    This is our example return policy which is everything you need to know about our returns.
                                </p>
                            </Panel>
                        </Collapse>
                    </div>
                    <div className="mt-4">
                        <h3 className="text-18 xs:text-20 text-center font-medium">Guaranteed Safe Checkout</h3>
                        <div className="flex gap-2 my-4 mx-auto w-full max-w-xl">
                            <div className="relative w-1/2 border-4 border-[#00FFBC] px-2 py-3 xs:p-4 rounded-lg shadow">
                                <span className="absolute -top-3 left-2 bg-[#00FFBC] text-black px-2 py-1 text-sm font-extrabold">
                                    tabby
                                </span>
                                <p className="pt-2 xs:p-0 text-12 xs:text-14 text-slate-500">
                                    Pay 4 interest-free payments of AED. <Link href='/' target="_blank" className="text-red-600 font-medium" >Learn More</Link>
                                </p>
                                <div className="flex flex-wrap gap-1 justify-between mt-2">
                                    <p className="flex flex-col"><span className="text-11 font-semibold">AED1200</span> <span className="text-10 text-slate-400">Today</span></p>
                                    <p className="flex flex-col"><span className="text-11 font-semibold">AED1200</span> <span className="text-10 text-slate-400">In 1 month</span></p>
                                    <p className="flex flex-col"><span className="text-11 font-semibold">AED1200</span> <span className="text-10 text-slate-400">In 2 month</span></p>
                                    <p className="flex flex-col"><span className="text-11 font-semibold">AED1200</span> <span className="text-10 text-slate-400">In 3 month</span></p>
                                </div>
                            </div>
                            <div className="relative w-1/2 border-4 border-[#D47C84] px-2 py-3 xs:p-4 rounded-lg shadow">
                                <span className="absolute -top-3 left-2 bg-gradient-to-r from-blue-300 via-orange-300 to-pink-300 text-black font-extrabold px-2 py-1 text-sm">
                                    tamara
                                </span>
                                <p className="pt-2 xs:p-0 text-12 xs:text-14 text-slate-500">
                                    Pay 4 interest-free payments of AED <Link href='/' target="_blank" className="text-red-600 font-medium" >Learn More</Link>
                                </p>
                                <div className="flex flex-wrap gap-1 justify-between mt-2">
                                    <p className="flex flex-col"><span className="text-11 font-semibold">AED1200</span> <span className="text-10 text-slate-400">Today</span></p>
                                    <p className="flex flex-col"><span className="text-11 font-semibold">AED1200</span> <span className="text-10 text-slate-400">In 1 month</span></p>
                                    <p className="flex flex-col"><span className="text-11 font-semibold">AED1200</span> <span className="text-10 text-slate-400">In 2 month</span></p>
                                    <p className="flex flex-col"><span className="text-11 font-semibold">AED1200</span> <span className="text-10 text-slate-400">In 3 month</span></p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div>
                        <h3 className="text-20 xs:text-24 font-medium">Buy Now, Pay Later</h3>
                        <div className="flex justify-between flex-wrap gap-2 pt-2 xs:pt-6">
                            <Image src={visa1Img} alt='payment icon' className="w-16 xl:w-[100px] h-10 xl:h-[70px] shadow-md border" />
                            <Image src={mastercardImg} alt='payment icon' className="w-16 xl:w-[100px] h-10 xl:h-[70px] shadow-md border" />
                            <Image src={payImg} alt='payment icon' className="w-16 xl:w-[100px] h-10 xl:h-[70px] shadow-md border" />
                            <Image src={GpayImg} alt='payment icon' className="w-16 xl:w-[100px] h-10 xl:h-[70px] shadow-md border" />
                        </div>
                    </div>
                </div>
            </form>
        </Container>
    );
};

export default Checkout;
