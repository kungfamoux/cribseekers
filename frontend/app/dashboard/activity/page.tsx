'use client';

export const dynamic = 'force-dynamic';

import { useState } from 'react';
import { DashboardLayout } from '@/components/dashboard';
import { RecentActivityCard, EmptyState } from '@/components/dashboard';
import { Activity, Filter, SortDesc, Calendar, Eye, DollarSign, Download } from 'lucide-react';

export default function ActivityPage() {
  const [filter, setFilter] = useState<'all' | 'property_views' | 'inspections' | 'payments' | 'downloads'>('all');

  const activities = [
    {
      icon: Eye,
      title: 'Viewed Property',
      description: '3-bedroom apartment in Lekki Phase 1',
      time: '2 hours ago',
    },
    {
      icon: Calendar,
      title: 'Scheduled Inspection',
      description: 'Property in Victoria Island for tomorrow at 2 PM',
      time: '5 hours ago',
    },
    {
      icon: DollarSign,
      title: 'Payment Made',
      description: 'Inspection fee ₦5,000',
      time: '1 day ago',
    },
    {
      icon: Eye,
      title: 'Viewed Property',
      description: 'Luxury 4-bedroom duplex in Victoria Island',
      time: '1 day ago',
    },
    {
      icon: Download,
      title: 'Downloaded Document',
      description: 'Property listing PDF for 123 Main Street',
      time: '2 days ago',
    },
    {
      icon: Calendar,
      title: 'Completed Inspection',
      description: 'Property in Ikeja GRA',
      time: '3 days ago',
    },
    {
      icon: DollarSign,
      title: 'Payment Made',
      description: 'Application fee ₦10,000',
      time: '4 days ago',
    },
    {
      icon: Eye,
      title: 'Viewed Property',
      description: 'Cozy 2-bedroom flat in Yaba',
      time: '5 days ago',
    },
  ];

  const filteredActivities =
    filter === 'all'
      ? activities
      : filter === 'property_views'
      ? activities.filter((a) => a.title === 'Viewed Property')
      : filter === 'inspections'
      ? activities.filter((a) => a.title.includes('Inspection'))
      : filter === 'payments'
      ? activities.filter((a) => a.title === 'Payment Made')
      : activities.filter((a) => a.title === 'Downloaded Document');

  if (activities.length === 0) {
    return (
      <DashboardLayout>
        <div className="flex flex-col items-center justify-center py-20">
          <EmptyState
            icon={Activity}
            title="No activity yet"
            description="Your activity history will appear here as you use the platform."
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
          <h1 className="heading-2xl text-forest-900 dark:text-forest-50 mb-2">Activity History</h1>
          <p className="body-md text-forest-600 dark:text-forest-400">
            View your recent actions, property views, inspections, and payments
          </p>
        </div>

        {/* Filters */}
        <div className="flex items-center space-x-4">
          <button
            onClick={() => setFilter('all')}
            className={`px-4 py-2 body-md font-medium rounded-lg transition-colors ${
              filter === 'all'
                ? 'bg-forest-900 text-white'
                : 'bg-white dark:bg-forest-800 text-forest-900 dark:text-forest-50 border border-border-default hover:bg-surface-secondary'
            }`}
          >
            All ({activities.length})
          </button>
          <button
            onClick={() => setFilter('property_views')}
            className={`px-4 py-2 body-md font-medium rounded-lg transition-colors ${
              filter === 'property_views'
                ? 'bg-forest-900 text-white'
                : 'bg-white dark:bg-forest-800 text-forest-900 dark:text-forest-50 border border-border-default hover:bg-surface-secondary'
            }`}
          >
            Property Views ({activities.filter((a) => a.title === 'Viewed Property').length})
          </button>
          <button
            onClick={() => setFilter('inspections')}
            className={`px-4 py-2 body-md font-medium rounded-lg transition-colors ${
              filter === 'inspections'
                ? 'bg-forest-900 text-white'
                : 'bg-white dark:bg-forest-800 text-forest-900 dark:text-forest-50 border border-border-default hover:bg-surface-secondary'
            }`}
          >
            Inspections ({activities.filter((a) => a.title.includes('Inspection')).length})
          </button>
          <button
            onClick={() => setFilter('payments')}
            className={`px-4 py-2 body-md font-medium rounded-lg transition-colors ${
              filter === 'payments'
                ? 'bg-forest-900 text-white'
                : 'bg-white dark:bg-forest-800 text-forest-900 dark:text-forest-50 border border-border-default hover:bg-surface-secondary'
            }`}
          >
            Payments ({activities.filter((a) => a.title === 'Payment Made').length})
          </button>
          <button
            onClick={() => setFilter('downloads')}
            className={`px-4 py-2 body-md font-medium rounded-lg transition-colors ${
              filter === 'downloads'
                ? 'bg-forest-900 text-white'
                : 'bg-white dark:bg-forest-800 text-forest-900 dark:text-forest-50 border border-border-default hover:bg-surface-secondary'
            }`}
          >
            Downloads ({activities.filter((a) => a.title === 'Downloaded Document').length})
          </button>
          <div className="flex-1" />
          <button className="flex items-center px-4 py-2 bg-white dark:bg-forest-800 border border-border-default rounded-lg hover:bg-surface-secondary transition-colors body-md">
            <Filter className="h-4 w-4 mr-2" />
            Filter
          </button>
          <button className="flex items-center px-4 py-2 bg-white dark:bg-forest-800 border border-border-default rounded-lg hover:bg-surface-secondary transition-colors body-md">
            <SortDesc className="h-4 w-4 mr-2" />
            Sort
          </button>
        </div>

        {/* Activity List */}
        <div className="space-y-3">
          {filteredActivities.map((activity, index) => (
            <RecentActivityCard key={`activity-${index}`} {...activity} />
          ))}
        </div>

        {/* Activity Summary */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="bg-white dark:bg-forest-800 rounded-xl border border-border-default p-6">
            <div className="flex items-center justify-between mb-2">
              <Eye className="h-5 w-5 text-forest-600 dark:text-forest-400" />
              <span className="body-sm text-forest-600 dark:text-forest-400">This Month</span>
            </div>
            <p className="heading-2xl text-forest-900 dark:text-forest-50">24</p>
            <p className="body-sm text-forest-600 dark:text-forest-400">Property Views</p>
          </div>
          <div className="bg-white dark:bg-forest-800 rounded-xl border border-border-default p-6">
            <div className="flex items-center justify-between mb-2">
              <Calendar className="h-5 w-5 text-forest-600 dark:text-forest-400" />
              <span className="body-sm text-forest-600 dark:text-forest-400">This Month</span>
            </div>
            <p className="heading-2xl text-forest-900 dark:text-forest-50">3</p>
            <p className="body-sm text-forest-600 dark:text-forest-400">Inspections</p>
          </div>
          <div className="bg-white dark:bg-forest-800 rounded-xl border border-border-default p-6">
            <div className="flex items-center justify-between mb-2">
              <DollarSign className="h-5 w-5 text-forest-600 dark:text-forest-400" />
              <span className="body-sm text-forest-600 dark:text-forest-400">This Month</span>
            </div>
            <p className="heading-2xl text-forest-900 dark:text-forest-50">₦15,000</p>
            <p className="body-sm text-forest-600 dark:text-forest-400">Total Spent</p>
          </div>
          <div className="bg-white dark:bg-forest-800 rounded-xl border border-border-default p-6">
            <div className="flex items-center justify-between mb-2">
              <Download className="h-5 w-5 text-forest-600 dark:text-forest-400" />
              <span className="body-sm text-forest-600 dark:text-forest-400">This Month</span>
            </div>
            <p className="heading-2xl text-forest-900 dark:text-forest-50">8</p>
            <p className="body-sm text-forest-600 dark:text-forest-400">Downloads</p>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
