import { cn } from '@/lib/utils';
import { Calendar, Clock, MapPin, User, ChevronRight, Phone, MessageSquare } from 'lucide-react';
import { InspectionStatusBadge } from './InspectionStatusBadge';
import { Inspection } from '@/types/inspection.types';

interface InspectionCardProps {
  inspection: Inspection;
  onViewDetails?: (id: string) => void;
  onReschedule?: (id: string) => void;
  onCancel?: (id: string) => void;
  onContactAgent?: (agentId: string) => void;
  className?: string;
}

export function InspectionCard({
  inspection,
  onViewDetails,
  onReschedule,
  onCancel,
  onContactAgent,
  className,
}: InspectionCardProps) {
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-NG', {
      weekday: 'short',
      month: 'short',
      day: 'numeric',
    });
  };

  const typeLabels = {
    in_person: 'In-Person',
    virtual: 'Virtual',
    self_tour: 'Self-Tour',
  };

  return (
    <div className={cn(
      'bg-white dark:bg-forest-800 rounded-xl border border-border-default overflow-hidden hover:shadow-lg transition-shadow',
      className
    )}>
      {/* Property Image */}
      <div className="relative h-40 bg-surface-secondary">
        {inspection.property?.image ? (
          <img
            src={inspection.property.image}
            alt={inspection.property.title}
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center bg-surface-secondary">
            <span className="text-text-tertiary">No Image</span>
          </div>
        )}
        <div className="absolute top-4 right-4">
          <InspectionStatusBadge status={inspection.status} />
        </div>
        <div className="absolute top-4 left-4">
          <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-forest-900 text-white">
            {inspection.type ? typeLabels[inspection.type] : 'In-Person'}
          </span>
        </div>
      </div>

      {/* Content */}
      <div className="p-4">
        <h3 className="heading-sm text-forest-900 dark:text-forest-50 mb-2 line-clamp-1">
          {inspection.property?.title || 'Property'}
        </h3>
        
        <div className="space-y-2 mb-4">
          <div className="flex items-center gap-2 body-sm text-forest-600 dark:text-forest-400">
            <Calendar className="h-4 w-4 flex-shrink-0" />
            <span>{formatDate(inspection.date)}</span>
          </div>
          <div className="flex items-center gap-2 body-sm text-forest-600 dark:text-forest-400">
            <Clock className="h-4 w-4 flex-shrink-0" />
            <span>{inspection.time}</span>
          </div>
          <div className="flex items-center gap-2 body-sm text-forest-600 dark:text-forest-400">
            <MapPin className="h-4 w-4 flex-shrink-0" />
            <span className="line-clamp-1">{inspection.property?.address || 'Address not available'}</span>
          </div>
          {inspection.agent && (
            <div className="flex items-center gap-2 body-sm text-forest-600 dark:text-forest-400">
              <User className="h-4 w-4 flex-shrink-0" />
              <span>{inspection.agent.name}</span>
            </div>
          )}
        </div>

        {/* Actions */}
        <div className="flex items-center gap-2">
          {onViewDetails && (
            <button
              onClick={() => onViewDetails(inspection.id)}
              className="flex-1 inline-flex items-center justify-center px-4 py-2 bg-forest-900 text-white rounded-lg hover:bg-forest-800 transition-colors body-sm font-medium"
            >
              View Details
              <ChevronRight className="h-4 w-4 ml-1" />
            </button>
          )}
          
          {inspection.agent && onContactAgent && (
            <button
              onClick={() => onContactAgent(inspection.agent!.id)}
              className="inline-flex items-center justify-center p-2 border border-border-default rounded-lg hover:bg-surface-secondary dark:hover:bg-forest-700 transition-colors"
              aria-label="Contact agent"
            >
              <MessageSquare className="h-4 w-4 text-forest-600 dark:text-forest-400" />
            </button>
          )}
          
          {inspection.status === 'confirmed' && onReschedule && (
            <button
              onClick={() => onReschedule(inspection.id)}
              className="inline-flex items-center justify-center p-2 border border-border-default rounded-lg hover:bg-surface-secondary dark:hover:bg-forest-700 transition-colors"
              aria-label="Reschedule"
            >
              <Calendar className="h-4 w-4 text-forest-600 dark:text-forest-400" />
            </button>
          )}
          
          {(inspection.status === 'pending' || inspection.status === 'confirmed') && onCancel && (
            <button
              onClick={() => onCancel(inspection.id)}
              className="inline-flex items-center justify-center p-2 border border-red-200 rounded-lg hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors"
              aria-label="Cancel"
            >
              <Phone className="h-4 w-4 text-red-600 dark:text-red-400" />
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
