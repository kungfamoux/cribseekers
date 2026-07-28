'use client';

import { useAuth } from '@/hooks/useAuth';
import { useEscrowsByPayer, useEscrowsByPayee } from '@/hooks/useEscrow';
import { EscrowCard } from '@/components/escrow/escrow-card';
import { EscrowStatCard } from '@/components/escrow/escrow-stat-card';
import { Button } from '@/components/shared/button';
import { Plus, RefreshCw } from 'lucide-react';
import { useRouter } from 'next/navigation';

export function EscrowDashboard() {
  const { user } = useAuth();
  const router = useRouter();
  const { data: payerEscrows, isLoading: payerLoading } = useEscrowsByPayer(user?.id || '');
  const { data: payeeEscrows, isLoading: payeeLoading } = useEscrowsByPayee(user?.id || '');

  const allEscrows = [...(payerEscrows?.data || []), ...(payeeEscrows?.data || [])];
  const activeEscrows = allEscrows.filter(e => ['PENDING', 'FUNDED', 'HELD'].includes(e.status));
  const completedEscrows = allEscrows.filter(e => e.status === 'RELEASED');
  const disputedEscrows = allEscrows.filter(e => e.status === 'DISPUTED');

  const handleRefresh = () => {
    window.location.reload();
  };

  const handleCreateEscrow = () => {
    router.push('/dashboard/escrow/create');
  };

  if (payerLoading || payeeLoading) {
    return <EscrowDashboardSkeleton />;
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Escrow Dashboard</h1>
          <p className="text-gray-600 mt-1">Manage your escrow transactions</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="icon" onClick={handleRefresh}>
            <RefreshCw className="h-4 w-4" />
          </Button>
          <Button onClick={handleCreateEscrow}>
            <Plus className="h-4 w-4 mr-2" />
            Create Escrow
          </Button>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <EscrowStatCard
          title="Active Escrows"
          value={activeEscrows.length}
          icon="shield"
          color="blue"
        />
        <EscrowStatCard
          title="Completed"
          value={completedEscrows.length}
          icon="check"
          color="green"
        />
        <EscrowStatCard
          title="Disputed"
          value={disputedEscrows.length}
          icon="alert"
          color="red"
        />
        <EscrowStatCard
          title="Total Amount"
          value={allEscrows.reduce((sum, e) => sum + e.amount, 0)}
          icon="wallet"
          color="purple"
          isCurrency
        />
      </div>

      {/* Recent Escrows */}
      <div className="bg-white rounded-lg shadow-sm border p-6">
        <h2 className="text-xl font-semibold mb-6">Recent Escrows</h2>

        {allEscrows.length === 0 ? (
          <div className="text-center py-8 text-gray-500">
            No escrows yet
          </div>
        ) : (
          <div className="space-y-4">
            {allEscrows.slice(0, 5).map((escrow) => (
              <EscrowCard key={escrow.id} escrow={escrow} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

function EscrowDashboardSkeleton() {
  return (
    <div className="space-y-6">
      <div className="h-8 bg-gray-200 rounded animate-pulse w-48" />
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {[1, 2, 3, 4].map((i) => (
          <div key={i} className="h-32 bg-gray-200 rounded-lg animate-pulse" />
        ))}
      </div>
      <div className="h-64 bg-gray-200 rounded-lg animate-pulse" />
    </div>
  );
}
