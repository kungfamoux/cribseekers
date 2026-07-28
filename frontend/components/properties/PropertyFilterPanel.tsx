import { useState } from 'react';
import { cn } from '@/lib/utils';
import { X, Filter } from 'lucide-react';

interface FilterOption {
  label: string;
  value: string;
}

interface FilterGroup {
  label: string;
  name: string;
  type: 'select' | 'checkbox' | 'radio';
  options: FilterOption[];
}

interface PropertyFilterPanelProps {
  isOpen: boolean;
  onClose: () => void;
  onApply: (filters: Record<string, string[]>) => void;
  onClear: () => void;
  filterGroups: FilterGroup[];
  className?: string;
}

export function PropertyFilterPanel({
  isOpen,
  onClose,
  onApply,
  onClear,
  filterGroups,
  className,
}: PropertyFilterPanelProps) {
  const [selectedFilters, setSelectedFilters] = useState<Record<string, string[]>>({});

  const handleFilterChange = (groupName: string, value: string) => {
    setSelectedFilters((prev) => {
      const currentValues = prev[groupName] || [];
      const newValues = currentValues.includes(value)
        ? currentValues.filter((v) => v !== value)
        : [...currentValues, value];
      
      return {
        ...prev,
        [groupName]: newValues,
      };
    });
  };

  const handleClear = () => {
    setSelectedFilters({});
    onClear();
  };

  const handleApply = () => {
    onApply(selectedFilters);
    onClose();
  };

  const hasActiveFilters = Object.values(selectedFilters).some((values) => values.length > 0);

  if (!isOpen) return null;

  return (
    <div
      className={cn(
        'fixed inset-0 z-50 flex items-center justify-end bg-black/50',
        className
      )}
      role="dialog"
      aria-modal="true"
      aria-labelledby="filter-panel-title"
    >
      <div className="w-full max-w-md h-full bg-surface-primary dark:bg-forest-800 shadow-xl overflow-y-auto">
        {/* Header */}
        <div className="sticky top-0 bg-surface-primary dark:bg-forest-800 border-b border-border-default p-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Filter className="h-5 w-5 text-forest-900 dark:text-forest-50" />
            <h2 id="filter-panel-title" className="heading-md text-forest-900 dark:text-forest-50">
              Filters
            </h2>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-surface-secondary dark:hover:bg-forest-700 rounded-lg transition-colors"
            aria-label="Close filters"
          >
            <X className="h-5 w-5 text-forest-600 dark:text-forest-400" />
          </button>
        </div>

        {/* Filter Groups */}
        <div className="p-4 space-y-6">
          {filterGroups.map((group) => (
            <div key={group.name}>
              <h3 className="heading-sm text-forest-900 dark:text-forest-50 mb-3">
                {group.label}
              </h3>
              <div className="space-y-2">
                {group.options.map((option) => (
                  <label
                    key={option.value}
                    className="flex items-center gap-3 p-3 rounded-lg border border-border-default hover:bg-surface-secondary dark:hover:bg-forest-700 cursor-pointer transition-colors"
                  >
                    <input
                      type={group.type === 'checkbox' ? 'checkbox' : 'radio'}
                      name={group.name}
                      value={option.value}
                      checked={selectedFilters[group.name]?.includes(option.value)}
                      onChange={() => handleFilterChange(group.name, option.value)}
                      className="w-4 h-4 rounded border-border-default text-forest-900 focus:ring-forest-500"
                    />
                    <span className="body-sm text-forest-900 dark:text-forest-50">
                      {option.label}
                    </span>
                  </label>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Footer */}
        <div className="sticky bottom-0 bg-surface-primary dark:bg-forest-800 border-t border-border-default p-4 flex items-center gap-3">
          <button
            onClick={handleClear}
            disabled={!hasActiveFilters}
            className="flex-1 inline-flex items-center justify-center px-4 py-2 border border-border-default rounded-lg body-md font-medium text-forest-900 dark:text-forest-50 hover:bg-surface-secondary dark:hover:bg-forest-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            Clear All
          </button>
          <button
            onClick={handleApply}
            className="flex-1 inline-flex items-center justify-center px-4 py-2 bg-forest-900 text-white rounded-lg body-md font-medium hover:bg-forest-800 transition-colors"
          >
            Apply Filters
          </button>
        </div>
      </div>
    </div>
  );
}
