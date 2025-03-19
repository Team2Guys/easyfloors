"use server";

import * as Yup from "yup";

const validationSchema = Yup.object({
  fullName: Yup.string()
    .min(3, "Full Name must be at least 3 characters")
    .required("Full Name is required"),
  email: Yup.string()
    .email("Invalid email format")
    .required("Email is required"),
  password: Yup.string()
    .min(6, "Password must be at least 6 characters")
    .matches(/[A-Z]/, "Password must contain at least one uppercase letter")
    .matches(/[a-z]/, "Password must contain at least one lowercase letter")
    .matches(/[0-9]/, "Password must contain at least one number")
    .matches(/[!@#$%^&*]/, "Password must contain at least one special character")
    .required("Password is required"),
  retypePassword: Yup.string()
    .oneOf([Yup.ref("password")], "Passwords must match")
    .required("Please confirm your password"),
});

const forgotPasswordSchema = Yup.object({
  newPassword: Yup.string()
    .min(6, "Password must be at least 6 characters")
    .required("New password is required"),
  retypeNewPassword: Yup.string()
    .oneOf([Yup.ref("newPassword")], "Passwords must match")
    .required("Please retype the new password"),
});

export const registerUser = async (
  prevState: { message: string },
  formData: FormData
): Promise<{ message: string }> => {
  const fullName = formData.get("fullName") as string;
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;
  const retypePassword = formData.get("retypePassword") as string;

  try {
    await validationSchema.validate({ fullName, email, password, retypePassword }, { abortEarly: false });
  } catch (error) {
    if (error instanceof Yup.ValidationError) {
      return { message: error.errors.join(", ") };
    }
    return { message: "An unexpected error occurred." };
  }

  if (email === "test@example.com") {
    return { message: "User already exists." };
  }

  return { message: "Registration successful!" };
};

export const authenticateUser = async (
  prevState: { message: string },
  formData: FormData
): Promise<{ message: string }> => {
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;

  if (!email || !password) {
    return { message: "Email and password are required!" };
  }

  if (email === "test@gmail.com" && password === "Test@123") {
    return { message: "Login successful!" };
  }

  return { message: "Invalid email or password!" };
};

export const handleForgotPassword = async (
  prevState: { message: string },
  formData: FormData
): Promise<{ message: string }> => {
  const newPassword = formData.get("newPassword") as string;
  const retypeNewPassword = formData.get("retypeNewPassword") as string;

  try {
    await forgotPasswordSchema.validate({ newPassword, retypeNewPassword }, { abortEarly: false });
  } catch (error) {
    if (error instanceof Yup.ValidationError) {
      return { message: error.errors.join(", ") };
    }
    return { message: "An unexpected error occurred." };
  }

  return { message: "Password reset successfully!" };
};
