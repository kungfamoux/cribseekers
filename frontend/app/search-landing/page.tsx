'use client';

import { useState } from 'react';
import { Navbar, Footer } from '@/components/public';
import { motion } from 'framer-motion';
import { Search, MapPin, TrendingUp, Clock, Sparkles, ArrowRight, Building2, Home, Landmark, Briefcase, Warehouse, ChevronRight, Loader2 } from 'lucide-react';
import Link from 'next/link';
import { usePopularSearches, useRecentSearches } from '@/hooks/useSearch';

interface RecentSearchItem {
  id?: string;
  query: string;
}

const propertyCategories = [
  { id: 'apartments', name: 'Apartments', icon: Building2, count: '2,450+' },
  { id: 'houses', name: 'Houses', icon: Home, count: '1,890+' },
  { id: 'land', name: 'Land & Plots', icon: Landmark, count: '890+' },
  { id: 'commercial', name: 'Commercial', icon: Briefcase, count: '650+' },
  { id: 'warehouses', name: 'Warehouses', icon: Warehouse, count: '230+' },
];

const featuredCities = [
  { id: 'lagos', name: 'Lagos', state: 'Lagos State', image: '🏙️', properties: 4500 },
  { id: 'abuja', name: 'Abuja', state: 'FCT', image: '🏛️', properties: 3200 },
  { id: 'portharcourt', name: 'Port Harcourt', state: 'Rivers State', image: '🌊', properties: 1800 },
  { id: 'ibadan', name: 'Ibadan', state: 'Oyo State', image: '🏘️', properties: 1200 },
];


const trendingLocations = [
  { name: 'Lekki Phase 1', city: 'Lagos', growth: '+15%' },
  { name: 'Maitama', city: 'Abuja', growth: '+12%' },
  { name: 'Ikeja GRA', city: 'Lagos', growth: '+10%' },
  { name: 'Guzape', city: 'Abuja', growth: '+8%' },
];

const quickFilters = [
  { id: 'rent', label: 'For Rent' },
  { id: 'sale', label: 'For Sale' },
  { id: 'verified', label: 'Verified Only' },
  { id: 'new', label: 'New Listings' },
];

export default function SearchLandingPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedLocation, setSelectedLocation] = useState('');
  
  const { data: popularSearchesData, isLoading: popularLoading } = usePopularSearches();
  const { data: recentSearchesData, isLoading: recentLoading } = useRecentSearches();
  
  const popularSearches = popularSearchesData?.data || [];
  const recentSearches = recentSearchesData?.data || [];
  
  // Silence unused variable warning - will be used for popular searches section
  void popularLoading;

  const handleSearch = () => {
    if (searchQuery.trim()) {
      // Navigate to search results
      window.location.href = `/search?q=${encodeURIComponent(searchQuery)}&location=${encodeURIComponent(selectedLocation)}`;
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-1 bg-surface-primary">
        {/* Hero Section */}
        <section className="relative bg-gradient-to-br from-forest-900 via-forest-800 to-forest-900 text-white py-20 lg:py-32">
          <div className="absolute inset-0 opacity-10">
            <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmYiIGZpbGwtb3BhY2l0eT0iMC4xIj48cGF0aCBkPSJNMzYgMzR2LTRoLTR2NGgtNHYtNGg0di00aDR2NGg0djRoLTR2NGgtNHYtNGg0djRoLTR2LTRoLTR2NGg0djR6Ii8+PC9nPjwvZz48L3N2Zz4=')]"></div>
          </div>
          
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="max-w-5xl mx-auto text-center"
            >
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.2 }}
                className="inline-flex items-center gap-2 px-4 py-2 bg-gold-500/20 border border-gold-500/30 rounded-full ui-sm font-medium text-gold-300 mb-6"
              >
                <Sparkles className="w-4 h-4" />
                AI-Powered Property Search
              </motion.div>
              
              <h1 className="display-hero font-heading mb-6">
                Find Your Perfect Property in Nigeria
              </h1>
              
              <p className="body-lg text-forest-200 max-w-2xl mx-auto mb-12">
                Search thousands of verified properties across Nigeria with our intelligent search engine. Get personalized recommendations based on your preferences.
              </p>

              {/* AI Search Box */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="bg-white rounded-2xl shadow-2xl p-2 max-w-4xl mx-auto"
              >
                <div className="flex flex-col lg:flex-row gap-2">
                  {/* Search Input */}
                  <div className="flex-1 relative">
                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-text-tertiary" />
                    <input
                      type="text"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
                      placeholder="What are you looking for?"
                      className="w-full pl-12 pr-4 py-4 bg-surface-secondary rounded-xl body-md text-text-primary focus:outline-none focus:ring-2 focus:ring-forest-500"
                    />
                  </div>

                  {/* Location Input */}
                  <div className="lg:w-64 relative">
                    <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-text-tertiary" />
                    <input
                      type="text"
                      value={selectedLocation}
                      onChange={(e) => setSelectedLocation(e.target.value)}
                      placeholder="Location"
                      className="w-full pl-12 pr-4 py-4 bg-surface-secondary rounded-xl body-md text-text-primary focus:outline-none focus:ring-2 focus:ring-forest-500"
                    />
                  </div>

                  {/* Search Button */}
                  <button
                    onClick={handleSearch}
                    className="px-8 py-4 bg-forest-900 text-white rounded-xl ui-md font-medium hover:bg-forest-800 transition-colors flex items-center justify-center gap-2"
                  >
                    <Search className="w-5 h-5" />
                    Search
                  </button>
                </div>

                {/* Quick Filters */}
                <div className="flex flex-wrap gap-2 mt-4 px-2">
                  {quickFilters.map((filter) => (
                    <button
                      key={filter.id}
                      className="px-4 py-2 bg-surface-secondary rounded-lg ui-sm font-medium text-text-secondary hover:bg-surface-tertiary hover:text-text-primary transition-colors"
                    >
                      {filter.label}
                    </button>
                  ))}
                </div>
              </motion.div>
            </motion.div>
          </div>
        </section>

        {/* Popular Searches */}
        <section className="py-12 bg-surface-primary border-b border-border-default">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-5xl mx-auto">
              <div className="flex items-center gap-2 mb-6">
                <TrendingUp className="w-5 h-5 text-forest-900" />
                <h2 className="heading-md text-text-primary">Popular Searches</h2>
              </div>
              <div className="flex flex-wrap gap-3">
                {popularSearches.map((search: string, index: number) => (
                  <Link
                    key={index}
                    href={`/search?q=${encodeURIComponent(search)}`}
                    className="inline-flex items-center gap-2 px-4 py-2 bg-surface-elevated rounded-lg ui-sm font-medium text-text-secondary hover:bg-forest-100 hover:text-forest-900 transition-colors"
                  >
                    <Search className="w-4 h-4" />
                    {search}
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Property Categories */}
        <section className="py-16 bg-surface-primary">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="max-w-6xl mx-auto"
            >
              <div className="text-center mb-12">
                <h2 className="heading-xl text-text-primary mb-4">Browse by Category</h2>
                <p className="body-md text-text-secondary">Find the perfect property type for your needs</p>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
                {propertyCategories.map((category, index) => (
                  <motion.div
                    key={category.id}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <Link
                      href={`/search?type=${category.id}`}
                      className="group bg-surface-elevated rounded-2xl p-6 hover:shadow-2 transition-all hover:-translate-y-1 block"
                    >
                      <div className="w-12 h-12 bg-forest-100 rounded-xl flex items-center justify-center text-forest-900 mb-4 group-hover:bg-forest-900 group-hover:text-white transition-colors">
                        <category.icon className="w-6 h-6" />
                      </div>
                      <h3 className="heading-md text-text-primary mb-2">{category.name}</h3>
                      <p className="body-sm text-text-tertiary">{category.count} properties</p>
                    </Link>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </section>

        {/* Featured Cities */}
        <section className="py-16 bg-surface-secondary">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="max-w-6xl mx-auto"
            >
              <div className="text-center mb-12">
                <h2 className="heading-xl text-text-primary mb-4">Featured Cities</h2>
                <p className="body-md text-text-secondary">Explore properties in Nigeria's top locations</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {featuredCities.map((city, index) => (
                  <motion.div
                    key={city.id}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <Link
                      href={`/search?city=${city.name}`}
                      className="group bg-white rounded-2xl overflow-hidden hover:shadow-2 transition-all hover:-translate-y-1 block"
                    >
                      <div className="aspect-video bg-gradient-to-br from-forest-100 to-forest-200 flex items-center justify-center text-6xl">
                        {city.image}
                      </div>
                      <div className="p-6">
                        <h3 className="heading-md text-text-primary mb-1">{city.name}</h3>
                        <p className="body-sm text-text-secondary mb-3">{city.state}</p>
                        <div className="flex items-center justify-between">
                          <span className="body-sm text-forest-900 font-medium">{city.properties.toLocaleString()} properties</span>
                          <ChevronRight className="w-5 h-5 text-text-tertiary group-hover:text-forest-900 transition-colors" />
                        </div>
                      </div>
                    </Link>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </section>

        {/* Trending Locations */}
        <section className="py-16 bg-surface-primary">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="max-w-6xl mx-auto"
            >
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                <div>
                  <div className="flex items-center gap-2 mb-4">
                    <TrendingUp className="w-5 h-5 text-gold-500" />
                    <h2 className="heading-xl text-text-primary">Trending Locations</h2>
                  </div>
                  <p className="body-md text-text-secondary mb-8">
                    Discover the fastest-growing neighborhoods with the highest property demand and value appreciation.
                  </p>

                  <div className="space-y-4">
                    {trendingLocations.map((location, index) => (
                      <motion.div
                        key={location.name}
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: index * 0.1 }}
                        className="flex items-center justify-between p-4 bg-surface-elevated rounded-xl hover:bg-surface-secondary transition-colors"
                      >
                        <div className="flex items-center gap-4">
                          <div className="w-10 h-10 bg-forest-100 rounded-lg flex items-center justify-center text-forest-900">
                            <MapPin className="w-5 h-5" />
                          </div>
                          <div>
                            <h3 className="heading-md text-text-primary">{location.name}</h3>
                            <p className="body-sm text-text-secondary">{location.city}</p>
                          </div>
                        </div>
                        <div className="text-right">
                          <span className="inline-flex items-center gap-1 text-success-600 ui-sm font-medium">
                            <TrendingUp className="w-4 h-4" />
                            {location.growth}
                          </span>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </div>

                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  className="bg-gradient-to-br from-forest-900 to-forest-800 rounded-2xl p-8 text-white"
                >
                  <h3 className="heading-lg mb-4">Start Your Search Today</h3>
                  <p className="body-md text-forest-200 mb-6">
                    Join thousands of Nigerians who found their dream properties through CribSeekers. Our AI-powered search makes it easy to find exactly what you're looking for.
                  </p>
                  <ul className="space-y-3 mb-8">
                    <li className="flex items-center gap-3">
                      <div className="w-6 h-6 bg-gold-500 rounded-full flex items-center justify-center">
                        <Sparkles className="w-4 h-4 text-forest-900" />
                      </div>
                      <span className="body-md">AI-Powered Recommendations</span>
                    </li>
                    <li className="flex items-center gap-3">
                      <div className="w-6 h-6 bg-gold-500 rounded-full flex items-center justify-center">
                        <Sparkles className="w-4 h-4 text-forest-900" />
                      </div>
                      <span className="body-md">Verified Property Listings</span>
                    </li>
                    <li className="flex items-center gap-3">
                      <div className="w-6 h-6 bg-gold-500 rounded-full flex items-center justify-center">
                        <Sparkles className="w-4 h-4 text-forest-900" />
                      </div>
                      <span className="body-md">Secure Escrow Payments</span>
                    </li>
                  </ul>
                  <Link
                    href="/search"
                    className="inline-flex items-center gap-2 px-6 py-3 bg-gold-500 text-forest-900 rounded-xl ui-md font-medium hover:bg-gold-400 transition-colors"
                  >
                    Browse All Properties
                    <ArrowRight className="w-5 h-5" />
                  </Link>
                </motion.div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Recent Searches */}
        {recentSearches.length > 0 && (
          <section className="py-12 bg-surface-primary border-t border-border-default">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
              <div className="max-w-5xl mx-auto">
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center gap-2">
                    <Clock className="w-5 h-5 text-text-tertiary" />
                    <h2 className="heading-md text-text-primary">Recent Searches</h2>
                  </div>
                </div>
                {recentLoading ? (
                  <div className="flex items-center justify-center py-8">
                    <Loader2 className="w-6 h-6 animate-spin text-text-tertiary" />
                  </div>
                ) : (
                  <div className="space-y-2">
                    {recentSearches.map((search: RecentSearchItem | string, index: number) => {
                      const query = typeof search === 'string' ? search : search.query;
                      return (
                        <Link
                          key={typeof search === 'string' ? index : search.id || index}
                          href={`/search?q=${encodeURIComponent(query)}`}
                          className="flex items-center justify-between p-4 bg-surface-elevated rounded-xl hover:bg-surface-secondary transition-colors group block"
                        >
                          <div className="flex items-center gap-3">
                            <Clock className="w-4 h-4 text-text-tertiary" />
                            <span className="body-md text-text-primary">{query}</span>
                          </div>
                          <ChevronRight className="w-4 h-4 text-text-tertiary group-hover:text-text-primary transition-colors" />
                        </Link>
                      );
                    })}
                  </div>
                )}
              </div>
            </div>
          </section>
        )}
      </main>

      <Footer />
    </div>
  );
}
