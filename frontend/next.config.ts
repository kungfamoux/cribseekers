import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  /* App Router Configuration */
  reactStrictMode: true,
  
  /* Environment Variables */
  env: {
    NEXT_PUBLIC_API_URL: process.env.NEXT_PUBLIC_API_URL,
    NEXT_PUBLIC_GOOGLE_MAPS_KEY: process.env.NEXT_PUBLIC_GOOGLE_MAPS_KEY,
    NEXT_PUBLIC_SOCKET_URL: process.env.NEXT_PUBLIC_SOCKET_URL,
  },

  /* Image Optimization */
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'cribseekers.onrender.com',
        pathname: '/uploads/**',
      },
      {
        protocol: 'https',
        hostname: '**.googleapis.com',
      },
      {
        protocol: 'https',
        hostname: '**.gstatic.com',
      },
    ],
    formats: ['image/webp', 'image/avif'],
  },

  /* Performance */
  compress: true,
  
  /* Source Maps - Disabled in production */
  productionBrowserSourceMaps: false,

  /* Experimental Features */
  experimental: {
    optimizePackageImports: ['lucide-react'],
  },

  /* Headers */
  async headers() {
    return [
      {
        source: '/:path*',
        headers: [
          {
            key: 'X-DNS-Prefetch-Control',
            value: 'on'
          },
          {
            key: 'Strict-Transport-Security',
            value: 'max-age=63072000; includeSubDomains; preload'
          },
          {
            key: 'X-Frame-Options',
            value: 'SAMEORIGIN'
          },
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff'
          },
          {
            key: 'Referrer-Policy',
            value: 'origin-when-cross-origin'
          },
          {
            key: 'Content-Security-Policy',
            value: "default-src 'self'; script-src 'self' 'unsafe-eval' 'unsafe-inline' https://*.googleapis.com https://*.gstatic.com https://cribseekers.onrender.com; style-src 'self' 'unsafe-inline' https://*.googleapis.com https://*.gstatic.com; img-src 'self' data: https: blob:; font-src 'self' https://*.googleapis.com https://*.gstatic.com; connect-src 'self' https://cribseekers.onrender.com https://*.googleapis.com wss://cribseekers.onrender.com; frame-src 'self' https://*.google.com; media-src 'self' https: blob:; object-src 'none'; base-uri 'self'; form-action 'self'; frame-ancestors 'self';"
          },
        ],
      },
    ];
  },

  /* Redirects */
  async redirects() {
    return [
      {
        source: '/dashboard',
        destination: '/dashboard/home',
        permanent: false,
      },
    ];
  },
};

export default nextConfig;
