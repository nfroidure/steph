import type { NextConfig } from "next";

const baseURL = process.env.NEXT_PUBLIC_BASE_URL;
const basePath = process.env.NEXT_PUBLIC_BASE_PATH || '';
const assetPrefix = `${baseURL}${basePath}`;
const allowedDevOrigins = baseURL
  ? [baseURL.replace(/^https?:\/\/(.*)(:[0-9]+)$/, "$1")]
  : [];
const nextConfig: NextConfig = {
  output: 'export',
  trailingSlash: false,
  distDir: 'out',
  reactStrictMode: true,
  assetPrefix,
  basePath,
  allowedDevOrigins,
  env: {
    // Avoid dynamic years
    BUILD_YEAR: new Intl.DateTimeFormat("fr-FR", {
      timeZone: "Europe/Paris",
      year: "numeric",
    }).format(),
  }
};

export default nextConfig;
