import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,

  turbopack: {
    root: __dirname, // force Turbopack root to this package
  },
};

export default nextConfig;
