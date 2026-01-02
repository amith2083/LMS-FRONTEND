import type { NextConfig } from "next";

const nextConfig: NextConfig = {
    eslint: {
    ignoreDuringBuilds: true, //these fields are for hide ts error during production in vercel
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    domains: ["res.cloudinary.com", "www.pngplay.com","lh3.googleusercontent.com"],
  },
};

export default nextConfig;
