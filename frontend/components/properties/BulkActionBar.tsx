import { cn } from '@/lib/utils';
import { Trash2, Archive, Eye, Edit2, MoreVertical, Check } from 'lucide-react';

interface BulkActionBarProps {
  selectedCount: number;
  onClear: () => void;
  onDelete?: () => void;
  onArchive?: () => void;
  onPublish?: () => void;
  onUnpublish?: () => void;
  onEdit?: () => void;
  className?: string;
}

export function BulkActionBar({
  selectedCount,
  onClear,
  onDelete,
  onArchive,
  onPublish,
  onUnpublish,
  onEdit,
  className,
}: BulkActionBarProps) {
  if (selectedCount === 0) return null;

  return (
    <div
      className={cn(
        'fixed bottom-6 left-1/2 -translate-x-1/2 bg-surface-primary dark:bg-forest-800 border border-border-default rounded-xl shadow-lg p-4 flex items-center gap-4 z-50',
        className
      )}
      role="toolbar"
      aria-label={`Bulk actions for ${selectedCount} selected properties`}
    >
      <div className="flex items-center gap-2">
        <div className="bg-forest-900 text-white rounded-full w-6 h-6 flex items-center justify-center body-xs font-medium">
          {selectedCount}
        </div>
        <span className="body-sm text-forest-900 dark:text-forest-50">
          {selectedCount} selected
        </span>
      </div>

      <div className="h-6 w-px bg-border-current opacity-20" />

      <div className="flex items-center gap-2">
        {onPublish && (
          <button
            onClick={onPublish}
            className="inline-flex items-center px-3 py-2 border border-border-default rounded-lg body-sm font-medium text-forest-900 dark:text-forest-50 hover:bg-surface-secondary dark:hover:bg-forest-700 transition-colors"
            aria-label="Publish selected properties"
          >
            <Check className="h-4 w-4 mr-2" />
            Publish
          </button>
        )}

        {onUnpublish && (
          <button
            onClick={onUnpublish}
            className="inline-flex items-center px-3 py-2 border border-border-default rounded-lg body-sm font-medium text-forest-900 dark:text-forest-50 hover:bg-surface-secondary dark:hover:bg-forest-700 transition-colors"
            aria-label="Unpublish selected properties"
          >
            <Eye className="h-4 w-4 mr-2" />
            Unpublish
          </button>
        )}

        {onArchive && (
          <button
            onClick={onArchive}
            className="inline-flex items-center px-3 py-2 border border-border-default rounded-lg body-sm font-medium text-forest-900 dark:text-forest-50 hover:bg-surface-secondary dark:hover:bg-forest-700 transition-colors"
            aria-label="Archive selected properties"
          >
            <Archive className="h-4 w-4 mr-2" />
            Archive
          </button>
        )}

        {onEdit && (
          <button
            onClick={onEdit}
            className="inline-flex items-center px-3 py-2 border border-border-default rounded-lg body-sm font-medium text-forest-900 dark:text-forest-50 hover:bg-surface-secondary dark:hover:bg-forest-700 transition-colors"
            aria-label="Edit selected properties"
          >
            <Edit2 className="h-4 w-4 mr-2" />
            Edit
          </button>
        )}

        {onDelete && (
          <button
            onClick={onDelete}
            className="inline-flex items-center px-3 py-2 border border-red-200 dark:border-red-800 rounded-lg body-sm font-medium text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors"
            aria-label="Delete selected properties"
          >
            <Trash2 className="h-4 w-4 mr-2" />
            Delete
          </button>
        )}
      </div>

      <div className="h-6 w-px bg-border-current opacity-20" />

      <button
        onClick={onClear}
        className="p-2 hover:bg-surface-secondary dark:hover:bg-forest-700 rounded-lg transition-colors"
        aria-label="Clear selection"
      >
        <MoreVertical className="h-4 w-4 text-forest-600 dark:text-forest-400" />
      </button>
    </div>
  );
}
