"use client";

import { useEffect } from "react";
import { Formik, Form } from "formik";
import { FaUser, FaEnvelope, FaLock } from "react-icons/fa";
import Link from "next/link";
import InputField from "components/ui/InputField";
import { useFormState, useFormStatus } from "react-dom";
import { signupData } from "data/data";
import { BiArrowBack } from "react-icons/bi";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { registerUser } from "hooks/authActions";

const SignupForm = () => {
  const data = signupData;
  const [state, formAction] = useFormState(registerUser, { message: "" });
  const { pending } = useFormStatus();

  useEffect(() => {
    if (!state?.message) return;
  
    const message = state.message.toLowerCase();
    const toastType = message.includes("success") ? "success" : "error";
  
    toast[toastType](state.message);
  }, [state?.message]);

  return (
    <div className="flex flex-col md:flex-row w-full h-screen">
      <div
        className="hidden md:block md:w-1/2 bg-cover bg-center"
        style={{ backgroundImage: "url('/assets/images/aboutus/order-free-sample.png')" }}
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
            {data.title}
          </h2>
          <h3 className="text-4xl font-normal mb-4 mt-14 text-center">{data.subtitle}</h3>

          <Formik
            initialValues={{ fullName: "", email: "", password: "", retypePassword: "" }}
            onSubmit={(values, { setSubmitting }) => {
              const formData = new FormData();
              formData.append("fullName", values.fullName);
              formData.append("email", values.email);
              formData.append("password", values.password);
              formData.append("retypePassword", values.retypePassword);

              formAction(formData);
              setSubmitting(false);
            }}
          >
            {({ isSubmitting }) => (
              <Form className="mt-10">
                <InputField type="text" name="fullName" placeholder="Full Name" icon={<FaUser />} />
                <InputField type="email" name="email" placeholder="Email" icon={<FaEnvelope />} />
                <InputField type="password" name="password" placeholder="Password" icon={<FaLock />} />
                <InputField
                  type="password"
                  name="retypePassword"
                  placeholder="Confirm Password"
                  icon={<FaLock />}
                />

                <div className="pt-7">
                  <button
                    type="submit"
                    className="w-full bg-primary text-white p-3"
                    disabled={pending || isSubmitting}
                  >
                    {pending || isSubmitting ? "Creating Account..." : "Sign Up"}
                  </button>
                </div>
              </Form>
            )}
          </Formik>

          <p className="text-center mt-4">
            Already have an account?{" "}
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
