import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  webpack5: true,
  webpack: (config) => {
    config.resolve.fallback = { fs: false, net: false, dns: false, child_process: false, tls: false }
    return config
  }
};

export default nextConfig;
