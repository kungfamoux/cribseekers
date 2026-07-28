'use client';

import { DashboardSidebar } from './DashboardSidebar';
import { DashboardHeader } from './DashboardHeader';
import { ProtectedRoute } from '@/components/shared';

export function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <ProtectedRoute>
      <div className="min-h-screen bg-surface-secondary dark:bg-forest-950">
        <DashboardSidebar />
        <div className="lg:pl-64">
          <DashboardHeader onMobileMenuClick={() => {}} />
          <main className="p-4 lg:p-6">{children}</main>
        </div>
      </div>
    </ProtectedRoute>
  );
}
