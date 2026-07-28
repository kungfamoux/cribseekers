import { cn } from '@/lib/utils';
import { DollarSign, Edit2, TrendingUp } from 'lucide-react';

interface PropertyPricingCardProps {
  price: number;
  currency: string;
  purpose: 'sale' | 'rent' | 'lease';
  originalPrice?: number;
  priceHistory?: Array<{ date: string; price: number }>;
  onEdit?: () => void;
  className?: string;
}

export function PropertyPricingCard({
  price,
  currency,
  purpose,
  originalPrice,
  priceHistory,
  onEdit,
  className,
}: PropertyPricingCardProps) {
  const formatPrice = (value: number) => {
    return new Intl.NumberFormat('en-NG', {
      style: 'currency',
      currency,
      maximumFractionDigits: 0,
    }).format(value);
  };

  const discount = originalPrice && originalPrice > price 
    ? Math.round(((originalPrice - price) / originalPrice) * 100) 
    : 0;

  return (
    <div
      className={cn(
        'bg-surface-primary dark:bg-forest-800 rounded-xl border border-border-default p-6',
        className
      )}
    >
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <DollarSign className="h-5 w-5 text-forest-900 dark:text-forest-50" />
          <h3 className="heading-md text-forest-900 dark:text-forest-50">Pricing</h3>
        </div>
        {onEdit && (
          <button
            onClick={onEdit}
            className="p-2 hover:bg-surface-secondary dark:hover:bg-forest-700 rounded-lg transition-colors"
            aria-label="Edit pricing"
          >
            <Edit2 className="h-4 w-4 text-forest-600 dark:text-forest-400" />
          </button>
        )}
      </div>

      <div className="space-y-4">
        <div className="flex items-baseline gap-2">
          <p className="heading-xl text-forest-900 dark:text-forest-50">
            {formatPrice(price)}
          </p>
          <span className="body-sm text-forest-600 dark:text-forest-400 capitalize">
            {purpose}
          </span>
        </div>

        {originalPrice && originalPrice > price && (
          <div className="flex items-center gap-2">
            <p className="body-sm text-forest-600 dark:text-forest-400 line-through">
              {formatPrice(originalPrice)}
            </p>
            <span className="px-2 py-1 bg-green-100 dark:bg-green-900/20 text-green-700 dark:text-green-300 rounded-full body-xs font-medium">
              {discount}% off
            </span>
          </div>
        )}

        {priceHistory && priceHistory.length > 1 && (
          <div className="pt-4 border-t border-border-default">
            <div className="flex items-center gap-2 mb-3">
              <TrendingUp className="h-4 w-4 text-forest-600 dark:text-forest-400" />
              <p className="body-sm font-medium text-forest-900 dark:text-forest-50">Price History</p>
            </div>
            <div className="space-y-2">
              {priceHistory.slice(-3).map((entry, index) => (
                <div key={index} className="flex items-center justify-between">
                  <p className="body-xs text-forest-600 dark:text-forest-400">
                    {new Date(entry.date).toLocaleDateString('en-NG', { month: 'short', day: 'numeric' })}
                  </p>
                  <p className="body-sm text-forest-900 dark:text-forest-50">
                    {formatPrice(entry.price)}
                  </p>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
