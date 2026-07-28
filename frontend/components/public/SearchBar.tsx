'use client';

import { useState } from 'react';
import { Search, X, Filter, MapPin } from 'lucide-react';
import { useDebounce } from '@/hooks/useDebounce';

interface SearchBarProps {
  onSearch?: (query: string) => void;
  placeholder?: string;
  showFilters?: boolean;
}

export function SearchBar({ onSearch, placeholder = 'Search properties...', showFilters = true }: SearchBarProps) {
  const [query, setQuery] = useState('');
  const [isFocused, setIsFocused] = useState(false);
  const debouncedQuery = useDebounce(query, 300);

  const handleClear = () => {
    setQuery('');
    onSearch?.('');
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch?.(debouncedQuery);
  };

  return (
    <form onSubmit={handleSubmit} className="relative">
      <div
        className={`flex items-center bg-surface-elevated rounded-xl border-2 transition-all ${
          isFocused ? 'border-forest-500 shadow-3' : 'border-border-default'
        }`}
      >
        {/* Search Icon */}
        <div className="pl-4">
          <Search className="h-5 w-5 text-text-tertiary" />
        </div>

        {/* Input */}
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          placeholder={placeholder}
          className="flex-1 px-4 py-3 bg-transparent border-none outline-none body-md text-text-primary placeholder:text-text-tertiary"
        />

        {/* Clear Button */}
        {query && (
          <button
            type="button"
            onClick={handleClear}
            className="pr-4 text-text-tertiary hover:text-text-primary transition-colors"
            aria-label="Clear search"
          >
            <X className="h-5 w-5" />
          </button>
        )}

        {/* Filter Button */}
        {showFilters && (
          <button
            type="button"
            className="px-4 py-3 border-l border-border-default text-text-tertiary hover:text-text-primary transition-colors"
            aria-label="Open filters"
          >
            <Filter className="h-5 w-5" />
          </button>
        )}
      </div>

      {/* Recent Searches Dropdown */}
      {isFocused && query.length === 0 && (
        <div className="absolute top-full left-0 right-0 mt-2 bg-surface-elevated rounded-xl border border-border-default shadow-4 overflow-hidden z-10">
          <div className="p-4">
            <p className="ui-sm text-text-tertiary mb-3">Recent Searches</p>
            <div className="space-y-2">
              <button className="flex items-center gap-2 w-full px-3 py-2 rounded-lg hover:bg-surface-secondary transition-colors text-left">
                <MapPin className="h-4 w-4 text-text-tertiary" />
                <span className="body-sm text-text-secondary">Lagos, Nigeria</span>
              </button>
              <button className="flex items-center gap-2 w-full px-3 py-2 rounded-lg hover:bg-surface-secondary transition-colors text-left">
                <MapPin className="h-4 w-4 text-text-tertiary" />
                <span className="body-sm text-text-secondary">Abuja, Nigeria</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </form>
  );
}
