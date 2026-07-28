'use client';

import { useState, useEffect, Suspense } from 'react';
import { Navbar, Footer, PropertyCard, SearchBar } from '@/components/public';
import { apiClient } from '@/services/api/axios';
import { API_ENDPOINTS } from '@/services/api/endpoints';
import { motion } from 'framer-motion';
import type { Property } from '@/types/property.types';
import { useSearchParams } from 'next/navigation';
import { Filter, SlidersHorizontal, Map as MapIcon, Grid } from 'lucide-react';

function SearchPageContent() {
  const searchParams = useSearchParams();
  const [properties, setProperties] = useState<Property[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [viewMode, setViewMode] = useState<'grid' | 'map'>('grid');
  const [showFilters, setShowFilters] = useState(false);

  const query = searchParams.get('q') || '';
  const state = searchParams.get('state') || '';
  const city = searchParams.get('city') || '';
  const type = searchParams.get('type') || '';
  const purpose = searchParams.get('purpose') || '';
  const featured = searchParams.get('featured') === 'true';
  const recent = searchParams.get('recent') === 'true';

  useEffect(() => {
    async function fetchProperties() {
      setIsLoading(true);
      try {
        let endpoint;
        const params = new URLSearchParams();

        if (featured) {
          endpoint = API_ENDPOINTS.PROPERTY_FEATURED;
        } else if (recent) {
          endpoint = API_ENDPOINTS.SEARCH_RECENT;
        } else if (query) {
          endpoint = API_ENDPOINTS.SEARCH_KEYWORD;
          params.append('keyword', query);
        } else if (state) {
          endpoint = API_ENDPOINTS.SEARCH_STATE(state);
        } else if (city) {
          endpoint = API_ENDPOINTS.SEARCH_CITY(city);
        } else {
          endpoint = API_ENDPOINTS.SEARCH_GLOBAL;
        }

        if (params.toString()) {
          endpoint += `?${params.toString()}`;
        }

        const response = await apiClient.get(endpoint);
        setProperties(response.data.data || []);
      } catch {
        console.error('Failed to fetch properties');
        setProperties([]);
      } finally {
        setIsLoading(false);
      }
    }

    fetchProperties();
  }, [query, state, city, type, purpose, featured, recent]);

  const handleSearch = (searchQuery: string) => {
    const params = new URLSearchParams(searchParams.toString());
    if (searchQuery) {
      params.set('q', searchQuery);
    } else {
      params.delete('q');
    }
    window.history.pushState(null, '', `/search?${params.toString()}`);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-1 bg-surface-secondary">
        {/* Search Header */}
        <div className="bg-surface-primary border-b border-border-default sticky top-16 z-40">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-6">
            <div className="flex flex-col lg:flex-row gap-4 items-start lg:items-center justify-between">
              <div className="flex-1 w-full lg:w-auto">
                <SearchBar
                  onSearch={handleSearch}
                  placeholder="Search properties by location, type, or keyword..."
                  showFilters={true}
                />
              </div>
              
              <div className="flex items-center gap-3">
                <button
                  onClick={() => setShowFilters(!showFilters)}
                  className="flex items-center gap-2 px-4 py-2 border border-border-default rounded-lg hover:bg-surface-secondary transition-colors body-md"
                >
                  <Filter className="h-4 w-4" />
                  Filters
                </button>
                
                <div className="flex items-center border border-border-default rounded-lg overflow-hidden">
                  <button
                    onClick={() => setViewMode('grid')}
                    className={`p-2 transition-colors ${
                      viewMode === 'grid' ? 'bg-forest-100 text-forest-900' : 'hover:bg-surface-secondary'
                    }`}
                    aria-label="Grid view"
                  >
                    <Grid className="h-4 w-4" />
                  </button>
                  <button
                    onClick={() => setViewMode('map')}
                    className={`p-2 transition-colors ${
                      viewMode === 'map' ? 'bg-forest-100 text-forest-900' : 'hover:bg-surface-secondary'
                    }`}
                    aria-label="Map view"
                  >
                    <MapIcon className="h-4 w-4" />
                  </button>
                </div>
              </div>
            </div>

            {/* Active Filters */}
            {(state || city || type || purpose) && (
              <div className="flex flex-wrap gap-2 mt-4">
                {state && (
                  <span className="inline-flex items-center gap-1 px-3 py-1 bg-forest-100 text-forest-900 rounded-full ui-sm">
                    State: {state}
                  </span>
                )}
                {city && (
                  <span className="inline-flex items-center gap-1 px-3 py-1 bg-forest-100 text-forest-900 rounded-full ui-sm">
                    City: {city}
                  </span>
                )}
                {type && (
                  <span className="inline-flex items-center gap-1 px-3 py-1 bg-forest-100 text-forest-900 rounded-full ui-sm">
                    Type: {type}
                  </span>
                )}
                {purpose && (
                  <span className="inline-flex items-center gap-1 px-3 py-1 bg-forest-100 text-forest-900 rounded-full ui-sm">
                    Purpose: {purpose}
                  </span>
                )}
              </div>
            )}
          </div>
        </div>

        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex gap-8">
            {/* Filters Sidebar */}
            {showFilters && (
              <aside className="hidden lg:block w-64 flex-shrink-0">
                <div className="bg-surface-elevated rounded-xl p-6 sticky top-40">
                  <div className="flex items-center justify-between mb-6">
                    <h3 className="heading-md text-text-primary">Filters</h3>
                    <button className="text-forest-900 hover:text-forest-700 ui-sm font-medium">
                      Clear All
                    </button>
                  </div>

                  {/* Property Type */}
                  <div className="mb-6">
                    <h4 className="ui-sm font-medium text-text-secondary mb-3">Property Type</h4>
                    <div className="space-y-2">
                      {['apartment', 'house', 'land', 'commercial'].map((type) => (
                        <label key={type} className="flex items-center gap-2 cursor-pointer">
                          <input type="checkbox" className="w-4 h-4 rounded border-border-default" />
                          <span className="body-sm text-text-secondary capitalize">{type}</span>
                        </label>
                      ))}
                    </div>
                  </div>

                  {/* Purpose */}
                  <div className="mb-6">
                    <h4 className="ui-sm font-medium text-text-secondary mb-3">Purpose</h4>
                    <div className="space-y-2">
                      {['rent', 'sale', 'short_term'].map((purpose) => (
                        <label key={purpose} className="flex items-center gap-2 cursor-pointer">
                          <input type="checkbox" className="w-4 h-4 rounded border-border-default" />
                          <span className="body-sm text-text-secondary capitalize">{purpose.replace('_', ' ')}</span>
                        </label>
                      ))}
                    </div>
                  </div>

                  {/* Price Range */}
                  <div className="mb-6">
                    <h4 className="ui-sm font-medium text-text-secondary mb-3">Price Range</h4>
                    <div className="space-y-3">
                      <input
                        type="number"
                        placeholder="Min Price"
                        className="w-full px-3 py-2 border border-border-default rounded-lg body-sm"
                      />
                      <input
                        type="number"
                        placeholder="Max Price"
                        className="w-full px-3 py-2 border border-border-default rounded-lg body-sm"
                      />
                    </div>
                  </div>

                  {/* Bedrooms */}
                  <div className="mb-6">
                    <h4 className="ui-sm font-medium text-text-secondary mb-3">Bedrooms</h4>
                    <div className="flex gap-2">
                      {[1, 2, 3, 4, '5+'].map((bed) => (
                        <button
                          key={bed}
                          className="px-3 py-2 border border-border-default rounded-lg body-sm hover:bg-surface-secondary transition-colors"
                        >
                          {bed}
                        </button>
                      ))}
                    </div>
                  </div>

                  <button className="w-full py-3 bg-forest-900 text-white rounded-lg ui-md font-medium hover:bg-forest-800 transition-colors">
                    Apply Filters
                  </button>
                </div>
              </aside>
            )}

            {/* Results */}
            <div className="flex-1">
              <div className="flex items-center justify-between mb-6">
                <p className="body-md text-text-secondary">
                  {isLoading ? 'Loading...' : `${properties.length} properties found`}
                </p>
                <select className="px-3 py-2 border border-border-default rounded-lg body-sm bg-surface-elevated">
                  <option>Sort by: Newest</option>
                  <option>Sort by: Price (Low to High)</option>
                  <option>Sort by: Price (High to Low)</option>
                  <option>Sort by: Popular</option>
                </select>
              </div>

              {isLoading ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {[...Array(6)].map((_, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: i * 0.1 }}
                      className="bg-surface-elevated rounded-xl h-80 animate-pulse"
                    />
                  ))}
                </div>
              ) : properties.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {properties.map((property, index) => (
                    <motion.div
                      key={property.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 }}
                    >
                      <PropertyCard
                        id={property.id}
                        title={property.title}
                        price={property.price}
                        currency={property.currency}
                        location={`${property.location.city}, ${property.location.state}`}
                        images={property.images}
                        features={{
                          bedrooms: property.features.bedrooms,
                          bathrooms: property.features.bathrooms,
                          size: property.features.size,
                          sizeUnit: property.features.sizeUnit,
                        }}
                        isVerified={property.verificationStatus === 'verified'}
                        isFeatured={featured}
                        purpose={property.purpose}
                      />
                    </motion.div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-16">
                  <div className="w-16 h-16 bg-surface-secondary rounded-full flex items-center justify-center mx-auto mb-4">
                    <SlidersHorizontal className="h-8 w-8 text-text-tertiary" />
                  </div>
                  <h3 className="heading-lg text-text-primary mb-2">No properties found</h3>
                  <p className="body-md text-text-secondary mb-6">
                    Try adjusting your search filters or browse our featured properties.
                  </p>
                  <a
                    href="/search?featured=true"
                    className="inline-flex items-center gap-2 px-6 py-3 bg-forest-900 text-white rounded-lg ui-md font-medium hover:bg-forest-800 transition-colors"
                  >
                    View Featured Properties
                  </a>
                </div>
              )}
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}

export default function SearchPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-1 bg-surface-secondary">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-20">
            <div className="max-w-4xl mx-auto text-center">
              <div className="animate-pulse">
                <div className="h-8 bg-surface-elevated rounded w-1/2 mx-auto mb-4"></div>
                <div className="h-4 bg-surface-elevated rounded w-3/4 mx-auto"></div>
              </div>
            </div>
          </div>
        </main>
        <Footer />
      </div>
    }>
      <SearchPageContent />
    </Suspense>
  );
}
