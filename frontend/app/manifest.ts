import { MetadataRoute } from 'next';

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'CribSeekers - Nigeria\'s Premier Real Estate Platform',
    short_name: 'CribSeekers',
    description: 'Find your perfect property in Nigeria. Buy, rent, or sell properties with confidence using our secure escrow system and verified listings.',
    start_url: '/',
    display: 'standalone',
    background_color: '#ffffff',
    theme_color: '#064e3b',
    orientation: 'portrait-primary',
    icons: [
      {
        src: '/logo.png',
        sizes: 'any',
        type: 'image/png',
        purpose: 'any',
      },
    ],
    categories: ['real estate', 'property', 'housing'],
  };
}
