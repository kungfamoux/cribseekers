'use client';

export const dynamic = 'force-dynamic';

import { useState } from 'react';
import { DashboardLayout } from '@/components/dashboard';
import { RecommendationCard, EmptyState } from '@/components/dashboard';
import { Sparkles, TrendingUp, Clock, MapPin, Filter, SortDesc } from 'lucide-react';
import { toast } from 'sonner';

export default function RecommendationsPage() {
  const [activeTab, setActiveTab] = useState<'recommended' | 'trending' | 'new'>('recommended');

  const recommendedProperties = [
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
      isFavorite: false,
      reason: 'Based on your search history',
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
      reason: 'Similar to your favorites',
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
      isFavorite: false,
      reason: 'Matches your budget',
    },
  ];

  const trendingProperties = [
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
      isFavorite: false,
      reason: 'Trending in your area',
    },
    {
      id: '5',
      title: 'Modern Studio Apartment',
      location: 'Yaba, Lagos',
      price: '₦900,000/year',
      bedrooms: 1,
      bathrooms: 1,
      area: '50 sqm',
      rating: 4.3,
      image: '/placeholder-property-5.jpg',
      isFavorite: false,
      reason: 'Popular this week',
    },
    {
      id: '6',
      title: '3-Bedroom Terrace',
      location: 'Lekki Phase 2, Lagos',
      price: '₦3,200,000/year',
      bedrooms: 3,
      bathrooms: 2,
      area: '180 sqm',
      rating: 4.7,
      image: '/placeholder-property-6.jpg',
      isFavorite: true,
      reason: 'High demand',
    },
  ];

  const newProperties = [
    {
      id: '7',
      title: 'Brand New 4-Bedroom Villa',
      location: 'Ajah, Lagos',
      price: '₦4,500,000/year',
      bedrooms: 4,
      bathrooms: 3,
      area: '300 sqm',
      rating: 4.6,
      image: '/placeholder-property-7.jpg',
      isFavorite: false,
      reason: 'Just listed',
    },
    {
      id: '8',
      title: 'Contemporary 2-Bedroom Apartment',
      location: 'Surulere, Lagos',
      price: '₦1,500,000/year',
      bedrooms: 2,
      bathrooms: 2,
      area: '120 sqm',
      rating: 4.4,
      image: '/placeholder-property-8.jpg',
      isFavorite: false,
      reason: 'New listing',
    },
  ];

  const handleToggleFavorite = () => {
    toast.success('Property saved to favorites', {
      description: 'The property has been added to your favorites',
    });
  };

  const properties =
    activeTab === 'recommended'
      ? recommendedProperties
      : activeTab === 'trending'
      ? trendingProperties
      : newProperties;

  if (properties.length === 0) {
    return (
      <DashboardLayout>
        <div className="flex flex-col items-center justify-center py-20">
          <EmptyState
            icon={Sparkles}
            title="No recommendations yet"
            description="Start searching for properties to get personalized recommendations based on your preferences."
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
        <div>
          <h1 className="heading-2xl text-forest-900 dark:text-forest-50 mb-2">AI Recommendations</h1>
          <p className="body-md text-forest-600 dark:text-forest-400">
            Personalized property recommendations based on your preferences and search history
          </p>
        </div>

        {/* Tabs */}
        <div className="flex items-center space-x-4 border-b border-border-default">
          <button
            onClick={() => setActiveTab('recommended')}
            className={`px-4 py-3 body-md font-medium transition-colors relative flex items-center ${
              activeTab === 'recommended'
                ? 'text-forest-900 dark:text-forest-50'
                : 'text-forest-600 dark:text-forest-400 hover:text-forest-900 dark:hover:text-forest-50'
            }`}
          >
            <Sparkles className="h-4 w-4 mr-2" />
            Recommended
            {activeTab === 'recommended' && (
              <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-forest-900 dark:bg-forest-50" />
            )}
          </button>
          <button
            onClick={() => setActiveTab('trending')}
            className={`px-4 py-3 body-md font-medium transition-colors relative flex items-center ${
              activeTab === 'trending'
                ? 'text-forest-900 dark:text-forest-50'
                : 'text-forest-600 dark:text-forest-400 hover:text-forest-900 dark:hover:text-forest-50'
            }`}
          >
            <TrendingUp className="h-4 w-4 mr-2" />
            Trending
            {activeTab === 'trending' && (
              <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-forest-900 dark:bg-forest-50" />
            )}
          </button>
          <button
            onClick={() => setActiveTab('new')}
            className={`px-4 py-3 body-md font-medium transition-colors relative flex items-center ${
              activeTab === 'new'
                ? 'text-forest-900 dark:text-forest-50'
                : 'text-forest-600 dark:text-forest-400 hover:text-forest-900 dark:hover:text-forest-50'
            }`}
          >
            <Clock className="h-4 w-4 mr-2" />
            New Listings
            {activeTab === 'new' && (
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
          <button className="flex items-center px-4 py-2 bg-white dark:bg-forest-800 border border-border-default rounded-lg hover:bg-surface-secondary transition-colors body-md">
            <MapPin className="h-4 w-4 mr-2" />
            Location
          </button>
        </div>

        {/* Properties Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {properties.map((property) => (
            <RecommendationCard
              key={property.id}
              {...property}
              onFavoriteToggle={() => handleToggleFavorite()}
            />
          ))}
        </div>

        {/* AI Insight */}
        <div className="bg-gradient-to-r from-forest-100 to-forest-50 dark:from-forest-800 dark:to-forest-900 rounded-xl border border-border-default p-6">
          <div className="flex items-start space-x-4">
            <div className="flex items-center justify-center w-12 h-12 bg-forest-900 dark:bg-forest-50 rounded-lg flex-shrink-0">
              <Sparkles className="h-6 w-6 text-white dark:text-forest-900" />
            </div>
            <div>
              <h3 className="heading-md text-forest-900 dark:text-forest-50 mb-2">AI Insight</h3>
              <p className="body-md text-forest-600 dark:text-forest-400">
                Based on your recent searches for 3-bedroom apartments in Lekki and your budget preference of
                under ₦3M, we've prioritized properties that match these criteria. Properties with higher
                ratings and recent price reductions are shown first.
              </p>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
