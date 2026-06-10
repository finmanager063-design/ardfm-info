import type { NextConfig } from "next";
import path from "path";

const isGithubPages = process.env.GITHUB_PAGES === "true";
const configuredBasePath = process.env.NEXT_PUBLIC_BASE_PATH;
const basePath = isGithubPages ? (configuredBasePath ?? "/ardfm-info") : "";
const normalizedBasePath = basePath === "/" ? "" : basePath.replace(/\/$/, "");

const nextConfig: NextConfig = {
  output: isGithubPages ? "export" : undefined,
  basePath: normalizedBasePath,
  assetPrefix: isGithubPages && normalizedBasePath ? `${normalizedBasePath}/` : undefined,
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
