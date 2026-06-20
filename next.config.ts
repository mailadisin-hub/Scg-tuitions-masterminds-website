import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Self-contained server at .next/standalone/server.js so Hostinger can
  // launch the built app directly. Honors PORT / HOSTNAME env vars.
  output: "standalone",

  // Serve the self-contained quiz as the site homepage. A `beforeFiles`
  // rewrite is resolved before page files, so "/" serves the static
  // quiz HTML in /public while keeping the clean URL.
  async rewrites() {
    return {
      beforeFiles: [
        { source: "/", destination: "/scg-masterminds-v3.1.html" },
      ],
      afterFiles: [],
      fallback: [],
    };
  },
};

export default nextConfig;
