"use server";

export const registerUser = async (
  prevState: { message: string }, 
  formData: FormData
): Promise<{ message: string }> => {
  const fullName = formData.get("fullName") as string;
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;
  const retypePassword = formData.get("retypePassword") as string;

  console.log("Register User Data:", { fullName, email, password, retypePassword });

  if (!fullName || !email || !password || !retypePassword) {
    return { message: "All fields are required." };
  }

  if (password !== retypePassword) {
    return { message: "Passwords do not match." };
  }

  if (email === "test@example.com") {
    return { message: "User already exists." };
  }

  console.log("Registration successful!");
  return { message: "Registration successful!" };
};

export const authenticateUser = async (
  prevState: { message: string }, 
  formData: FormData
): Promise<{ message: string }> => {
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;

  console.log("Login User Data:", { email, password });

  if (!email || !password) {
    console.log("Error: Email and password are required!");
    return { message: "Email and password are required!" };
  }

  if (email === "test@gmail.com" && password === "test123") {
    console.log("Login successful!");
    return { message: "Login successful!" };
  } else {
    console.log("Error: Invalid email or password!");
    return { message: "Invalid email or password!" };
  }
};
