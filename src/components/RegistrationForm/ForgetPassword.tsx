"use client";

import { useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Link from "next/link";
import { handleForgotPassword } from "hooks/authActions";

const ForgotPassword = () => {
  const [loading, setLoading] = useState(false);

  const validationSchema = Yup.object({
    newPassword: Yup.string()
      .min(6, "Password must be at least 6 characters")
      .matches(/[A-Z]/, "Password must contain at least one uppercase letter")
      .matches(/[a-z]/, "Password must contain at least one lowercase letter")
      .matches(/[0-9]/, "Password must contain at least one number")
      .matches(/[!@#$%^&*]/, "Password must contain at least one special character")
      .required("New password is required"),
    retypeNewPassword: Yup.string()
      .oneOf([Yup.ref("newPassword")], "Passwords must match")
      .required("Please retype the new password"),
  });

  return (
    <div className="max-w-md mx-auto mt-10 p-6 border rounded-lg shadow-lg bg-white">
      <h2 className="text-2xl font-bold mb-4 text-center">Reset Password</h2>
      <Formik
        initialValues={{ newPassword: "", retypeNewPassword: "" }}
        validationSchema={validationSchema}
        onSubmit={async (values, { setSubmitting }) => {
          setLoading(true);
          const formData = new FormData();
          formData.append("newPassword", values.newPassword);
          formData.append("retypeNewPassword", values.retypeNewPassword);

          const response = await handleForgotPassword({ message: "" }, formData);

          if (response.message === "Password reset successfully!") {
            toast.success(response.message);
          } else {
            toast.error(response.message);
          }

          setSubmitting(false);
          setLoading(false);
        }}
      >
        {({ isSubmitting }) => (
          <Form className="space-y-4">
            <div>
              <label className="block text-sm font-medium">New Password</label>
              <Field
                type="password"
                name="newPassword"
                className="w-full border p-2 rounded"
              />
              <ErrorMessage name="newPassword" component="div" className="text-red-500 text-sm" />
            </div>

            <div>
              <label className="block text-sm font-medium">Retype New Password</label>
              <Field
                type="password"
                name="retypeNewPassword"
                className="w-full border p-2 rounded"
              />
              <ErrorMessage name="retypeNewPassword" component="div" className="text-red-500 text-sm" />
            </div>

            <button
              type="submit"
              className={`w-full bg-primary text-white p-3 rounded ${
                isSubmitting || loading ? "opacity-50 cursor-not-allowed" : ""
              }`}
              disabled={isSubmitting || loading}
            >
              {loading ? "Resetting Password..." : "Reset Password"}
            </button>
          </Form>
        )}
      </Formik>

      <div className="mt-4 text-center">
        <Link href="/" className="text-blue-500 hover:underline">Back to Home</Link>
      </div>
      <ToastContainer position="top-right" autoClose={3000} />
    </div>
  );
};

export default ForgotPassword;
