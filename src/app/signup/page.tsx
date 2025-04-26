import SignupForm from "components/RegistrationForm/Signup";
import { Metadata } from "next";
export const metadata: Metadata = {
  title: 'Create Your Easy Floors Account | Join Our Flooring Community',
  description:
    'Sign up with Easy Floors to get access to exclusive offers, track your orders, and request free samples. Fast registration and instant access.',
  openGraph: {
    title: 'Create Your Easy Floors Account | Join Our Flooring Community',
    description: 'Sign up with Easy Floors to get access to exclusive offers, track your orders, and request free samples. Fast registration and instant access.',
    url: '/signup',
    images: [{url: "/assets/images/logo.png", alt: 'Easyfloors',
      },
    ],
  },
  alternates: {
    canonical: '/signup',
  },
};
const SignUpPage = () => {
  return <SignupForm />;
};

export default SignUpPage;

