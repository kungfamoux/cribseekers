'use client';

import { Wallet, WalletSummary } from '@/types/wallet.types';
import { Card, CardContent } from '@/components/shared/card';
import { Wallet as WalletIcon, Lock } from 'lucide-react';

interface WalletOverviewCardProps {
  wallet: Wallet;
  summary?: WalletSummary;
}

export function WalletOverviewCard({ wallet, summary }: WalletOverviewCardProps) {
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-NG', {
      style: 'currency',
      currency: 'NGN',
      minimumFractionDigits: 2,
    }).format(amount);
  };

  return (
    <Card className="bg-gradient-to-br from-blue-600 to-blue-800 text-white border-0">
      <CardContent className="p-6">
        <div className="flex items-start justify-between">
          <div className="space-y-1">
            <div className="flex items-center gap-2 text-blue-200">
              <WalletIcon className="h-5 w-5" />
              <span className="text-sm font-medium">Wallet Balance</span>
            </div>
            <h2 className="text-4xl font-bold mt-2">
              {formatCurrency(wallet.balance)}
            </h2>
            <p className="text-blue-200 text-sm">
              {wallet.currency}
            </p>
          </div>
          <div className={`px-3 py-1 rounded-full text-xs font-medium ${
            wallet.status === 'ACTIVE' ? 'bg-green-500' :
            wallet.status === 'FROZEN' ? 'bg-yellow-500' :
            'bg-red-500'
          }`}>
            {wallet.status}
          </div>
        </div>

        <div className="mt-6 grid grid-cols-3 gap-4 pt-6 border-t border-blue-500/30">
          <div>
            <p className="text-blue-200 text-xs mb-1">Available</p>
            <p className="font-semibold">
              {formatCurrency(summary?.availableBalance || wallet.availableBalance)}
            </p>
          </div>
          <div>
            <p className="text-blue-200 text-xs mb-1">Escrow</p>
            <p className="font-semibold">
              {formatCurrency(summary?.escrowBalance || 0)}
            </p>
          </div>
          <div>
            <p className="text-blue-200 text-xs mb-1">Pending</p>
            <p className="font-semibold">
              {formatCurrency(summary?.pendingBalance || 0)}
            </p>
          </div>
        </div>

        {wallet.isFrozen && (
          <div className="mt-4 flex items-center gap-2 text-yellow-200 text-sm">
            <Lock className="h-4 w-4" />
            <span>Wallet is frozen. Contact support for assistance.</span>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
