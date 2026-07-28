import { Bell, Check, X } from 'lucide-react';
import { cn } from '@/lib/utils';

interface NotificationCardProps {
  id: string;
  title: string;
  message: string;
  time: string;
  isRead?: boolean;
  onMarkAsRead?: () => void;
  onDismiss?: () => void;
  className?: string;
}

export function NotificationCard({
  title,
  message,
  time,
  isRead = false,
  onMarkAsRead,
  onDismiss,
  className,
}: NotificationCardProps) {
  return (
    <div
      className={cn(
        'flex items-start space-x-4 p-4 bg-white dark:bg-forest-800 rounded-lg border transition-colors',
        isRead ? 'border-border-default opacity-75' : 'border-forest-300 dark:border-forest-700',
        className
      )}
    >
      <div className={cn('flex items-center justify-center w-10 h-10 rounded-lg flex-shrink-0', isRead ? 'bg-surface-secondary' : 'bg-forest-100 dark:bg-forest-700')}>
        <Bell className={cn('h-5 w-5', isRead ? 'text-forest-400' : 'text-forest-600 dark:text-forest-400')} />
      </div>
      <div className="flex-1 min-w-0">
        <h4 className={cn('heading-sm mb-1', isRead ? 'text-forest-600 dark:text-forest-400' : 'text-forest-900 dark:text-forest-50')}>
          {title}
        </h4>
        <p className="body-sm text-forest-600 dark:text-forest-400">{message}</p>
        <span className="body-xs text-forest-500 dark:text-forest-500 mt-2 block">{time}</span>
      </div>
      <div className="flex items-center space-x-2 flex-shrink-0">
        {!isRead && onMarkAsRead && (
          <button
            onClick={onMarkAsRead}
            className="p-2 rounded-lg hover:bg-surface-secondary transition-colors"
            title="Mark as read"
          >
            <Check className="h-4 w-4 text-forest-600 dark:text-forest-400" />
          </button>
        )}
        {onDismiss && (
          <button
            onClick={onDismiss}
            className="p-2 rounded-lg hover:bg-surface-secondary transition-colors"
            title="Dismiss"
          >
            <X className="h-4 w-4 text-forest-600 dark:text-forest-400" />
          </button>
        )}
      </div>
    </div>
  );
}
