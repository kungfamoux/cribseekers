'use client';

import { DashboardLayout } from '@/components/dashboard';
import { StatsCard, QuickActionCard } from '@/components/dashboard';
import { Users, Building2, TrendingUp, DollarSign, CheckCircle, Shield } from 'lucide-react';

export default function AgencyAdminDashboard() {
  const stats = [
    { title: 'Total Agents', value: '15', icon: Users, trend: { value: 3, isPositive: true } },
    { title: 'Agency Properties', value: '45', icon: Building2, trend: { value: 5, isPositive: true } },
    { title: 'Monthly Revenue', value: '₦2.1M', icon: DollarSign, trend: { value: 12, isPositive: true } },
    { title: 'Active Listings', value: '38', icon: CheckCircle, trend: { value: 2, isPositive: true } },
  ];

  const quickActions = [
    {
      title: 'Manage Agents',
      description: 'View and manage team',
      icon: Users,
      href: '/dashboard/agents',
    },
    {
      title: 'Agency Properties',
      description: 'View all listings',
      icon: Building2,
      href: '/dashboard/properties',
    },
    {
      title: 'Performance',
      description: 'View agency metrics',
      icon: TrendingUp,
      href: '/dashboard/analytics',
    },
    {
      title: 'Settings',
      description: 'Agency configuration',
      icon: Shield,
      href: '/dashboard/settings',
    },
  ];

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div>
          <h1 className="heading-2xl text-forest-900 dark:text-forest-50 mb-2">
            Agency Admin Dashboard
          </h1>
          <p className="body-md text-forest-600 dark:text-forest-400">
            Manage your agency and team performance.
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
