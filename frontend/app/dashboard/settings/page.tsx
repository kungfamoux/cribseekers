'use client';

export const dynamic = 'force-dynamic';

import { useState } from 'react';
import { DashboardLayout } from '@/components/dashboard';
import { Settings as SettingsIcon, Bell, Lock, Shield, User, ChevronRight, Trash2 } from 'lucide-react';
import { toast } from 'sonner';

export default function SettingsPage() {
  const [theme, setTheme] = useState<'light' | 'dark'>('light');

  const handleThemeToggle = () => {
    setTheme(theme === 'light' ? 'dark' : 'light');
    toast.success('Theme updated', {
      description: `Switched to ${theme === 'light' ? 'dark' : 'light'} mode`,
    });
  };

  const handleSaveSettings = () => {
    toast.success('Settings saved', {
      description: 'Your settings have been updated successfully',
    });
  };

  const settingsSections = [
    {
      title: 'Appearance',
      icon: SettingsIcon,
      items: [
        {
          label: 'Theme',
          description: 'Choose your preferred theme',
          value: theme === 'light' ? 'Light' : 'Dark',
          action: handleThemeToggle,
        },
        {
          label: 'Language',
          description: 'Select your language',
          value: 'English',
          action: () => {},
        },
      ],
    },
    {
      title: 'Notifications',
      icon: Bell,
      items: [
        {
          label: 'Email Notifications',
          description: 'Receive updates via email',
          value: 'Enabled',
          action: () => {},
        },
        {
          label: 'Push Notifications',
          description: 'Receive push notifications',
          value: 'Enabled',
          action: () => {},
        },
        {
          label: 'SMS Notifications',
          description: 'Receive updates via SMS',
          value: 'Disabled',
          action: () => {},
        },
      ],
    },
    {
      title: 'Privacy',
      icon: Shield,
      items: [
        {
          label: 'Profile Visibility',
          description: 'Control who can see your profile',
          value: 'Public',
          action: () => {},
        },
        {
          label: 'Search History',
          description: 'Allow others to see your searches',
          value: 'Private',
          action: () => {},
        },
        {
          label: 'Data Sharing',
          description: 'Control data sharing preferences',
          value: 'Limited',
          action: () => {},
        },
      ],
    },
    {
      title: 'Security',
      icon: Lock,
      items: [
        {
          label: 'Change Password',
          description: 'Update your password',
          value: '',
          action: () => (window.location.href = '/dashboard/change-password'),
        },
        {
          label: 'Two-Factor Authentication',
          description: 'Add an extra layer of security',
          value: 'Disabled',
          action: () => (window.location.href = '/dashboard/security-center'),
        },
        {
          label: 'Active Sessions',
          description: 'Manage your active sessions',
          value: '3 devices',
          action: () => (window.location.href = '/dashboard/security-center'),
        },
      ],
    },
  ];

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Header */}
        <div>
          <h1 className="heading-2xl text-forest-900 dark:text-forest-50 mb-2">Settings</h1>
          <p className="body-md text-forest-600 dark:text-forest-400">
            Manage your account settings and preferences
          </p>
        </div>

        {/* Settings Sections */}
        <div className="space-y-6">
          {settingsSections.map((section, sectionIndex) => (
            <div key={`section-${sectionIndex}`} className="bg-white dark:bg-forest-800 rounded-xl border border-border-default">
              <div className="p-6 border-b border-border-default">
                <div className="flex items-center">
                  <SettingsIcon className="h-5 w-5 text-forest-600 dark:text-forest-400 mr-2" />
                  <h3 className="heading-md text-forest-900 dark:text-forest-50">{section.title}</h3>
                </div>
              </div>
              <div className="divide-y divide-border-default">
                {section.items.map((item, itemIndex) => (
                  <div
                    key={`item-${itemIndex}`}
                    className="flex items-center justify-between p-6 hover:bg-surface-secondary transition-colors cursor-pointer"
                    onClick={item.action}
                  >
                    <div className="flex-1">
                      <h4 className="heading-sm text-forest-900 dark:text-forest-50 mb-1">{item.label}</h4>
                      <p className="body-sm text-forest-600 dark:text-forest-400">{item.description}</p>
                    </div>
                    <div className="flex items-center space-x-4">
                      {item.value && (
                        <span className="body-md text-forest-600 dark:text-forest-400">{item.value}</span>
                      )}
                      <ChevronRight className="h-5 w-5 text-forest-400" />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Account Actions */}
        <div className="bg-white dark:bg-forest-800 rounded-xl border border-border-default p-6">
          <h3 className="heading-md text-forest-900 dark:text-forest-50 mb-4">Account Actions</h3>
          <div className="space-y-3">
            <button className="w-full flex items-center justify-between px-4 py-3 bg-surface-secondary rounded-lg hover:bg-forest-100 dark:hover:bg-forest-700 transition-colors">
              <div className="flex items-center">
                <User className="h-5 w-5 text-forest-600 dark:text-forest-400 mr-3" />
                <span className="body-md text-forest-900 dark:text-forest-50">Edit Profile</span>
              </div>
              <ChevronRight className="h-5 w-5 text-forest-400" />
            </button>
            <button className="w-full flex items-center justify-between px-4 py-3 bg-red-50 dark:bg-red-900/20 rounded-lg hover:bg-red-100 dark:hover:bg-red-900/40 transition-colors">
              <div className="flex items-center">
                <Trash2 className="h-5 w-5 text-red-600 dark:text-red-400 mr-3" />
                <span className="body-md text-red-600 dark:text-red-400">Delete Account</span>
              </div>
              <ChevronRight className="h-5 w-5 text-red-400" />
            </button>
          </div>
        </div>

        {/* Save Button */}
        <div className="flex justify-end">
          <button
            onClick={handleSaveSettings}
            className="px-6 py-3 bg-forest-900 text-white rounded-lg hover:bg-forest-800 transition-colors body-md font-medium"
          >
            Save Changes
          </button>
        </div>
      </div>
    </DashboardLayout>
  );
}
