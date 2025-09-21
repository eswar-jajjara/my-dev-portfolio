import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    domains: ["cdn.sanity.io"],
    unoptimized: true, // Required for static export with external images
  },
};

export default nextConfig;
