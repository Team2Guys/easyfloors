import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    domains: [
      'res.cloudinary.com',
      "www.facebook.com"
    ],
   unoptimized: false
  },
};

export default nextConfig;
