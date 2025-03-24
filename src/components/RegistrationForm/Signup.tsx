"use client";

import { Formik, Form, Field } from "formik";
import Link from "next/link";
import { BiArrowBack } from "react-icons/bi";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import client from "config/apolloClient";
import { CREATE_USER } from "graphql/user_mutation";
import { useRouter } from "next/navigation";

const SignupForm = () => {
const router = useRouter();
  const formValues ={
    name: "",
    email: "",
    password: "",
    retypePassword: "",
    phone: "",
  };

  return (
    <div className="flex flex-col md:flex-row w-full h-screen">
      <div
        className="hidden md:block md:w-1/2 bg-cover bg-center"
        style={{ backgroundImage: "url('/assets/images/login.webp')" }}
      />

      <div className="w-full md:w-1/2 flex items-start justify-center p-6 md:p-12">
        <div className="w-full max-w-xl">
          <Link href="/" className="flex items-center gap-3 w-fit text-lg">
            <span className="p-3 text-white bg-primary">
              <BiArrowBack />
            </span>
            Back to home
          </Link>

          <h2 className="text-4xl font-bold font-inter text-primary text-center mt-20">
            Sign Up
          </h2>

          <Formik
            initialValues={formValues}
            onSubmit={async (values, { setSubmitting }) => {
const {retypePassword, phone, ...newValues} = values;
console.log(retypePassword, "retreive password")
           await client.mutate({
                mutation: CREATE_USER,
                variables: {createUser: {...newValues, phone: phone.toString()}, 
              },
              });
              router.push('/login');
              setSubmitting(false);
            }}
          >
            {({ isSubmitting }) => (
              <Form className="mt-10">

                <div className="mb-4">
                  <Field type="text" name="name" placeholder="Full Name" className="w-full p-3 border rounded" />
                </div>

                <div className="mb-4">
                  <Field type="email" name="email" placeholder="Email" className="w-full p-3 border rounded" />
                </div>

                <div className="mb-4">
                  <Field type="password" name="password" placeholder="Password" className="w-full p-3 border rounded" />
                </div>
                
                <div className="mb-4">
                  <Field type="number" name="phone" placeholder="Phone Number" className="w-full p-3 border rounded" />
                </div>
                <div className="mb-4">
                  <Field type="password" name="retypePassword" placeholder="Confirm Password" className="w-full p-3 border rounded" />
                </div>

                <div className="pt-7">
                  <button
                    type="submit"
                    className="w-full bg-primary text-white p-3"
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
