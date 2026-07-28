'use client';

export const dynamic = 'force-dynamic';

import { useState } from 'react';
import { DashboardLayout } from '@/components/dashboard';
import { NotificationCard, EmptyState } from '@/components/dashboard';
import { Bell, Check, Filter, SortDesc, Settings, Trash2 } from 'lucide-react';
import { toast } from 'sonner';

export default function NotificationsPage() {
  const [filter, setFilter] = useState<'all' | 'unread' | 'read'>('all');

  const notifications = [
    {
      id: '1',
      title: 'New property matching your search',
      message: 'A 3-bedroom apartment in Lekki matching your criteria has been listed.',
      time: '2 hours ago',
      isRead: false,
    },
    {
      id: '2',
      title: 'Price drop alert',
      message: 'The luxury duplex in Victoria Island you viewed has dropped by 10%.',
      time: '5 hours ago',
      isRead: false,
    },
    {
      id: '3',
      title: 'Inspection reminder',
      message: 'Your property inspection is scheduled for tomorrow at 2 PM.',
      time: '1 day ago',
      isRead: true,
    },
    {
      id: '4',
      title: 'Profile verification update',
      message: 'Your identity verification has been approved.',
      time: '2 days ago',
      isRead: true,
    },
    {
      id: '5',
      title: 'New message from agent',
      message: 'You have a new message regarding the property in Ikeja.',
      time: '3 days ago',
      isRead: true,
    },
  ];

  const filteredNotifications =
    filter === 'all'
      ? notifications
      : filter === 'unread'
      ? notifications.filter((n) => !n.isRead)
      : notifications.filter((n) => n.isRead);

  const handleMarkAsRead = () => {
    toast.success('Notification marked as read', {
      description: 'The notification has been marked as read',
    });
  };

  const handleDismiss = () => {
    toast.success('Notification dismissed', {
      description: 'The notification has been removed',
    });
  };

  const handleMarkAllAsRead = () => {
    toast.success('All notifications marked as read', {
      description: 'All unread notifications have been marked as read',
    });
  };

  const handleDeleteAll = () => {
    toast.success('All notifications deleted', {
      description: 'All notifications have been removed',
    });
  };

  if (notifications.length === 0) {
    return (
      <DashboardLayout>
        <div className="flex flex-col items-center justify-center py-20">
          <EmptyState
            icon={Bell}
            title="No notifications"
            description="You're all caught up! We'll notify you when there are updates."
          />
        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="heading-2xl text-forest-900 dark:text-forest-50 mb-2">Notifications</h1>
            <p className="body-md text-forest-600 dark:text-forest-400">
              {notifications.filter((n) => !n.isRead).length} unread notifications
            </p>
          </div>
          <div className="flex items-center space-x-2">
            <button
              onClick={handleMarkAllAsRead}
              className="flex items-center px-4 py-2 bg-white dark:bg-forest-800 text-forest-900 dark:text-forest-50 border border-border-default rounded-lg hover:bg-surface-secondary transition-colors body-md"
            >
              <Check className="h-4 w-4 mr-2" />
              Mark All Read
            </button>
            <button
              onClick={handleDeleteAll}
              className="flex items-center px-4 py-2 bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400 border border-red-200 dark:border-red-900 rounded-lg hover:bg-red-100 dark:hover:bg-red-900/40 transition-colors body-md"
            >
              <Trash2 className="h-4 w-4 mr-2" />
              Delete All
            </button>
          </div>
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
            All ({notifications.length})
          </button>
          <button
            onClick={() => setFilter('unread')}
            className={`px-4 py-2 body-md font-medium rounded-lg transition-colors ${
              filter === 'unread'
                ? 'bg-forest-900 text-white'
                : 'bg-white dark:bg-forest-800 text-forest-900 dark:text-forest-50 border border-border-default hover:bg-surface-secondary'
            }`}
          >
            Unread ({notifications.filter((n) => !n.isRead).length})
          </button>
          <button
            onClick={() => setFilter('read')}
            className={`px-4 py-2 body-md font-medium rounded-lg transition-colors ${
              filter === 'read'
                ? 'bg-forest-900 text-white'
                : 'bg-white dark:bg-forest-800 text-forest-900 dark:text-forest-50 border border-border-default hover:bg-surface-secondary'
            }`}
          >
            Read ({notifications.filter((n) => n.isRead).length})
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

        {/* Notifications List */}
        <div className="space-y-3">
          {filteredNotifications.map((notification) => (
            <NotificationCard
              key={notification.id}
              {...notification}
              onMarkAsRead={() => handleMarkAsRead()}
              onDismiss={() => handleDismiss()}
            />
          ))}
        </div>

        {/* Notification Preferences */}
        <div className="bg-white dark:bg-forest-800 rounded-xl border border-border-default p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center">
              <Settings className="h-5 w-5 text-forest-600 dark:text-forest-400 mr-2" />
              <h3 className="heading-md text-forest-900 dark:text-forest-50">Notification Preferences</h3>
            </div>
            <button className="body-md text-forest-600 dark:text-forest-400 hover:underline">
              Manage Settings
            </button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="flex items-center justify-between p-4 bg-surface-secondary rounded-lg">
              <span className="body-md text-forest-900 dark:text-forest-50">Property Updates</span>
              <div className="w-12 h-6 bg-forest-900 rounded-full relative cursor-pointer">
                <div className="absolute right-1 top-1 w-4 h-4 bg-white rounded-full" />
              </div>
            </div>
            <div className="flex items-center justify-between p-4 bg-surface-secondary rounded-lg">
              <span className="body-md text-forest-900 dark:text-forest-50">Price Alerts</span>
              <div className="w-12 h-6 bg-forest-900 rounded-full relative cursor-pointer">
                <div className="absolute right-1 top-1 w-4 h-4 bg-white rounded-full" />
              </div>
            </div>
            <div className="flex items-center justify-between p-4 bg-surface-secondary rounded-lg">
              <span className="body-md text-forest-900 dark:text-forest-50">Inspection Reminders</span>
              <div className="w-12 h-6 bg-forest-900 rounded-full relative cursor-pointer">
                <div className="absolute right-1 top-1 w-4 h-4 bg-white rounded-full" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
