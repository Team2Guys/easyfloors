import * as Yup from 'yup';

export const initialValues = {
    firstname: "",
    phoneNumber: "",
    whatsappNumber: "",
    email: "",
    area: "",
    selectRooms: "",
    preferredDate: "",
    preferredTime: "",
    findUs: "",
    comment: "",
    contactMethod: {
    whatsapp: false,
    telephone: false,
    email: false,
  },
};

export const validationSchema = Yup.object({
  firstname: Yup.string().required("Name is required"),
  phoneNumber: Yup.string()
    .matches(/^\d{10}$/, "Invalid phone number")
    .required("Phone number is required"),
  whatsappNumber: Yup.string().matches(
    /^\d{10}$/,
    "Invalid WhatsApp number"
  ),
  email: Yup.string()
    .email("Invalid email")
    .required("Email is required"),
  area: Yup.string().required("Area is required"),
  selectRooms: Yup.string().required("Select the number of rooms"),
  preferredDate: Yup.string().required("Preferred date is required"),
});

export const Appointmentlocation=[
    { value: "Downtown Dubai", label: "Downtown Dubai" },
    { value: "Jumeirah", label: "Jumeirah" },
    { value: "Dubai Marina", label: "Dubai Marina" },
    { value: "Deira", label: "Deira" },
    { value: "Bur Dubai", label: "Bur Dubai" },
    { value: "Al Quoz", label: "Al Quoz" },
    { value: "Business Bay", label: "Business Bay" },
    { value: "Al Barsha", label: "Al Barsha" },
    { value: "Silicon Oasis", label: "Silicon Oasis" },
    { value: "Dubai Internet City", label: "Dubai Internet City" },
  ]

  export const FindUs=[
    { value: "Google", label: "Google" },
    { value: "Tiktok", label: "Tiktok" },
    { value: "Facebook", label: "Facebook" },
    { value: "Friends", label: "Friends" },
    { value: "ReturningCustomer", label: "Returning Customer" },
    { value: "Radio", label: "Radio" },
    { value: "Other", label: "Other" },
  ]