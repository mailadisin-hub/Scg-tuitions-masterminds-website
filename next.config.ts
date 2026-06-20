import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Produce a self-contained server at .next/standalone/server.js so
  // platforms that launch the app directly (Hostinger, Docker, etc.)
  // have a runnable entry point. Honors PORT / HOSTNAME env vars.
  output: "standalone",
};

export default nextConfig;
