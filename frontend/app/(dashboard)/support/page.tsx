'use client';

import { DashboardLayout } from '@/components/dashboard';
import { StatsCard, QuickActionCard } from '@/components/dashboard';
import { Users, MessageSquare, AlertTriangle, CheckCircle, Clock, TrendingUp } from 'lucide-react';

export default function SupportAdminDashboard() {
  const stats = [
    { title: 'Open Tickets', value: '23', icon: AlertTriangle, trend: { value: -5, isPositive: false } },
    { title: 'Resolved Today', value: '15', icon: CheckCircle, trend: { value: 8, isPositive: true } },
    { title: 'Active Users', value: '1,234', icon: Users, trend: { value: 12, isPositive: true } },
    { title: 'Avg Response Time', value: '2.5h', icon: Clock, trend: { value: -15, isPositive: true } },
  ];

  const quickActions = [
    {
      title: 'View Tickets',
      description: 'Manage support requests',
      icon: AlertTriangle,
      href: '/dashboard/tickets',
    },
    {
      title: 'User Management',
      description: 'View and manage users',
      icon: Users,
      href: '/dashboard/users',
    },
    {
      title: 'Messages',
      description: 'Support communications',
      icon: MessageSquare,
      href: '/dashboard/messages',
    },
    {
      title: 'Reports',
      description: 'View support metrics',
      icon: TrendingUp,
      href: '/dashboard/analytics',
    },
  ];

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div>
          <h1 className="heading-2xl text-forest-900 dark:text-forest-50 mb-2">
            Support Admin Dashboard
          </h1>
          <p className="body-md text-forest-600 dark:text-forest-400">
            Manage support tickets and user issues.
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
