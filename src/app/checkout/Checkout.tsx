"use client";

import { useEffect, useState } from "react";
import { Form, Formik } from "formik";
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
import { AiOutlineMinus, AiOutlinePlus } from "react-icons/ai";
import { emirates, phoneValidation } from "data/data";
import { toast } from "react-toastify";
import { ICart } from "types/prod";
import { getCart } from "utils/indexedDB";
import { paymentcard, UAEStates } from "data/cart";
import PaymentMethod from "components/product-detail/payment";
import { useMutation } from "@apollo/client";
import { INITIATE_PAYMENT } from "graphql/mutations";
import Input from "components/appointment/Input";
import Select from "components/appointment/Select";
import CustomSelect from "components/appointment/custom-select";
import Checkbox from "components/ui/checkbox";
import { Collapse } from "antd";


const validationSchema = Yup.object({
    firstName: Yup.string().required("First Name is required"),
    lastName: Yup.string().required("Last Name is required"),
    email: Yup.string().email("Invalid email").required("Email is required"),
    phone: phoneValidation,
    emirate: Yup.string().required("Emirate is required"),
    address: Yup.string().required("Address is required"),
});

const Checkout = () => {
    const { Panel } = Collapse;
    const [cartItems, setCartItems] = useState<ICart[]>([]);
    const [totalProducts, setTotalProducts] = useState(0);
    const [subTotal, setSubTotal] = useState(0);
    const [total, setTotal] = useState(0);
    const [selectedFee, setSelectedFee] = useState(0);
    const [selectedCity, setSelectedCity] = useState('');
    const [selectedShipping, setSelectedShipping] = useState<string | null>(null);
    const [shipping, setShipping] = useState<{ name: string; fee: number; deliveryDuration: string; freeShipping?: number; } | undefined>(undefined);

    type FormInitialValues = {
        firstName: string;
        lastName: string;
        email: string;
        phone: string;
        emirate: string;
        city: string;
        country: string;
        address: string;
        note: string;
    };

    const [initiatePayment] = useMutation(INITIATE_PAYMENT);

    const handlePayment = async (orderData: FormInitialValues) => {
        try {
            const { data } = await initiatePayment({ variables: { createSalesProductInput: orderData } });
            const paymentKey = data.createSalesProduct.paymentKey;

            const redirect_url = `https://uae.paymob.com/unifiedcheckout/?publicKey=${process.env.NEXT_PUBLIC_PAYMOB_PUBLIC_KEY}&clientSecret=${paymentKey.client_secret}`;
            window.location.href = redirect_url
        } catch (err) {
            return err;
        }
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

    useEffect(() => {
        handleShippingSelect("standard");
    }, []);

    const handleShippingSelect = (type: string) => {
        if (selectedCity) {
            let fee = 150;
            if (type === 'standard' || type === 'self-collect') {
                fee = 0;
            } else {
                fee = subTotal > 1000 ? 0 : 150;
            }
            setSelectedFee(fee);

            const totalBeforeTax = subTotal + fee;
            const taxAmount = totalBeforeTax * 0.05;
            setTotal(totalBeforeTax + taxAmount);
        }
        setSelectedShipping(type);
    };



    useEffect(() => {
        if (!selectedCity) return;

        let fee = 150;
        if (selectedShipping === 'standard' || selectedShipping === 'self-collect') {
            fee = 0;
        } else {
            fee = subTotal > 1000 ? 0 : 150;
        }

        setSelectedFee(fee);

        const totalBeforeTax = subTotal + fee;
        const taxAmount = totalBeforeTax * 0.05;
        setTotal(totalBeforeTax + taxAmount);
    }, [selectedCity, selectedShipping, subTotal]);

    useEffect(() => {
        let shippingData;
    
        if (selectedShipping === "standard") {
            shippingData = { name: "Standard Shipping", fee: 0, deliveryDuration: "3-4 working days" };
        } else if (selectedShipping === "express") {
            shippingData = { name: "Express Shipping", fee: 150, deliveryDuration: "Next day delivery", freeShipping: 1000 };
        } else if (selectedShipping === "self-collect") {
            shippingData = { name: "Self-Collect", fee: 0, deliveryDuration: "Mon-Sat (9am-6pm)" };
        }
    
        setShipping(shippingData);
    }, [selectedShipping]);


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
            <Formik
                initialValues={{
                    firstName: "",
                    lastName: "",
                    email: "",
                    phone: "",
                    emirate: "",
                    city: "",
                    country: "United Arab Emirates",
                    address: "",
                    note: "",
                    terms: false,
                }}
                validationSchema={validationSchema}
                onSubmit={(values, { setSubmitting }) => {
                    try {
                        const { terms, ...withoutTerm } = values; //eslint-disable-line
                        // const shippingOption = { name:  } 
                        const NewValues = { ...withoutTerm, city: selectedCity, shipmentFee: selectedFee, totalPrice: total, products: cartItems , shippingMethod: shipping }

                        handlePayment(NewValues);
                        setSubmitting(true);
                        console.log(NewValues, "VALUES")
                    } catch (error) {
                        console.log(error)
                    } finally {
                        setSubmitting(false);
                    }

                }}
            >
                {({ values, handleChange, setFieldValue, isSubmitting }) => (
                    <Form className="grid grid-cols-1 2md:grid-cols-2 gap-5 lg:gap-10 min-h-screen mb-20">
                        <div className="bg-white pb-4 px-2 sm:px-0 sm:pb-8 shadow-lg rounded-lg sm:shadow-none">
                            <div className="space-y-4">

                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                    <Input type="text" label="First Name" required name="firstName" placeholder="Enter first name" value={values.firstName} onChange={handleChange} />
                                    <Input type="text" label="Last Name" required name="lastName" placeholder="Enter Last name" value={values.lastName} onChange={handleChange} />
                                </div>


                                <Input type="email" label="Email Address" required name="email" placeholder="Enter email" value={values.email} onChange={handleChange} />


                                <div className="custom-input-phone-wrapper">
                                    <label htmlFor='phone' className="text-13 font-medium font-inter">Phone No <span className="text-red-500">*</span></label>
                                    <PhoneInput
                                        international
                                        defaultCountry="AE"
                                        name="phone"
                                        placeholder="Type Your Phone No"
                                        value={values.phone}
                                        onChange={(value) => setFieldValue("phone", value)}
                                    />
                                </div>

                                <Select name="country" label="Country" placeholder="Select Country" required options={[{ value: "United Arab Emirates", label: "United Arab Emirates" }]} />


                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                    <Select name="emirate" label="Emirate" required placeholder="Select Emirate" options={emirates} />
                                    <div>
                                        <CustomSelect name="city" label="City" required placeholder="Select City" options={UAEStates} value={selectedCity}
                                            onChange={(value) => setSelectedCity(value)}
                                        />
                                        {isSubmitting && !selectedCity && <div className="text-red-500 text-sm">City is required</div>}

                                    </div>
                                </div>


                                <Input type="text" label="Address" required name="address" placeholder="Enter Address" value={values.address} onChange={handleChange} />
                                <Input type="text" label="Additional Information" name="note" placeholder="Apartment, Suite, etc." value={values.note} onChange={handleChange} />


                                <div className="flex items-center">
                                    <Checkbox
                                        required
                                        name="terms"
                                        onChange={(e) => setFieldValue("terms", e.target.checked)}
                                        checked={values.terms}
                                        className="custom-checkbox"
                                    >
                                        I have read and agree to the Terms and Conditions
                                    </Checkbox>
                                </div>
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
                                            {!selectedCity ? 'Select shipping city' : selectedFee > 0 ? `AED ${selectedFee}` : 'Free'}
                                        </span>
                                    </p>
                                    <p className="text-lg font-bold flex justify-between">Total Incl. VAT: <span>AED {selectedCity ? total.toFixed(2) : subTotal.toFixed(2)}</span></p>
                                </div>
                                <div className="pb-10 border-t-2 pt-4">
                                    <button type="submit" className={`w-full bg-primary text-white p-2 `} disabled={isSubmitting} >
                                        {isSubmitting ? "Processing..." : "Pay Now"}
                                    </button>
                                </div>
                                <div className="flex justify-center items-center gap-2 mt-4">
                                    <Image src={secureImg} alt="secure img" className="w-4 xs:w-7 h-5 xs:h-8" />
                                    <p className="text-13 xs:text-15 sm:text-17">Secure shopping with SSL data encryption</p>
                                </div>
                                <div className="border-b">

                                    <Collapse accordion defaultActiveKey={['1']} bordered={false} expandIcon={({ isActive }) => (isActive ? <AiOutlineMinus size={18} /> : <AiOutlinePlus size={18} />)} expandIconPosition="end" className="w-full bg-transparent custom-collapse">
                                        <Panel
                                            header={<span className="text-slate-500">Shipping Options</span>}
                                            key="1"
                                            className="!border-b-0"
                                        >
                                            <div
                                                className={`bg-white px-2 xs:px-4 py-2 mt-2 flex gap-2 xs:gap-4 items-center cursor-pointer border-2 ${selectedShipping === "express" ? "border-primary" : "border-transparent"
                                                    }`}
                                                onClick={() => handleShippingSelect("express")}
                                            >
                                                <Image src={lightImg} alt="icon" className="size-12 xs:size-16" />
                                                <div>
                                                    <strong className="text-15 xs:text-20">Express Shipping:</strong>
                                                    <p className="text-11 xs:text-16">delivery <strong>Next day</strong></p>
                                                    <p className="text-11 xs:text-16">
                                                        <span>Delivery Cost:</span> <strong>AED 150</strong>, <span>Free shipping for all orders above <strong>AED 1000</strong></span>
                                                    </p>
                                                </div>
                                            </div>

                                            <div
                                                className={`bg-white px-2 xs:px-4 py-2 mt-2 flex gap-2 xs:gap-4 items-center cursor-pointer border-2 ${selectedShipping === "standard" ? "border-primary" : "border-transparent"
                                                    }`}
                                                onClick={() => handleShippingSelect("standard")}
                                            >
                                                <Image src={deliveryImg} alt="icon" className="size-12 xs:size-16" />
                                                <div>
                                                    <strong className="text-15 xs:text-20">Standard Shipping:</strong>
                                                    <p className="text-11 xs:text-16">Receive within <strong>3-4 working days</strong></p>
                                                    <p className="text-11 xs:text-16">
                                                        <span>Delivery Cost:</span> <strong>Free</strong>
                                                    </p>
                                                </div>
                                            </div>


                                            <div className={`bg-white px-2 xs:px-4 py-2 mt-2 flex gap-2 xs:gap-4 items-center cursor-pointer border-2 ${selectedShipping === "self-collect" ? "border-primary" : "border-transparent"
                                                }`} onClick={() => handleShippingSelect("self-collect")}
                                            >
                                                <Image src={locationImg} alt="icon" className="size-12 xs:size-16" />
                                                <div>
                                                    <strong className="text-15 xs:text-20">Self-Collect:</strong>
                                                    <p className="text-11 xs:text-16">Collection Monday-Saturday <strong>(9am-6pm)</strong></p>
                                                    <p className="text-11 xs:text-16">
                                                        <span>Location:</span> <strong><Link className="hover:text-primary" target="_blank" rel="noopener noreferrer" href="https://www.google.com/maps/place/J1+Warehouses/@24.9871787,55.0799029,13z/data=!4m6!3m5!1s0x3e5f43c5045ac9ab:0xe8fe6b6d3731e2f9!8m2!3d24.9871066!4d55.1211025!16s%2Fg%2F11fsb5fcvx?entry=ttu&amp;g_ep=EgoyMDI1MDIxMi4wIKXMDSoJLDEwMjExNDUzSAFQAw%3D%3D">Agsons, J1 Warehouses, Jebel Ali  Industrial – Dubai</Link></strong>
                                                    </p>
                                                </div>
                                            </div>
                                        </Panel>

                                        <Panel
                                            header={<span className="text-slate-500">Installation</span>}
                                            key="2"
                                            className="!border-b-0"
                                        >
                                            <div className="bg-white px-2 xs:px-4 py-2 mt-2 flex gap-2 xs:gap-4 items-center">
                                                <Image src={light_2Img} alt="icon" className="size-12 xs:size-16" />
                                                <div>
                                                    <strong className="text-15 xs:text-20">Installation Information:</strong>
                                                    <p className="text-11 xs:text-16">Installation charge for straight planks is AED 25 per metre square, and for herringbone is AED 35 per metre square. We&apos;re based in Dubai, so just a heads-up—other locations in Emirates may have additional charges.
                                                    </p>
                                                    <Link target="_blank" rel="noopener noreferrer" className=" hover:text-primary underline text-primary font-bold" href="/measurement-appointment ">Book Free Installation Appointment</Link>
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
                                </div >
                            </div >
                        </div >
                    </Form >
                )}
            </Formik >
        </Container >
    );
};

export default Checkout;
