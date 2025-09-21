import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: 'export',
  basePath: '/my-dev-portfolio', // Replace with your repository name
  images: {
    domains: ["cdn.sanity.io"],
    unoptimized: true, // Required for static export with external images
  },
};

export default nextConfig;
