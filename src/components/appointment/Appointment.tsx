"use client";
import { Formik, Form, Field } from "formik";
import Input from "./Input";
import { useFormState } from "react-dom";
import { useEffect } from "react";
import Select from "./Select";
import { Appointmentlocation, FindUs, initialValues, validationSchema } from "types/interface";
import Checkbox from "./checkbox";

interface FormState {
  success?: string;
  error?: string;
}

async function handleSubmit(): Promise<FormState> {
  await new Promise((resolve) => setTimeout(resolve, 1000));
  return { success: "Form submitted successfully!" };
}

export default function Appointment() {
  const [formState, formAction] = useFormState(handleSubmit, {});

  useEffect(() => {
    if (formState?.success) {
      alert(formState.success);
    }
  }, [formState]);

  return (
    <div className="pt-10">
      <div className="sm:max-w-[95%] mx-auto p-2 sm:p-4 2xl:p-6 shadow-2xl rounded-2xl">
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={async (values, { setSubmitting,resetForm }) => {
            setSubmitting(true);
            const formData = new FormData();
            Object.entries(values).forEach(([key, value]) => {
              if (typeof value === "object") {
                formData.append(key, JSON.stringify(value)); // Convert object to string
              } else {
                formData.append(key, value);
              }
            });
            formAction();
            setSubmitting(false);
            resetForm();
          }}
        >
          {({ isSubmitting }) => (
            <Form className="space-y-2">
              <div className="grid  grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 sm:gap-2 lg:gap-4 mb-3">
                <Input type="text"  label="Name" name="firstname" placeholder="Enter Your Full Name" required/>
                <Input type="number" label="Phone No" name="phoneNumber"placeholder=" Type Your Phone No  " required/>
                <Input type="number" label="WhatsApp No. If Different"  placeholder=" Type Your WhatsApp No"  name="whatsappNumber"  /> 
                <Input type="email"  label="Email"  name="email"  placeholder="Enter Your Full Name"  required  />
                <Select  name="area" label="Area" placeholder="Select Location Area"  required options={Appointmentlocation}/>
                <Input type="text" label="Select Rooms" name="selectRooms" placeholder="How Many Rooms? " required />
                <Input type="date" label="Preferred Date" name="preferredDate" required />
                <Select name="preferredTime" label="Preferred Time" placeholder="Am / Pm"  
                  options={[
                    { value: "Am", label: "Am" },
                    { value: "Pm", label: "Pm" },
                  ]}
                />
                <Select name="findUs" label="How did you find us?" placeholder="Google Search" options={FindUs} />
               
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
              <Field as="textarea"name="comment" className="w-full pt-3 p-2 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary placeholder:text-13 placeholder:font-light placeholder:text-[#828282] h-52">

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