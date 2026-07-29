'use client';

import { DashboardLayout } from '@/components/dashboard';
import { StatsCard, QuickActionCard } from '@/components/dashboard';
import { Users, Building2, DollarSign, Shield, TrendingUp, Settings } from 'lucide-react';

export default function SuperAdminDashboard() {
  const stats = [
    { title: 'Total Users', value: '5,234', icon: Users, trend: { value: 12, isPositive: true } },
    { title: 'Total Properties', value: '1,456', icon: Building2, trend: { value: 8, isPositive: true } },
    { title: 'Monthly Revenue', value: '₦15.2M', icon: DollarSign, trend: { value: 15, isPositive: true } },
    { title: 'System Health', value: '98%', icon: Shield, trend: { value: 0, isPositive: true } },
  ];

  const quickActions = [
    {
      title: 'User Management',
      description: 'Manage all users',
      icon: Users,
      href: '/admin/users',
    },
    {
      title: 'Property Moderation',
      description: 'Review listings',
      icon: Building2,
      href: '/admin/properties',
    },
    {
      title: 'System Settings',
      description: 'Platform configuration',
      icon: Settings,
      href: '/admin/settings',
    },
    {
      title: 'Analytics',
      description: 'Platform metrics',
      icon: TrendingUp,
      href: '/admin/analytics',
    },
  ];

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div>
          <h1 className="heading-2xl text-forest-900 dark:text-forest-50 mb-2">
            Super Admin Dashboard
          </h1>
          <p className="body-md text-forest-600 dark:text-forest-400">
            Platform-wide administration and monitoring.
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
