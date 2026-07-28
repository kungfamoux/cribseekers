import { cn } from '@/lib/utils';
import { Check, Edit2, Plus, X } from 'lucide-react';

interface PropertyAmenitiesCardProps {
  amenities: string[];
  availableAmenities?: string[];
  onEdit?: () => void;
  onAdd?: (amenity: string) => void;
  onRemove?: (amenity: string) => void;
  className?: string;
}

const COMMON_AMENITIES = [
  'Air Conditioning',
  'Swimming Pool',
  'Gym',
  'Parking',
  'Security',
  'Water Supply',
  'Electricity',
  'Internet',
  'Balcony',
  'Garden',
  'Storage',
  'Elevator',
  'Fireplace',
  'Laundry',
  'Dishwasher',
];

export function PropertyAmenitiesCard({
  amenities,
  availableAmenities = COMMON_AMENITIES,
  onEdit,
  onAdd,
  onRemove,
  className,
}: PropertyAmenitiesCardProps) {
  return (
    <div
      className={cn(
        'bg-surface-primary dark:bg-forest-800 rounded-xl border border-border-default p-6',
        className
      )}
    >
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <Check className="h-5 w-5 text-forest-900 dark:text-forest-50" />
          <h3 className="heading-md text-forest-900 dark:text-forest-50">Amenities</h3>
        </div>
        {onEdit && (
          <button
            onClick={onEdit}
            className="p-2 hover:bg-surface-secondary dark:hover:bg-forest-700 rounded-lg transition-colors"
            aria-label="Edit amenities"
          >
            <Edit2 className="h-4 w-4 text-forest-600 dark:text-forest-400" />
          </button>
        )}
      </div>

      {amenities.length > 0 ? (
        <div className="flex flex-wrap gap-2">
          {amenities.map((amenity) => (
            <div
              key={amenity}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-forest-100 dark:bg-forest-700 rounded-full body-sm text-forest-900 dark:text-forest-50"
            >
              <Check className="h-3.5 w-3.5" />
              <span>{amenity}</span>
              {onRemove && (
                <button
                  onClick={() => onRemove(amenity)}
                  className="ml-1 hover:text-red-600 dark:hover:text-red-400 transition-colors"
                  aria-label={`Remove ${amenity}`}
                >
                  <X className="h-3 w-3" />
                </button>
              )}
            </div>
          ))}
        </div>
      ) : (
        <p className="body-sm text-forest-600 dark:text-forest-400">No amenities added</p>
      )}

      {onAdd && availableAmenities.length > 0 && (
        <div className="mt-4 pt-4 border-t border-border-default">
          <p className="body-xs text-forest-600 dark:text-forest-400 mb-2">Add amenities:</p>
          <div className="flex flex-wrap gap-2">
            {availableAmenities
              .filter((a) => !amenities.includes(a))
              .slice(0, 6)
              .map((amenity) => (
                <button
                  key={amenity}
                  onClick={() => onAdd(amenity)}
                  className="inline-flex items-center gap-1 px-3 py-1.5 border border-border-default rounded-full body-sm text-forest-600 dark:text-forest-400 hover:border-forest-900 dark:hover:border-forest-400 hover:text-forest-900 dark:hover:text-forest-50 transition-colors"
                >
                  <Plus className="h-3 w-3" />
                  {amenity}
                </button>
              ))}
          </div>
        </div>
      )}
    </div>
  );
}
