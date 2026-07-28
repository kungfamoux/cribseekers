import Image from 'next/image';
import Link from 'next/link';
import { Heart, MapPin, Bed, Bath, Maximize, Star } from 'lucide-react';
import { cn } from '@/lib/utils';

interface RecommendationCardProps {
  id: string;
  title: string;
  location: string;
  price: string;
  bedrooms: number;
  bathrooms: number;
  area: string;
  rating: number;
  image: string;
  isFavorite?: boolean;
  onFavoriteToggle?: () => void;
  reason?: string;
  className?: string;
}

export function RecommendationCard({
  id,
  title,
  location,
  price,
  bedrooms,
  bathrooms,
  area,
  rating,
  image,
  isFavorite = false,
  onFavoriteToggle,
  reason,
  className,
}: RecommendationCardProps) {
  return (
    <div className={cn('bg-white dark:bg-forest-800 rounded-xl border border-border-default overflow-hidden group', className)}>
      <div className="relative h-48">
        <Image src={image} alt={title} fill className="object-cover group-hover:scale-105 transition-transform duration-300" />
        <button
          onClick={onFavoriteToggle}
          className="absolute top-3 right-3 p-2 bg-white/90 dark:bg-forest-900/90 rounded-full hover:bg-white dark:hover:bg-forest-900 transition-colors"
        >
          <Heart
            className={cn('h-5 w-5', isFavorite ? 'text-red-500 fill-red-500' : 'text-forest-600 dark:text-forest-400')}
          />
        </button>
        {reason && (
          <div className="absolute bottom-3 left-3 bg-forest-900/90 text-white px-3 py-1 rounded-full body-sm">
            {reason}
          </div>
        )}
      </div>
      <div className="p-4">
        <Link href={`/properties/${id}`}>
          <h3 className="heading-md text-forest-900 dark:text-forest-50 mb-2 group-hover:text-forest-600 dark:group-hover:text-forest-400 transition-colors">
            {title}
          </h3>
        </Link>
        <div className="flex items-center text-forest-600 dark:text-forest-400 body-sm mb-3">
          <MapPin className="h-4 w-4 mr-1" />
          {location}
        </div>
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center space-x-4 body-sm text-forest-600 dark:text-forest-400">
            <div className="flex items-center">
              <Bed className="h-4 w-4 mr-1" />
              {bedrooms}
            </div>
            <div className="flex items-center">
              <Bath className="h-4 w-4 mr-1" />
              {bathrooms}
            </div>
            <div className="flex items-center">
              <Maximize className="h-4 w-4 mr-1" />
              {area}
            </div>
          </div>
          <div className="flex items-center text-yellow-500">
            <Star className="h-4 w-4 mr-1 fill-current" />
            <span className="body-sm font-medium">{rating}</span>
          </div>
        </div>
        <p className="heading-lg text-forest-900 dark:text-forest-50 font-semibold">{price}</p>
      </div>
    </div>
  );
}
