'use client';

export const dynamic = 'force-dynamic';

import { useState } from 'react';
import { DashboardLayout } from '@/components/dashboard';
import { EmptyState } from '@/components/dashboard';
import { Search, Clock, Bookmark, Trash2, Repeat, TrendingUp, Filter, SortDesc } from 'lucide-react';
import { toast } from 'sonner';

export default function SearchHistoryPage() {
  const [activeTab, setActiveTab] = useState<'recent' | 'saved'>('recent');

  const recentSearches = [
    { id: '1', query: '3 bedroom apartment in Lekki', timestamp: '2 hours ago', results: 45 },
    { id: '2', query: 'luxury duplex Victoria Island', timestamp: '5 hours ago', results: 23 },
    { id: '3', query: 'commercial property Ikeja', timestamp: '1 day ago', results: 12 },
    { id: '4', query: 'land for sale Lekki', timestamp: '2 days ago', results: 67 },
    { id: '5', query: '2 bedroom flat Yaba', timestamp: '3 days ago', results: 34 },
  ];

  const savedSearches = [
    {
      id: '1',
      name: 'Lekki Apartments',
      query: '3 bedroom apartment in Lekki under ₦3M',
      filters: { bedrooms: 3, maxPrice: '₦3,000,000', location: 'Lekki' },
      results: 45,
      lastUpdated: '2 hours ago',
    },
    {
      id: '2',
      name: 'Luxury Homes',
      query: 'luxury duplex Victoria Island',
      filters: { type: 'duplex', location: 'Victoria Island' },
      results: 23,
      lastUpdated: '5 hours ago',
    },
    {
      id: '3',
      name: 'Commercial Investment',
      query: 'commercial property Ikeja',
      filters: { type: 'commercial', location: 'Ikeja' },
      results: 12,
      lastUpdated: '1 day ago',
    },
  ];

  const suggestedSearches = [
    '3 bedroom apartment in Lekki',
    'luxury duplex Victoria Island',
    'land for sale Lekki',
    'commercial property Ikeja',
    '2 bedroom flat Yaba',
    'penthouse Eko Atlantic',
  ];

  const handleRepeatSearch = (query: string) => {
    toast.success('Search repeated', {
      description: `Searching for "${query}"`,
    });
    // In real implementation, this would navigate to search with the query
  };

  const handleDeleteSearch = () => {
    toast.success('Search deleted', {
      description: 'The search has been removed from your history',
    });
  };

  const handleSaveSearch = () => {
    toast.success('Search saved', {
      description: 'The search has been added to your saved searches',
    });
  };

  const handleDeleteSavedSearch = () => {
    toast.success('Saved search deleted', {
      description: 'The saved search has been removed',
    });
  };

  if (recentSearches.length === 0 && savedSearches.length === 0) {
    return (
      <DashboardLayout>
        <div className="flex flex-col items-center justify-center py-20">
          <EmptyState
            icon={Search}
            title="No search history yet"
            description="Start searching for properties and your search history will appear here for easy access."
            action={{
              label: 'Start Searching',
              onClick: () => (window.location.href = '/search'),
            }}
          />
        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Header */}
        <div>
          <h1 className="heading-2xl text-forest-900 dark:text-forest-50 mb-2">Search History</h1>
          <p className="body-md text-forest-600 dark:text-forest-400">
            View and manage your search history and saved searches
          </p>
        </div>

        {/* Tabs */}
        <div className="flex items-center space-x-4 border-b border-border-default">
          <button
            onClick={() => setActiveTab('recent')}
            className={`px-4 py-3 body-md font-medium transition-colors relative ${
              activeTab === 'recent'
                ? 'text-forest-900 dark:text-forest-50'
                : 'text-forest-600 dark:text-forest-400 hover:text-forest-900 dark:hover:text-forest-50'
            }`}
          >
            Recent Searches
            {activeTab === 'recent' && (
              <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-forest-900 dark:bg-forest-50" />
            )}
          </button>
          <button
            onClick={() => setActiveTab('saved')}
            className={`px-4 py-3 body-md font-medium transition-colors relative ${
              activeTab === 'saved'
                ? 'text-forest-900 dark:text-forest-50'
                : 'text-forest-600 dark:text-forest-400 hover:text-forest-900 dark:hover:text-forest-50'
            }`}
          >
            Saved Searches
            {activeTab === 'saved' && (
              <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-forest-900 dark:bg-forest-50" />
            )}
          </button>
        </div>

        {/* Filters */}
        <div className="flex items-center space-x-2">
          <button className="flex items-center px-4 py-2 bg-white dark:bg-forest-800 border border-border-default rounded-lg hover:bg-surface-secondary transition-colors body-md">
            <Filter className="h-4 w-4 mr-2" />
            Filters
          </button>
          <button className="flex items-center px-4 py-2 bg-white dark:bg-forest-800 border border-border-default rounded-lg hover:bg-surface-secondary transition-colors body-md">
            <SortDesc className="h-4 w-4 mr-2" />
            Sort
          </button>
        </div>

        {activeTab === 'recent' ? (
          <>
            {/* Recent Searches */}
            <div className="space-y-3">
              {recentSearches.map((search) => (
                <div
                  key={search.id}
                  className="flex items-center justify-between p-4 bg-white dark:bg-forest-800 rounded-lg border border-border-default hover:border-forest-300 dark:hover:border-forest-700 transition-colors"
                >
                  <div className="flex items-center space-x-4 flex-1">
                    <div className="flex items-center justify-center w-10 h-10 bg-forest-100 dark:bg-forest-700 rounded-lg">
                      <Search className="h-5 w-5 text-forest-600 dark:text-forest-400" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="body-md text-forest-900 dark:text-forest-50 mb-1">{search.query}</p>
                      <div className="flex items-center space-x-4 body-sm text-forest-600 dark:text-forest-400">
                        <span className="flex items-center">
                          <Clock className="h-3 w-3 mr-1" />
                          {search.timestamp}
                        </span>
                        <span>{search.results} results</span>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <button
                      onClick={() => handleRepeatSearch(search.query)}
                      className="p-2 rounded-lg hover:bg-surface-secondary transition-colors"
                      title="Repeat search"
                    >
                      <Repeat className="h-4 w-4 text-forest-600 dark:text-forest-400" />
                    </button>
                    <button
                      onClick={() => handleSaveSearch()}
                      className="p-2 rounded-lg hover:bg-surface-secondary transition-colors"
                      title="Save search"
                    >
                      <Bookmark className="h-4 w-4 text-forest-600 dark:text-forest-400" />
                    </button>
                    <button
                      onClick={() => handleDeleteSearch()}
                      className="p-2 rounded-lg hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors"
                      title="Delete"
                    >
                      <Trash2 className="h-4 w-4 text-red-600 dark:text-red-400" />
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {/* Suggested Searches */}
            <div className="bg-white dark:bg-forest-800 rounded-xl border border-border-default p-6">
              <div className="flex items-center mb-4">
                <TrendingUp className="h-5 w-5 text-forest-600 dark:text-forest-400 mr-2" />
                <h3 className="heading-md text-forest-900 dark:text-forest-50">Suggested Searches</h3>
              </div>
              <div className="flex flex-wrap gap-2">
                {suggestedSearches.map((suggestion, index) => (
                  <button
                    key={`${suggestion}-${index}`}
                    onClick={() => handleRepeatSearch(suggestion)}
                    className="px-4 py-2 bg-surface-secondary rounded-full body-md text-forest-900 dark:text-forest-50 hover:bg-forest-100 dark:hover:bg-forest-700 transition-colors"
                  >
                    {suggestion}
                  </button>
                ))}
              </div>
            </div>
          </>
        ) : (
          /* Saved Searches */
          <div className="space-y-4">
            {savedSearches.map((search, index) => (
              <div
                key={`saved-search-${index}`}
                className="p-6 bg-white dark:bg-forest-800 rounded-xl border border-border-default hover:border-forest-300 dark:hover:border-forest-700 transition-colors"
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center space-x-3">
                    <div className="flex items-center justify-center w-10 h-10 bg-forest-100 dark:bg-forest-700 rounded-lg">
                      <Bookmark className="h-5 w-5 text-forest-600 dark:text-forest-400" />
                    </div>
                    <div>
                      <h3 className="heading-md text-forest-900 dark:text-forest-50 mb-1">{search.name}</h3>
                      <p className="body-sm text-forest-600 dark:text-forest-400">{search.query}</p>
                    </div>
                  </div>
                  <button
                    onClick={() => handleDeleteSavedSearch()}
                    className="p-2 rounded-lg hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors"
                    title="Delete saved search"
                  >
                    <Trash2 className="h-4 w-4 text-red-600 dark:text-red-400" />
                  </button>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4 body-sm text-forest-600 dark:text-forest-400">
                    <span>{search.results} results</span>
                    <span>•</span>
                    <span>Updated {search.lastUpdated}</span>
                  </div>
                  <button
                    onClick={() => handleRepeatSearch(search.query)}
                    className="flex items-center px-4 py-2 bg-forest-900 text-white rounded-lg hover:bg-forest-800 transition-colors body-sm font-medium"
                  >
                    <Repeat className="h-4 w-4 mr-2" />
                    Search
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </DashboardLayout>
  );
}
