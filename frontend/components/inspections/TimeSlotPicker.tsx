import { cn } from '@/lib/utils';
import { Clock } from 'lucide-react';

interface TimeSlot {
  id: string;
  time: string;
  available: boolean;
  price?: number;
}

interface TimeSlotPickerProps {
  slots: TimeSlot[];
  selectedSlot?: string;
  onSelect: (slotId: string) => void;
  className?: string;
}

export function TimeSlotPicker({ slots, selectedSlot, onSelect, className }: TimeSlotPickerProps) {
  const groupedSlots = slots.reduce((acc, slot) => {
    const period = parseInt(slot.time.split(':')[0]) < 12 ? 'Morning' : 'Afternoon';
    if (!acc[period]) acc[period] = [];
    acc[period].push(slot);
    return acc;
  }, {} as Record<string, TimeSlot[]>);

  return (
    <div className={cn('space-y-4', className)}>
      {Object.entries(groupedSlots).map(([period, periodSlots]) => (
        <div key={period}>
          <h4 className="heading-sm text-forest-900 dark:text-forest-50 mb-3">{period}</h4>
          <div className="grid grid-cols-3 sm:grid-cols-4 gap-2">
            {periodSlots.map((slot) => (
              <button
                key={slot.id}
                onClick={() => slot.available && onSelect(slot.id)}
                disabled={!slot.available}
                className={cn(
                  'relative p-3 rounded-lg border transition-all',
                  'disabled:opacity-40 disabled:cursor-not-allowed',
                  selectedSlot === slot.id
                    ? 'border-forest-900 bg-forest-900 text-white'
                    : slot.available
                    ? 'border-border-default hover:border-forest-900 bg-surface-primary dark:bg-forest-700 text-forest-900 dark:text-forest-50'
                    : 'border-border-default bg-surface-secondary dark:bg-forest-600 text-forest-400'
                )}
              >
                <div className="flex items-center justify-center gap-1.5 body-sm font-medium">
                  <Clock className="h-3.5 w-3.5" />
                  {slot.time}
                </div>
                {slot.price && (
                  <div className="text-xs mt-1 opacity-75">
                    ₦{slot.price.toLocaleString()}
                  </div>
                )}
                {!slot.available && (
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="bg-surface-secondary/80 dark:bg-forest-900/80 text-xs font-medium px-2 py-1 rounded">
                      Booked
                    </div>
                  </div>
                )}
              </button>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
