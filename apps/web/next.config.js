/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  transpilePackages: ['@cribseekers/ui', '@cribseekers/types', '@cribseekers/validation', '@cribseekers/config', '@cribseekers/api-client'],
  output: 'standalone',
  images: {
    domains: ['localhost'],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**',
      },
    ],
  },
  env: {
    NEXT_PUBLIC_API_URL: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001/api/v1',
  },
};

module.exports = nextConfig;
