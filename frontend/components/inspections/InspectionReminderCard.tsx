import { cn } from '@/lib/utils';
import { Bell, Calendar, MapPin, ChevronRight, X } from 'lucide-react';

interface InspectionReminderCardProps {
  inspection: {
    id: string;
    property: {
      title: string;
      address: string;
      image: string;
    };
    date: string;
    time: string;
    type: 'in_person' | 'virtual' | 'self_tour';
  };
  onDismiss?: () => void;
  onViewDetails?: () => void;
  className?: string;
}

export function InspectionReminderCard({
  inspection,
  onDismiss,
  onViewDetails,
  className,
}: InspectionReminderCardProps) {
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const today = new Date();
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);

    if (date.toDateString() === today.toDateString()) {
      return 'Today';
    } else if (date.toDateString() === tomorrow.toDateString()) {
      return 'Tomorrow';
    } else {
      return date.toLocaleDateString('en-NG', { weekday: 'short', month: 'short', day: 'numeric' });
    }
  };

  const getTimeUntil = (dateString: string, timeString: string) => {
    const inspectionDate = new Date(`${dateString}T${timeString}`);
    const now = new Date();
    const diffMs = inspectionDate.getTime() - now.getTime();
    const diffHours = Math.floor(diffMs / (1000 * 60 * 60));
    const diffDays = Math.floor(diffHours / 24);

    if (diffDays > 0) {
      return `in ${diffDays} day${diffDays > 1 ? 's' : ''}`;
    } else if (diffHours > 0) {
      return `in ${diffHours} hour${diffHours > 1 ? 's' : ''}`;
    } else {
      return 'soon';
    }
  };

  const typeLabels = {
    in_person: 'In-Person',
    virtual: 'Virtual',
    self_tour: 'Self-Tour',
  };

  return (
    <div className={cn(
      'bg-gradient-to-r from-forest-900 to-forest-800 dark:from-forest-700 dark:to-forest-600 rounded-xl p-4 text-white',
      className
    )}>
      {/* Header */}
      <div className="flex items-start justify-between mb-3">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center">
            <Bell className="h-4 w-4" />
          </div>
          <div>
            <p className="body-xs text-white/80">Upcoming Inspection</p>
            <p className="heading-sm">{getTimeUntil(inspection.date, inspection.time)}</p>
          </div>
        </div>
        {onDismiss && (
          <button
            onClick={onDismiss}
            className="p-1 hover:bg-white/10 rounded-lg transition-colors"
          >
            <X className="h-4 w-4 text-white/60" />
          </button>
        )}
      </div>

      {/* Content */}
      <div className="flex items-center gap-4">
        {/* Property Image */}
        <img
          src={inspection.property.image}
          alt={inspection.property.title}
          className="w-16 h-16 rounded-lg object-cover flex-shrink-0"
        />

        {/* Details */}
        <div className="flex-1 min-w-0">
          <h4 className="heading-sm mb-1 line-clamp-1">
            {inspection.property.title}
          </h4>
          <div className="space-y-1">
            <div className="flex items-center gap-1.5 body-xs text-white/80">
              <Calendar className="h-3 w-3 flex-shrink-0" />
              <span>{formatDate(inspection.date)} at {inspection.time}</span>
            </div>
            <div className="flex items-center gap-1.5 body-xs text-white/80">
              <MapPin className="h-3 w-3 flex-shrink-0" />
              <span className="line-clamp-1">{inspection.property.address}</span>
            </div>
            <div className="inline-flex items-center px-2 py-0.5 rounded bg-white/10 body-xs">
              {typeLabels[inspection.type]}
            </div>
          </div>
        </div>

        {/* Action */}
        {onViewDetails && (
          <button
            onClick={onViewDetails}
            className="p-2 hover:bg-white/10 rounded-lg transition-colors flex-shrink-0"
          >
            <ChevronRight className="h-5 w-5" />
          </button>
        )}
      </div>
    </div>
  );
}
