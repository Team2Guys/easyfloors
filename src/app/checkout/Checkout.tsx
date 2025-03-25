"use client";

import { useEffect, useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import PhoneInput from "react-phone-number-input";
import "react-phone-number-input/style.css";
import Image from "next/image";
import Container from "components/common/container/Container";
import Link from "next/link";
import secureImg from '../../../public/assets/icons/safe-icon-1.png'
import lightImg from '../../../public/assets/icons/light1(traced).png'
import light_2Img from '../../../public/assets/icons/light-02-(traced).png'
import deliveryImg from '../../../public/assets/icons/delivery-truck 2 (traced).png'
import locationImg from '../../../public/assets/icons/location 1 (traced).png'
import { CiDeliveryTruck } from "react-icons/ci";
import { emirates } from "data/data";
import { toast } from "react-toastify";
import { ICart } from "types/prod";
import { getCart } from "utils/indexedDB";
import { fees, paymentcard, UAEStates } from "data/cart";
import PaymentMethod from "components/product-detail/payment";
import Checkbox from "components/ui/checkbox";
import Accordion from "components/ui/accordion";



const Checkout = () => {
    const [termsAccepted, setTermsAccepted] = useState(false);
    const [cartItems, setCartItems] = useState<ICart[]>([]);
    const [totalProducts, setTotalProducts] = useState(0);
    const [subTotal, setSubTotal] = useState(0);
    const [total, setTotal] = useState(0);
    const [selectedFee, setSelectedFee] = useState(0);
    const [selectedShipping, setSelectedShipping] = useState<"express" | "standard" | null>(null);
    const [openAccordion, setOpenAccordion] = useState<string | null>('1');

    const handleToggle = (key: string) => {
      setOpenAccordion(openAccordion === key ? null : key);
    };
    useEffect(() => {
        const fetchCartItems = async () => {
            try {
                const items = await getCart();
                setCartItems(items);
                setTotalProducts(items.length);
                const subTotalPrice = items.reduce(
                    (total, item) => total + (item.pricePerBox || 0) * (item.requiredBoxes ?? 0), 
                    0
                );
                setSubTotal(subTotalPrice);
            } catch {
                toast.error("Error fetching cart items:");
            }
        };

        fetchCartItems();
    }, []);

    const formik = useFormik({
        initialValues: {
            firstName: '',
            lastName: '',
            email: "",
            phone: "",
            country: "United Arab Emirates",
            city: "",
            emirate: "",
            address: "",
            note: "",
        },
        validationSchema: Yup.object({
            firstName: Yup.string().required("First name is required"),
            lastName: Yup.string().required("Last name is required"),
            email: Yup.string().email("Invalid email address").required("Email is required"),
            phone: Yup.string().required("Phone number is required"),
            city: Yup.string().required("City is required"),
            emirate: Yup.string().required("Emirate is required"),
            address: Yup.string().required("Address is required"),
        }),
        onSubmit: (values) => {
            if (!termsAccepted) {
                toast.warn("You must agree to the terms and conditions.");
                return;
            }
            console.log('formdata', {...values, products: cartItems, shipmentFee:selectedFee });
        },
    });

    const handleStateSelect = (state: string) => {
        const fee = fees[state as keyof typeof fees]
        setSelectedFee(fee);
        const totalPrice = subTotal + (fee || 0 );
            setTotal(totalPrice);
    };
    
    useEffect(() => {
        handleShippingSelect("standard"); 
    }, []);
    const handleShippingSelect = (type: "express" | "standard") => {
        setSelectedShipping(type);
        let fee = 0;
        if (type === "express") {
            if (!formik.values.city || formik.values.city === "Select City") {
                fee = 0;
            } else {
                fee = subTotal >= 1000 ? 0 : formik.values.city === "Dubai" ? 100 : 150;
            }
        } else {
            fee = 0;
        }
        setSelectedFee(fee);
        setTotal(subTotal + (fee > 0 ? fee : 0));
    };
    

    return (
        <Container>
            <h1 className='text-4xl text-center my-2'>Checkout</h1>
            <div className='flex items-center gap-2 sm:gap-4 mb-4'>
                <span className='text-16 sm:text-20'>Shipping Information</span>
                <svg width="7" height="12" viewBox="0 0 7 12" className="text-black fill-black" xmlns="http://www.w3.org/2000/svg">
                    <path d="M6.51562 6.53125L2.26562 10.7812C1.95312 11.0938 1.48438 11.0938 1.20312 10.7812L0.484375 10.0938C0.203125 9.78125 0.203125 9.3125 0.484375 9.03125L3.51562 6.03125L0.484375 3C0.203125 2.71875 0.203125 2.25 0.484375 1.9375L1.20312 1.21875C1.48438 0.9375 1.95312 0.9375 2.26562 1.21875L6.51562 5.46875C6.79688 5.78125 6.79688 6.25 6.51562 6.53125Z" />
                </svg>
                <span className='text-13 sm:text-slate-500'>Payment</span>
            </div>
            <form onSubmit={formik.handleSubmit} className="grid grid-cols-1 2md:grid-cols-2 gap-5 lg:gap-10 min-h-screen mb-20">
                <div className="bg-white pb-4 px-2 sm:px-0 sm:pb-8 shadow-lg rounded-lg sm:shadow-none">
                    <div className="space-y-4">
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <div>
                                <label className="flex justify-between items-center"><span className="font-medium">First Name <span className="text-primary">*</span></span></label>
                                <input
                                    type="text"
                                    placeholder="Enter first name"
                                    name="firstName"
                                    className="w-full p-2 border rounded"
                                    onChange={formik.handleChange}
                                    value={formik.values.firstName}
                                    required
                                />
                            </div>
                            <div>
                                <label className="flex justify-between items-center"><span className="font-medium">Last Name <span className="text-primary">*</span></span><span className="font-thin text-11 hidden">Do you have an account? <Link href='/' className="text-primary">Login</Link></span></label>
                                <input
                                    type="text"
                                    placeholder="Enter last name"
                                    name="lastName"
                                    className="w-full p-2 border rounded"
                                    onChange={formik.handleChange}
                                    value={formik.values.lastName}
                                    required
                                />
                            </div>
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
                                className="w-full p-2 pe-4 border rounded custom-select"
                                onChange={formik.handleChange}
                                value={formik.values.country}
                                defaultValue='United Arab Emirates'
                            >
                                <option value='United Arab Emirates'>United Arab Emirates</option>
                            </select>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">


                        <div className="flex-1">
                                <label className="block font-medium">Emirate <span className="text-primary">*</span></label>
                                <select
                                    name="emirate"
                                    className="w-full p-2 border rounded custom-select"
                                    onChange={formik.handleChange}
                                    value={formik.values.emirate}
                                    defaultValue="United Arab Emirates"
                                    required
                                >
                                    <option value="">Select Emirate</option>
                                    {emirates.map((emirate) => (
                                        <option key={emirate} value={emirate}>{emirate}</option>
                                    ))}
                                </select>
                        </div> 

                            <div className="flex-1">
                                <label className="block font-medium">City <span className="text-primary">*</span></label>
                                <select
                                    name="city"
                                    className="w-full p-2 border rounded custom-select"
                                    onChange={(e) => {
                                        formik.handleChange(e);
                                        handleStateSelect(e.target.value);
                                    }}
                                    value={formik.values.city}
                                    required
                                >
                                    <option value="">Select City</option>
                                    {UAEStates.map((city) => (
                                        <option key={city} value={city}>{city}</option>
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
                                name="note"
                                className="w-full p-2 border rounded"
                                onChange={formik.handleChange}
                                value={formik.values.note}
                            />
                        </div>
                        <Checkbox 
                        label="I have read and agree to the Terms and Conditions" 
                        isActive={termsAccepted} 
                        onChange={setTermsAccepted}
                        />
                    </div>
                </div>
                <div className="bg-[#FFF9F5] w-full">
                    <div className="p-2 xs:p-4 sm:p-8">
                        <div className="flex items-center gap-4 pb-4 border-b">
                            <h2 className="text-xl xs:text-2xl">Order Summary</h2>
                            <span>
                                (<span className="text-red-600 pt-1">*Total {totalProducts} Items</span>)
                            </span>
                        </div>
                        <div className="space-y-4 max-h-[210px] overflow-y-auto pe-1 xs:pe-4 pt-3 mt-1">
                            {cartItems.length > 0 ? cartItems.map((item, index) => (
                                <div key={index} className="flex items-center border-b pb-4">
                                    <div className="p-1 bg-white border rounded-md">
                                        <Image src={item.image || ''} alt={item.name} width={80} height={80} />
                                    </div>
                                    <div className="ml-4">
                                        <p className="font-bold text-13 xs:text-16">{item.name}</p>
                                        <p className="text-sm text-gray-600 text-12 xs:text-14">No. of Boxes: <span className="font-semibold">{item.requiredBoxes}</span> ({item.squareMeter} SQM)</p>
                                    </div>
                                    <p className="ml-auto font-medium text-nowrap text-13 xs:text-16">AED {item.totalPrice.toFixed(2)}</p>
                                </div>
                            )) : <p>Cart is Empty</p>}
                        </div>
                    </div>
                    <div className="px-2 xs:px-4 sm:px-8 pb-10 border-t-2">
                        <div className="space-y-2 py-4">
                            <p className="text-gray-600 flex justify-between">Subtotal <span className="text-black">AED {subTotal.toFixed(2)}</span></p>
                            <p className="text-gray-600 flex justify-between">
                            <span className="flex items-center gap-2">
                                Shipping <CiDeliveryTruck size={16} className="mt-1" />
                            </span> 
                            <span className="text-black">
                            {selectedShipping === "standard"
                                ? "Free"
                                : selectedFee === 0
                                ? "Enter shipping address"
                                : `AED ${selectedFee}`}
                            </span>
                            </p>
                            <p className="text-lg font-bold flex justify-between">Total Incl. VAT: <span>AED {total.toFixed(2)}</span></p>
                        </div>
                        <button
                            type="submit"
                            className={`w-full bg-primary text-white p-2 ${cartItems.length === 0 && 'bg-[#bf69337d]'}`}
                            disabled={cartItems.length === 0}
                        >
                            Pay Now
                        </button>
                        <div className="flex justify-center items-center gap-2 mt-4">
                            <Image src={secureImg} alt="secure img" className="w-4 xs:w-7 h-5 xs:h-8" />
                            <p className="text-13 xs:text-15 sm:text-17">Secure shopping with SSL data encryption</p>
                        </div>
                        <div>
                        <Accordion 
                            label="Shipping Options" 
                            isOpen={openAccordion === '1'} 
                            onToggle={() => handleToggle('1')}
                            showPlusMinus
                        >
                            <div
                                    className={`bg-white px-2 xs:px-4 py-2 mt-2 flex gap-2 xs:gap-4 items-center cursor-pointer border-2 ${
                                        selectedShipping === "express" ? "border-primary" : "border-transparent"
                                    }`}
                                    onClick={() => handleShippingSelect("express")}
                            >
                                    <Image src={lightImg} alt="icon" className="size-12 xs:size-16" />
                                    <div>
                                        <strong className="text-15 xs:text-20">Express Shipping:</strong>
                                        <p className="text-11 xs:text-16">Receive within <strong>one working day</strong></p>
                                        <p className="text-11 xs:text-16">
                                            <span>Delivery Cost:</span> <strong>AED 150</strong>
                                        </p>
                                    </div>
                            </div>

                                <div
                                    className={`bg-white px-2 xs:px-4 py-2 mt-2 flex gap-2 xs:gap-4 items-center cursor-pointer border-2 ${
                                        selectedShipping === "standard" ? "border-primary" : "border-transparent"
                                    }`}
                                    onClick={() => handleShippingSelect("standard")}
                                >
                                    <Image src={deliveryImg} alt="icon" className="size-12 xs:size-16" />
                                    <div>
                                        <strong className="text-15 xs:text-20">Standard Shipping:</strong>
                                        <p className="text-11 xs:text-16">Receive within <strong>3-4 working days</strong></p>
                                        <p className="text-11 xs:text-16">
                                            <span>Delivery Cost:</span> <strong>Free Shipping Over AED 1500 Only In Dubai</strong>
                                        </p>
                                    </div>
                                </div>


                                    <div className="bg-white px-2 xs:px-4 py-2 mt-2 flex gap-2 xs:gap-4 items-center">
                                        <Image src={locationImg} alt="icon" className="size-12 xs:size-16" />
                                        <div>
                                            <strong className="text-15 xs:text-20">Self-Collect:</strong>
                                            <p className="text-11 xs:text-16">Collection Monday-Saturday <strong>(10am-6pm)</strong></p>
                                            <p className="text-11 xs:text-16">
                                                <span>Location:</span> <strong><Link className="hover:text-primary" target="_blank" rel="noopener noreferrer" href="https://www.google.com/maps/place/J1+Warehouses/@24.9871787,55.0799029,13z/data=!4m6!3m5!1s0x3e5f43c5045ac9ab:0xe8fe6b6d3731e2f9!8m2!3d24.9871066!4d55.1211025!16s%2Fg%2F11fsb5fcvx?entry=ttu&amp;g_ep=EgoyMDI1MDIxMi4wIKXMDSoJLDEwMjExNDUzSAFQAw%3D%3D">Agsons, J1 Warehouses, Jebel Ali  Industrial – Dubai</Link></strong>
                                            </p>
                                        </div>
                                    </div>
                        </Accordion>
                        <Accordion 
                            label="Installation" 
                            isOpen={openAccordion === '2'} 
                            onToggle={() => handleToggle('2')}
                            showPlusMinus
                        >
                            <div className="bg-white px-2 xs:px-4 py-2 mt-2 flex gap-2 xs:gap-4 items-center">
                            <Image src={light_2Img} alt="icon" className="size-12 xs:size-16" />
                            <div>
                                <strong className="text-15 xs:text-20">Installation Information:</strong>
                                <p className="text-11 xs:text-16">Installation Information is simply dummy text of the printing and</p>
                                <p className="text-11 xs:text-16">
                                <span>Delivery Cost:</span> <strong>AED 150</strong>
                                </p>
                                <Link target="_blank" rel="noopener noreferrer" className="hover:text-primary" href="/measurement-appointment">Book Free Installation Appointment</Link>
                            </div>
                            </div>
                        </Accordion>
                        <Accordion 
                        label="Return Policy" 
                        isOpen={openAccordion === '5'} 
                        onToggle={() => handleToggle('5')}
                        showPlusMinus
                        >
                        <div className=" border-b  pb-2">

                        <p className="text-gray-500">
                            This is our example return policy which is everything you need to know about our returns.
                        </p>
                        </div>
                        </Accordion>

                        </div>
                        <div className="mt-4">
                            <h3 className="text-18 xs:text-20 text-center font-medium">Guaranteed Safe Checkout</h3>
                            <div className="flex gap-2 my-4 mx-auto w-full max-w-xl">
                                <PaymentMethod installments={(subTotal + (selectedFee || 0)) / 4} />
                            </div>
                        </div>
                        <div className="mx-auto w-full max-w-xl mt-2">
                            <h3 className="text-20 xs:text-24 font-medium">Buy Now, Pay Later</h3>
                            <div className="flex justify-between flex-wrap gap-2 pt-3">
                                {
                                    paymentcard.map((array, index) => (
                                        <Image className=' w-16 h-11 md:w-14 md:h-12 2xl:w-[90px] 2xl:h-[60px]' key={index} width={90} height={60} src={array.image} alt='payment-card' />
                                    ))
                                }
                            </div>
                        </div>
                    </div>
                </div>
            </form>
        </Container>
    );
};

export default Checkout;
