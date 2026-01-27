import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  typescript: {
    ignoreBuildErrors: true,
  },
  // Trigger deployment: Vercel Reconnected
};

export default nextConfig;
