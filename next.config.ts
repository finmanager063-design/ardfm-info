import type { NextConfig } from "next";
import path from "path";

const isGithubPages = process.env.GITHUB_PAGES === "true";
const basePath = isGithubPages ? "/regylz" : "";

const nextConfig: NextConfig = {
  output: isGithubPages ? "export" : undefined,
  basePath,
  assetPrefix: isGithubPages ? "/regylz/" : undefined,
  trailingSlash: isGithubPages,
  images: {
    unoptimized: true,
    remotePatterns: [
      { protocol: "https", hostname: "www.gov.kz", pathname: "/uploads/**" },
    ],
  },
  turbopack: {
    root: path.join(__dirname),
  },
};

export default nextConfig;
