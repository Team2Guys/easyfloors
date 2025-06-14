"use client";

import { ChangeEvent, useEffect, useState } from "react";
import { ErrorMessage, Form, Formik } from "formik";
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
import { emirateCityMap, emirates } from "data/data";
import { toast } from "react-toastify";
import { ICart } from "types/prod";
import { getCart, getFreeSamplesCart } from "utils/indexedDB";
import { paymentcard } from "data/cart";
import PaymentMethod from "components/product-detail/payment";
import { useMutation } from "@apollo/client";
import { INITIATE_FREE_SAMPLE, INITIATE_PAYMENT } from "graphql/mutations";
import Input from "components/appointment/Input";
import Select from "components/appointment/Select";
import { Collapse } from "antd";
import { checkoutValidationSchema } from "hooks/CheckoutValidaion";
import { MdKeyboardArrowDown } from "react-icons/md";
import { formatAED } from "lib/helperFunctions";
import showToast from "components/Toaster/Toaster";
import revalidateTag from "components/ServerActons/ServerAction";


const Checkout = () => {
    const { Panel } = Collapse;
    const [totalProducts, setTotalProducts] = useState(0);
    const [subTotal, setSubTotal] = useState(0);
    const [total, setTotal] = useState(0);
    const [mergedCart, setMergedCart] = useState<ICart[]>([]);
    const [selectedFee, setSelectedFee] = useState(0);
    const [selectedCity, setSelectedCity] = useState('');
    const [selectedShipping, setSelectedShipping] = useState<string | null>(null);
    const [shipping, setShipping] = useState<{ name: string; fee: number; deliveryDuration: string; freeShipping?: number; } | undefined>(undefined);
    const [selectedEmirate, setSelectedEmirate] = useState("");
    const [cityOptions, setCityOptions] = useState<{ value: string; label: string }[]>([]);
    const [isOtherCity, setIsOtherCity] = useState(false);
    const [otherCity, setOtherCity] = useState('');
    const [allItemsAreFreeSamples, seallItemsAreFreeSamples] = useState(false);

    useEffect(() => {
        const savedEmirate = localStorage.getItem('selectedEmirate');
        if (savedEmirate) {
            setSelectedEmirate(savedEmirate.replaceAll('"', ""));
        }
    }, []);

    useEffect(() => {
        if (!selectedEmirate) return;
        const cities = emirateCityMap[selectedEmirate] || [];
        const sortedCities = cities
            .slice()
            .sort((a, b) => a.label.localeCompare(b.label));
        sortedCities.push({ value: "Other", label: "Other Areas" });
        setCityOptions(sortedCities);


        if (selectedShipping === 'express' && selectedEmirate !== 'Dubai') {
            setSelectedShipping('standard');
            handleShippingSelect('standard');
        }

        localStorage.setItem('selectedEmirate', JSON.stringify(selectedEmirate));

    }, [selectedEmirate]);



    useEffect(() => {
        if (shipping) {
            localStorage.setItem('shipping', JSON.stringify(shipping));
            localStorage.setItem('selectedShipping', JSON.stringify(selectedShipping));
        }
    }, [shipping]);


    useEffect(() => {
        const savedShipping = localStorage.getItem('shipping');
        if (savedShipping) {
            const parsedShipping = JSON.parse(savedShipping);
            handleShippingSelect(parsedShipping.name.toLowerCase().replace(" ", "-"));
        }
    }, [subTotal]);


    useEffect(() => {
        const savedShipping = localStorage.getItem('shipping');
        if (!savedShipping) return;
        if (savedShipping) {
            const parsedShipping = JSON.parse(savedShipping);

            if (parsedShipping.name === "Express Shipping") {
                setSelectedShipping("express");
                handleShippingSelect("express");
            } else if (parsedShipping.name === "Self-Collect") {
                setSelectedShipping("self-collect");
                handleShippingSelect("self-collect");
            } else if (parsedShipping.name === "Standard Shipping") {
                setSelectedShipping("standard");
                handleShippingSelect("standard");
            }
            else {
                handleShippingSelect("standard");
            }
        }
    }, [subTotal]);

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
    const [initiateFreesample] = useMutation(INITIATE_FREE_SAMPLE);

    const handlePayment = async (orderData: FormInitialValues,) => {
        try {
            if (allItemsAreFreeSamples && !subTotal) {

                await initiateFreesample({ variables: { createFreesample: orderData } });

                showToast('success', "Free sample request submitted successfully")
                return
            }

            const { data } = await initiatePayment({ variables: { createSalesProductInput: orderData } });
            const paymentKey = data.createSalesProduct.paymentKey;
            if (!paymentKey.client_secret) return showToast('error', "payment Key not found")

            const redirect_url = `https://uae.paymob.com/unifiedcheckout/?publicKey=${process.env.NEXT_PUBLIC_PAYMOB_PUBLIC_KEY}&clientSecret=${paymentKey.client_secret}`;
            window.location.href = redirect_url
            revalidateTag('orders')
            //eslint-disable-next-line
        } catch (err: any) {
            console.log(err, "error")
            const errorMessage =
                err?.graphQLErrors?.[0]?.message ||
                err?.networkError?.message ||
                err?.message ||
                "Something went wrong";

            showToast('error', errorMessage);

            return err
        }
    };


    useEffect(() => {
        const fetchCartItems = async () => {
            try {
                const items = await getCart();
                const freeSamples = await getFreeSamplesCart();
                const allItemsAreFreeSamples = freeSamples.length > 0 && freeSamples.every(item => item.isfreeSample);
                seallItemsAreFreeSamples(allItemsAreFreeSamples)

                setMergedCart([...items, ...freeSamples]);
                setTotalProducts(items.length);
                const subTotalPrice = items.reduce((total, item) => total + (item.pricePerBox || 0) * (item.requiredBoxes ?? 0), 0);
                setSubTotal(subTotalPrice);
            } catch {
                toast.error("Error fetching cart items:");
            }
        };

        fetchCartItems();
    }, []);

    const handleShippingSelect = (type: string) => {
        setSelectedShipping(type);

        let fee = 0;
        if (type === 'express') {
            fee = selectedEmirate === 'Dubai' ? (subTotal > 1000 ? 0 : 150) : (subTotal > 1000 ? 0 : 150);
        } else if (type === 'standard') {
            fee = 0;
        } else if (type === 'self-collect') {
            setSelectedEmirate('Dubai');
            localStorage.setItem('selectedEmirate', JSON.stringify('Dubai'));
            fee = 0;
        }

        setSelectedFee(fee);
        console.log(subTotal, "subTotalPrice", fee)
        setTotal(subTotal + fee);
    };

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
    }, [selectedShipping,]);


    console.log("allItemsAreFreeSamples", !allItemsAreFreeSamples, selectedEmirate)
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
                validationSchema={checkoutValidationSchema}
                validateOnMount

                onSubmit={(values, { setSubmitting }) => {
                    try {
                        const { terms, ...withoutTerm } = values; //eslint-disable-line
                        // const shippingOption = { name:  } 
                        const NewValues = {
                            ...withoutTerm,
                            city: isOtherCity ? otherCity : selectedCity, shipmentFee: selectedFee, totalPrice:
                                total, products: mergedCart, shippingMethod: shipping
                        }

                        setSubmitting(true);
                        handlePayment(NewValues);

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
                                    <Input
                                        type="text"
                                        label="First Name"
                                        required
                                        name="firstName"
                                        placeholder="Enter first name"
                                        value={values.firstName}
                                        onChange={handleChange}
                                    />
                                    {/* <ErrorMessage name="firstName" component="div" className="text-red-500 text-sm" /> */}
                                    <div className="flex flex-col mb-1">
                                        <label htmlFor="Last Name" className="text-13 font-medium font-inter mb-1">Last Name</label>
                                        <input type="text" className="p-2 border border-gray-300 h-11 focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary w-full placeholder:text-13 placeholder:font-light placeholder:text-[#828282]" name="lastName" placeholder="Enter Last name" value={values.lastName} onChange={handleChange} />
                                    </div>
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
                                        className="ring-0 !outline-none"
                                        onChange={(value) => setFieldValue("phone", value)}
                                    />
                                    <ErrorMessage name="phone" component="div" className="text-red-500 text-sm" />

                                </div>

                                <Select name="country" label="Country" placeholder="Select Country" required options={[{ value: "United Arab Emirates", label: "United Arab Emirates" }]} />


                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                    <Select
                                        name="emirate"
                                        label="Emirate"
                                        options={emirates}
                                        placeholder="Select Emirate"
                                        initialValue={selectedEmirate}
                                        onChange={(val) => setSelectedEmirate(val)}
                                    />
                                    <Select
                                        name="city"
                                        label="Area"
                                        allowOther
                                        options={cityOptions}
                                        placeholder="Select Area"
                                        onChange={(value) => {
                                            setFieldValue("city", value);
                                            setSelectedCity(value);
                                            setIsOtherCity(value === "Other" || value === "Other Areas");
                                        }}
                                    />
                                </div>
                                {isOtherCity && (
                                    <Input
                                        name="otherCity"
                                        label="Add Area"
                                        placeholder="Enter Your Area"
                                        value={otherCity}
                                        onChange={(e: ChangeEvent<HTMLInputElement>) => setOtherCity(e.target.value)}
                                    />
                                )}

                                <Input type="text" label="Address" required name="address" placeholder="Enter Address" value={values.address} onChange={handleChange} />
                                <Input type="text" label="Additional Information" name="note" placeholder="Apartment, Suite, etc." value={values.note} onChange={handleChange} />


                                <div className="flex items-center">
                                    <div className="flex items-center gap-1">
                                        <input
                                            type="checkbox"
                                            checked={values.terms}
                                            name="terms"
                                            onChange={(e) => setFieldValue("terms", e.target.checked)}
                                            id="terms-checkbox"
                                            className="hidden"
                                        />

                                        <label htmlFor="terms-checkbox" className="checkbox-label flex items-center space-x-2 cursor-pointer">
                                            <div
                                                className={`w-5 h-5 border-2 flex items-center justify-center transition-colors duration-200 ${values.terms ? "bg-orange-600 border-orange-600 text-white" : "border-primary"
                                                    }`}
                                            >
                                                {values.terms && (
                                                    <svg
                                                        xmlns="http://www.w3.org/2000/svg"
                                                        className="w-4 h-4 text-white"
                                                        fill="none"
                                                        viewBox="0 0 24 24"
                                                        stroke="currentColor"
                                                        strokeWidth={3}
                                                    >
                                                        <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                                                    </svg>
                                                )}
                                            </div>
                                            <span>
                                                I have read and agree to the{" "}
                                                <Link href="terms-and-conditions" className="text-primary hover:underline">
                                                    Terms and Conditions
                                                </Link>
                                            </span>
                                        </label>


                                        <ErrorMessage name="terms" component="div" className="text-red-500 text-sm mt-1" />
                                    </div>

                                </div>

                            </div>
                        </div>
                        <div className="bg-[#FFF9F5] w-full">
                            <div className="p-2 xs:p-4 sm:p-8">
                                <div className="flex items-center gap-4 pb-4 border-b">
                                    <h2 className="text-xl xs:text-2xl">Order Summary</h2>
                                    <span>
                                        (<span className="text-red-600 pt-1">*Total {`${totalProducts}`} {totalProducts > 1 ? "Items" : "Item"}</span>)
                                    </span>
                                </div>
                                <div className="space-y-4 max-h-[210px] overflow-y-auto pe-1 xs:pe-4 pt-3 mt-1">
                                    {mergedCart.length > 0 ? mergedCart.map((item, index) => (
                                        <div key={index} className="flex items-center border-b pb-4">
                                            <div className="p-1 bg-white border rounded-md">
                                                <Image src={item.matchedProductImages?.imageUrl ?? item.image ?? ""} alt={item.name} width={80} height={80} />
                                            </div>
                                            <div className="ml-4">
                                                <p className="font-bold text-13 xs:text-16">{item.name}</p>
                                                {item.isfreeSample ? "" :
                                                    <p className="text-sm text-gray-600 text-12 xs:text-14">No. of Boxes: <span className="font-semibold">{item.requiredBoxes}</span> ({item.squareMeter.toFixed(2)} SQM)</p>
                                                }
                                                {item?.selectedColor?.colorName &&
                                                    <p className="text-sm text-gray-600 text-12 xs:text-14">Color:<span> {item?.selectedColor?.colorName || ""}</span></p>
                                                }
                                            </div>
                                            <p className="ml-auto font-medium text-nowrap text-13 xs:text-16"><span className="font-currency font-normal text-20"></span> {formatAED(item.totalPrice)}</p>
                                        </div>
                                    )) : <p>Cart is Empty</p>}
                                </div>
                            </div>
                            <div className="px-2 xs:px-4 sm:px-8 pb-10 border-t-2">
                                <div className="space-y-2 py-4">
                                    <p className="text-gray-600 flex justify-between">Subtotal <span className="text-black"><span className="font-currency text-20 font-normal"></span> {formatAED(subTotal)}</span></p>

                                    <div className="border-b">

                                        <Collapse accordion defaultActiveKey={['1']} bordered={false} expandIcon={({ isActive }) => (isActive ? <MdKeyboardArrowDown size={20} /> : <MdKeyboardArrowDown size={20} />)} expandIconPosition="end" className="w-full bg-transparent custom-collapse">
                                            <Panel
                                                header={<span className="text-slate-500">Shipping Options</span>}
                                                key="1"
                                                className="!border-b-0"
                                            >
                                                {(selectedEmirate === "Dubai" || !selectedEmirate) && allItemsAreFreeSamples == false && (
                                                    <div
                                                        className={`bg-white px-2 xs:px-4 py-2 mt-2 flex gap-2 xs:gap-4 items-center cursor-pointer border-2 ${selectedShipping === "express" ? "border-primary" : "border-transparent"}`}
                                                        onClick={() => handleShippingSelect("express")}
                                                    >
                                                        <Image src={lightImg} alt="icon" className="size-12 xs:size-16" />
                                                         <div className="text-11 xs:text-16">
                                                            <strong className="text-15 xs:text-20">Express Service (Dubai Only)</strong>
                                                            <p className="text-11 xs:text-16">Delivery <strong>Next working day (cut-off time 1pm)</strong></p>
                                                            <p>Delivery Cost: <strong><span className="font-currency font-normal text-18"></span>150</strong> for orders under <strong><span className="font-currency font-normal text-18"></span>999</strong></p>
                                                            <p>Free for orders above <strong><span className="font-currency font-normal text-18"></span>1000</strong></p>  
                                                         </div>
                                                    </div>
                                                )}
                                                <div
                                                    className={`bg-white px-2 xs:px-4 py-2 mt-2 flex gap-2 xs:gap-4 items-center cursor-pointer border-2 ${selectedShipping === "standard" ? "border-primary" : "border-transparent"
                                                        }`}
                                                    onClick={() => handleShippingSelect("standard")}
                                                >
                                                    <Image src={deliveryImg} alt="icon" className="size-12 xs:size-16" />
                                                    <div>
                                                        <strong className="text-15 xs:text-20">Standard Service (All Emirates)</strong>
                                                        <p className="text-11 xs:text-16">Receive within <strong>2-3 working days</strong></p>
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
                                                        <p className="text-11 xs:text-16">Installation charge for straight planks is <span className="font-currency text-18 font-normal"></span> 25 per metre square, and for herringbone is <span className="font-currency text-18 font-normal"></span> 35 per metre square. We&apos;re based in Dubai, so just a heads-up—other locations in Emirates may have additional charges.
                                                        </p>
                                                        <Link target="_blank" rel="noopener noreferrer" className=" hover:text-primary underline text-primary font-bold" href="/help-with-installations">Book Installation Appointment</Link>
                                                    </div>
                                                </div>
                                            </Panel>

                                            <Panel header={<span className="text-slate-500">Return Policy</span>} key="5">
                                                <p className="text-gray-500">
                                                    We offer 7-day hassle-free returns on all unused, sealed items in their original packaging. If you change your mind or receive a defective product, we’re here to help. <Link className="font-semibold text-red-500 hover:text-red-500 hover:underline underline" href="/return-and-refund-policy">Learn more</Link>
                                                </p>
                                            </Panel>
                                        </Collapse>
                                    </div>

                                    <p className="text-gray-600 flex justify-between">
                                        <span className="flex items-center gap-2">
                                            Shipping <CiDeliveryTruck size={16} className="mt-1" />
                                        </span>
                                        <span className="text-black">
                                            {!selectedCity
                                                ? 'Select shipping city'
                                                : selectedShipping === 'express'
                                                    ? subTotal > 1000
                                                        ? 'Free'
                                                        : <span className="font-currency font-normal text-18"> {selectedFee}</span>
                                                    : 'Free'
                                            }
                                        </span>
                                    </p>
                                    <p className="text-lg font-bold flex justify-between">Total Incl. VAT: <span><span className="font-currency font-normal text-20"></span> {selectedEmirate ? formatAED(total) : formatAED(subTotal)}</span></p>
                                </div>
                                <div className="pb-10 border-t-2 pt-4">
                                    <button type="submit" className={`w-full bg-primary text-white p-2 `} disabled={isSubmitting} >
                                        {isSubmitting ? "Processing..." : allItemsAreFreeSamples ? 'Place Order' : "Pay Now"}
                                    </button>
                                </div>
                                <div className="flex justify-center items-center gap-2 mt-4">
                                    <Image src={secureImg} alt="secure img" className="w-4 xs:w-7 h-5 xs:h-8" />
                                    <p className="text-13 xs:text-15 sm:text-17">Secure shopping with SSL data encryption</p>
                                </div>

                                {
                                    subTotal > 0 &&
                                    <div className="mt-4">
                                        <h3 className="text-20 xs:text-24 font-medium text-center">Buy Now, Pay Later</h3>
                                        <div className="flex gap-2 my-4 mx-auto w-full 2xl:max-w-3xl">
                                            <PaymentMethod installments={(subTotal + (selectedFee || 0)) / 4} />
                                        </div>
                                    </div>
                                }
                                <div className="mx-auto w-full max-w-xl mt-2">
                                    <h3 className="text-18 xs:text-20 text-center font-medium">Guaranteed Safe Checkout</h3>
                                    <div className="flex justify-between flex-wrap gap-5 pt-3">
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
