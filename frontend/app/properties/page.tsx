'use client';

export const dynamic = 'force-dynamic';

import { DashboardLayout, StatsCard, QuickActionCard } from '@/components/dashboard';
import { Home, FileText, Clock, XCircle, Plus, TrendingUp, Eye, Heart, MessageSquare, Settings, Upload, Calendar } from 'lucide-react';
import Link from 'next/link';

export default function PropertyDashboardPage() {
  const stats = [
    {
      title: 'Published Properties',
      value: '12',
      icon: Home,
      trend: { value: 8, isPositive: true },
      description: 'Active listings',
    },
    {
      title: 'Drafts',
      value: '5',
      icon: FileText,
      trend: { value: 2, isPositive: true },
      description: 'Unpublished drafts',
    },
    {
      title: 'Pending Approval',
      value: '3',
      icon: Clock,
      trend: { value: 1, isPositive: false },
      description: 'Awaiting review',
    },
    {
      title: 'Rejected Listings',
      value: '1',
      icon: XCircle,
      trend: { value: 0, isPositive: true },
      description: 'Needs revision',
    },
  ];

  const performanceStats = [
    {
      title: 'Total Views',
      value: '2,456',
      icon: Eye,
      trend: { value: 15, isPositive: true },
      description: 'Last 30 days',
    },
    {
      title: 'Total Favorites',
      value: '89',
      icon: Heart,
      trend: { value: 12, isPositive: true },
      description: 'Users saved your properties',
    },
    {
      title: 'Inquiries',
      value: '34',
      icon: MessageSquare,
      trend: { value: 8, isPositive: true },
      description: 'Messages received',
    },
  ];

  const quickActions = [
    {
      title: 'Create New Property',
      description: 'List a new property',
      icon: Plus,
      href: '/properties/create',
      color: 'bg-forest-900',
    },
    {
      title: 'Manage Properties',
      description: 'View and edit listings',
      icon: Settings,
      href: '/properties/my',
      color: 'bg-blue-600',
    },
    {
      title: 'Upload Media',
      description: 'Add photos and videos',
      icon: Upload,
      href: '/properties/media',
      color: 'bg-purple-600',
    },
    {
      title: 'View Analytics',
      description: 'Track performance',
      icon: TrendingUp,
      href: '/properties/analytics',
      color: 'bg-orange-600',
    },
    {
      title: 'Availability',
      description: 'Manage calendar',
      icon: Calendar,
      href: '/properties/availability',
      color: 'bg-pink-600',
    },
    {
      title: 'View Drafts',
      description: 'Continue editing',
      icon: FileText,
      href: '/properties/drafts',
      color: 'bg-gray-600',
    },
  ];

  return (
    <DashboardLayout>
      <div className="space-y-8">
        {/* Header */}
        <div>
          <h1 className="heading-xl text-forest-900 dark:text-forest-50 mb-2">Property Management</h1>
          <p className="body-md text-forest-600 dark:text-forest-400">
            Manage your property listings, track performance, and grow your business
          </p>
        </div>

        {/* Overview Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat) => (
            <StatsCard key={stat.title} {...stat} />
          ))}
        </div>

        {/* Performance Summary */}
        <div>
          <h2 className="heading-lg text-forest-900 dark:text-forest-50 mb-4">Performance Summary</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {performanceStats.map((stat) => (
              <StatsCard key={stat.title} {...stat} />
            ))}
          </div>
        </div>

        {/* Quick Actions */}
        <div>
          <h2 className="heading-lg text-forest-900 dark:text-forest-50 mb-4">Quick Actions</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {quickActions.map((action) => (
              <Link key={action.title} href={action.href}>
                <QuickActionCard {...action} />
              </Link>
            ))}
          </div>
        </div>

        {/* Recent Activity */}
        <div className="bg-white dark:bg-forest-800 rounded-xl border border-border-default p-6">
          <h2 className="heading-lg text-forest-900 dark:text-forest-50 mb-4">Recent Activity</h2>
          <div className="space-y-4">
            <div className="flex items-start space-x-4 p-4 bg-surface-secondary dark:bg-forest-700 rounded-lg">
              <div className="flex items-center justify-center w-10 h-10 bg-forest-900 dark:bg-forest-50 rounded-lg flex-shrink-0">
                <Eye className="h-5 w-5 text-white dark:text-forest-900" />
              </div>
              <div className="flex-1">
                <p className="body-md font-medium text-forest-900 dark:text-forest-50">
                  Modern 3-Bedroom Apartment received 45 new views
                </p>
                <p className="body-sm text-forest-600 dark:text-forest-400">2 hours ago</p>
              </div>
            </div>
            <div className="flex items-start space-x-4 p-4 bg-surface-secondary dark:bg-forest-700 rounded-lg">
              <div className="flex items-center justify-center w-10 h-10 bg-blue-600 rounded-lg flex-shrink-0">
                <Heart className="h-5 w-5 text-white" />
              </div>
              <div className="flex-1">
                <p className="body-md font-medium text-forest-900 dark:text-forest-50">
                  Luxury Villa in Lekki was saved by 3 users
                </p>
                <p className="body-sm text-forest-600 dark:text-forest-400">5 hours ago</p>
              </div>
            </div>
            <div className="flex items-start space-x-4 p-4 bg-surface-secondary dark:bg-forest-700 rounded-lg">
              <div className="flex items-center justify-center w-10 h-10 bg-purple-600 rounded-lg flex-shrink-0">
                <MessageSquare className="h-5 w-5 text-white" />
              </div>
              <div className="flex-1">
                <p className="body-md font-medium text-forest-900 dark:text-forest-50">
                  New inquiry for Commercial Space in Victoria Island
                </p>
                <p className="body-sm text-forest-600 dark:text-forest-400">1 day ago</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
