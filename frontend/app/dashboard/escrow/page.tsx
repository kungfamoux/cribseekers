'use client';

export const dynamic = 'force-dynamic';

import { Suspense } from 'react';
import { EscrowDashboard } from './escrow-dashboard';

export default function EscrowPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <Suspense fallback={<EscrowDashboardSkeleton />}>
        <EscrowDashboard />
      </Suspense>
    </div>
  );
}

function EscrowDashboardSkeleton() {
  return (
    <div className="space-y-6">
      <div className="h-8 bg-gray-200 rounded animate-pulse w-48" />
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {[1, 2, 3, 4].map((i) => (
          <div key={i} className="h-32 bg-gray-200 rounded-lg animate-pulse" />
        ))}
      </div>
      <div className="h-64 bg-gray-200 rounded-lg animate-pulse" />
    </div>
  );
}
