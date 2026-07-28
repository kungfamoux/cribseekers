'use client';

import { WalletTransaction } from '@/types/wallet.types';
import { Card } from '@/components/shared/card';
import { ArrowUpRight, ArrowDownRight, Clock, CheckCircle, XCircle } from 'lucide-react';

interface TransactionCardProps {
  transaction: WalletTransaction;
}

export function TransactionCard({ transaction }: TransactionCardProps) {
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-NG', {
      style: 'currency',
      currency: 'NGN',
      minimumFractionDigits: 2,
    }).format(amount);
  };

  const formatDate = (date: Date | string) => {
    return new Intl.DateTimeFormat('en-NG', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    }).format(new Date(date));
  };

  const isCredit = transaction.type === 'CREDIT';
  const statusIcon = {
    COMPLETED: CheckCircle,
    PENDING: Clock,
    FAILED: XCircle,
  }[transaction.status];
  const StatusIcon = statusIcon;
  const statusColor = {
    COMPLETED: 'text-green-600',
    PENDING: 'text-yellow-600',
    FAILED: 'text-red-600',
  }[transaction.status];

  return (
    <Card className="hover:shadow-md transition-shadow cursor-pointer">
      <div className="p-4 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div className={`p-3 rounded-full ${
            isCredit ? 'bg-green-100' : 'bg-red-100'
          }`}>
            {isCredit ? (
              <ArrowDownRight className="h-5 w-5 text-green-600" />
            ) : (
              <ArrowUpRight className="h-5 w-5 text-red-600" />
            )}
          </div>
          <div>
            <p className="font-medium">{transaction.description}</p>
            <p className="text-sm text-gray-500">{transaction.reference}</p>
          </div>
        </div>

        <div className="text-right">
          <p className={`font-semibold ${isCredit ? 'text-green-600' : 'text-red-600'}`}>
            {isCredit ? '+' : '-'}{formatCurrency(transaction.amount)}
          </p>
          <div className="flex items-center justify-end gap-2 mt-1">
            <StatusIcon className={`h-4 w-4 ${statusColor}`} />
            <p className="text-sm text-gray-500">{formatDate(transaction.createdAt)}</p>
          </div>
        </div>
      </div>
    </Card>
  );
}
