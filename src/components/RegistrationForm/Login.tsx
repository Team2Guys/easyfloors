"use client";

import { FaEnvelope, FaLock } from "react-icons/fa";
import Link from "next/link";
import { AuthData } from "types/types";
import useAuthForm from "hooks/useAuthForm";
import { loginData } from "data/data";
import InputField from "components/ui/InputField";

const LoginForm = () => {
  const data: AuthData = loginData;
  const { formData, handleChange, handleSubmit } = useAuthForm();

  return (
    <div className="flex flex-col md:flex-row w-full h-screen">
    
      <div className="hidden md:block md:w-1/2 bg-cover bg-center" style={{ backgroundImage: "url('assets/images/aboutus/order-free-sample.png')" }}></div>

      
      <div className="w-full md:w-1/2 flex items-center justify-center p-6 md:p-12">
        <div className="w-full max-w-md">
          <h2 className="text-lg font-semibold text-gray-600">{data.title}</h2>
          <h3 className="text-2xl font-bold mt-2">{data.subtitle}</h3>
          <p className="text-gray-500 mt-1">{data.description}</p>

          
          <form className="mt-6" onSubmit={handleSubmit}>
            <InputField type="email" name="email" placeholder={data.emailPlaceholder} icon={<FaEnvelope />} value={formData.email} onChange={handleChange} />
            <InputField type="password" name="password" placeholder={data.passwordPlaceholder} icon={<FaLock />} value={formData.password} onChange={handleChange} />

          
            <div className="mb-4">
              <Link href="/forgot-password" className="text-black hover:underline">
                {data.forgotPasswordText}
              </Link>
            </div>

            
            <button type="submit" className="w-full bg-primary text-white p-3 ">
              {data.buttonText}
            </button>
          </form>

          
          <p className="text-center mt-4">
            {data.footerText}{" "}
            <Link href="/signup" className="text-blue-600 font-semibold hover:underline">
              {data.footerLinkText}
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoginForm;
