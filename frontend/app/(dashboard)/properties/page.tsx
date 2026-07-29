'use client';

import { DashboardLayout } from '@/components/dashboard';
import { StatsCard, QuickActionCard } from '@/components/dashboard';
import { Building2, Plus, Eye, Calendar, DollarSign, TrendingUp, CheckCircle } from 'lucide-react';

export default function LandlordDashboard() {
  const stats = [
    { title: 'Total Properties', value: '12', icon: Building2, trend: { value: 2, isPositive: true } },
    { title: 'Total Views', value: '1,234', icon: Eye, trend: { value: 15, isPositive: true } },
    { title: 'Active Listings', value: '8', icon: CheckCircle, trend: { value: 0, isPositive: true } },
    { title: 'Monthly Revenue', value: '₦450K', icon: DollarSign, trend: { value: 8, isPositive: true } },
  ];

  const quickActions = [
    {
      title: 'Add Property',
      description: 'List a new property',
      icon: Plus,
      href: '/properties/create',
    },
    {
      title: 'View Properties',
      description: 'Manage your listings',
      icon: Building2,
      href: '/dashboard/properties',
    },
    {
      title: 'View Inspections',
      description: 'Scheduled property visits',
      icon: Calendar,
      href: '/dashboard/inspections',
    },
    {
      title: 'Analytics',
      description: 'View performance metrics',
      icon: TrendingUp,
      href: '/dashboard/analytics',
    },
  ];

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div>
          <h1 className="heading-2xl text-forest-900 dark:text-forest-50 mb-2">
            Landlord Dashboard
          </h1>
          <p className="body-md text-forest-600 dark:text-forest-400">
            Manage your properties and track performance.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {stats.map((stat) => (
            <StatsCard key={stat.title} {...stat} />
          ))}
        </div>

        <div>
          <h2 className="heading-lg text-forest-900 dark:text-forest-50 mb-4">Quick Actions</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {quickActions.map((action) => (
              <QuickActionCard key={action.title} {...action} />
            ))}
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
