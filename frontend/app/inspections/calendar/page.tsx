'use client';

export const dynamic = 'force-dynamic';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { DashboardLayout } from '@/components/dashboard';
import { CalendarView } from '@/components/inspections/CalendarView';
import { TimeSlotPicker } from '@/components/inspections/TimeSlotPicker';
import { ArrowLeft, Calendar as CalendarIcon } from 'lucide-react';
import Link from 'next/link';
import { API_ENDPOINTS } from '@/services/api/endpoints';
import { useQuery } from '@tanstack/react-query';

export default function InspectionCalendarPage() {
  const router = useRouter();
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date());
  const [selectedTimeSlot, setSelectedTimeSlot] = useState<string | undefined>();

  // Fetch available slots from backend
  const { data: availableSlots, isLoading } = useQuery({
    queryKey: ['inspection-slots', selectedDate],
    queryFn: async () => {
      const response = await fetch(`${API_ENDPOINTS.INSPECTIONS}/available-slots?date=${selectedDate?.toISOString().split('T')[0]}`);
      if (!response.ok) throw new Error('Failed to fetch available slots');
      return response.json();
    },
    enabled: !!selectedDate,
  });

  const handleDateSelect = (date: Date) => {
    setSelectedDate(date);
    setSelectedTimeSlot(undefined);
  };

  const handleTimeSlotSelect = (slotId: string) => {
    setSelectedTimeSlot(slotId);
  };

  const handleBook = () => {
    if (selectedDate && selectedTimeSlot) {
      router.push(`/inspections/book?date=${selectedDate.toISOString().split('T')[0]}&slot=${selectedTimeSlot}`);
    }
  };

  return (
    <DashboardLayout>
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-6">
          <Link href="/inspections">
            <button className="inline-flex items-center text-forest-600 dark:text-forest-400 hover:text-forest-900 dark:hover:text-forest-50 mb-4 body-sm font-medium">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Inspections
            </button>
          </Link>
          <h1 className="heading-xl text-forest-900 dark:text-forest-50 mb-2">Inspection Calendar</h1>
          <p className="body-md text-forest-600 dark:text-forest-400">
            View available inspection slots and book your appointment
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Calendar */}
          <div>
            <CalendarView
              selectedDate={selectedDate}
              onDateSelect={handleDateSelect}
              view="month"
            />
          </div>

          {/* Time Slots */}
          <div>
            {selectedDate ? (
              <div className="bg-white dark:bg-forest-800 rounded-xl border border-border-default p-6">
                <h3 className="heading-md text-forest-900 dark:text-forest-50 mb-4">
                  Available Time Slots
                </h3>
                <p className="body-sm text-forest-600 dark:text-forest-400 mb-4">
                  {selectedDate.toLocaleDateString('en-NG', { weekday: 'long', month: 'long', day: 'numeric' })}
                </p>

                {isLoading ? (
                  <div className="flex items-center justify-center py-12">
                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-forest-900" />
                  </div>
                ) : availableSlots && availableSlots.length > 0 ? (
                  <>
                    <TimeSlotPicker
                      slots={availableSlots}
                      selectedSlot={selectedTimeSlot}
                      onSelect={handleTimeSlotSelect}
                    />
                    {selectedTimeSlot && (
                      <button
                        onClick={handleBook}
                        className="w-full mt-6 inline-flex items-center justify-center px-4 py-3 bg-forest-900 text-white rounded-lg hover:bg-forest-800 transition-colors body-md font-medium"
                      >
                        <CalendarIcon className="h-4 w-4 mr-2" />
                        Book This Slot
                      </button>
                    )}
                  </>
                ) : (
                  <div className="text-center py-12">
                    <CalendarIcon className="h-12 w-12 text-forest-400 mx-auto mb-2" />
                    <p className="body-sm text-forest-600 dark:text-forest-400">
                      No available slots for this date
                    </p>
                  </div>
                )}
              </div>
            ) : (
              <div className="bg-white dark:bg-forest-800 rounded-xl border border-border-default p-6 flex items-center justify-center h-full">
                <div className="text-center">
                  <CalendarIcon className="h-12 w-12 text-forest-400 mx-auto mb-2" />
                  <p className="body-sm text-forest-600 dark:text-forest-400">
                    Select a date to view available time slots
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
