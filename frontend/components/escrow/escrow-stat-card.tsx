'use client';

import { Card, CardContent } from '@/components/shared/card';
import { Shield, CheckCircle, AlertTriangle, Wallet } from 'lucide-react';

interface EscrowStatCardProps {
  title: string;
  value: number;
  icon: 'shield' | 'check' | 'alert' | 'wallet';
  color: 'blue' | 'green' | 'red' | 'purple';
  isCurrency?: boolean;
}

export function EscrowStatCard({ title, value, icon, color, isCurrency = false }: EscrowStatCardProps) {
  const formatValue = () => {
    if (isCurrency) {
      return new Intl.NumberFormat('en-NG', {
        style: 'currency',
        currency: 'NGN',
        minimumFractionDigits: 2,
      }).format(value);
    }
    return value.toString();
  };

  const iconMap = {
    shield: Shield,
    check: CheckCircle,
    alert: AlertTriangle,
    wallet: Wallet,
  };

  const colorMap = {
    blue: 'bg-blue-50 text-blue-600',
    green: 'bg-green-50 text-green-600',
    red: 'bg-red-50 text-red-600',
    purple: 'bg-purple-50 text-purple-600',
  };

  const Icon = iconMap[icon];

  return (
    <Card>
      <CardContent className="p-6">
        <div className="flex items-start justify-between">
          <div className="space-y-1">
            <p className="text-sm font-medium text-gray-600">{title}</p>
            <h3 className="text-2xl font-bold">{formatValue()}</h3>
          </div>
          <div className={`p-2 rounded-lg ${colorMap[color]}`}>
            <Icon className="h-5 w-5" />
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
