import type { NextConfig } from "next";

// GitHub Pages serves project sites under /<repository>/. The Pages workflow
// passes the path reported by actions/configure-pages, so a later custom domain
// (served from the root) only needs a workflow change, not a code change.
const basePath = process.env.PAGES_BASE_PATH ?? "";

const nextConfig: NextConfig = {
  output: "export",
  basePath,
  trailingSlash: true,
  images: {
    // Static export has no image optimization server.
    unoptimized: true,
  },
  turbopack: {
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
};

export default nextConfig;
