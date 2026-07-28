'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import Image from 'next/image';
import {
  Home,
  User,
  Heart,
  Search,
  Sparkles,
  GitCompare,
  Bell,
  Settings,
  Activity,
  X,
  LogOut,
  ChevronRight,
} from 'lucide-react';
import { useAuth } from '@/components/providers/AuthProvider';
import { cn } from '@/lib/utils';

const navigation = [
  { name: 'Dashboard', href: '/dashboard', icon: Home },
  { name: 'Profile', href: '/dashboard/profile', icon: User },
  { name: 'Saved Properties', href: '/dashboard/saved', icon: Heart },
  { name: 'Search History', href: '/dashboard/search-history', icon: Search },
  { name: 'Recommendations', href: '/dashboard/recommendations', icon: Sparkles },
  { name: 'Compare', href: '/dashboard/compare', icon: GitCompare },
  { name: 'Notifications', href: '/dashboard/notifications', icon: Bell },
  { name: 'Settings', href: '/dashboard/settings', icon: Settings },
  { name: 'Activity', href: '/dashboard/activity', icon: Activity },
];

export function DashboardSidebar() {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const pathname = usePathname();
  const { logout } = useAuth();

  return (
    <>
      {/* Mobile backdrop */}
      {isMobileOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={() => setIsMobileOpen(false)}
        />
      )}

      {/* Mobile sidebar */}
      <div
        className={cn(
          'fixed inset-y-0 left-0 z-50 w-64 bg-white dark:bg-forest-800 border-r border-border-default transform transition-transform duration-200 ease-in-out lg:hidden',
          isMobileOpen ? 'translate-x-0' : '-translate-x-full'
        )}
      >
        <div className="flex items-center justify-between h-16 px-4 border-b border-border-default">
          <Link href="/" className="flex items-center space-x-2">
            <Image src="/logo.png" alt="CribSeekers" width={32} height={32} className="h-8 w-8" />
            <span className="heading-lg font-heading text-forest-900 dark:text-forest-50">CribSeekers</span>
          </Link>
          <button
            onClick={() => setIsMobileOpen(false)}
            className="p-2 rounded-lg hover:bg-surface-secondary transition-colors"
          >
            <X className="h-5 w-5 text-forest-600 dark:text-forest-400" />
          </button>
        </div>
        <div className="flex-1 overflow-y-auto py-4">
          <nav className="space-y-1 px-3">
            {navigation.map((item) => {
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  onClick={() => setIsMobileOpen(false)}
                  className={cn(
                    'flex items-center px-3 py-2 rounded-lg body-md transition-colors',
                    isActive
                      ? 'bg-forest-100 dark:bg-forest-700 text-forest-900 dark:text-forest-50 font-medium'
                      : 'text-forest-600 dark:text-forest-400 hover:bg-surface-secondary'
                  )}
                >
                  <item.icon className="h-5 w-5 mr-3" />
                  {item.name}
                  {isActive && <ChevronRight className="ml-auto h-4 w-4" />}
                </Link>
              );
            })}
          </nav>
        </div>
        <div className="border-t border-border-default p-4">
          <button
            onClick={() => {
              logout();
              setIsMobileOpen(false);
            }}
            className="flex items-center w-full px-3 py-2 rounded-lg body-md text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors"
          >
            <LogOut className="h-5 w-5 mr-3" />
            Sign Out
          </button>
        </div>
      </div>

      {/* Desktop sidebar */}
      <div
        className={cn(
          'hidden lg:flex flex-col fixed inset-y-0 left-0 z-30 bg-white dark:bg-forest-800 border-r border-border-default transition-all duration-200',
          isCollapsed ? 'w-20' : 'w-64'
        )}
      >
        {/* Logo */}
        <div className="flex items-center h-16 px-4 border-b border-border-default">
          <Link href="/dashboard" className="flex items-center space-x-2">
            <Image src="/logo.png" alt="CribSeekers" width={32} height={32} className="h-8 w-8" />
            {!isCollapsed && (
              <span className="heading-lg font-heading text-forest-900 dark:text-forest-50">CribSeekers</span>
            )}
          </Link>
        </div>

        {/* Collapse button */}
        <button
          onClick={() => setIsCollapsed(!isCollapsed)}
          className="absolute -right-3 top-20 p-1 bg-white dark:bg-forest-800 border border-border-default rounded-full shadow-sm hover:shadow-md transition-shadow"
        >
          <ChevronRight
            className={cn('h-4 w-4 text-forest-600 dark:text-forest-400 transition-transform', !isCollapsed && 'rotate-180')}
          />
        </button>

        {/* Navigation */}
        <div className="flex-1 overflow-y-auto py-4">
          <nav className="space-y-1 px-3">
            {navigation.map((item) => {
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  className={cn(
                    'flex items-center px-3 py-2 rounded-lg body-md transition-colors group',
                    isActive
                      ? 'bg-forest-100 dark:bg-forest-700 text-forest-900 dark:text-forest-50 font-medium'
                      : 'text-forest-600 dark:text-forest-400 hover:bg-surface-secondary'
                  )}
                  title={isCollapsed ? item.name : undefined}
                >
                  <item.icon className="h-5 w-5 flex-shrink-0" />
                  {!isCollapsed && (
                    <>
                      <span className="ml-3">{item.name}</span>
                      {isActive && <ChevronRight className="ml-auto h-4 w-4" />}
                    </>
                  )}
                </Link>
              );
            })}
          </nav>
        </div>

        {/* User section */}
        <div className="border-t border-border-default p-4">
          <button
            onClick={logout}
            className="flex items-center w-full px-3 py-2 rounded-lg body-md text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors group"
            title={isCollapsed ? 'Sign Out' : undefined}
          >
            <LogOut className="h-5 w-5 flex-shrink-0" />
            {!isCollapsed && <span className="ml-3">Sign Out</span>}
          </button>
        </div>
      </div>
    </>
  );
}
