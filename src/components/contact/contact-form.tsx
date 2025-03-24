"use client";

import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useMutation } from "@apollo/client";
import { CONTACT_US_EMAIL_MUTATION } from "graphql/mutations";
import { toast } from "react-toastify";

interface FormValues {
  firstName: string;
  LastName: string;
  email: string;
  phoneNumber: string;
  message: string;
}

const validationSchema = Yup.object({
  firstName: Yup.string()
    .min(2, "First name must be at least 2 characters")
    .max(50, "First name must be less than 50 characters")
    .required("First name is required"),
  LastName: Yup.string()
    .min(2, "Last name must be at least 2 characters")
    .max(50, "Last name must be less than 50 characters")
    .required("Last name is required"),
  email: Yup.string()
    .email("Invalid email address")
    .required("Email is required"),
  phoneNumber: Yup.string()
    .matches(/^[0-9-]+$/, "Phone number must contain only numbers and dashes")
    .min(10, "Phone number must be at least 10 digits")
    .required("Phone number is required"),
  message: Yup.string()
    .min(10, "Message must be at least 10 characters")
    .max(500, "Message must be less than 500 characters")
    .required("Message is required"),
});

const initialValues: FormValues = {
  firstName: "",
  LastName: "",
  email: "",
  phoneNumber: "",
  message: "",
};

const ContactForm: React.FC = () => {
  const [sendContactEmail, { loading, error }] = useMutation(CONTACT_US_EMAIL_MUTATION);

  const handleSubmit = async (values: FormValues, { resetForm }: { resetForm: () => void }) => {
    try {

      await sendContactEmail({ variables: { contactUsEmail: values } });
      toast.success("Message sent successfully");
      resetForm();
    } catch (error) {

      throw error;
    }
  };

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={handleSubmit}
    >
      {({ isSubmitting }) => (
        <Form>
          <div className="grid grid-cols-2 gap-5 mt-4">
            <div>
              <label
                htmlFor="firstName"
                className="text-14 md:text-20 font-medium font-inter"
              >
                First Name
              </label>
              <Field
                type="text"
                name="firstName"
                className="w-full p-2 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary mt-2"
                required
              />
              <ErrorMessage
                name="firstName"
                component="div"
                className="text-red-500 text-sm mt-1"
              />
            </div>

            <div>
              <label
                htmlFor="LastName"
                className="text-14 md:text-20 font-medium font-inter"
              >
                Last Name
              </label>
              <Field
                type="text"
                name="LastName"
                className="w-full p-2 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary mt-2"
                required
              />
              <ErrorMessage
                name="LastName"
                component="div"
                className="text-red-500 text-sm mt-1"
              />
            </div>

            <div>
              <label
                htmlFor="email"
                className="text-14 md:text-20 font-medium font-inter"
              >
                Email
              </label>
              <Field
                type="email"
                name="email"
                className="w-full p-2 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary mt-2"
                required
              />
              <ErrorMessage
                name="email"
                component="div"
                className="text-red-500 text-sm mt-1"
              />
            </div>

            <div>
              <label
                htmlFor="phoneNumber"
                className="text-14 md:text-20 font-medium font-inter"
              >
                Phone Number
              </label>
              <Field
                type="tel"
                name="phoneNumber"
                className="w-full p-2 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary mt-2"
                required
              />
              <ErrorMessage
                name="phoneNumber"
                component="div"
                className="text-red-500 text-sm mt-1"
              />
            </div>

            <div className="col-span-2">
              <label
                htmlFor="message"
                className="text-14 md:text-20 font-medium font-inter"
              >
                Message
              </label>
              <Field
                as="textarea"
                name="message"
                className="w-full h-40 sm:h-60 p-2 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary mt-2"
                required
                maxLength={500}
              />
              <ErrorMessage
                name="message"
                component="div"
                className="text-red-500 text-sm mt-1"
              />
            </div>
          </div>

          {error && (
            <div className="text-red-500 text-center text-sm mt-2">
              Error sending Message:{error.message}
            </div>
          )}

          <div className="w-full text-end mt-5">
            <button
              type="submit"
              disabled={isSubmitting || loading}
              className="w-[200px] sm:w-[300px] h-[50px] sm:h-[83px] border border-primary text-black hover:text-white font-medium font-inter hover:bg-primary hover:bg-primary-dark duration-300 ease-in-out text-16 sm:text-20 disabled:opacity-50 disabled:cursor-not-allowed"
            >

              {isSubmitting || loading ? "Sending..." : "Send Message"}
            </button>
          </div>
        </Form>
      )}
    </Formik>
  );
};

export default ContactForm;