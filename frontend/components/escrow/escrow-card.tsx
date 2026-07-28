'use client';

import { Escrow } from '@/types/escrow.types';
import { Card } from '@/components/shared/card';
import { Shield, Clock, CheckCircle, XCircle, AlertTriangle } from 'lucide-react';
import { useRouter } from 'next/navigation';

interface EscrowCardProps {
  escrow: Escrow;
}

export function EscrowCard({ escrow }: EscrowCardProps) {
  const router = useRouter();

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
    }).format(new Date(date));
  };

  const statusConfig = {
    PENDING: { icon: Clock, color: 'text-yellow-600', bg: 'bg-yellow-100', label: 'Pending' },
    FUNDED: { icon: Shield, color: 'text-blue-600', bg: 'bg-blue-100', label: 'Funded' },
    HELD: { icon: Shield, color: 'text-blue-600', bg: 'bg-blue-100', label: 'Held' },
    RELEASE_PENDING: { icon: Clock, color: 'text-yellow-600', bg: 'bg-yellow-100', label: 'Release Pending' },
    REFUND_PENDING: { icon: Clock, color: 'text-yellow-600', bg: 'bg-yellow-100', label: 'Refund Pending' },
    RELEASED: { icon: CheckCircle, color: 'text-green-600', bg: 'bg-green-100', label: 'Released' },
    REFUNDED: { icon: CheckCircle, color: 'text-green-600', bg: 'bg-green-100', label: 'Refunded' },
    DISPUTED: { icon: AlertTriangle, color: 'text-red-600', bg: 'bg-red-100', label: 'Disputed' },
    CANCELLED: { icon: XCircle, color: 'text-gray-600', bg: 'bg-gray-100', label: 'Cancelled' },
  } as const;

  const config = statusConfig[escrow.status];
  const StatusIcon = config.icon;

  return (
    <Card className="hover:shadow-md transition-shadow cursor-pointer" onClick={() => router.push(`/dashboard/escrow/${escrow.id}`)}>
      <div className="p-4">
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-center gap-3">
            <div className={`p-2 rounded-lg ${config.bg}`}>
              <StatusIcon className={`h-5 w-5 ${config.color}`} />
            </div>
            <div>
              <p className="font-medium">{escrow.description}</p>
              <p className="text-sm text-gray-500">{`ESC-${escrow.id.slice(0, 8)}`}</p>
            </div>
          </div>
          <span className={`px-3 py-1 rounded-full text-xs font-medium ${config.bg} ${config.color}`}>
            {config.label}
          </span>
        </div>

        <div className="flex items-center justify-between">
          <div>
            <p className="text-2xl font-bold">{formatCurrency(escrow.amount)}</p>
            <p className="text-sm text-gray-500">{escrow.currency}</p>
          </div>
          <div className="text-right">
            <p className="text-sm text-gray-500">Created</p>
            <p className="text-sm font-medium">{formatDate(escrow.createdAt)}</p>
          </div>
        </div>
      </div>
    </Card>
  );
}
