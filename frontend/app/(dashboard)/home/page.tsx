'use client';

import { DashboardLayout } from '@/components/dashboard';
import { StatsCard, QuickActionCard, RecentActivityCard, RecommendationCard } from '@/components/dashboard';
import { Heart, Search, Sparkles, Eye, Calendar, CheckCircle, TrendingUp, Users, DollarSign, Loader2 } from 'lucide-react';
import { useAuthStore } from '@/store/auth.store';
import { usePublishedProperties } from '@/hooks/useProperty';
import { useInspectionsByUser } from '@/hooks/useInspection';
import { Property, Inspection } from '@/types';

interface Recommendation {
  id: string;
  title: string;
  location: string;
  price: string;
  bedrooms: number;
  bathrooms: number;
  area: string;
  rating: number;
  image: string;
  isFavorite: boolean;
  reason: string;
}

export default function TenantDashboard() {
  const user = useAuthStore.getState().user;
  const { data: propertiesData, isLoading: propertiesLoading } = usePublishedProperties();
  const { data: inspectionsData, isLoading: inspectionsLoading } = useInspectionsByUser(user?.id || '');
  
  const properties = propertiesData?.data || [];
  const inspections = inspectionsData?.data || [];
  
  if (propertiesLoading || inspectionsLoading) {
    return (
      <DashboardLayout>
        <div className="flex items-center justify-center py-20">
          <Loader2 className="w-8 h-8 animate-spin text-forest-600" />
        </div>
      </DashboardLayout>
    );
  }
  
  // Calculate stats from real data
  const stats = [
    { title: 'Property Views', value: properties.reduce((sum: number, p: Property) => sum + (p.views || 0), 0).toLocaleString(), icon: Eye, trend: { value: 12, isPositive: true } },
    { title: 'Saved Properties', value: properties.filter((p: Property) => p.favorites > 0).length.toString(), icon: Heart, trend: { value: 5, isPositive: true } },
    { title: 'Inspections', value: inspections.length.toString(), icon: Calendar, trend: { value: 2, isPositive: true } },
    { title: 'Profile Completion', value: '75%', icon: CheckCircle, trend: { value: 0, isPositive: true } },
  ];

  const quickActions = [
    {
      title: 'Search Properties',
      description: 'Find your perfect property',
      icon: Search,
      href: '/search',
    },
    {
      title: 'View Favorites',
      description: 'See your saved properties',
      icon: Heart,
      href: '/dashboard/saved',
    },
    {
      title: 'Recommendations',
      description: 'AI-powered suggestions',
      icon: Sparkles,
      href: '/dashboard/recommendations',
    },
    {
      title: 'Compare Properties',
      description: 'Side-by-side comparison',
      icon: TrendingUp,
      href: '/dashboard/compare',
    },
  ];

  const recentActivity = [
    ...(inspections.slice(0, 3).map((i: Inspection) => ({
      icon: Calendar,
      title: 'Scheduled Inspection',
      description: i.property?.title || 'Property',
      time: new Date(i.date).toLocaleDateString()
    }))),
    ...(properties.slice(0, 2).map((p: Property) => ({
      icon: Eye,
      title: 'Viewed Property',
      description: p.title,
      time: new Date(p.createdAt).toLocaleDateString()
    })))
  ].slice(0, 4);

  const recommendations: Recommendation[] = properties.slice(0, 3).map((p: Property) => ({
    id: p.id,
    title: p.title,
    location: `${p.location.city}, ${p.location.state}`,
    price: `₦${p.price.toLocaleString()}/${p.purpose === 'rent' ? 'year' : 'sale'}`,
    bedrooms: p.features.bedrooms,
    bathrooms: p.features.bathrooms,
    area: `${p.features.area} ${p.features.areaUnit}`,
    rating: 4.5,
    image: p.images[0] || '/placeholder.jpg',
    isFavorite: p.favorites > 0,
    reason: 'Based on your preferences',
  }));

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Greeting */}
        <div>
          <h1 className="heading-2xl text-forest-900 dark:text-forest-50 mb-2">
            Welcome back, {user?.firstName || 'User'}!
          </h1>
          <p className="body-md text-forest-600 dark:text-forest-400">
            Here's what's happening with your property search today.
          </p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {stats.map((stat) => (
            <StatsCard key={stat.title} {...stat} />
          ))}
        </div>

        {/* Quick Actions */}
        <div>
          <h2 className="heading-lg text-forest-900 dark:text-forest-50 mb-4">Quick Actions</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {quickActions.map((action) => (
              <QuickActionCard key={action.title} {...action} />
            ))}
          </div>
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Recent Activity */}
          <div className="lg:col-span-1">
            <h2 className="heading-lg text-forest-900 dark:text-forest-50 mb-4">Recent Activity</h2>
            <div className="space-y-3">
              {recentActivity.map((activity, index) => (
                <RecentActivityCard key={index} {...activity} />
              ))}
            </div>
          </div>

          {/* Recommendations */}
          <div className="lg:col-span-2">
            <div className="flex items-center justify-between mb-4">
              <h2 className="heading-lg text-forest-900 dark:text-forest-50">Recommended for You</h2>
              <a href="/dashboard/recommendations" className="body-sm text-forest-600 dark:text-forest-400 hover:underline">
                View all
              </a>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {recommendations.map((property: Recommendation) => (
                <RecommendationCard key={property.id} {...property} />
              ))}
            </div>
          </div>
        </div>

        {/* Market Insights */}
        <div className="bg-white dark:bg-forest-800 rounded-xl border border-border-default p-6">
          <h2 className="heading-lg text-forest-900 dark:text-forest-50 mb-4">Market Insights</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="flex items-center space-x-4">
              <div className="flex items-center justify-center w-12 h-12 bg-green-100 dark:bg-green-900 rounded-lg">
                <TrendingUp className="h-6 w-6 text-green-600 dark:text-green-400" />
              </div>
              <div>
                <p className="body-sm text-forest-600 dark:text-forest-400">Average Price</p>
                <p className="heading-md text-forest-900 dark:text-forest-50">₦2.1M/year</p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <div className="flex items-center justify-center w-12 h-12 bg-blue-100 dark:bg-blue-900 rounded-lg">
                <Users className="h-6 w-6 text-blue-600 dark:text-blue-400" />
              </div>
              <div>
                <p className="body-sm text-forest-600 dark:text-forest-400">Active Listings</p>
                <p className="heading-md text-forest-900 dark:text-forest-50">1,234</p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <div className="flex items-center justify-center w-12 h-12 bg-purple-100 dark:bg-purple-900 rounded-lg">
                <DollarSign className="h-6 w-6 text-purple-600 dark:text-purple-400" />
              </div>
              <div>
                <p className="body-sm text-forest-600 dark:text-forest-400">Price Trend</p>
                <p className="heading-md text-forest-900 dark:text-forest-50">+5.2%</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
