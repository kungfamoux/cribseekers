'use client';

import { useWalletByUser, useWalletSummary, useWalletTransactions } from '@/hooks/useWallet';
import { useAuth } from '@/hooks/useAuth';
import { WalletOverviewCard } from '@/components/wallet/wallet-overview-card';
import { WalletStatCard } from '@/components/wallet/wallet-stat-card';
import { TransactionCard } from '@/components/wallet/transaction-card';
import { WalletQuickActions } from '@/components/wallet/wallet-quick-actions';
import { Button } from '@/components/shared/button';
import { ArrowRight, RefreshCw } from 'lucide-react';
import { useRouter } from 'next/navigation';

export function WalletDashboard() {
  const { user } = useAuth();
  const router = useRouter();
  const { data: wallet, isLoading: walletLoading } = useWalletByUser(user?.id || '');
  const { data: summary, isLoading: summaryLoading } = useWalletSummary(wallet?.data?.id || '');
  const { data: transactions, isLoading: transactionsLoading } = useWalletTransactions(
    wallet?.data?.id || '',
    { page: 1, limit: 5 }
  );

  const handleRefresh = () => {
    window.location.reload();
  };

  if (walletLoading || summaryLoading) {
    return <WalletDashboardSkeleton />;
  }

  if (!wallet?.data) {
    return (
      <div className="text-center py-12">
        <h2 className="text-2xl font-semibold mb-4">No Wallet Found</h2>
        <p className="text-gray-600 mb-6">You don't have a wallet yet. Create one to get started.</p>
        <Button onClick={() => router.push('/dashboard/wallet/create')}>
          Create Wallet
        </Button>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Wallet Dashboard</h1>
          <p className="text-gray-600 mt-1">Manage your finances and transactions</p>
        </div>
        <Button variant="outline" size="icon" onClick={handleRefresh}>
          <RefreshCw className="h-4 w-4" />
        </Button>
      </div>

      {/* Wallet Overview */}
      <WalletOverviewCard wallet={wallet.data} summary={summary?.data || undefined} />

      {/* Quick Actions */}
      <WalletQuickActions />

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <WalletStatCard
          title="Available Balance"
          value={summary?.data?.availableBalance || 0}
          icon="wallet"
          trend="+12.5%"
        />
        <WalletStatCard
          title="Escrow Balance"
          value={summary?.data?.escrowBalance || 0}
          icon="shield"
          trend="+5.2%"
        />
        <WalletStatCard
          title="Monthly Income"
          value={summary?.data?.totalCredits || 0}
          icon="trending-up"
          trend="+8.3%"
        />
        <WalletStatCard
          title="Monthly Expenses"
          value={summary?.data?.totalDebits || 0}
          icon="trending-down"
          trend="-3.1%"
        />
      </div>

      {/* Recent Transactions */}
      <div className="bg-white rounded-lg shadow-sm border p-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-semibold">Recent Transactions</h2>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => router.push('/dashboard/wallet/transactions')}
          >
            View All
            <ArrowRight className="h-4 w-4 ml-2" />
          </Button>
        </div>

        {transactionsLoading ? (
          <div className="space-y-4">
            {[1, 2, 3].map((i) => (
              <div key={i} className="h-16 bg-gray-100 rounded animate-pulse" />
            ))}
          </div>
        ) : transactions?.data?.length === 0 ? (
          <div className="text-center py-8 text-gray-500">
            No transactions yet
          </div>
        ) : (
          <div className="space-y-4">
            {transactions?.data?.slice(0, 5).map((transaction) => (
              <TransactionCard key={transaction.id} transaction={transaction} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

function WalletDashboardSkeleton() {
  return (
    <div className="space-y-6">
      <div className="h-8 bg-gray-200 rounded animate-pulse w-48" />
      <div className="h-48 bg-gray-200 rounded-lg animate-pulse" />
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {[1, 2, 3, 4].map((i) => (
          <div key={i} className="h-32 bg-gray-200 rounded-lg animate-pulse" />
        ))}
      </div>
      <div className="h-64 bg-gray-200 rounded-lg animate-pulse" />
    </div>
  );
}
