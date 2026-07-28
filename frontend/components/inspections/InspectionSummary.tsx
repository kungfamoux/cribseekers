import { cn } from '@/lib/utils';
import { Calendar, Clock, MapPin, User, MessageSquare, Video, Home } from 'lucide-react';

interface InspectionSummaryProps {
  inspection: {
    id: string;
    property: {
      title: string;
      address: string;
      image: string;
      type: string;
      bedrooms?: number;
      bathrooms?: number;
      area?: number;
    };
    agent?: {
      name: string;
      avatar?: string;
      phone?: string;
    };
    date: string;
    time: string;
    type: 'in_person' | 'virtual' | 'self_tour';
    status: 'pending' | 'confirmed' | 'completed' | 'cancelled' | 'rescheduled' | 'no_show';
    notes?: string;
  };
  onContactAgent?: () => void;
  onReschedule?: () => void;
  onCancel?: () => void;
  className?: string;
}

export function InspectionSummary({
  inspection,
  onContactAgent,
  onReschedule,
  onCancel,
  className,
}: InspectionSummaryProps) {
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-NG', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  const typeLabels = {
    in_person: 'In-Person Inspection',
    virtual: 'Virtual Tour',
    self_tour: 'Self-Guided Tour',
  };

  const typeIcons = {
    in_person: User,
    virtual: Video,
    self_tour: Home,
  };

  const TypeIcon = typeIcons[inspection.type];

  return (
    <div className={cn('bg-white dark:bg-forest-800 rounded-xl border border-border-default overflow-hidden', className)}>
      {/* Property Header */}
      <div className="relative h-48 bg-surface-secondary">
        <img
          src={inspection.property.image}
          alt={inspection.property.title}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
        <div className="absolute bottom-4 left-4 right-4">
          <h3 className="heading-lg text-white mb-1">{inspection.property.title}</h3>
          <div className="flex items-center gap-1 body-sm text-white/90">
            <MapPin className="h-4 w-4" />
            <span className="line-clamp-1">{inspection.property.address}</span>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="p-6 space-y-6">
        {/* Inspection Details */}
        <div>
          <h4 className="heading-sm text-forest-900 dark:text-forest-50 mb-4">Inspection Details</h4>
          <div className="space-y-3">
            <div className="flex items-start gap-3">
              <Calendar className="h-5 w-5 text-forest-600 dark:text-forest-400 flex-shrink-0 mt-0.5" />
              <div>
                <p className="body-xs text-forest-600 dark:text-forest-400 mb-0.5">Date</p>
                <p className="body-sm font-medium text-forest-900 dark:text-forest-50">
                  {formatDate(inspection.date)}
                </p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <Clock className="h-5 w-5 text-forest-600 dark:text-forest-400 flex-shrink-0 mt-0.5" />
              <div>
                <p className="body-xs text-forest-600 dark:text-forest-400 mb-0.5">Time</p>
                <p className="body-sm font-medium text-forest-900 dark:text-forest-50">
                  {inspection.time}
                </p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <TypeIcon className="h-5 w-5 text-forest-600 dark:text-forest-400 flex-shrink-0 mt-0.5" />
              <div>
                <p className="body-xs text-forest-600 dark:text-forest-400 mb-0.5">Type</p>
                <p className="body-sm font-medium text-forest-900 dark:text-forest-50">
                  {typeLabels[inspection.type]}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Property Details */}
        <div>
          <h4 className="heading-sm text-forest-900 dark:text-forest-50 mb-4">Property Details</h4>
          <div className="grid grid-cols-3 gap-4">
            <div className="bg-surface-secondary dark:bg-forest-700 rounded-lg p-3 text-center">
              <p className="heading-lg text-forest-900 dark:text-forest-50">
                {inspection.property.bedrooms || '-'}
              </p>
              <p className="body-xs text-forest-600 dark:text-forest-400">Bedrooms</p>
            </div>
            <div className="bg-surface-secondary dark:bg-forest-700 rounded-lg p-3 text-center">
              <p className="heading-lg text-forest-900 dark:text-forest-50">
                {inspection.property.bathrooms || '-'}
              </p>
              <p className="body-xs text-forest-600 dark:text-forest-400">Bathrooms</p>
            </div>
            <div className="bg-surface-secondary dark:bg-forest-700 rounded-lg p-3 text-center">
              <p className="heading-lg text-forest-900 dark:text-forest-50">
                {inspection.property.area || '-'}
              </p>
              <p className="body-xs text-forest-600 dark:text-forest-400">Sq. Meters</p>
            </div>
          </div>
        </div>

        {/* Agent */}
        {inspection.agent && (
          <div>
            <h4 className="heading-sm text-forest-900 dark:text-forest-50 mb-4">Agent</h4>
            <div className="flex items-center gap-4">
              {inspection.agent.avatar ? (
                <img
                  src={inspection.agent.avatar}
                  alt={inspection.agent.name}
                  className="w-12 h-12 rounded-full object-cover"
                />
              ) : (
                <div className="w-12 h-12 rounded-full bg-forest-100 dark:bg-forest-700 flex items-center justify-center">
                  <span className="heading-md text-forest-600 dark:text-forest-400">
                    {inspection.agent.name.charAt(0)}
                  </span>
                </div>
              )}
              <div className="flex-1">
                <p className="body-md font-medium text-forest-900 dark:text-forest-50">
                  {inspection.agent.name}
                </p>
                {inspection.agent.phone && (
                  <p className="body-sm text-forest-600 dark:text-forest-400">
                    {inspection.agent.phone}
                  </p>
                )}
              </div>
              {onContactAgent && (
                <button
                  onClick={onContactAgent}
                  className="inline-flex items-center px-4 py-2 border border-border-default rounded-lg hover:bg-surface-secondary dark:hover:bg-forest-700 transition-colors body-sm font-medium text-forest-900 dark:text-forest-50"
                >
                  <MessageSquare className="h-4 w-4 mr-2" />
                  Contact
                </button>
              )}
            </div>
          </div>
        )}

        {/* Notes */}
        {inspection.notes && (
          <div>
            <h4 className="heading-sm text-forest-900 dark:text-forest-50 mb-4">Notes</h4>
            <p className="body-sm text-forest-600 dark:text-forest-400 bg-surface-secondary dark:bg-forest-700 rounded-lg p-4">
              {inspection.notes}
            </p>
          </div>
        )}

        {/* Actions */}
        {(inspection.status === 'pending' || inspection.status === 'confirmed') && (
          <div className="flex items-center gap-3 pt-4 border-t border-border-default">
            {onReschedule && (
              <button
                onClick={onReschedule}
                className="flex-1 inline-flex items-center justify-center px-4 py-2 border border-border-default rounded-lg hover:bg-surface-secondary dark:hover:bg-forest-700 transition-colors body-md font-medium text-forest-900 dark:text-forest-50"
              >
                <Calendar className="h-4 w-4 mr-2" />
                Reschedule
              </button>
            )}
            {onCancel && (
              <button
                onClick={onCancel}
                className="flex-1 inline-flex items-center justify-center px-4 py-2 border border-red-200 rounded-lg hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors body-md font-medium text-red-600 dark:text-red-400"
              >
                Cancel
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
