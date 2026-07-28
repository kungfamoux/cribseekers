'use client';

import Image from 'next/image';
import Link from 'next/link';
import { Heart, MapPin, Bed, Bath, Maximize, Star } from 'lucide-react';
import { useState } from 'react';

interface PropertyCardProps {
  id: string;
  title: string;
  price: number;
  currency?: string;
  location: string;
  images: string[];
  features: {
    bedrooms?: number;
    bathrooms?: number;
    size?: number;
    sizeUnit?: string;
  };
  isVerified?: boolean;
  isFeatured?: boolean;
  purpose?: 'rent' | 'sale' | 'short_term';
}

export function PropertyCard({
  id,
  title,
  price,
  currency = 'NGN',
  location,
  images,
  features,
  isVerified = false,
  isFeatured = false,
  purpose = 'sale',
}: PropertyCardProps) {
  const [isFavorited, setIsFavorited] = useState(false);

  const formatPrice = (amount: number) => {
    return new Intl.NumberFormat('en-NG', {
      style: 'currency',
      currency,
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  };

  const handleFavorite = (e: React.MouseEvent) => {
    e.preventDefault();
    setIsFavorited(!isFavorited);
  };

  return (
    <Link href={`/properties/${id}`}>
      <div className="group relative bg-surface-elevated rounded-2xl overflow-hidden shadow-2 hover:shadow-4 transition-all duration-300">
        {/* Image */}
        <div className="relative aspect-[4/3] overflow-hidden bg-surface-secondary">
          {images.length > 0 ? (
            <Image
              src={images[0]}
              alt={title}
              fill
              className="object-cover group-hover:scale-105 transition-transform duration-300"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center bg-surface-secondary">
              <span className="text-text-tertiary">No Image</span>
            </div>
          )}

          {/* Badges */}
          <div className="absolute top-3 left-3 flex gap-2">
            {isFeatured && (
              <span className="bg-gold-500 text-white px-3 py-1 rounded-full ui-xs font-medium">
                Featured
              </span>
            )}
            {isVerified && (
              <span className="bg-success-500 text-white px-3 py-1 rounded-full ui-xs font-medium flex items-center gap-1">
                <Star className="h-3 w-3 fill-current" />
                Verified
              </span>
            )}
          </div>

          {/* Favorite Button */}
          <button
            onClick={handleFavorite}
            className="absolute top-3 right-3 p-2 rounded-full bg-white/90 backdrop-blur-sm hover:bg-white transition-colors shadow-2"
            aria-label={isFavorited ? 'Remove from favorites' : 'Add to favorites'}
          >
            <Heart
              className={`h-5 w-5 ${isFavorited ? 'fill-error-500 text-error-500' : 'text-text-tertiary'}`}
            />
          </button>

          {/* Image Counter */}
          {images.length > 1 && (
            <div className="absolute bottom-3 left-3 bg-black/50 backdrop-blur-sm text-white px-3 py-1 rounded-full ui-xs">
              {images.length} photos
            </div>
          )}
        </div>

        {/* Content */}
        <div className="p-4">
          {/* Price */}
          <div className="flex items-start justify-between mb-2">
            <p className="heading-lg text-forest-900 font-medium">
              {formatPrice(price)}
              {purpose === 'rent' && <span className="body-md text-text-secondary">/month</span>}
            </p>
          </div>

          {/* Title */}
          <h3 className="heading-sm text-text-primary mb-2 line-clamp-1">{title}</h3>

          {/* Location */}
          <div className="flex items-center gap-1 text-text-tertiary mb-3">
            <MapPin className="h-4 w-4" />
            <span className="body-sm line-clamp-1">{location}</span>
          </div>

          {/* Features */}
          <div className="flex items-center gap-4 text-text-secondary">
            {features.bedrooms && (
              <div className="flex items-center gap-1">
                <Bed className="h-4 w-4" />
                <span className="body-sm">{features.bedrooms} Beds</span>
              </div>
            )}
            {features.bathrooms && (
              <div className="flex items-center gap-1">
                <Bath className="h-4 w-4" />
                <span className="body-sm">{features.bathrooms} Baths</span>
              </div>
            )}
            {features.size && (
              <div className="flex items-center gap-1">
                <Maximize className="h-4 w-4" />
                <span className="body-sm">
                  {features.size} {features.sizeUnit || 'sqft'}
                </span>
              </div>
            )}
          </div>
        </div>
      </div>
    </Link>
  );
}
