import LoginForm from "components/RegistrationForm/Login";
import { Metadata } from "next";
export const metadata: Metadata = {
  title: 'Login to Your Easy Floors Account | Secure Access',
  description:
    'Access your Easy Floors account to track orders, manage preferences, and explore premium flooring collections. Quick, secure, and easy login.',
  openGraph: {
    title: 'Login to Your Easy Floors Account | Secure Access',
    description: 'Access your Easy Floors account to track orders, manage preferences, and explore premium flooring collections. Quick, secure, and easy login.',
    url: '/login',
    images: [{url: "/assets/images/logo.png", alt: 'Easyfloors',
      },
    ],
  },
  alternates: {
    canonical: '/login',
  },
};
const LoginPage = () => {
  return <LoginForm />;
};

export default LoginPage;


