'use client';

import { Card, CardContent } from '@/components/shared/card';
import { Wallet, Shield, TrendingUp, TrendingDown, ArrowUpRight, ArrowDownRight } from 'lucide-react';

interface WalletStatCardProps {
  title: string;
  value: number;
  icon: 'wallet' | 'shield' | 'trending-up' | 'trending-down';
  trend?: string;
}

export function WalletStatCard({ title, value, icon, trend }: WalletStatCardProps) {
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-NG', {
      style: 'currency',
      currency: 'NGN',
      minimumFractionDigits: 2,
    }).format(amount);
  };

  const iconMap = {
    wallet: Wallet,
    shield: Shield,
    'trending-up': TrendingUp,
    'trending-down': TrendingDown,
  };

  const Icon = iconMap[icon];
  const isPositive = trend?.startsWith('+');

  return (
    <Card>
      <CardContent className="p-6">
        <div className="flex items-start justify-between">
          <div className="space-y-1">
            <p className="text-sm font-medium text-gray-600">{title}</p>
            <h3 className="text-2xl font-bold">{formatCurrency(value)}</h3>
          </div>
          <div className="p-2 bg-blue-50 rounded-lg">
            <Icon className="h-5 w-5 text-blue-600" />
          </div>
        </div>

        {trend && (
          <div className="flex items-center gap-1 mt-4 text-sm">
            {isPositive ? (
              <ArrowUpRight className="h-4 w-4 text-green-600" />
            ) : (
              <ArrowDownRight className="h-4 w-4 text-red-600" />
            )}
            <span className={isPositive ? 'text-green-600' : 'text-red-600'}>
              {trend}
            </span>
            <span className="text-gray-500">vs last month</span>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
