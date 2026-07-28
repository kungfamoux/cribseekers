'use client';

import { useState } from 'react';
import { Search, MapPin, Home, Building2 } from 'lucide-react';
import Link from 'next/link';

export function HeroSection() {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchType, setSearchType] = useState<'buy' | 'rent' | 'all'>('all');

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      window.location.href = `/search?q=${encodeURIComponent(searchQuery)}&type=${searchType}`;
    }
  };

  return (
    <section className="relative bg-gradient-to-br from-forest-900 via-forest-800 to-forest-900 text-white overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0" style={{
          backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)',
          backgroundSize: '40px 40px'
        }} />
      </div>

      <div className="container mx-auto px-4 py-20 sm:px-6 lg:px-8 relative">
        <div className="max-w-4xl mx-auto text-center">
          {/* Badge */}
          <div className="inline-flex items-center space-x-2 bg-forest-700/50 backdrop-blur-sm rounded-full px-4 py-2 mb-6">
            <span className="ui-sm text-forest-200">✨ Nigeria's #1 Real Estate Platform</span>
          </div>

          {/* Heading */}
          <h1 className="display-hero font-heading mb-6 leading-tight">
            Find Your Perfect Property
            <br />
            <span className="text-gold-300">With Confidence</span>
          </h1>

          {/* Subheading */}
          <p className="body-lg text-forest-200 mb-8 max-w-2xl mx-auto">
            Discover verified properties across Nigeria. Secure transactions with our escrow system. 
            Your dream home is just a search away.
          </p>

          {/* Search Box */}
          <form onSubmit={handleSearch} className="max-w-3xl mx-auto">
            <div className="bg-white rounded-2xl p-2 shadow-5">
              <div className="flex flex-col sm:flex-row gap-2">
                {/* Search Type Toggle */}
                <div className="flex bg-surface-secondary rounded-xl p-1">
                  <button
                    type="button"
                    onClick={() => setSearchType('all')}
                    className={`flex-1 px-4 py-2 rounded-lg ui-md transition-colors ${
                      searchType === 'all' ? 'bg-white text-forest-900 shadow-2' : 'text-text-tertiary'
                    }`}
                  >
                    All
                  </button>
                  <button
                    type="button"
                    onClick={() => setSearchType('buy')}
                    className={`flex-1 px-4 py-2 rounded-lg ui-md transition-colors ${
                      searchType === 'buy' ? 'bg-white text-forest-900 shadow-2' : 'text-text-tertiary'
                    }`}
                  >
                    Buy
                  </button>
                  <button
                    type="button"
                    onClick={() => setSearchType('rent')}
                    className={`flex-1 px-4 py-2 rounded-lg ui-md transition-colors ${
                      searchType === 'rent' ? 'bg-white text-forest-900 shadow-2' : 'text-text-tertiary'
                    }`}
                  >
                    Rent
                  </button>
                </div>

                {/* Search Input */}
                <div className="flex-1 relative">
                  <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-text-tertiary" />
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search by location, property type, or keyword..."
                    className="w-full pl-12 pr-4 py-3 bg-transparent border-none outline-none body-md text-text-primary placeholder:text-text-tertiary"
                  />
                </div>

                {/* Search Button */}
                <button
                  type="submit"
                  className="bg-forest-900 hover:bg-forest-800 text-white px-8 py-3 rounded-xl ui-md font-medium transition-colors shadow-3"
                >
                  Search
                </button>
              </div>
            </div>
          </form>

          {/* Quick Links */}
          <div className="mt-8 flex flex-wrap justify-center gap-4">
            <Link href="/search?state=Lagos" className="flex items-center space-x-2 text-forest-300 hover:text-white transition-colors">
              <MapPin className="h-4 w-4" />
              <span className="body-sm">Lagos</span>
            </Link>
            <Link href="/search?state=Abuja" className="flex items-center space-x-2 text-forest-300 hover:text-white transition-colors">
              <MapPin className="h-4 w-4" />
              <span className="body-sm">Abuja</span>
            </Link>
            <Link href="/search?state=Port Harcourt" className="flex items-center space-x-2 text-forest-300 hover:text-white transition-colors">
              <MapPin className="h-4 w-4" />
              <span className="body-sm">Port Harcourt</span>
            </Link>
            <Link href="/search?type=apartment" className="flex items-center space-x-2 text-forest-300 hover:text-white transition-colors">
              <Building2 className="h-4 w-4" />
              <span className="body-sm">Apartments</span>
            </Link>
            <Link href="/search?type=house" className="flex items-center space-x-2 text-forest-300 hover:text-white transition-colors">
              <Home className="h-4 w-4" />
              <span className="body-sm">Houses</span>
            </Link>
          </div>

          {/* Stats */}
          <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-8">
            <div>
              <p className="display-md font-heading text-gold-300">10K+</p>
              <p className="body-md text-forest-200">Properties Listed</p>
            </div>
            <div>
              <p className="display-md font-heading text-gold-300">5K+</p>
              <p className="body-md text-forest-200">Happy Clients</p>
            </div>
            <div>
              <p className="display-md font-heading text-gold-300">36</p>
              <p className="body-md text-forest-200">States Covered</p>
            </div>
            <div>
              <p className="display-md font-heading text-gold-300">24/7</p>
              <p className="body-md text-forest-200">Support Available</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
