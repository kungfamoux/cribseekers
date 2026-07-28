'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Bell, Search, Menu, LogOut, User, Settings } from 'lucide-react';
import { useAuth } from '@/components/providers/AuthProvider';
import { useAuthStore } from '@/store/auth.store';

export function DashboardHeader({ onMobileMenuClick }: { onMobileMenuClick: () => void }) {
  const [searchQuery, setSearchQuery] = useState('');
  const { logout } = useAuth();
  const user = useAuthStore.getState().user;

  return (
    <header className="sticky top-0 z-20 bg-white/80 dark:bg-forest-800/80 backdrop-blur-lg border-b border-border-default">
      <div className="flex items-center justify-between h-16 px-4 lg:px-6">
        {/* Left side */}
        <div className="flex items-center space-x-4">
          <button
            onClick={onMobileMenuClick}
            className="lg:hidden p-2 rounded-lg hover:bg-surface-secondary transition-colors"
          >
            <Menu className="h-5 w-5 text-forest-600 dark:text-forest-400" />
          </button>
          <Link href="/dashboard" className="flex items-center space-x-2">
            <Image src="/logo.png" alt="CribSeekers" width={32} height={32} className="h-8 w-8" />
            <span className="heading-lg font-heading text-forest-900 dark:text-forest-50 hidden sm:block">
              CribSeekers
            </span>
          </Link>
        </div>

        {/* Search bar */}
        <div className="hidden md:flex flex-1 max-w-xl mx-8">
          <div className="relative w-full">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-forest-400" />
            <input
              type="text"
              placeholder="Search properties..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 bg-surface-secondary border border-border-default rounded-lg body-md focus:outline-none focus:ring-2 focus:ring-forest-500 focus:border-transparent text-forest-900 dark:text-forest-50 placeholder-forest-400"
            />
          </div>
        </div>

        {/* Right side */}
        <div className="flex items-center space-x-2 sm:space-x-4">
          {/* Notifications */}
          <Link
            href="/dashboard/notifications"
            className="relative p-2 rounded-lg hover:bg-surface-secondary transition-colors"
          >
            <Bell className="h-5 w-5 text-forest-600 dark:text-forest-400" />
            <span className="absolute top-1 right-1 h-2 w-2 bg-red-500 rounded-full" />
          </Link>

          {/* User menu */}
          <div className="relative group">
            <button className="flex items-center space-x-2 p-2 rounded-lg hover:bg-surface-secondary transition-colors">
              <div className="w-8 h-8 bg-forest-100 dark:bg-forest-700 rounded-full flex items-center justify-center">
                <User className="h-4 w-4 text-forest-600 dark:text-forest-400" />
              </div>
              <span className="body-md text-forest-900 dark:text-forest-50 hidden sm:block">
                {user?.firstName || 'User'}
              </span>
            </button>

            {/* Dropdown menu */}
            <div className="absolute right-0 mt-2 w-48 bg-white dark:bg-forest-800 rounded-lg shadow-lg border border-border-default opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200">
              <div className="py-2">
                <Link
                  href="/dashboard/profile"
                  className="flex items-center px-4 py-2 body-md text-forest-600 dark:text-forest-400 hover:bg-surface-secondary transition-colors"
                >
                  <User className="h-4 w-4 mr-3" />
                  Profile
                </Link>
                <Link
                  href="/dashboard/settings"
                  className="flex items-center px-4 py-2 body-md text-forest-600 dark:text-forest-400 hover:bg-surface-secondary transition-colors"
                >
                  <Settings className="h-4 w-4 mr-3" />
                  Settings
                </Link>
                <hr className="my-2 border-border-default" />
                <button
                  onClick={logout}
                  className="flex items-center w-full px-4 py-2 body-md text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors"
                >
                  <LogOut className="h-4 w-4 mr-3" />
                  Sign Out
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
