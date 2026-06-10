import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "weider.com.tr",
        port: "",
        pathname: "/**",
      },
    ],
  },
};

export default nextConfig;
