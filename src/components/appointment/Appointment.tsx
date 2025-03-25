"use client";
import { Formik, Form, Field } from "formik";
import Input from "./Input";
import Select from "./Select";
import { Appointmentlocation, FindUs, initialValues, validationSchema } from "data/data";
import Checkbox from "./checkbox";
import { useMutation } from "@apollo/client";
import { CREATE_APPOINTMENT } from "graphql/mutations";
import { toast } from "react-toastify";
import PhoneInput from 'react-phone-number-input';
import 'react-phone-number-input/style.css';


export default function Appointment({ AppointsType }: { AppointsType: string }) {
  const [createAppointment] = useMutation(CREATE_APPOINTMENT);


  return (
    <div className="pt-10">
      <div className="sm:max-w-[95%] mx-auto p-2 sm:p-4 2xl:p-6 shadow-2xl rounded-2xl">
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={async (values, { setSubmitting, resetForm }) => {
            setSubmitting(true);
            try {
              await createAppointment({
                variables: {
                  input: {
                    ...values,
                    AppointsType: AppointsType,
                  },

                },
              });

              resetForm();
              toast.success("Appointment booked successfully!");
            } catch (error) {
              toast.error("Failed to book appointment. Please try again.");
              return error
            } finally {
              setSubmitting(false);

            }

          }}
        >
          {({ values, handleChange, isSubmitting }) => (
            <Form className="space-y-2">
              <div className="grid  grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 sm:gap-2 lg:gap-4 mb-3">
                <Input type="text" label="Name" name="firstname" placeholder="Enter Your Full Name" required value={values.firstname} onChange={handleChange} />
                <div className="custom-input-phone-wrapper">
                  <label htmlFor='phoneNumber' className="text-13 font-medium font-inter">
                  Phone No <span className="text-red-500">*</span>
                  </label>
                  <PhoneInput
                    international
                    defaultCountry="AE"
                    label="Phone No"
                    name="phoneNumber"
                    placeholder="Type Your Phone No"
                    value={values.phoneNumber}
                    onChange={(value) => handleChange({ target: { name: 'phoneNumber', value } })}
                  />
                </div>
                <div className="custom-input-phone-wrapper">
                  <label htmlFor='whatsappNumber' className="text-13 font-medium font-inter">
                    WhatsApp No. If Different <span className="text-red-500">*</span>
                  </label>
                  <PhoneInput
                    international
                    defaultCountry="AE"
                    label="WhatsApp No. If Different"
                    name="whatsappNumber"
                    placeholder="Type Your WhatsApp No"
                    value={values.whatsappNumber}
                    onChange={(value) => handleChange({ target: { name: 'whatsappNumber', value } })}
                  />
                </div>
                <Input type="email" label="Email" name="email" placeholder="Enter Your Full Name" required value={values.email} onChange={handleChange} />
                <Select name="area" label="Location" placeholder="Select Location" required options={Appointmentlocation} />
                <Input type="text" label="Select Rooms" name="selectRooms" placeholder="How Many Rooms? " required value={values.selectRooms} onChange={handleChange} />
                <Input type="date" label="Preferred Date" name="preferredDate" required value={values.preferredDate} onChange={handleChange} min={new Date().toISOString().split("T")[0]} />
                <Input type="time" label="Preferred Time" name="preferredTime" required value={values.preferredTime} onChange={handleChange} />
                <Select name="findUs" label="How did you find us?" placeholder="Select Platform" options={FindUs} />
              </div>
              <div className="pb-2">
                <label className="text-13 font-medium font-inter ">How shall we contact you?</label>
                <div className="flex gap-4 items-center pt-2">
                  <Field name="contactMethod.whatsapp" component={Checkbox} label="WhatsApp" />
                  <Field name="contactMethod.telephone" component={Checkbox} label="Telephone" />
                  <Field name="contactMethod.email" component={Checkbox} label="Email" />
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-13 font-medium font-inter">What is your query regarding?</label>
                <Field as="textarea" name="comment" className="w-full pt-3 p-2 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary placeholder:text-13 placeholder:font-light placeholder:text-[#828282] h-52">

                </Field>
              </div>
              <SubmitButton isSubmitting={isSubmitting} />
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
}

function SubmitButton({ isSubmitting }: { isSubmitting: boolean }) {
  return (
    <div className="text-center">
      <button
        type="submit"
        disabled={isSubmitting}
        className="w-fit bg-primary text-white p-2 lg:py-3 px-4 sm:px-10 font-inter text-15"
      >
        {isSubmitting ? "Submitting..." : "BOOK A FREE APPOINTMENT"}
      </button>
    </div>
  );
}