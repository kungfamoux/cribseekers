import { useState } from 'react';
import { cn } from '@/lib/utils';
import { ChevronLeft, ChevronRight, Calendar as CalendarIcon } from 'lucide-react';

interface CalendarViewProps {
  selectedDate?: Date;
  onDateSelect?: (date: Date) => void;
  availableDates?: Date[];
  bookedDates?: Date[];
  blockedDates?: Date[];
  view?: 'month' | 'week' | 'day';
  className?: string;
}

export function CalendarView({
  selectedDate,
  onDateSelect,
  availableDates = [],
  bookedDates = [],
  blockedDates = [],
  view = 'month',
  className,
}: CalendarViewProps) {
  const [currentDate, setCurrentDate] = useState(new Date());

  const getDaysInMonth = (date: Date) => {
    return new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
  };

  const getFirstDayOfMonth = (date: Date) => {
    return new Date(date.getFullYear(), date.getMonth(), 1).getDay();
  };

  const isDateAvailable = (date: Date) => {
    return availableDates.some(
      (d) => d.toDateString() === date.toDateString()
    );
  };

  const isDateBooked = (date: Date) => {
    return bookedDates.some((d) => d.toDateString() === date.toDateString());
  };

  const isDateBlocked = (date: Date) => {
    return blockedDates.some((d) => d.toDateString() === date.toDateString());
  };

  const isDateSelected = (date: Date) => {
    return selectedDate?.toDateString() === date.toDateString();
  };

  const isToday = (date: Date) => {
    return date.toDateString() === new Date().toDateString();
  };

  const isPastDate = (date: Date) => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    return date.getTime() < today.getTime();
  };

  const navigateMonth = (direction: 'prev' | 'next') => {
    setCurrentDate((prev) => {
      const newDate = new Date(prev);
      newDate.setMonth(prev.getMonth() + (direction === 'next' ? 1 : -1));
      return newDate;
    });
  };

  const renderMonthView = () => {
    const daysInMonth = getDaysInMonth(currentDate);
    const firstDay = getFirstDayOfMonth(currentDate);
    const monthNames = [
      'January', 'February', 'March', 'April', 'May', 'June',
      'July', 'August', 'September', 'October', 'November', 'December'
    ];

    const days = [];

    // Empty cells for days before the first day of the month
    for (let i = 0; i < firstDay; i++) {
      days.push(<div key={`empty-${i}`} className="h-12" />);
    }

    // Days of the month
    for (let day = 1; day <= daysInMonth; day++) {
      const date = new Date(currentDate.getFullYear(), currentDate.getMonth(), day);
      const available = isDateAvailable(date);
      const booked = isDateBooked(date);
      const blocked = isDateBlocked(date);
      const selected = isDateSelected(date);
      const today = isToday(date);
      const past = isPastDate(date);

      days.push(
        <button
          key={day}
          onClick={() => !past && !blocked && onDateSelect?.(date)}
          disabled={past || blocked}
          className={cn(
            'h-12 w-12 rounded-lg flex items-center justify-center body-sm font-medium transition-all',
            'disabled:opacity-30 disabled:cursor-not-allowed',
            selected && 'bg-forest-900 text-white',
            !selected && available && !booked && 'hover:bg-forest-100 dark:hover:bg-forest-700 text-forest-900 dark:text-forest-50',
            !selected && booked && 'bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200',
            !selected && blocked && 'bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400',
            !selected && !available && !booked && !blocked && 'text-forest-400',
            today && !selected && 'ring-2 ring-forest-900 ring-offset-2 dark:ring-offset-forest-800'
          )}
        >
          {day}
        </button>
      );
    }

    return (
      <div className="space-y-4">
        {/* Header */}
        <div className="flex items-center justify-between">
          <button
            onClick={() => navigateMonth('prev')}
            className="p-2 hover:bg-surface-secondary dark:hover:bg-forest-700 rounded-lg transition-colors"
          >
            <ChevronLeft className="h-5 w-5 text-forest-600 dark:text-forest-400" />
          </button>
          <h3 className="heading-md text-forest-900 dark:text-forest-50">
            {monthNames[currentDate.getMonth()]} {currentDate.getFullYear()}
          </h3>
          <button
            onClick={() => navigateMonth('next')}
            className="p-2 hover:bg-surface-secondary dark:hover:bg-forest-700 rounded-lg transition-colors"
          >
            <ChevronRight className="h-5 w-5 text-forest-600 dark:text-forest-400" />
          </button>
        </div>

        {/* Day Headers */}
        <div className="grid grid-cols-7 gap-1">
          {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((day) => (
            <div
              key={day}
              className="h-8 flex items-center justify-center body-xs font-medium text-forest-600 dark:text-forest-400"
            >
              {day}
            </div>
          ))}
        </div>

        {/* Calendar Grid */}
        <div className="grid grid-cols-7 gap-1">
          {days}
        </div>

        {/* Legend */}
        <div className="flex items-center gap-4 body-xs text-forest-600 dark:text-forest-400">
          <div className="flex items-center gap-1.5">
            <div className="w-3 h-3 rounded bg-blue-100 dark:bg-blue-900" />
            <span>Booked</span>
          </div>
          <div className="flex items-center gap-1.5">
            <div className="w-3 h-3 rounded bg-red-50 dark:bg-red-900/20" />
            <span>Blocked</span>
          </div>
          <div className="flex items-center gap-1.5">
            <div className="w-3 h-3 rounded bg-forest-900" />
            <span>Selected</span>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className={cn('bg-white dark:bg-forest-800 rounded-xl border border-border-default p-4', className)}>
      {view === 'month' && renderMonthView()}
      {view !== 'month' && (
        <div className="flex items-center justify-center py-8">
          <div className="text-center">
            <CalendarIcon className="h-12 w-12 text-forest-400 mx-auto mb-2" />
            <p className="body-sm text-forest-600 dark:text-forest-400">
              {view.charAt(0).toUpperCase() + view.slice(1)} view coming soon
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
