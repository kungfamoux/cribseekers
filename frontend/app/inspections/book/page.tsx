'use client';

export const dynamic = 'force-dynamic';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { DashboardLayout } from '@/components/dashboard';
import { BookingWizard } from '@/components/inspections/BookingWizard';
import { BookingConfirmation } from '@/components/inspections/BookingConfirmation';
import { ArrowLeft } from 'lucide-react';
import Link from 'next/link';
import { toast } from 'sonner';

export default function BookInspectionPage() {
  const router = useRouter();
  const [step, setStep] = useState<'wizard' | 'confirmation'>('wizard');
  const [bookingData, setBookingData] = useState<{
    propertyId: string;
    date: Date | null;
    timeSlot: string | null;
    inspectionType: 'in_person' | 'virtual' | 'self_tour';
    agentId: string | null;
    notes: string;
  } | null>(null);

  const handleBookingComplete = (data: {
    propertyId: string;
    date: Date | null;
    timeSlot: string | null;
    inspectionType: 'in_person' | 'virtual' | 'self_tour';
    agentId: string | null;
    notes: string;
  }) => {
    setBookingData(data);
    setStep('confirmation');
    toast.success('Inspection booked successfully!');
  };

  const mockBooking = {
    id: 'INS-12345',
    reference: 'INS-2026-12345',
    property: {
      title: 'Luxury Villa in Ikoyi',
      address: '23 Admiralty Way, Ikoyi, Lagos',
      image: 'https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=400',
    },
    agent: {
      name: 'John Doe',
      phone: '+234 801 234 5678',
    },
    date: bookingData?.date?.toISOString().split('T')[0] || '2026-07-27',
    time: bookingData?.timeSlot || '10:00 AM',
    type: bookingData?.inspectionType || 'in_person',
  };

  return (
    <DashboardLayout>
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="mb-6">
          <Link href="/inspections">
            <button className="inline-flex items-center text-forest-600 dark:text-forest-400 hover:text-forest-900 dark:hover:text-forest-50 mb-4 body-sm font-medium">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Inspections
            </button>
          </Link>
          <h1 className="heading-xl text-forest-900 dark:text-forest-50 mb-2">Book Inspection</h1>
          <p className="body-md text-forest-600 dark:text-forest-400">
            Schedule a property inspection at your convenience
          </p>
        </div>

        {/* Content */}
        {step === 'wizard' ? (
          <BookingWizard
            propertyId="prop1"
            onComplete={handleBookingComplete}
            onCancel={() => router.back()}
          />
        ) : (
          <BookingConfirmation
            booking={mockBooking}
            onDownload={() => toast.success('Downloading confirmation')}
            onShare={() => toast.success('Sharing confirmation')}
            onViewCalendar={() => toast.success('Added to calendar')}
          />
        )}
      </div>
    </DashboardLayout>
  );
}
