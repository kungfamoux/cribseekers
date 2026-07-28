import { cn } from '@/lib/utils';
import { MapPin, Bed, Bath, Car, Maximize, Heart, Share2, Home } from 'lucide-react';
import { PropertyStatusBadge } from './PropertyStatusBadge';
import type { Property } from '@/types';

interface PropertyPreviewCardProps {
  property: Property;
  onFavorite?: (id: string) => void;
  onShare?: (id: string) => void;
  isFavorite?: boolean;
  className?: string;
}

export function PropertyPreviewCard({
  property,
  onFavorite,
  onShare,
  isFavorite = false,
  className,
}: PropertyPreviewCardProps) {
  const formatPrice = (price: number, currency: string) => {
    return new Intl.NumberFormat('en-NG', {
      style: 'currency',
      currency,
      maximumFractionDigits: 0,
    }).format(price);
  };

  return (
    <div
      className={cn(
        'bg-surface-primary dark:bg-forest-800 rounded-xl border border-border-default overflow-hidden hover:border-forest-900 dark:hover:border-forest-400 transition-all hover:shadow-lg',
        className
      )}
      role="article"
      aria-label={`Property: ${property.title}`}
    >
      {/* Image */}
      <div className="aspect-video relative bg-forest-100 dark:bg-forest-700">
        {property.images && property.images.length > 0 ? (
          <img
            src={property.images[0]}
            alt={property.title}
            className="w-full h-full object-cover"
            loading="lazy"
          />
        ) : (
          <div className="flex items-center justify-center w-full h-full">
            <Home className="h-12 w-12 text-forest-300 dark:text-forest-600" />
          </div>
        )}
        
        {/* Status Badge */}
        <div className="absolute top-3 left-3">
          <PropertyStatusBadge status={property.status} />
        </div>

        {/* Featured Badge */}
        {property.isFeatured && (
          <div className="absolute top-3 right-3 bg-forest-900 text-white px-2 py-1 rounded-full body-xs font-medium">
            Featured
          </div>
        )}

        {/* Action Buttons */}
        <div className="absolute bottom-3 right-3 flex items-center gap-2">
          {onFavorite && (
            <button
              onClick={() => onFavorite(property.id)}
              className={cn(
                'p-2 rounded-full transition-colors',
                isFavorite
                  ? 'bg-red-500 text-white'
                  : 'bg-white/90 dark:bg-forest-800/90 text-forest-900 dark:text-forest-50 hover:bg-white dark:hover:bg-forest-800'
              )}
              aria-label={isFavorite ? 'Remove from favorites' : 'Add to favorites'}
              aria-pressed={isFavorite}
            >
              <Heart className={cn('h-4 w-4', isFavorite && 'fill-current')} />
            </button>
          )}
          {onShare && (
            <button
              onClick={() => onShare(property.id)}
              className="p-2 rounded-full bg-white/90 dark:bg-forest-800/90 text-forest-900 dark:text-forest-50 hover:bg-white dark:hover:bg-forest-800 transition-colors"
              aria-label="Share property"
            >
              <Share2 className="h-4 w-4" />
            </button>
          )}
        </div>
      </div>

      {/* Content */}
      <div className="p-4">
        <div className="flex items-start justify-between mb-2">
          <div className="flex-1">
            <h3 className="heading-md text-forest-900 dark:text-forest-50 mb-1 line-clamp-1">
              {property.title}
            </h3>
            <div className="flex items-center gap-1 body-sm text-forest-600 dark:text-forest-400">
              <MapPin className="h-3.5 w-3.5" />
              <span className="line-clamp-1">
                {property.location.city}, {property.location.state}
              </span>
            </div>
          </div>
        </div>

        {/* Price */}
        <p className="heading-lg text-forest-900 dark:text-forest-50 mb-3">
          {formatPrice(property.price, property.currency)}
        </p>

        {/* Features */}
        <div className="flex items-center gap-4 body-sm text-forest-600 dark:text-forest-400 mb-3">
          {property.features.bedrooms && property.features.bedrooms > 0 && (
            <div className="flex items-center gap-1">
              <Bed className="h-4 w-4" />
              <span>{property.features.bedrooms} Beds</span>
            </div>
          )}
          {property.features.bathrooms && property.features.bathrooms > 0 && (
            <div className="flex items-center gap-1">
              <Bath className="h-4 w-4" />
              <span>{property.features.bathrooms} Baths</span>
            </div>
          )}
          {property.features.parkingSpaces && property.features.parkingSpaces > 0 && (
            <div className="flex items-center gap-1">
              <Car className="h-4 w-4" />
              <span>{property.features.parkingSpaces} Parking</span>
            </div>
          )}
          <div className="flex items-center gap-1">
            <Maximize className="h-4 w-4" />
            <span>{property.features.area} {property.features.areaUnit}</span>
          </div>
        </div>

        {/* Stats */}
        <div className="flex items-center gap-4 body-xs text-forest-500 dark:text-forest-500 pt-3 border-t border-border-default">
          <span>{property.views} views</span>
          <span>{property.favorites} favorites</span>
          <span>{property.inquiries} inquiries</span>
        </div>
      </div>
    </div>
  );
}
