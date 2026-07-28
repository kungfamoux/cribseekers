import { cn } from '@/lib/utils';
import { CheckCircle, Clock, XCircle, AlertCircle, Calendar } from 'lucide-react';

interface TimelineEvent {
  id: string;
  status: 'pending' | 'confirmed' | 'in_progress' | 'completed' | 'cancelled' | 'no_show';
  title: string;
  description?: string;
  timestamp?: string;
}

interface InspectionTimelineProps {
  events: TimelineEvent[];
  currentStatus?: string;
  className?: string;
}

export function InspectionTimeline({ events, currentStatus, className }: InspectionTimelineProps) {
  const statusOrder: TimelineEvent['status'][] = ['pending', 'confirmed', 'in_progress', 'completed', 'cancelled', 'no_show'];
  const currentIndex = currentStatus ? statusOrder.indexOf(currentStatus as TimelineEvent['status']) : -1;

  const getStatusIcon = (status: TimelineEvent['status']) => {
    switch (status) {
      case 'completed':
        return CheckCircle;
      case 'cancelled':
        return XCircle;
      case 'no_show':
        return AlertCircle;
      case 'in_progress':
        return Clock;
      default:
        return Calendar;
    }
  };

  const getStatusColor = (status: TimelineEvent['status'], index: number) => {
    if (status === 'cancelled' || status === 'no_show') {
      return 'border-red-500 text-red-600 dark:text-red-400';
    }
    if (index <= currentIndex && currentIndex !== -1) {
      return 'border-forest-900 text-forest-900 dark:text-forest-50';
    }
    return 'border-border-default text-forest-400';
  };

  return (
    <div className={cn('space-y-0', className)}>
      {events.map((event, index) => {
        const Icon = getStatusIcon(event.status);
        const isLast = index === events.length - 1;
        const colorClass = getStatusColor(event.status, index);

        return (
          <div key={event.id} className="relative">
            {/* Timeline Line */}
            {!isLast && (
              <div
                className={cn(
                  'absolute left-4 top-8 w-0.5 h-full',
                  index < currentIndex && currentIndex !== -1
                    ? 'bg-forest-900'
                    : 'bg-border-default'
                )}
              />
            )}

            {/* Timeline Item */}
            <div className="relative flex gap-4 pb-8">
              {/* Icon */}
              <div
                className={cn(
                  'flex-shrink-0 w-8 h-8 rounded-full border-2 flex items-center justify-center bg-white dark:bg-forest-800',
                  colorClass
                )}
              >
                <Icon className="h-4 w-4" />
              </div>

              {/* Content */}
              <div className="flex-1 pt-1">
                <h4 className="heading-sm text-forest-900 dark:text-forest-50 mb-1">
                  {event.title}
                </h4>
                {event.description && (
                  <p className="body-sm text-forest-600 dark:text-forest-400 mb-2">
                    {event.description}
                  </p>
                )}
                {event.timestamp && (
                  <p className="body-xs text-forest-500 dark:text-forest-500">
                    {new Date(event.timestamp).toLocaleString('en-NG', {
                      dateStyle: 'medium',
                      timeStyle: 'short',
                    })}
                  </p>
                )}
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
