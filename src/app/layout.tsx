import type { Metadata } from "next";
import "./globals.css";
import { Inter } from "next/font/google";

import PathnameWrapper from "components/PathnameWrapper";
import Customprovider from "../redux/CustomProvider";
import { ToastContainer } from "react-toastify";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-Inter",
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
  style: ["normal", "italic"],
});

export const metadata: Metadata = {
  title: ' Flooring in UAE | SPC, LVT & Herringbone | Easy Floors',
  description:
    'Shop SPC, LVT, and Herringbone flooring at factory-direct prices. Fast UAE delivery, free samples, easy installment options only at Easy Floors.',
  openGraph: {
    title: ' Flooring in UAE | SPC, LVT & Herringbone | Easy Floors',
    description: 'Shop SPC, LVT, and Herringbone flooring at factory-direct prices. Fast UAE delivery, free samples, easy installment options only at Easy Floors.',
    url: '/',
    images: [{url: "/assets/images/logo.png", alt: 'Easyfloors',
      },
    ],
  },
  alternates: {
    canonical: '/',
  },
};

export default function RootLayout({
  children, 
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${inter.variable}`}>
        <Customprovider>
          <PathnameWrapper>
            {children}
            <ToastContainer />
          </PathnameWrapper>
        </Customprovider>
      </body>
    </html>
  );
}