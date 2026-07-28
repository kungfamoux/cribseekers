import { useState } from 'react';
import { cn } from '@/lib/utils';
import { Calendar, Clock, X, Loader2, Check } from 'lucide-react';

interface RescheduleDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: (newDate: string, newTime: string) => Promise<void>;
  currentDate: string;
  currentTime: string;
  availableSlots?: Array<{ date: string; times: string[] }>;
  className?: string;
}

export function RescheduleDialog({
  isOpen,
  onClose,
  onConfirm,
  currentDate,
  currentTime,
  availableSlots = [],
  className,
}: RescheduleDialogProps) {
  const [selectedDate, setSelectedDate] = useState<string | null>(null);
  const [selectedTime, setSelectedTime] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleConfirm = async () => {
    if (!selectedDate || !selectedTime) return;
    
    setIsSubmitting(true);
    try {
      await onConfirm(selectedDate, selectedTime);
      onClose();
      setSelectedDate(null);
      setSelectedTime(null);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Dialog */}
      <div className={cn(
        'relative bg-white dark:bg-forest-800 rounded-xl border border-border-default shadow-xl max-w-2xl w-full max-h-[90vh] overflow-hidden flex flex-col',
        className
      )}>
        {/* Header */}
        <div className="border-b border-border-default p-4 flex items-center justify-between flex-shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-blue-100 dark:bg-blue-900/20 rounded-full flex items-center justify-center">
              <Calendar className="h-5 w-5 text-blue-600 dark:text-blue-400" />
            </div>
            <div>
              <h3 className="heading-md text-forest-900 dark:text-forest-50">Reschedule Inspection</h3>
              <p className="body-xs text-forest-600 dark:text-forest-400">
                Current: {new Date(currentDate).toLocaleDateString()} at {currentTime}
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-surface-secondary dark:hover:bg-forest-700 rounded-lg transition-colors"
          >
            <X className="h-5 w-5 text-forest-600 dark:text-forest-400" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 overflow-y-auto flex-1">
          <p className="body-sm text-forest-600 dark:text-forest-400 mb-4">
            Select a new date and time for your inspection:
          </p>

          {/* Date Selection */}
          <div className="mb-6">
            <h4 className="heading-sm text-forest-900 dark:text-forest-50 mb-3">Select Date</h4>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2">
              {availableSlots.map((slot) => (
                <button
                  key={slot.date}
                  type="button"
                  onClick={() => {
                    setSelectedDate(slot.date);
                    setSelectedTime(null);
                  }}
                  disabled={slot.times.length === 0}
                  className={cn(
                    'p-3 rounded-lg border transition-all text-center',
                    'disabled:opacity-40 disabled:cursor-not-allowed',
                    selectedDate === slot.date
                      ? 'border-forest-900 bg-forest-50 dark:bg-forest-900/20'
                      : 'border-border-default hover:border-forest-900'
                  )}
                >
                  <p className="body-sm font-medium text-forest-900 dark:text-forest-50">
                    {new Date(slot.date).toLocaleDateString('en-NG', { weekday: 'short', month: 'short', day: 'numeric' })}
                  </p>
                  <p className="body-xs text-forest-600 dark:text-forest-400 mt-1">
                    {slot.times.length} slots
                  </p>
                </button>
              ))}
            </div>
          </div>

          {/* Time Selection */}
          {selectedDate && (
            <div>
              <h4 className="heading-sm text-forest-900 dark:text-forest-50 mb-3">Select Time</h4>
              <div className="grid grid-cols-3 sm:grid-cols-4 gap-2">
                {availableSlots
                  .find((slot) => slot.date === selectedDate)
                  ?.times.map((time) => (
                    <button
                      key={time}
                      type="button"
                      onClick={() => setSelectedTime(time)}
                      className={cn(
                        'p-3 rounded-lg border transition-all text-center',
                        selectedTime === time
                          ? 'border-forest-900 bg-forest-50 dark:bg-forest-900/20'
                          : 'border-border-default hover:border-forest-900'
                      )}
                    >
                      <div className="flex items-center justify-center gap-1 body-sm font-medium text-forest-900 dark:text-forest-50">
                        <Clock className="h-3.5 w-3.5" />
                        {time}
                      </div>
                    </button>
                  ))}
              </div>
            </div>
          )}

          {/* No Slots Message */}
          {selectedDate && availableSlots.find((slot) => slot.date === selectedDate)?.times.length === 0 && (
            <div className="bg-amber-50 dark:bg-amber-900/20 rounded-lg p-4 border border-amber-200 dark:border-amber-800">
              <p className="body-sm text-amber-800 dark:text-amber-300">
                No available time slots for this date. Please select another date.
              </p>
            </div>
          )}
        </div>

        {/* Actions */}
        <div className="border-t border-border-default p-4 flex items-center gap-3 flex-shrink-0">
          <button
            onClick={onClose}
            disabled={isSubmitting}
            className="flex-1 inline-flex items-center justify-center px-4 py-2 border border-border-default rounded-lg hover:bg-surface-secondary dark:hover:bg-forest-700 transition-colors body-md font-medium text-forest-900 dark:text-forest-50 disabled:opacity-40 disabled:cursor-not-allowed"
          >
            Cancel
          </button>
          <button
            onClick={handleConfirm}
            disabled={isSubmitting || !selectedDate || !selectedTime}
            className={cn(
              'flex-1 inline-flex items-center justify-center px-4 py-2 bg-forest-900 text-white rounded-lg hover:bg-forest-800 transition-colors body-md font-medium',
              'disabled:opacity-40 disabled:cursor-not-allowed'
            )}
          >
            {isSubmitting ? (
              <>
                <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                Rescheduling...
              </>
            ) : (
              <>
                <Check className="h-4 w-4 mr-2" />
                Confirm Reschedule
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
