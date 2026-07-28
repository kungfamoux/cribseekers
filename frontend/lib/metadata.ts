import { Metadata } from 'next';

export function generatePageMetadata({
  title,
  description,
  keywords,
  canonical,
  ogImage,
  ogType = 'website',
}: {
  title: string;
  description: string;
  keywords?: string[];
  canonical?: string;
  ogImage?: string;
  ogType?: 'website' | 'article';
}): Metadata {
  const siteName = 'CribSeekers';
  const siteUrl = 'https://cribseekers.com';
  const fullTitle = `${title} | ${siteName}`;

  return {
    title: fullTitle,
    description,
    keywords: keywords?.join(', '),
    authors: [{ name: siteName }],
    creator: siteName,
    publisher: siteName,
    alternates: {
      canonical: canonical ? `${siteUrl}${canonical}` : `${siteUrl}`,
    },
    openGraph: {
      type: ogType,
      locale: 'en_NG',
      url: canonical ? `${siteUrl}${canonical}` : siteUrl,
      title: fullTitle,
      description,
      siteName,
      images: ogImage
        ? [
            {
              url: ogImage,
              width: 1200,
              height: 630,
              alt: title,
            },
          ]
        : [
            {
              url: `${siteUrl}/og-image.jpg`,
              width: 1200,
              height: 630,
              alt: siteName,
            },
          ],
    },
    twitter: {
      card: 'summary_large_image',
      title: fullTitle,
      description,
      images: ogImage ? [ogImage] : [`${siteUrl}/og-image.jpg`],
      creator: '@cribseekers',
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        'max-video-preview': -1,
        'max-image-preview': 'large',
        'max-snippet': -1,
      },
    },
    verification: {
      google: 'your-google-verification-code',
    },
  };
}

export function generateBreadcrumbSchema(items: { name: string; item: string }[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: item.item,
    })),
  };
}

export function generateOrganizationSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'CribSeekers',
    url: 'https://cribseekers.com',
    logo: 'https://cribseekers.com/logo.png',
    description: 'Nigeria\'s premier real estate platform connecting property seekers with verified listings and secure transactions.',
    address: {
      '@type': 'PostalAddress',
      addressCountry: 'NG',
      addressLocality: 'Lagos',
    },
    contactPoint: {
      '@type': 'ContactPoint',
      telephone: '+234-XXX-XXX-XXXX',
      contactType: 'customer service',
    },
    sameAs: [
      'https://twitter.com/cribseekers',
      'https://facebook.com/cribseekers',
      'https://instagram.com/cribseekers',
      'https://linkedin.com/company/cribseekers',
    ],
  };
}

export function generateWebSiteSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: 'CribSeekers',
    url: 'https://cribseekers.com',
    description: 'Find your perfect property in Nigeria with CribSeekers. Browse verified listings, schedule inspections, and transact securely.',
    potentialAction: {
      '@type': 'SearchAction',
      target: 'https://cribseekers.com/search?q={search_term_string}',
      'query-input': 'required name=search_term_string',
    },
  };
}

export function generateArticleSchema({
  title,
  description,
  publishDate,
  author,
  imageUrl,
  url,
}: {
  title: string;
  description: string;
  publishDate: string;
  author: string;
  imageUrl?: string;
  url: string;
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: title,
    description,
    image: imageUrl || 'https://cribseekers.com/default-og.jpg',
    author: {
      '@type': 'Person',
      name: author,
    },
    datePublished: publishDate,
    dateModified: publishDate,
    publisher: {
      '@type': 'Organization',
      name: 'CribSeekers',
      logo: {
        '@type': 'ImageObject',
        url: 'https://cribseekers.com/logo.png',
      },
    },
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': `https://cribseekers.com${url}`,
    },
  };
}

export function generatePropertySchema({
  name,
  description,
  price,
  currency,
  address,
  imageUrl,
  url,
}: {
  name: string;
  description: string;
  price: number;
  currency: string;
  address: {
    street: string;
    city: string;
    state: string;
    country: string;
  };
  imageUrl?: string;
  url: string;
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'SingleFamilyResidence',
    name,
    description,
    image: imageUrl || 'https://cribseekers.com/default-property.jpg',
    address: {
      '@type': 'PostalAddress',
      streetAddress: address.street,
      addressLocality: address.city,
      addressRegion: address.state,
      addressCountry: address.country,
    },
    url: `https://cribseekers.com${url}`,
    price: price,
    priceCurrency: currency,
  };
}
