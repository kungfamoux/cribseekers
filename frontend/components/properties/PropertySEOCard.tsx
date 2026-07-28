import { cn } from '@/lib/utils';
import { Edit2, Globe, Search, TrendingUp } from 'lucide-react';

interface PropertySEOCardProps {
  title: string;
  description: string;
  keywords?: string[];
  onEdit?: () => void;
  className?: string;
}

export function PropertySEOCard({
  title,
  description,
  keywords = [],
  onEdit,
  className,
}: PropertySEOCardProps) {
  const truncate = (text: string, maxLength: number) => {
    return text.length > maxLength ? text.substring(0, maxLength) + '...' : text;
  };

  return (
    <div
      className={cn(
        'bg-surface-primary dark:bg-forest-800 rounded-xl border border-border-default p-6',
        className
      )}
    >
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <Globe className="h-5 w-5 text-forest-900 dark:text-forest-50" />
          <h3 className="heading-md text-forest-900 dark:text-forest-50">SEO Settings</h3>
        </div>
        {onEdit && (
          <button
            onClick={onEdit}
            className="p-2 hover:bg-surface-secondary dark:hover:bg-forest-700 rounded-lg transition-colors"
            aria-label="Edit SEO settings"
          >
            <Edit2 className="h-4 w-4 text-forest-600 dark:text-forest-400" />
          </button>
        )}
      </div>

      <div className="space-y-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <Search className="h-4 w-4 text-forest-600 dark:text-forest-400" />
            <p className="body-xs text-forest-600 dark:text-forest-400">Meta Title</p>
          </div>
          <p className="body-sm text-forest-900 dark:text-forest-50">{truncate(title, 60)}</p>
          <p className="body-xs text-forest-500 dark:text-forest-500 mt-1">{title.length}/60 characters</p>
        </div>

        <div>
          <div className="flex items-center gap-2 mb-1">
            <TrendingUp className="h-4 w-4 text-forest-600 dark:text-forest-400" />
            <p className="body-xs text-forest-600 dark:text-forest-400">Meta Description</p>
          </div>
          <p className="body-sm text-forest-900 dark:text-forest-50">{truncate(description, 160)}</p>
          <p className="body-xs text-forest-500 dark:text-forest-500 mt-1">{description.length}/160 characters</p>
        </div>

        {keywords.length > 0 && (
          <div>
            <p className="body-xs text-forest-600 dark:text-forest-400 mb-2">Keywords</p>
            <div className="flex flex-wrap gap-2">
              {keywords.map((keyword, index) => (
                <span
                  key={index}
                  className="inline-flex items-center px-2 py-1 bg-forest-100 dark:bg-forest-700 rounded body-xs text-forest-900 dark:text-forest-50"
                >
                  {keyword}
                </span>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
