import { cn } from '@/lib/utils';
import { Eye, Heart, MessageSquare, Share2, TrendingUp, TrendingDown, Calendar } from 'lucide-react';

interface PropertyAnalyticsCardProps {
  views: number;
  favorites: number;
  inquiries: number;
  shares: number;
  viewsChange?: number;
  favoritesChange?: number;
  inquiriesChange?: number;
  sharesChange?: number;
  period?: string;
  className?: string;
}

export function PropertyAnalyticsCard({
  views,
  favorites,
  inquiries,
  shares,
  viewsChange,
  favoritesChange,
  inquiriesChange,
  sharesChange,
  period = 'Last 30 days',
  className,
}: PropertyAnalyticsCardProps) {
  const formatNumber = (num: number) => {
    if (num >= 1000) {
      return (num / 1000).toFixed(1) + 'k';
    }
    return num.toString();
  };

  const formatChange = (change?: number) => {
    if (change === undefined) return null;
    const isPositive = change >= 0;
    return (
      <div className={cn('flex items-center gap-1 body-xs', isPositive ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400')}>
        {isPositive ? <TrendingUp className="h-3 w-3" /> : <TrendingDown className="h-3 w-3" />}
        <span>{Math.abs(change)}%</span>
      </div>
    );
  };

  const metrics = [
    { label: 'Views', value: views, change: viewsChange, icon: Eye, color: 'bg-blue-100 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400' },
    { label: 'Favorites', value: favorites, change: favoritesChange, icon: Heart, color: 'bg-red-100 dark:bg-red-900/20 text-red-600 dark:text-red-400' },
    { label: 'Inquiries', value: inquiries, change: inquiriesChange, icon: MessageSquare, color: 'bg-purple-100 dark:bg-purple-900/20 text-purple-600 dark:text-purple-400' },
    { label: 'Shares', value: shares, change: sharesChange, icon: Share2, color: 'bg-green-100 dark:bg-green-900/20 text-green-600 dark:text-green-400' },
  ];

  const conversionRate = inquiries > 0 && views > 0 ? ((inquiries / views) * 100).toFixed(1) : '0';

  return (
    <div
      className={cn(
        'bg-surface-primary dark:bg-forest-800 rounded-xl border border-border-default p-6',
        className
      )}
    >
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <TrendingUp className="h-5 w-5 text-forest-900 dark:text-forest-50" />
          <h3 className="heading-md text-forest-900 dark:text-forest-50">Analytics</h3>
        </div>
        <div className="flex items-center gap-1 body-xs text-forest-600 dark:text-forest-400">
          <Calendar className="h-3 w-3" />
          <span>{period}</span>
        </div>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
        {metrics.map((metric) => {
          const Icon = metric.icon;
          return (
            <div key={metric.label} className="space-y-2">
              <div className={cn('inline-flex items-center justify-center w-10 h-10 rounded-lg', metric.color)}>
                <Icon className="h-5 w-5" />
              </div>
              <p className="heading-lg text-forest-900 dark:text-forest-50">{formatNumber(metric.value)}</p>
              <div className="flex items-center justify-between">
                <p className="body-xs text-forest-600 dark:text-forest-400">{metric.label}</p>
                {formatChange(metric.change)}
              </div>
            </div>
          );
        })}
      </div>

      <div className="pt-4 border-t border-border-default">
        <div className="flex items-center justify-between">
          <div>
            <p className="body-xs text-forest-600 dark:text-forest-400 mb-1">Conversion Rate</p>
            <p className="heading-md text-forest-900 dark:text-forest-50">{conversionRate}%</p>
          </div>
          <div className="text-right">
            <p className="body-xs text-forest-600 dark:text-forest-400 mb-1">Total Interactions</p>
            <p className="heading-md text-forest-900 dark:text-forest-50">
              {formatNumber(favorites + inquiries + shares)}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
