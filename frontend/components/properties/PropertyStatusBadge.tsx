import { cn } from '@/lib/utils';
import { CheckCircle, Clock, XCircle, Archive } from 'lucide-react';

interface PropertyStatusBadgeProps {
  status: 'draft' | 'pending' | 'published' | 'rejected' | 'archived';
  className?: string;
}

export function PropertyStatusBadge({ status, className }: PropertyStatusBadgeProps) {
  const statusConfig = {
    draft: {
      label: 'Draft',
      icon: Clock,
      bgColor: 'bg-forest-100 dark:bg-forest-800',
      textColor: 'text-forest-700 dark:text-forest-300',
      borderColor: 'border-forest-200 dark:border-forest-700',
    },
    pending: {
      label: 'Pending',
      icon: Clock,
      bgColor: 'bg-yellow-100 dark:bg-yellow-900/20',
      textColor: 'text-yellow-700 dark:text-yellow-300',
      borderColor: 'border-yellow-200 dark:border-yellow-800',
    },
    published: {
      label: 'Published',
      icon: CheckCircle,
      bgColor: 'bg-green-100 dark:bg-green-900/20',
      textColor: 'text-green-700 dark:text-green-300',
      borderColor: 'border-green-200 dark:border-green-800',
    },
    rejected: {
      label: 'Rejected',
      icon: XCircle,
      bgColor: 'bg-red-100 dark:bg-red-900/20',
      textColor: 'text-red-700 dark:text-red-300',
      borderColor: 'border-red-200 dark:border-red-800',
    },
    archived: {
      label: 'Archived',
      icon: Archive,
      bgColor: 'bg-gray-100 dark:bg-gray-800',
      textColor: 'text-gray-700 dark:text-gray-300',
      borderColor: 'border-gray-200 dark:border-gray-700',
    },
  };

  const config = statusConfig[status];
  const Icon = config.icon;

  return (
    <div
      className={cn(
        'inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full border body-xs font-medium',
        config.bgColor,
        config.textColor,
        config.borderColor,
        className
      )}
      role="status"
      aria-label={`Property status: ${config.label}`}
    >
      <Icon className="h-3.5 w-3.5" aria-hidden="true" />
      <span>{config.label}</span>
    </div>
  );
}
