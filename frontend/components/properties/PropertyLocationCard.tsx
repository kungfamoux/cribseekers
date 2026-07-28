import { cn } from '@/lib/utils';
import { MapPin, Navigation, Edit2 } from 'lucide-react';

interface PropertyLocationCardProps {
  address: string;
  city: string;
  state: string;
  lga?: string;
  estate?: string;
  coordinates?: {
    lat: number;
    lng: number;
  };
  onEdit?: () => void;
  className?: string;
}

export function PropertyLocationCard({
  address,
  city,
  state,
  lga,
  estate,
  coordinates,
  onEdit,
  className,
}: PropertyLocationCardProps) {
  return (
    <div
      className={cn(
        'bg-surface-primary dark:bg-forest-800 rounded-xl border border-border-default p-6',
        className
      )}
    >
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <MapPin className="h-5 w-5 text-forest-900 dark:text-forest-50" />
          <h3 className="heading-md text-forest-900 dark:text-forest-50">Location</h3>
        </div>
        {onEdit && (
          <button
            onClick={onEdit}
            className="p-2 hover:bg-surface-secondary dark:hover:bg-forest-700 rounded-lg transition-colors"
            aria-label="Edit location"
          >
            <Edit2 className="h-4 w-4 text-forest-600 dark:text-forest-400" />
          </button>
        )}
      </div>

      <div className="space-y-3">
        <div>
          <p className="body-xs text-forest-600 dark:text-forest-400 mb-1">Address</p>
          <p className="body-md text-forest-900 dark:text-forest-50">{address}</p>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <p className="body-xs text-forest-600 dark:text-forest-400 mb-1">City</p>
            <p className="body-md text-forest-900 dark:text-forest-50">{city}</p>
          </div>
          <div>
            <p className="body-xs text-forest-600 dark:text-forest-400 mb-1">State</p>
            <p className="body-md text-forest-900 dark:text-forest-50">{state}</p>
          </div>
        </div>

        {lga && (
          <div>
            <p className="body-xs text-forest-600 dark:text-forest-400 mb-1">LGA</p>
            <p className="body-md text-forest-900 dark:text-forest-50">{lga}</p>
          </div>
        )}

        {estate && (
          <div>
            <p className="body-xs text-forest-600 dark:text-forest-400 mb-1">Estate/Area</p>
            <p className="body-md text-forest-900 dark:text-forest-50">{estate}</p>
          </div>
        )}

        {coordinates && (
          <div className="pt-3 border-t border-border-default">
            <div className="flex items-center gap-2">
              <Navigation className="h-4 w-4 text-forest-600 dark:text-forest-400" />
              <div className="flex-1">
                <p className="body-xs text-forest-600 dark:text-forest-400 mb-1">Coordinates</p>
                <p className="body-sm text-forest-900 dark:text-forest-50">
                  {coordinates.lat.toFixed(6)}, {coordinates.lng.toFixed(6)}
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
