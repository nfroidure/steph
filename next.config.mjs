/** @type {import('next').NextConfig} */


const basePath = process.env.NEXT_PUBLIC_BASE_PATH || '';
// Internal NextJS assets
const assetPrefix = process.env.NEXT_PUBLIC_ASSET_PREFIX;

const config = {
  output: 'export',
  trailingSlash: false,
  distDir: 'out',
  reactStrictMode: true,
  assetPrefix,
  basePath,
  env: {
    // Avoid dynamic years
    BUILD_YEAR: new Intl.DateTimeFormat("fr-FR", {
      timeZone: "Europe/Paris",
      year: "numeric",
    }).format(),
  }
};

export default config;
