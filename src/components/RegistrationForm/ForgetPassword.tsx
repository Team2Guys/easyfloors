"use client";

import { useFormik } from "formik";
import * as Yup from "yup";
import Link from "next/link";
import { FaLock } from "react-icons/fa";
import { BiArrowBack } from "react-icons/bi";
import InputField from "components/ui/InputField";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const ForgotPassword = () => {
  const formik = useFormik({
    initialValues: {
      newPassword: "",
      retypeNewPassword: "",
    },
    validationSchema: Yup.object({
      newPassword: Yup.string().min(6, "Password must be at least 6 characters").required("New password is required"),
      retypeNewPassword: Yup.string()
        .oneOf([Yup.ref("newPassword")], "Passwords must match")
        .required("Please retype the new password"),
    }),
    onSubmit: async (values, { setSubmitting }) => {
      try {
        await new Promise((resolve) => setTimeout(resolve, 1000));
        toast.success("Password reset successfully!");
      } catch (error) {
        console.log(error);
        toast.error("Something went wrong. Please try again.");
      }
      setSubmitting(false);
    },
  });

  return (
    <div className="flex flex-col md:flex-row w-full h-screen">
      <div className="hidden md:block md:w-1/2 bg-cover bg-center" style={{ backgroundImage: "url('/assets/images/aboutus/order-free-sample.png')" }} />

      <div className="w-full md:w-1/2 flex items-start justify-center p-6 md:p-12">
        <div className="w-full max-w-xl">
          <Link href="/" className="flex items-center gap-3 w-fit text-lg">
            <span className="p-3 text-white bg-primary">
              <BiArrowBack />
            </span>
            Back to home
          </Link>

          <h2 className="text-4xl font-bold text-primary text-center mt-20">Reset Password</h2>
          <h3 className="text-lg text-gray-500 text-center mt-4">Enter your new password below</h3>

          <form className="mt-10" onSubmit={formik.handleSubmit}>
            <InputField
              type="password"
              name="newPassword"
              placeholder="New Password"
              icon={<FaLock />}
              value={formik.values.newPassword}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              required
            />
            {formik.touched.newPassword && formik.errors.newPassword && (
              <p className="text-red-500 text-sm">{formik.errors.newPassword}</p>
            )}

            <InputField
              type="password"
              name="retypeNewPassword"
              placeholder="Retype New Password"
              icon={<FaLock />}
              value={formik.values.retypeNewPassword}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              required
            />
            {formik.touched.retypeNewPassword && formik.errors.retypeNewPassword && (
              <p className="text-red-500 text-sm">{formik.errors.retypeNewPassword}</p>
            )}

            <div className="pt-7">
              <button type="submit" className="w-full bg-primary text-white p-3" disabled={formik.isSubmitting}>
                {formik.isSubmitting ? "Resetting Password..." : "Reset Password"}
              </button>
            </div>
          </form>

          <p className="text-center mt-4">
            Remembered your password? {" "}
            <Link href="/login" className="text-primary font-semibold hover:underline">
             Sign In here
            </Link>
          </p>
        </div>
      </div>

      <ToastContainer position="top-right" autoClose={3000} hideProgressBar closeOnClick pauseOnHover draggable />
    </div>
  );
};

export default ForgotPassword;
