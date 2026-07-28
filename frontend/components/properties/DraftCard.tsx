import { cn } from '@/lib/utils';
import { Edit2, Trash2, Clock, Eye, Home } from 'lucide-react';
import { PropertyStatusBadge } from './PropertyStatusBadge';

export interface Draft {
  id: string;
  title: string;
  location: string;
  type: string;
  status: 'draft' | 'pending' | 'published' | 'rejected' | 'archived';
  lastModified: string;
  progress: number;
}

interface DraftCardProps {
  property: Draft;
  onEdit: (id: string) => void;
  onDelete: (id: string) => void;
  onPreview?: (id: string) => void;
  className?: string;
}

export function DraftCard({ property, onEdit, onDelete, onPreview, className }: DraftCardProps) {
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-NG', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    });
  };

  return (
    <div
      className={cn(
        'bg-surface-primary dark:bg-forest-800 rounded-lg border border-border-default overflow-hidden hover:border-forest-900 dark:hover:border-forest-400 transition-colors',
        className
      )}
      role="article"
      aria-label={`Draft property: ${property.title}`}
    >
      {/* Image */}
      <div className="aspect-video relative bg-forest-100 dark:bg-forest-700">
        <div className="flex items-center justify-center w-full h-full">
          <Home className="h-12 w-12 text-forest-300 dark:text-forest-600" />
        </div>
        <div className="absolute top-3 left-3">
          <PropertyStatusBadge status={property.status} />
        </div>
      </div>

      {/* Content */}
      <div className="p-4">
        <h3 className="heading-md text-forest-900 dark:text-forest-50 mb-2 line-clamp-2">
          {property.title}
        </h3>
        <p className="body-sm text-forest-600 dark:text-forest-400 mb-3 line-clamp-2">
          {property.location}
        </p>
        
        <div className="flex items-center justify-between mb-3">
          <p className="heading-md text-forest-900 dark:text-forest-50">
            {property.progress}% complete
          </p>
        </div>

        <div className="flex items-center gap-2 body-xs text-forest-600 dark:text-forest-400 mb-4">
          <Clock className="h-3 w-3" />
          <span>Last edited {formatDate(property.lastModified)}</span>
        </div>

        {/* Actions */}
        <div className="flex items-center gap-2">
          {onPreview && (
            <button
              onClick={() => onPreview(property.id)}
              className="flex-1 inline-flex items-center justify-center px-3 py-2 border border-border-default rounded-lg body-sm font-medium text-forest-900 dark:text-forest-50 hover:bg-surface-secondary dark:hover:bg-forest-700 transition-colors"
              aria-label={`Preview ${property.title}`}
            >
              <Eye className="h-4 w-4 mr-2" />
              Preview
            </button>
          )}
          <button
            onClick={() => onEdit(property.id)}
            className="flex-1 inline-flex items-center justify-center px-3 py-2 bg-forest-900 text-white rounded-lg body-sm font-medium hover:bg-forest-800 transition-colors"
            aria-label={`Edit ${property.title}`}
          >
            <Edit2 className="h-4 w-4 mr-2" />
            Edit
          </button>
          <button
            onClick={() => onDelete(property.id)}
            className="inline-flex items-center justify-center px-3 py-2 border border-red-200 dark:border-red-800 rounded-lg body-sm font-medium text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors"
            aria-label={`Delete ${property.title}`}
          >
            <Trash2 className="h-4 w-4" />
          </button>
        </div>
      </div>
    </div>
  );
}
