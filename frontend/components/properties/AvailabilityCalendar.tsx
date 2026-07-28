import { useState } from 'react';
import { cn } from '@/lib/utils';
import { ChevronLeft, ChevronRight, Calendar as CalendarIcon, X } from 'lucide-react';

interface AvailabilityCalendarProps {
  availableDates?: string[];
  blockedDates?: string[];
  onDateSelect?: (date: Date) => void;
  onDateBlock?: (date: Date) => void;
  onDateUnblock?: (date: Date) => void;
  minDate?: Date;
  maxDate?: Date;
  className?: string;
}

export function AvailabilityCalendar({
  availableDates = [],
  blockedDates = [],
  onDateSelect,
  onDateBlock,
  onDateUnblock,
  minDate = new Date(),
  maxDate,
  className,
}: AvailabilityCalendarProps) {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);

  const getDaysInMonth = (date: Date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const daysInMonth = lastDay.getDate();
    const startingDayOfWeek = firstDay.getDay();
    
    return { daysInMonth, startingDayOfWeek };
  };

  const isDateAvailable = (date: Date) => {
    const dateStr = date.toISOString().split('T')[0];
    return availableDates.includes(dateStr);
  };

  const isDateBlocked = (date: Date) => {
    const dateStr = date.toISOString().split('T')[0];
    return blockedDates.includes(dateStr);
  };

  const isDateInPast = (date: Date) => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    return date < today;
  };

  const isDateBeforeMin = (date: Date) => {
    const min = new Date(minDate);
    min.setHours(0, 0, 0, 0);
    return date < min;
  };

  const isDateAfterMax = (date: Date) => {
    if (!maxDate) return false;
    const max = new Date(maxDate);
    max.setHours(23, 59, 59, 999);
    return date > max;
  };

  const handleDateClick = (date: Date) => {
    if (isDateInPast(date) || isDateBeforeMin(date) || isDateAfterMax(date)) return;
    
    setSelectedDate(date);
    
    if (isDateBlocked(date)) {
      onDateUnblock?.(date);
    } else if (isDateAvailable(date)) {
      onDateBlock?.(date);
    } else {
      onDateSelect?.(date);
    }
  };

  const handlePreviousMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1));
  };

  const handleNextMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1));
  };

  const { daysInMonth, startingDayOfWeek } = getDaysInMonth(currentDate);
  const monthName = currentDate.toLocaleDateString('en-NG', { month: 'long', year: 'numeric' });
  const daysOfWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

  return (
    <div
      className={cn(
        'bg-surface-primary dark:bg-forest-800 rounded-xl border border-border-default p-6',
        className
      )}
    >
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <CalendarIcon className="h-5 w-5 text-forest-900 dark:text-forest-50" />
          <h3 className="heading-md text-forest-900 dark:text-forest-50">Availability</h3>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={handlePreviousMonth}
            className="p-2 hover:bg-surface-secondary dark:hover:bg-forest-700 rounded-lg transition-colors"
            aria-label="Previous month"
          >
            <ChevronLeft className="h-4 w-4 text-forest-600 dark:text-forest-400" />
          </button>
          <span className="body-md font-medium text-forest-900 dark:text-forest-50 min-w-[150px] text-center">
            {monthName}
          </span>
          <button
            onClick={handleNextMonth}
            className="p-2 hover:bg-surface-secondary dark:hover:bg-forest-700 rounded-lg transition-colors"
            aria-label="Next month"
          >
            <ChevronRight className="h-4 w-4 text-forest-600 dark:text-forest-400" />
          </button>
        </div>
      </div>

      {/* Legend */}
      <div className="flex items-center gap-4 mb-4 body-xs text-forest-600 dark:text-forest-400">
        <div className="flex items-center gap-1">
          <div className="w-3 h-3 bg-green-500 rounded" />
          <span>Available</span>
        </div>
        <div className="flex items-center gap-1">
          <div className="w-3 h-3 bg-red-500 rounded" />
          <span>Blocked</span>
        </div>
        <div className="flex items-center gap-1">
          <div className="w-3 h-3 bg-forest-200 dark:bg-forest-600 rounded" />
          <span>Past</span>
        </div>
      </div>

      {/* Calendar Grid */}
      <div className="grid grid-cols-7 gap-1">
        {/* Day Headers */}
        {daysOfWeek.map((day) => (
          <div key={day} className="body-xs font-medium text-forest-600 dark:text-forest-400 text-center py-2">
            {day}
          </div>
        ))}

        {/* Empty Cells */}
        {Array.from({ length: startingDayOfWeek }).map((_, index) => (
          <div key={`empty-${index}`} className="aspect-square" />
        ))}

        {/* Days */}
        {Array.from({ length: daysInMonth }).map((_, index) => {
          const date = new Date(currentDate.getFullYear(), currentDate.getMonth(), index + 1);
          const isPast = isDateInPast(date);
          const isBeforeMin = isDateBeforeMin(date);
          const isAfterMax = isDateAfterMax(date);
          const isAvailable = isDateAvailable(date);
          const isBlocked = isDateBlocked(date);
          const isSelected = selectedDate?.toDateString() === date.toDateString();
          const isDisabled = isPast || isBeforeMin || isAfterMax;

          return (
            <button
              key={index}
              onClick={() => handleDateClick(date)}
              disabled={isDisabled}
              className={cn(
                'aspect-square rounded-lg body-sm font-medium transition-colors',
                isSelected && 'ring-2 ring-forest-900 dark:ring-forest-400',
                isDisabled && 'opacity-30 cursor-not-allowed',
                isBlocked && !isDisabled && 'bg-red-500 text-white hover:bg-red-600',
                isAvailable && !isDisabled && !isBlocked && 'bg-green-500 text-white hover:bg-green-600',
                !isAvailable && !isBlocked && !isDisabled && 'bg-forest-100 dark:bg-forest-700 text-forest-900 dark:text-forest-50 hover:bg-forest-200 dark:hover:bg-forest-600'
              )}
              aria-label={`Select ${date.toDateString()}`}
              aria-disabled={isDisabled}
            >
              {index + 1}
            </button>
          );
        })}
      </div>

      {/* Selected Date Info */}
      {selectedDate && (
        <div className="mt-4 pt-4 border-t border-border-default flex items-center justify-between">
          <p className="body-sm text-forest-900 dark:text-forest-50">
            Selected: {selectedDate.toLocaleDateString('en-NG', { weekday: 'long', month: 'long', day: 'numeric' })}
          </p>
          <button
            onClick={() => setSelectedDate(null)}
            className="p-1 hover:bg-surface-secondary dark:hover:bg-forest-700 rounded transition-colors"
            aria-label="Clear selection"
          >
            <X className="h-4 w-4 text-forest-600 dark:text-forest-400" />
          </button>
        </div>
      )}
    </div>
  );
}
