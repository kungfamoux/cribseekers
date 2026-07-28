import { cn } from '@/lib/utils';
import { CheckCircle, Clock, XCircle, AlertCircle, Calendar } from 'lucide-react';

interface InspectionStatusBadgeProps {
  status: 'pending' | 'confirmed' | 'in_progress' | 'completed' | 'cancelled' | 'rescheduled' | 'no_show';
  className?: string;
}

export function InspectionStatusBadge({ status, className }: InspectionStatusBadgeProps) {
  const statusConfig = {
    pending: {
      label: 'Pending',
      icon: Clock,
      className: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200',
    },
    confirmed: {
      label: 'Confirmed',
      icon: CheckCircle,
      className: 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200',
    },
    in_progress: {
      label: 'In Progress',
      icon: Clock,
      className: 'bg-indigo-100 text-indigo-800 dark:bg-indigo-900 dark:text-indigo-200',
    },
    completed: {
      label: 'Completed',
      icon: CheckCircle,
      className: 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200',
    },
    cancelled: {
      label: 'Cancelled',
      icon: XCircle,
      className: 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200',
    },
    rescheduled: {
      label: 'Rescheduled',
      icon: Calendar,
      className: 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200',
    },
    no_show: {
      label: 'No Show',
      icon: AlertCircle,
      className: 'bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-200',
    },
  };

  const config = statusConfig[status];
  const Icon = config.icon;

  return (
    <span className={cn(
      'inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium',
      config.className,
      className
    )}>
      <Icon className="h-3.5 w-3.5" />
      {config.label}
    </span>
  );
}
