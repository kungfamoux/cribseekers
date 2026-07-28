'use client';

export const dynamic = 'force-dynamic';

import { useState } from 'react';
import { DashboardLayout } from '@/components/dashboard';
import { PropertyAnalyticsCard } from '@/components/properties/PropertyAnalyticsCard';
import { Eye, Heart, MessageSquare, Calendar, ArrowLeft, Download, Loader2 } from 'lucide-react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import { usePropertyAnalytics, useProperty } from '@/hooks/useProperty';

interface WeeklyData {
  day: string;
  views: number;
  favorites: number;
  inquiries: number;
}

interface RecentActivity {
  type: 'view' | 'favorite' | 'inquiry' | 'share';
  description: string;
  message?: string;
  time: string;
}

export default function PropertyAnalyticsPage() {
  const params = useParams();
  const propertyId = params.id as string;
  const [timeRange, setTimeRange] = useState<'7d' | '30d' | '90d' | '1y'>('30d');
  
  const { isLoading: propertyLoading } = useProperty(propertyId);
  const { data: analyticsData, isLoading: analyticsLoading } = usePropertyAnalytics(propertyId);
  
  const analytics = analyticsData?.data;
  
  // Use real analytics data or fallback
  const weeklyData: WeeklyData[] = analytics?.weeklyData || [
    { day: 'Mon', views: 120, favorites: 8, inquiries: 2 },
    { day: 'Tue', views: 145, favorites: 12, inquiries: 3 },
    { day: 'Wed', views: 180, favorites: 15, inquiries: 4 },
    { day: 'Thu', views: 165, favorites: 10, inquiries: 3 },
    { day: 'Fri', views: 210, favorites: 18, inquiries: 5 },
    { day: 'Sat', views: 195, favorites: 14, inquiries: 4 },
    { day: 'Sun', views: 140, favorites: 12, inquiries: 3 },
  ];

  const recentActivity = analytics?.recentActivity || [
    {
      type: 'view',
      message: 'User viewed your property',
      time: '2 hours ago',
    },
    {
      type: 'favorite',
      message: 'User saved your property to favorites',
      time: '5 hours ago',
    },
    {
      type: 'inquiry',
      message: 'New inquiry from interested buyer',
      time: '1 day ago',
    },
    {
      type: 'view',
      message: 'Property appeared in search results',
      time: '2 days ago',
    },
  ];
  
  if (propertyLoading || analyticsLoading) {
    return (
      <DashboardLayout>
        <div className="flex items-center justify-center py-20">
          <Loader2 className="w-8 h-8 animate-spin text-forest-600" />
        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Link href={`/properties/${propertyId}/edit`}>
              <button className="p-2 hover:bg-surface-secondary dark:hover:bg-forest-700 rounded-lg transition-colors">
                <ArrowLeft className="h-5 w-5 text-forest-600 dark:text-forest-400" />
              </button>
            </Link>
            <div>
              <h1 className="heading-xl text-forest-900 dark:text-forest-50 mb-2">Property Analytics</h1>
              <p className="body-md text-forest-600 dark:text-forest-400">
                Track your property performance
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <select
              value={timeRange}
              onChange={(e) => setTimeRange(e.target.value as '7d' | '30d' | '90d' | '1y')}
              className="px-4 py-2 border border-border-default rounded-lg bg-surface-primary dark:bg-forest-700 text-forest-900 dark:text-forest-50 focus:outline-none focus:ring-2 focus:ring-forest-500"
            >
              <option value="7d">Last 7 days</option>
              <option value="30d">Last 30 days</option>
              <option value="90d">Last 90 days</option>
              <option value="1y">Last year</option>
            </select>
            <button className="inline-flex items-center px-4 py-2 border border-border-default rounded-lg body-md font-medium text-forest-900 dark:text-forest-50 hover:bg-surface-secondary dark:hover:bg-forest-700 transition-colors">
              <Download className="h-4 w-4 mr-2" />
              Export
            </button>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <PropertyAnalyticsCard
            views={2456}
            viewsChange={15}
            favorites={89}
            favoritesChange={12}
            inquiries={34}
            inquiriesChange={8}
            shares={23}
            sharesChange={5}
          />
          <PropertyAnalyticsCard
            views={1890}
            viewsChange={8}
            favorites={67}
            favoritesChange={10}
            inquiries={28}
            inquiriesChange={5}
            shares={18}
            sharesChange={3}
          />
        </div>

        {/* Weekly Activity Chart */}
        <div className="bg-white dark:bg-forest-800 rounded-xl border border-border-default p-6">
          <h2 className="heading-lg text-forest-900 dark:text-forest-50 mb-4">Weekly Activity</h2>
          <div className="space-y-4">
            {weeklyData.map((data: WeeklyData) => (
              <div key={data.day} className="space-y-2">
                <div className="flex items-center justify-between body-sm text-forest-600 dark:text-forest-400">
                  <span>{data.day}</span>
                  <span>{data.views} views</span>
                </div>
                <div className="h-8 bg-surface-secondary dark:bg-forest-700 rounded-lg overflow-hidden">
                  <div
                    className="h-full bg-forest-900 transition-all duration-300"
                    style={{ width: `${(data.views / 210) * 100}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Engagement Breakdown */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-white dark:bg-forest-800 rounded-xl border border-border-default p-6">
            <h2 className="heading-lg text-forest-900 dark:text-forest-50 mb-4">Engagement Sources</h2>
            <div className="space-y-4">
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="body-md text-forest-900 dark:text-forest-50">Search Results</span>
                  <span className="body-sm text-forest-600 dark:text-forest-400">65%</span>
                </div>
                <div className="h-2 bg-surface-secondary dark:bg-forest-700 rounded-full overflow-hidden">
                  <div className="h-full bg-forest-900" style={{ width: '65%' }} />
                </div>
              </div>
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="body-md text-forest-900 dark:text-forest-50">Featured Listings</span>
                  <span className="body-sm text-forest-600 dark:text-forest-400">20%</span>
                </div>
                <div className="h-2 bg-surface-secondary dark:bg-forest-700 rounded-full overflow-hidden">
                  <div className="h-full bg-blue-600" style={{ width: '20%' }} />
                </div>
              </div>
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="body-md text-forest-900 dark:text-forest-50">Direct Link</span>
                  <span className="body-sm text-forest-600 dark:text-forest-400">10%</span>
                </div>
                <div className="h-2 bg-surface-secondary dark:bg-forest-700 rounded-full overflow-hidden">
                  <div className="h-full bg-green-600" style={{ width: '10%' }} />
                </div>
              </div>
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="body-md text-forest-900 dark:text-forest-50">Other</span>
                  <span className="body-sm text-forest-600 dark:text-forest-400">5%</span>
                </div>
                <div className="h-2 bg-surface-secondary dark:bg-forest-700 rounded-full overflow-hidden">
                  <div className="h-full bg-gray-400" style={{ width: '5%' }} />
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white dark:bg-forest-800 rounded-xl border border-border-default p-6">
            <h2 className="heading-lg text-forest-900 dark:text-forest-50 mb-4">Top Performing Days</h2>
            <div className="space-y-3">
              <div className="flex items-center justify-between p-3 bg-surface-secondary dark:bg-forest-700 rounded-lg">
                <div className="flex items-center gap-3">
                  <Calendar className="h-5 w-5 text-forest-600 dark:text-forest-400" />
                  <div>
                    <p className="body-md font-medium text-forest-900 dark:text-forest-50">Friday</p>
                    <p className="body-sm text-forest-600 dark:text-forest-400">Most views</p>
                  </div>
                </div>
                <span className="heading-md text-forest-900 dark:text-forest-50">210</span>
              </div>
              <div className="flex items-center justify-between p-3 bg-surface-secondary dark:bg-forest-700 rounded-lg">
                <div className="flex items-center gap-3">
                  <Calendar className="h-5 w-5 text-forest-600 dark:text-forest-400" />
                  <div>
                    <p className="body-md font-medium text-forest-900 dark:text-forest-50">Wednesday</p>
                    <p className="body-sm text-forest-600 dark:text-forest-400">Most inquiries</p>
                  </div>
                </div>
                <span className="heading-md text-forest-900 dark:text-forest-50">4</span>
              </div>
              <div className="flex items-center justify-between p-3 bg-surface-secondary dark:bg-forest-700 rounded-lg">
                <div className="flex items-center gap-3">
                  <Calendar className="h-5 w-5 text-forest-600 dark:text-forest-400" />
                  <div>
                    <p className="body-md font-medium text-forest-900 dark:text-forest-50">Friday</p>
                    <p className="body-sm text-forest-600 dark:text-forest-400">Most favorites</p>
                  </div>
                </div>
                <span className="heading-md text-forest-900 dark:text-forest-50">18</span>
              </div>
            </div>
          </div>
        </div>

        {/* Recent Activity */}
        <div className="bg-white dark:bg-forest-800 rounded-xl border border-border-default p-6">
          <h2 className="heading-lg text-forest-900 dark:text-forest-50 mb-4">Recent Activity</h2>
          <div className="space-y-4">
            {recentActivity.map((activity: RecentActivity, index: number) => (
              <div key={index} className="flex items-center space-x-4 p-4 bg-surface-secondary dark:bg-forest-700 rounded-lg">
                <div className="flex items-center justify-center w-10 h-10 bg-forest-100 dark:bg-forest-600 rounded-lg flex-shrink-0">
                  {activity.type === 'view' && <Eye className="h-5 w-5 text-forest-600 dark:text-forest-400" />}
                  {activity.type === 'favorite' && <Heart className="h-5 w-5 text-red-600" />}
                  {activity.type === 'inquiry' && <MessageSquare className="h-5 w-5 text-blue-600" />}
                </div>
                <div className="flex-1">
                  <p className="body-md font-medium text-forest-900 dark:text-forest-50">
                    {activity.message}
                  </p>
                  <p className="body-sm text-forest-600 dark:text-forest-400">{activity.time}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Tips */}
        <div className="bg-blue-50 dark:bg-blue-900/20 rounded-xl border border-blue-200 dark:border-blue-800 p-6">
          <h3 className="heading-md text-blue-900 dark:text-blue-200 mb-3">Tips to Improve Performance</h3>
          <ul className="space-y-2 body-sm text-blue-800 dark:text-blue-300">
            <li>• Update your property photos regularly to keep listings fresh</li>
            <li>• Respond to inquiries quickly to improve conversion rates</li>
            <li>• Adjust pricing based on market demand and competition</li>
            <li>• Use high-quality images and detailed descriptions</li>
            <li>• Feature your property during peak search times</li>
          </ul>
        </div>
      </div>
    </DashboardLayout>
  );
}
