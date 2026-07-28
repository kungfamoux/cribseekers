'use client';

import { Card, CardContent } from '@/components/shared/card';
import { Plus, ArrowDownRight, History, CreditCard } from 'lucide-react';
import { useRouter } from 'next/navigation';

export function WalletQuickActions() {
  const router = useRouter();

  const actions = [
    {
      icon: Plus,
      label: 'Fund Wallet',
      description: 'Add money to your wallet',
      onClick: () => router.push('/dashboard/wallet/fund'),
      color: 'bg-green-50 text-green-600',
    },
    {
      icon: ArrowDownRight,
      label: 'Withdraw',
      description: 'Withdraw to bank account',
      onClick: () => router.push('/dashboard/wallet/withdraw'),
      color: 'bg-blue-50 text-blue-600',
    },
    {
      icon: History,
      label: 'Transactions',
      description: 'View transaction history',
      onClick: () => router.push('/dashboard/wallet/transactions'),
      color: 'bg-purple-50 text-purple-600',
    },
    {
      icon: CreditCard,
      label: 'Bank Accounts',
      description: 'Manage linked accounts',
      onClick: () => router.push('/dashboard/wallet/bank-accounts'),
      color: 'bg-orange-50 text-orange-600',
    },
  ];

  return (
    <Card>
      <CardContent className="p-6">
        <h3 className="text-lg font-semibold mb-4">Quick Actions</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {actions.map((action) => {
            const Icon = action.icon;
            return (
              <button
                key={action.label}
                onClick={action.onClick}
                className="flex flex-col items-center gap-3 p-4 rounded-lg border hover:bg-gray-50 transition-colors"
              >
                <div className={`p-3 rounded-lg ${action.color}`}>
                  <Icon className="h-5 w-5" />
                </div>
                <div className="text-center">
                  <p className="font-medium text-sm">{action.label}</p>
                  <p className="text-xs text-gray-500">{action.description}</p>
                </div>
              </button>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
}
