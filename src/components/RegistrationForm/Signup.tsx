"use client";

import { Formik, Form, Field } from "formik";
import Link from "next/link";
import { BiArrowBack } from "react-icons/bi";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import client from "config/apolloClient";
import { CREATE_USER } from "graphql/user_mutation";
import { FaEnvelope, FaLock, FaPhoneAlt, FaUser } from "react-icons/fa";
import { BsEye, BsEyeSlash } from "react-icons/bs";
import { useState } from "react";

import { useRouter } from "next/navigation";
import { loginData } from "data/data";

const SignupForm = () => {
  const [showPassword, setShowPassword] = useState(false);

  const router = useRouter();
  const formValues = {
    name: "",
    email: "",
    password: "",
    retypePassword: "",
    phone: "",
  };

  return (
    <div className="flex flex-col h-screen w-full md:flex-row">
      <div
        className="bg-center bg-cover hidden md:block md:w-1/2"
        style={{ backgroundImage: "url('/assets/images/login.webp')" }}
      />

      <div className="flex justify-center p-6 w-full items-start md:p-12 md:w-1/2">
        <div className="w-full max-w-xl">
          <Link href="/" className="flex text-lg w-fit gap-3 items-center">
            <span className="bg-primary p-3 text-white">
              <BiArrowBack />
            </span>
            Back to home
          </Link>
          <h2 className="sm:text-4xl text-2xl text-center text-primary font-bold font-inter mt-8" dangerouslySetInnerHTML={{ __html: loginData.title }} />

          <h2 className="sm:text-4xl text-2xl text-center font-bold font-inter mt-8">
            Sign Up
          </h2>

          <Formik
            initialValues={formValues}
            onSubmit={async (values, { setSubmitting }) => {
              const { retypePassword, phone, ...newValues } = values;
              console.log(retypePassword, "retreive password")
              await client.mutate({
                mutation: CREATE_USER,
                variables: {
                  createUser: { ...newValues, phone: phone.toString() },
                },
              });
              router.push('/login');
              setSubmitting(false);
            }}
          >
            {({ isSubmitting }) => (
              <Form className="mt-10">

                <div className="flex border-b items-center mb-4">
                  <FaUser className="text-primary" />
                  <Field type="text" name="name" placeholder="Full Name" className="p-3 shadow-none w-full focus:outline-none focus:ring-0 pl-4" />
                </div>

                <div className="flex border-b items-center mb-4">
                  <FaEnvelope className="text-primary" />
                  <Field type="email" name="email" placeholder="Email" className="p-3 shadow-none w-full focus:outline-none focus:ring-0 pl-4" />
                </div>
                <div className="flex border-b items-center mb-4">
                  <FaPhoneAlt className="text-primary" />
                  <Field type="number" name="phone" placeholder="Phone Number" className="p-3 shadow-none w-full focus:outline-none focus:ring-0 pl-4" />
                </div>
                <div className="flex border-b justify-between items-center relative">
                  <div className="flex w-full items-center">
                    <FaLock className="text-primary" />
                    <Field type={showPassword ? "text" : "password"} name="password" placeholder="Password" className="p-3 shadow-none w-full focus:outline-none focus:ring-0 pl-4" />
                  </div>
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="text-primary -translate-y-1/2 absolute focus:outline-none right-3 top-1/2 transform"
                  >
                    {showPassword ? <BsEyeSlash /> : <BsEye />}
                  </button>
                </div>
                <div className="flex border-b justify-between items-center relative">
                  <div className="flex w-full items-center">
                    <FaLock className="text-primary" />
                    <Field type={showPassword ? "text" : "password"} name="retypePassword" placeholder="Confirm Password" className="p-3 shadow-none w-full focus:outline-none focus:ring-0 pl-4" />
                  </div>
                </div>
                <div className="pt-7">
                  <button
                    type="submit"
                    className="bg-primary p-3 text-white w-full"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? "Creating Account..." : "Sign Up"}
                  </button>
                </div>
              </Form>
            )}
          </Formik>

          <p className="text-center mt-4">
            Already have an account? {" "}
            <Link href="/login" className="text-primary font-semibold hover:underline">
              Login
            </Link>
          </p>
        </div>
      </div>

      <ToastContainer position="top-right" autoClose={3000} hideProgressBar closeOnClick pauseOnHover draggable theme="light" />
    </div>
  );
};

export default SignupForm;
