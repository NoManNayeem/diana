/** @type {import('next').NextConfig} */
const isExport = process.env.NEXT_EXPORT === 'true';
const basePath = process.env.NEXT_PUBLIC_BASE_PATH || '';

const nextConfig = {
  // Enable static export when targeting GitHub Pages
  ...(isExport ? { output: 'export', images: { unoptimized: true } } : {}),
  // Support hosting under a subpath like /repo for GitHub Pages
  ...(basePath ? { basePath, assetPrefix: `${basePath}/` } : {}),
};

export default nextConfig;
