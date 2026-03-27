import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  allowedDevOrigins: ['172.17.0.239', '172.17.0.239:3000', 'localhost:3000']
};

export default nextConfig;
