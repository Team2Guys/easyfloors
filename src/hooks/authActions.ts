"use server";

import * as Yup from "yup";


const forgotPasswordSchema = Yup.object({
  newPassword: Yup.string()
    .min(6, "Password must be at least 6 characters")
    .matches(
      /^(?=.*[a-z])/,
      "Password must contain at least one lowercase letter"
    )
    .required("New password is required"),
  retypeNewPassword: Yup.string()
    .oneOf([Yup.ref("newPassword")], "Passwords must match")
    .required("Please retype the new password"),
});

const loginSchema = Yup.object({
  email: Yup.string()
    .email("Invalid email address")
    .required("Email is required"),
  password: Yup.string().required("Password is required"),
});

export const authenticateUser = async (
  prevState: { message: string },
  formData: FormData
): Promise<{ message: string }> => {
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;

  try {
    await loginSchema.validate({ email, password }, { abortEarly: false });

    if (email === "test@gmail.com" && password === "Test@123") {
      return { message: "Login successful!" };
    }

    return { message: "Invalid email or password!" };
  } catch (error) {
    if (error instanceof Yup.ValidationError) {
      return { message: error.errors.join(", ") };
    }
    return { message: "An unexpected error occurred." };
  }
};

export const handleForgotPassword = async (
  prevState: { message: string },
  formData: FormData
): Promise<{ message: string }> => {
  const newPassword = formData.get("newPassword") as string;
  const retypeNewPassword = formData.get("retypeNewPassword") as string;

  try {
    await forgotPasswordSchema.validate(
      { newPassword, retypeNewPassword },
      { abortEarly: false }
    );
    return { message: "Password reset successfully!" };
  } catch (error) {
    if (error instanceof Yup.ValidationError) {
      return { message: error.errors.join(", ") };
    }
    return { message: "An unexpected error occurred." };
  }
};