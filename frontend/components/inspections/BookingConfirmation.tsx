import { cn } from '@/lib/utils';
import { CheckCircle, Calendar, Clock, MapPin, User, Download, Share2 } from 'lucide-react';

interface BookingConfirmationProps {
  booking: {
    id: string;
    reference: string;
    property: {
      title: string;
      address: string;
      image: string;
    };
    agent?: {
      name: string;
      phone?: string;
    };
    date: string;
    time: string;
    type: 'in_person' | 'virtual' | 'self_tour';
  };
  onDownload?: () => void;
  onShare?: () => void;
  onViewCalendar?: () => void;
  className?: string;
}

export function BookingConfirmation({
  booking,
  onDownload,
  onShare,
  onViewCalendar,
  className,
}: BookingConfirmationProps) {
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

  return (
    <div className={cn('bg-white dark:bg-forest-800 rounded-xl border border-border-default overflow-hidden', className)}>
      {/* Success Header */}
      <div className="bg-green-50 dark:bg-green-900/20 border-b border-green-200 dark:border-green-800 p-6">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 bg-green-100 dark:bg-green-900 rounded-full flex items-center justify-center">
            <CheckCircle className="h-6 w-6 text-green-600 dark:text-green-400" />
          </div>
          <div>
            <h2 className="heading-lg text-green-900 dark:text-green-200">Booking Confirmed!</h2>
            <p className="body-sm text-green-700 dark:text-green-300">
              Your inspection has been successfully scheduled
            </p>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="p-6 space-y-6">
        {/* Reference */}
        <div className="bg-surface-secondary dark:bg-forest-700 rounded-lg p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="body-xs text-forest-600 dark:text-forest-400 mb-1">Booking Reference</p>
              <p className="heading-md text-forest-900 dark:text-forest-50 font-mono">
                {booking.reference}
              </p>
            </div>
            <div className="flex items-center gap-2">
              {onDownload && (
                <button
                  onClick={onDownload}
                  className="inline-flex items-center p-2 hover:bg-surface-primary dark:hover:bg-forest-600 rounded-lg transition-colors"
                  aria-label="Download confirmation"
                >
                  <Download className="h-4 w-4 text-forest-600 dark:text-forest-400" />
                </button>
              )}
              {onShare && (
                <button
                  onClick={onShare}
                  className="inline-flex items-center p-2 hover:bg-surface-primary dark:hover:bg-forest-600 rounded-lg transition-colors"
                  aria-label="Share booking"
                >
                  <Share2 className="h-4 w-4 text-forest-600 dark:text-forest-400" />
                </button>
              )}
            </div>
          </div>
        </div>

        {/* Property */}
        <div>
          <h4 className="heading-sm text-forest-900 dark:text-forest-50 mb-3">Property</h4>
          <div className="flex items-center gap-4 bg-surface-secondary dark:bg-forest-700 rounded-lg p-4">
            <img
              src={booking.property.image}
              alt={booking.property.title}
              className="w-20 h-20 rounded-lg object-cover"
            />
            <div className="flex-1 min-w-0">
              <h5 className="heading-sm text-forest-900 dark:text-forest-50 mb-1 line-clamp-1">
                {booking.property.title}
              </h5>
              <div className="flex items-center gap-1 body-sm text-forest-600 dark:text-forest-400">
                <MapPin className="h-3.5 w-3.5 flex-shrink-0" />
                <span className="line-clamp-1">{booking.property.address}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Inspection Details */}
        <div>
          <h4 className="heading-sm text-forest-900 dark:text-forest-50 mb-3">Inspection Details</h4>
          <div className="space-y-3">
            <div className="flex items-center gap-3 bg-surface-secondary dark:bg-forest-700 rounded-lg p-4">
              <Calendar className="h-5 w-5 text-forest-600 dark:text-forest-400 flex-shrink-0" />
              <div>
                <p className="body-xs text-forest-600 dark:text-forest-400 mb-0.5">Date</p>
                <p className="body-sm font-medium text-forest-900 dark:text-forest-50">
                  {formatDate(booking.date)}
                </p>
              </div>
            </div>
            <div className="flex items-center gap-3 bg-surface-secondary dark:bg-forest-700 rounded-lg p-4">
              <Clock className="h-5 w-5 text-forest-600 dark:text-forest-400 flex-shrink-0" />
              <div>
                <p className="body-xs text-forest-600 dark:text-forest-400 mb-0.5">Time</p>
                <p className="body-sm font-medium text-forest-900 dark:text-forest-50">
                  {booking.time}
                </p>
              </div>
            </div>
            <div className="flex items-center gap-3 bg-surface-secondary dark:bg-forest-700 rounded-lg p-4">
              <User className="h-5 w-5 text-forest-600 dark:text-forest-400 flex-shrink-0" />
              <div>
                <p className="body-xs text-forest-600 dark:text-forest-400 mb-0.5">Type</p>
                <p className="body-sm font-medium text-forest-900 dark:text-forest-50">
                  {typeLabels[booking.type]}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Agent */}
        {booking.agent && (
          <div>
            <h4 className="heading-sm text-forest-900 dark:text-forest-50 mb-3">Agent</h4>
            <div className="flex items-center gap-4 bg-surface-secondary dark:bg-forest-700 rounded-lg p-4">
              <div className="w-12 h-12 bg-forest-100 dark:bg-forest-600 rounded-full flex items-center justify-center">
                <span className="heading-md text-forest-600 dark:text-forest-400">
                  {booking.agent.name.charAt(0)}
                </span>
              </div>
              <div className="flex-1">
                <p className="body-md font-medium text-forest-900 dark:text-forest-50">
                  {booking.agent.name}
                </p>
                {booking.agent.phone && (
                  <p className="body-sm text-forest-600 dark:text-forest-400">
                    {booking.agent.phone}
                  </p>
                )}
              </div>
            </div>
          </div>
        )}

        {/* Actions */}
        <div className="flex items-center gap-3 pt-4 border-t border-border-default">
          {onViewCalendar && (
            <button
              onClick={onViewCalendar}
              className="flex-1 inline-flex items-center justify-center px-4 py-2 border border-border-default rounded-lg hover:bg-surface-secondary dark:hover:bg-forest-700 transition-colors body-md font-medium text-forest-900 dark:text-forest-50"
            >
              <Calendar className="h-4 w-4 mr-2" />
              Add to Calendar
            </button>
          )}
        </div>

        {/* Reminder */}
        <div className="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-4 border border-blue-200 dark:border-blue-800">
          <p className="body-sm text-blue-800 dark:text-blue-300">
            <strong>Reminder:</strong> You'll receive a notification 24 hours before your inspection. Please arrive 10 minutes early.
          </p>
        </div>
      </div>
    </div>
  );
}
