/** @type {import('next').NextConfig} */
const nextConfig = {
  // Enable proper static export for Vercel
  output: 'export',
  // Optimize images
  images: {
    unoptimized: true,
  },
  // React Strict Mode for development
  reactStrictMode: true,
  // Clean up the build
  trailingSlash: false,
};

module.exports = nextConfig;