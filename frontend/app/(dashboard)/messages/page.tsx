'use client';

import { DashboardLayout } from '@/components/dashboard';
import { StatsCard, QuickActionCard } from '@/components/dashboard';
import { MessageSquare, Phone, Calendar, Building2 } from 'lucide-react';

export default function AgentDashboard() {
  const stats = [
    { title: 'Active Conversations', value: '24', icon: MessageSquare, trend: { value: 5, isPositive: true } },
    { title: 'Properties Listed', value: '18', icon: Building2, trend: { value: 3, isPositive: true } },
    { title: 'Scheduled Calls', value: '8', icon: Phone, trend: { value: 2, isPositive: true } },
    { title: 'Inspections Booked', value: '12', icon: Calendar, trend: { value: 10, isPositive: true } },
  ];

  const quickActions = [
    {
      title: 'View Messages',
      description: 'Client communications',
      icon: MessageSquare,
      href: '/dashboard/messages',
    },
    {
      title: 'My Properties',
      description: 'Manage listings',
      icon: Building2,
      href: '/dashboard/properties',
    },
    {
      title: 'Schedule Call',
      description: 'Book client calls',
      icon: Phone,
      href: '/dashboard/calls',
    },
    {
      title: 'Inspections',
      description: 'View scheduled visits',
      icon: Calendar,
      href: '/dashboard/inspections',
    },
  ];

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div>
          <h1 className="heading-2xl text-forest-900 dark:text-forest-50 mb-2">
            Agent Dashboard
          </h1>
          <p className="body-md text-forest-600 dark:text-forest-400">
            Manage your clients and property listings.
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
