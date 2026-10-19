import type { NextConfig } from "next";

const isGithubPages = process.env.GITHUB_PAGES === "true";

const nextConfig: NextConfig = {
  ...(isGithubPages
    ? {
        assetPrefix: "/profitsite/",
        basePath: "/profitsite",
        images: {
          unoptimized: true,
        },
        output: "export" as const,
        trailingSlash: true,
      }
    : {}),
  ...(!isGithubPages
    ? {
        cacheComponents: true,
        partialPrefetching: true,
      }
    : {}),
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
