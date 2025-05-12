/** @type {import('next').NextConfig} */
const nextConfig = {
  // Image configuration
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'source.unsplash.com',
        port: '',
        pathname: '/**',
      },
    ],
    // Enable image optimization for better performance
    unoptimized: false,
  },
  // Enable strict mode for better development experience
  reactStrictMode: true,
  // Static export configuration
  output: 'export',
  // Disable ESLint during build
  eslint: {
    ignoreDuringBuilds: true,
  },
  // Disable TypeScript checking during build
  typescript: {
    ignoreBuildErrors: true,
  },
  // Add trailing slashes for consistent SEO 
  trailingSlash: true,
  // Disable x-powered-by header for security
  poweredByHeader: false,
  // Compress assets
  compress: true,
};

module.exports = nextConfig;
