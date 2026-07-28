import { LucideIcon } from 'lucide-react';
import { cn } from '@/lib/utils';

interface RecentActivityCardProps {
  icon: LucideIcon;
  title: string;
  description: string;
  time: string;
  className?: string;
}

export function RecentActivityCard({ icon: Icon, title, description, time, className }: RecentActivityCardProps) {
  return (
    <div className={cn('flex items-start space-x-4 p-4 bg-white dark:bg-forest-800 rounded-lg border border-border-default', className)}>
      <div className="flex items-center justify-center w-10 h-10 bg-forest-100 dark:bg-forest-700 rounded-lg flex-shrink-0">
        <Icon className="h-5 w-5 text-forest-600 dark:text-forest-400" />
      </div>
      <div className="flex-1 min-w-0">
        <h4 className="heading-sm text-forest-900 dark:text-forest-50 mb-1">{title}</h4>
        <p className="body-sm text-forest-600 dark:text-forest-400 truncate">{description}</p>
      </div>
      <span className="body-sm text-forest-500 dark:text-forest-500 flex-shrink-0">{time}</span>
    </div>
  );
}
