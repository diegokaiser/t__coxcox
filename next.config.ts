import MillionLint from "@million/lint";
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  webpack: (config) => {
    config.resolve.fallback = { fs: false, net: false, dns: false, child_process: false, tls: false }
    return config
  }
};

export default MillionLint.next({
  enabled: true,
  rsc: true
})(nextConfig);
