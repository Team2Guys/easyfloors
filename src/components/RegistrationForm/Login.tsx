"use client";

import { useEffect } from "react";
import { FaEnvelope, FaLock } from "react-icons/fa";
import Link from "next/link";
import { useFormState, useFormStatus } from "react-dom";
import { BiArrowBack } from "react-icons/bi";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { authenticateUser } from "hooks/authActions";
import { loginData } from "data/data";
import InputField from "components/ui/InputField";

const LoginForm = () => {
  const [state, formAction] = useFormState(authenticateUser, { message: "" });
  const { pending } = useFormStatus();

  useEffect(() => {
    if (!state.message) return;
    toast[state.message.toLowerCase().includes("success") ? "success" : "error"](state.message);
  }, [state.message]);
       
  return (
    <div className="flex flex-col md:flex-row w-full h-screen">
      <div className="hidden md:block md:w-1/2 bg-cover bg-center" style={{ backgroundImage: "url('/assets/images/login.webp')" }} />

      <div className="w-full md:w-1/2 flex items-start justify-center p-6 md:p-12">
        <div className="w-full max-w-xl">
          <Link href="/" className="flex items-center gap-3 w-fit text-lg">
            <span className="p-3 text-white bg-primary"><BiArrowBack /></span>
            Back to home
          </Link>

          <h2 className="text-4xl font-bold font-inter text-primary text-center mt-20" dangerouslySetInnerHTML={{ __html: loginData.title }} />
          <h3 className="text-4xl font-normal mb-4 mt-14 text-center">{loginData.subtitle}</h3>
          <p className="text-gray-500 mt-2 text-sm text-center">{loginData.description}</p>

          <form className="mt-12" action={formAction}>
            <InputField type="email" name="email" placeholder={loginData.emailPlaceholder} icon={<FaEnvelope />} required />
            <InputField type="password" name="password" placeholder={loginData.passwordPlaceholder} icon={<FaLock />} required />

            <p className="mt-2 text-sm">
              <Link href="/forgot-password" className="text-black hover:underline">
                {loginData.forgotPasswordText}
              </Link>
            </p>

            <button type="submit" className="w-full bg-primary text-white p-3 mt-5" disabled={pending}>
              {pending ? "Signing In..." : "Sign In"}
            </button>
          </form>

          <p className="text-center mt-4">
            {loginData.footerText}{" "}
            <Link href="/signup" className="text-primary font-semibold hover:underline">
              {loginData.footerLinkText}
            </Link>
          </p>
        </div>
      </div>

      <ToastContainer position="top-right" autoClose={2000} hideProgressBar closeOnClick pauseOnHover />
    </div>
  );
};

export default LoginForm;
