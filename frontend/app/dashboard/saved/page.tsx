'use client';

export const dynamic = 'force-dynamic';

import { useState } from 'react';
import { DashboardLayout } from '@/components/dashboard';
import { RecommendationCard, EmptyState } from '@/components/dashboard';
import { Heart, Grid, List, Search, Filter, SortDesc, FolderPlus, Trash2 } from 'lucide-react';
import { toast } from 'sonner';

export default function SavedPropertiesPage() {
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [selectedProperties, setSelectedProperties] = useState<string[]>([]);

  const savedProperties = [
    {
      id: '1',
      title: 'Modern 3-Bedroom Apartment',
      location: 'Lekki Phase 1, Lagos',
      price: '₦2,500,000/year',
      bedrooms: 3,
      bathrooms: 2,
      area: '150 sqm',
      rating: 4.8,
      image: '/placeholder-property-1.jpg',
      isFavorite: true,
      collection: 'Apartments',
    },
    {
      id: '2',
      title: 'Luxury 4-Bedroom Duplex',
      location: 'Victoria Island, Lagos',
      price: '₦5,000,000/year',
      bedrooms: 4,
      bathrooms: 3,
      area: '250 sqm',
      rating: 4.9,
      image: '/placeholder-property-2.jpg',
      isFavorite: true,
      collection: 'Luxury Homes',
    },
    {
      id: '3',
      title: 'Cozy 2-Bedroom Flat',
      location: 'Ikeja GRA, Lagos',
      price: '₦1,800,000/year',
      bedrooms: 2,
      bathrooms: 1,
      area: '100 sqm',
      rating: 4.5,
      image: '/placeholder-property-3.jpg',
      isFavorite: true,
      collection: 'Apartments',
    },
    {
      id: '4',
      title: 'Penthouse with Ocean View',
      location: 'Eko Atlantic, Lagos',
      price: '₦8,000,000/year',
      bedrooms: 5,
      bathrooms: 4,
      area: '350 sqm',
      rating: 5.0,
      image: '/placeholder-property-4.jpg',
      isFavorite: true,
      collection: 'Luxury Homes',
    },
  ];

  const collections = ['All Properties', 'Apartments', 'Luxury Homes', 'Commercial', 'Land'];

  const handleToggleFavorite = () => {
    toast.success('Property removed from favorites', {
      description: 'The property has been removed from your favorites',
    });
  };

  const handleSelectProperty = (id: string) => {
    setSelectedProperties((prev) =>
      prev.includes(id) ? prev.filter((p) => p !== id) : [...prev, id]
    );
  };

  const handleDeleteSelected = () => {
    toast.success('Properties removed', {
      description: `${selectedProperties.length} properties have been removed from your favorites`,
    });
    setSelectedProperties([]);
  };

  const handleCreateCollection = () => {
    toast.info('Create Collection', {
      description: 'Collection creation feature coming soon',
    });
  };

  if (savedProperties.length === 0) {
    return (
      <DashboardLayout>
        <div className="flex flex-col items-center justify-center py-20">
          <EmptyState
            icon={Heart}
            title="No saved properties yet"
            description="Start exploring and save properties you're interested in. They'll appear here for easy access."
            action={{
              label: 'Browse Properties',
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
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="heading-2xl text-forest-900 dark:text-forest-50 mb-2">Saved Properties</h1>
            <p className="body-md text-forest-600 dark:text-forest-400">
              {savedProperties.length} properties saved
            </p>
          </div>
          <div className="flex items-center space-x-2">
            <button
              onClick={handleCreateCollection}
              className="flex items-center px-4 py-2 bg-white dark:bg-forest-700 text-forest-900 dark:text-forest-50 border border-border-default rounded-lg hover:bg-surface-secondary transition-colors body-md"
            >
              <FolderPlus className="h-4 w-4 mr-2" />
              New Collection
            </button>
            {selectedProperties.length > 0 && (
              <button
                onClick={handleDeleteSelected}
                className="flex items-center px-4 py-2 bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400 border border-red-200 dark:border-red-900 rounded-lg hover:bg-red-100 dark:hover:bg-red-900/40 transition-colors body-md"
              >
                <Trash2 className="h-4 w-4 mr-2" />
                Remove ({selectedProperties.length})
              </button>
            )}
          </div>
        </div>

        {/* Filters and View Toggle */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div className="flex items-center space-x-2">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-forest-400" />
              <input
                type="text"
                placeholder="Search saved properties..."
                className="pl-10 pr-4 py-2 bg-white dark:bg-forest-800 border border-border-default rounded-lg body-md focus:outline-none focus:ring-2 focus:ring-forest-500 text-forest-900 dark:text-forest-50 placeholder-forest-400 w-full sm:w-64"
              />
            </div>
            <button className="flex items-center px-4 py-2 bg-white dark:bg-forest-800 border border-border-default rounded-lg hover:bg-surface-secondary transition-colors body-md">
              <Filter className="h-4 w-4 mr-2" />
              Filters
            </button>
            <button className="flex items-center px-4 py-2 bg-white dark:bg-forest-800 border border-border-default rounded-lg hover:bg-surface-secondary transition-colors body-md">
              <SortDesc className="h-4 w-4 mr-2" />
              Sort
            </button>
          </div>
          <div className="flex items-center space-x-2">
            <button
              onClick={() => setViewMode('grid')}
              className={`p-2 rounded-lg transition-colors ${
                viewMode === 'grid'
                  ? 'bg-forest-100 dark:bg-forest-700 text-forest-900 dark:text-forest-50'
                  : 'bg-white dark:bg-forest-800 text-forest-600 dark:text-forest-400 hover:bg-surface-secondary'
              }`}
            >
              <Grid className="h-5 w-5" />
            </button>
            <button
              onClick={() => setViewMode('list')}
              className={`p-2 rounded-lg transition-colors ${
                viewMode === 'list'
                  ? 'bg-forest-100 dark:bg-forest-700 text-forest-900 dark:text-forest-50'
                  : 'bg-white dark:bg-forest-800 text-forest-600 dark:text-forest-400 hover:bg-surface-secondary'
              }`}
            >
              <List className="h-5 w-5" />
            </button>
          </div>
        </div>

        {/* Collections Tabs */}
        <div className="flex items-center space-x-2 overflow-x-auto pb-2">
          {collections.map((collection, index) => (
            <button
              key={`${collection}-${index}`}
              className="px-4 py-2 bg-white dark:bg-forest-800 border border-border-default rounded-lg hover:bg-surface-secondary transition-colors body-md whitespace-nowrap"
            >
              {collection}
            </button>
          ))}
        </div>

        {/* Properties Grid/List */}
        <div
          className={
            viewMode === 'grid'
              ? 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4'
              : 'space-y-4'
          }
        >
          {savedProperties.map((property) => (
            <div key={property.id} className="relative">
              <input
                type="checkbox"
                checked={selectedProperties.includes(property.id)}
                onChange={() => handleSelectProperty(property.id)}
                className="absolute top-4 left-4 z-10 w-5 h-5 rounded border-2 border-white dark:border-forest-800 bg-transparent checked:bg-forest-900 cursor-pointer"
              />
              <RecommendationCard
                {...property}
                onFavoriteToggle={() => handleToggleFavorite()}
                className={selectedProperties.includes(property.id) ? 'ring-2 ring-forest-500' : ''}
              />
            </div>
          ))}
        </div>
      </div>
    </DashboardLayout>
  );
}
