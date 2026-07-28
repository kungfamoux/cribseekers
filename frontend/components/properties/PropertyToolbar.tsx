import { cn } from '@/lib/utils';
import { Search, Filter, Grid, List, Plus, MoreVertical } from 'lucide-react';

interface PropertyToolbarProps {
  onSearch?: (query: string) => void;
  onFilter?: () => void;
  onViewChange?: (view: 'grid' | 'list') => void;
  onCreate?: () => void;
  currentView?: 'grid' | 'list';
  searchPlaceholder?: string;
  showViewToggle?: boolean;
  className?: string;
}

export function PropertyToolbar({
  onSearch,
  onFilter,
  onViewChange,
  onCreate,
  currentView = 'grid',
  searchPlaceholder = 'Search properties...',
  showViewToggle = true,
  className,
}: PropertyToolbarProps) {
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onSearch?.(e.target.value);
  };

  return (
    <div className={cn('flex items-center gap-3', className)}>
      {/* Search */}
      {onSearch && (
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-forest-400" aria-hidden="true" />
          <input
            type="text"
            placeholder={searchPlaceholder}
            onChange={handleSearchChange}
            className="w-full pl-10 pr-4 py-2 border border-border-default rounded-lg bg-surface-primary dark:bg-forest-700 text-forest-900 dark:text-forest-50 placeholder-forest-400 focus:outline-none focus:ring-2 focus:ring-forest-500"
            aria-label="Search properties"
          />
        </div>
      )}

      {/* Filter */}
      {onFilter && (
        <button
          onClick={onFilter}
          className="inline-flex items-center px-4 py-2 border border-border-default rounded-lg body-md font-medium text-forest-900 dark:text-forest-50 hover:bg-surface-secondary dark:hover:bg-forest-700 transition-colors"
          aria-label="Filter properties"
        >
          <Filter className="h-4 w-4 mr-2" />
          Filter
        </button>
      )}

      {/* View Toggle */}
      {showViewToggle && onViewChange && (
        <div className="flex items-center border border-border-default rounded-lg overflow-hidden">
          <button
            onClick={() => onViewChange('grid')}
            className={cn(
              'p-2 transition-colors',
              currentView === 'grid'
                ? 'bg-forest-900 text-white'
                : 'bg-surface-primary dark:bg-forest-700 text-forest-600 dark:text-forest-400 hover:bg-surface-secondary dark:hover:bg-forest-600'
            )}
            aria-label="Grid view"
            aria-pressed={currentView === 'grid'}
          >
            <Grid className="h-4 w-4" />
          </button>
          <button
            onClick={() => onViewChange('list')}
            className={cn(
              'p-2 transition-colors',
              currentView === 'list'
                ? 'bg-forest-900 text-white'
                : 'bg-surface-primary dark:bg-forest-700 text-forest-600 dark:text-forest-400 hover:bg-surface-secondary dark:hover:bg-forest-600'
            )}
            aria-label="List view"
            aria-pressed={currentView === 'list'}
          >
            <List className="h-4 w-4" />
          </button>
        </div>
      )}

      {/* Create Button */}
      {onCreate && (
        <button
          onClick={onCreate}
          className="inline-flex items-center px-4 py-2 bg-forest-900 text-white rounded-lg body-md font-medium hover:bg-forest-800 transition-colors"
          aria-label="Create new property"
        >
          <Plus className="h-4 w-4 mr-2" />
          Create Property
        </button>
      )}

      {/* More Options */}
      <button
        className="p-2 border border-border-default rounded-lg hover:bg-surface-secondary dark:hover:bg-forest-700 transition-colors"
        aria-label="More options"
      >
        <MoreVertical className="h-4 w-4 text-forest-600 dark:text-forest-400" />
      </button>
    </div>
  );
}
