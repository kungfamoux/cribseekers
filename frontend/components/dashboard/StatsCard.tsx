import { LucideIcon } from 'lucide-react';
import { cn } from '@/lib/utils';

interface StatsCardProps {
  title: string;
  value: string | number;
  icon: LucideIcon;
  trend?: {
    value: number;
    isPositive: boolean;
  };
  className?: string;
}

export function StatsCard({ title, value, icon: Icon, trend, className }: StatsCardProps) {
  return (
    <div className={cn('bg-white dark:bg-forest-800 rounded-xl border border-border-default p-6', className)}>
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center justify-center w-12 h-12 bg-forest-100 dark:bg-forest-700 rounded-lg">
          <Icon className="h-6 w-6 text-forest-600 dark:text-forest-400" />
        </div>
        {trend && (
          <div
            className={cn(
              'flex items-center text-sm font-medium',
              trend.isPositive ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'
            )}
          >
            {trend.isPositive ? '↑' : '↓'} {Math.abs(trend.value)}%
          </div>
        )}
      </div>
      <div>
        <p className="body-sm text-forest-600 dark:text-forest-400 mb-1">{title}</p>
        <p className="heading-2xl text-forest-900 dark:text-forest-50">{value}</p>
      </div>
    </div>
  );
}
