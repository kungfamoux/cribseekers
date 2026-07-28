import { useState } from 'react';
import { cn } from '@/lib/utils';
import { ChevronRight, ChevronLeft, Check, Calendar, Clock, User, MapPin } from 'lucide-react';

interface BookingStep {
  id: string;
  title: string;
  description?: string;
}

interface BookingWizardProps {
  propertyId: string;
  onComplete?: (bookingData: {
    propertyId: string;
    date: Date | null;
    timeSlot: string | null;
    inspectionType: 'in_person' | 'virtual' | 'self_tour';
    agentId: string | null;
    notes: string;
  }) => void;
  onCancel?: () => void;
  className?: string;
}

export function BookingWizard({ propertyId, onComplete, className }: BookingWizardProps) {
  const [currentStep, setCurrentStep] = useState(0);
  const [bookingData, setBookingData] = useState({
    propertyId,
    date: null as Date | null,
    timeSlot: null as string | null,
    inspectionType: 'in_person' as 'in_person' | 'virtual' | 'self_tour',
    agentId: null as string | null,
    notes: '',
  });

  const steps: BookingStep[] = [
    { id: 'date', title: 'Select Date', description: 'Choose your preferred inspection date' },
    { id: 'time', title: 'Select Time', description: 'Pick an available time slot' },
    { id: 'type', title: 'Inspection Type', description: 'Choose how you want to view the property' },
    { id: 'agent', title: 'Select Agent', description: 'Choose an agent (optional)' },
    { id: 'notes', title: 'Additional Notes', description: 'Add any special requests' },
    { id: 'confirm', title: 'Confirm Booking', description: 'Review and confirm your booking' },
  ];

  const handleNext = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handleBack = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleComplete = () => {
    onComplete?.(bookingData);
  };

  const renderStep = () => {
    switch (currentStep) {
      case 0:
        return (
          <div className="space-y-4">
            <div className="bg-forest-50 dark:bg-forest-900/20 rounded-lg p-4">
              <div className="flex items-center gap-2 body-sm text-forest-600 dark:text-forest-400 mb-2">
                <Calendar className="h-4 w-4" />
                <span>Select a date for your inspection</span>
              </div>
              <p className="body-xs text-forest-500 dark:text-forest-500">
                Available dates are shown in green
              </p>
            </div>
            {/* Calendar component would be integrated here */}
            <div className="h-64 flex items-center justify-center border border-border-default rounded-lg bg-surface-secondary dark:bg-forest-700">
              <p className="body-sm text-forest-600 dark:text-forest-400">Calendar integration</p>
            </div>
          </div>
        );
      case 1:
        return (
          <div className="space-y-4">
            <div className="bg-forest-50 dark:bg-forest-900/20 rounded-lg p-4">
              <div className="flex items-center gap-2 body-sm text-forest-600 dark:text-forest-400 mb-2">
                <Clock className="h-4 w-4" />
                <span>Select your preferred time slot</span>
              </div>
              <p className="body-xs text-forest-500 dark:text-forest-500">
                Time slots are shown in 30-minute intervals
              </p>
            </div>
            {/* TimeSlotPicker component would be integrated here */}
            <div className="h-64 flex items-center justify-center border border-border-default rounded-lg bg-surface-secondary dark:bg-forest-700">
              <p className="body-sm text-forest-600 dark:text-forest-400">Time slot picker integration</p>
            </div>
          </div>
        );
      case 2:
        return (
          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
              {[
                { value: 'in_person', label: 'In-Person', icon: User, description: 'Meet with an agent at the property' },
                { value: 'virtual', label: 'Virtual', icon: MapPin, description: 'Live video tour with an agent' },
                { value: 'self_tour', label: 'Self-Tour', icon: Calendar, description: 'Explore the property on your own' },
              ].map((type) => (
                <button
                  key={type.value}
                  onClick={() => setBookingData({ ...bookingData, inspectionType: type.value as 'in_person' | 'virtual' | 'self_tour' })}
                  className={cn(
                    'p-4 rounded-lg border-2 transition-all text-left',
                    bookingData.inspectionType === type.value
                      ? 'border-forest-900 bg-forest-50 dark:bg-forest-900/20'
                      : 'border-border-default hover:border-forest-900'
                  )}
                >
                  <type.icon className="h-6 w-6 text-forest-600 dark:text-forest-400 mb-2" />
                  <h4 className="heading-sm text-forest-900 dark:text-forest-50 mb-1">
                    {type.label}
                  </h4>
                  <p className="body-xs text-forest-600 dark:text-forest-400">
                    {type.description}
                  </p>
                </button>
              ))}
            </div>
          </div>
        );
      case 3:
        return (
          <div className="space-y-4">
            <div className="bg-forest-50 dark:bg-forest-900/20 rounded-lg p-4">
              <div className="flex items-center gap-2 body-sm text-forest-600 dark:text-forest-400 mb-2">
                <User className="h-4 w-4" />
                <span>Choose an agent (optional)</span>
              </div>
              <p className="body-xs text-forest-500 dark:text-forest-500">
                You can also be assigned an agent automatically
              </p>
            </div>
            {/* AgentCard components would be integrated here */}
            <div className="h-64 flex items-center justify-center border border-border-default rounded-lg bg-surface-secondary dark:bg-forest-700">
              <p className="body-sm text-forest-600 dark:text-forest-400">Agent selection integration</p>
            </div>
          </div>
        );
      case 4:
        return (
          <div className="space-y-4">
            <div>
              <label className="block body-sm font-medium text-forest-900 dark:text-forest-50 mb-2">
                Additional Notes
              </label>
              <textarea
                value={bookingData.notes}
                onChange={(e) => setBookingData({ ...bookingData, notes: e.target.value })}
                placeholder="Add any special requests or questions..."
                rows={4}
                className="w-full px-4 py-3 border border-border-default rounded-lg bg-surface-primary dark:bg-forest-700 text-forest-900 dark:text-forest-50 placeholder-forest-400 focus:outline-none focus:ring-2 focus:ring-forest-500 resize-none"
              />
            </div>
          </div>
        );
      case 5:
        return (
          <div className="space-y-4">
            <div className="bg-forest-50 dark:bg-forest-900/20 rounded-lg p-4 space-y-3">
              <h4 className="heading-sm text-forest-900 dark:text-forest-50">Booking Summary</h4>
              <div className="space-y-2 body-sm text-forest-600 dark:text-forest-400">
                <div className="flex justify-between">
                  <span>Date:</span>
                  <span className="font-medium text-forest-900 dark:text-forest-50">
                    {bookingData.date?.toLocaleDateString() || 'Not selected'}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span>Time:</span>
                  <span className="font-medium text-forest-900 dark:text-forest-50">
                    {bookingData.timeSlot || 'Not selected'}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span>Type:</span>
                  <span className="font-medium text-forest-900 dark:text-forest-50 capitalize">
                    {bookingData.inspectionType.replace('_', ' ')}
                  </span>
                </div>
                {bookingData.notes && (
                  <div>
                    <span className="block mb-1">Notes:</span>
                    <span className="font-medium text-forest-900 dark:text-forest-50">
                      {bookingData.notes}
                    </span>
                  </div>
                )}
              </div>
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className={cn('bg-white dark:bg-forest-800 rounded-xl border border-border-default', className)}>
      {/* Progress Steps */}
      <div className="border-b border-border-default p-4">
        <div className="flex items-center justify-between">
          {steps.map((step, index) => (
            <div key={step.id} className="flex items-center flex-1">
              <div className="flex items-center gap-2">
                <div
                  className={cn(
                    'w-8 h-8 rounded-full flex items-center justify-center body-sm font-medium',
                    index < currentStep
                      ? 'bg-forest-900 text-white'
                      : index === currentStep
                      ? 'bg-forest-900 text-white ring-4 ring-forest-100 dark:ring-forest-700'
                      : 'bg-surface-secondary dark:bg-forest-700 text-forest-400'
                  )}
                >
                  {index < currentStep ? (
                    <Check className="h-4 w-4" />
                  ) : (
                    index + 1
                  )}
                </div>
                <div className="hidden sm:block">
                  <p className="body-xs font-medium text-forest-900 dark:text-forest-50">
                    {step.title}
                  </p>
                  {step.description && (
                    <p className="body-xs text-forest-600 dark:text-forest-400">
                      {step.description}
                    </p>
                  )}
                </div>
              </div>
              {index < steps.length - 1 && (
                <div
                  className={cn(
                    'flex-1 h-0.5 mx-4',
                    index < currentStep ? 'bg-forest-900' : 'bg-border-default'
                  )}
                />
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Step Content */}
      <div className="p-6">
        {renderStep()}
      </div>

      {/* Navigation */}
      <div className="border-t border-border-default p-4 flex items-center justify-between">
        <button
          onClick={handleBack}
          disabled={currentStep === 0}
          className={cn(
            'inline-flex items-center px-4 py-2 rounded-lg body-md font-medium transition-colors',
            'disabled:opacity-40 disabled:cursor-not-allowed',
            currentStep === 0
              ? 'invisible'
              : 'border border-border-default hover:bg-surface-secondary dark:hover:bg-forest-700 text-forest-900 dark:text-forest-50'
          )}
        >
          <ChevronLeft className="h-4 w-4 mr-2" />
          Back
        </button>

        {currentStep === steps.length - 1 ? (
          <button
            onClick={handleComplete}
            className="inline-flex items-center px-6 py-2 bg-forest-900 text-white rounded-lg hover:bg-forest-800 transition-colors body-md font-medium"
          >
            <Check className="h-4 w-4 mr-2" />
            Confirm Booking
          </button>
        ) : (
          <button
            onClick={handleNext}
            className="inline-flex items-center px-6 py-2 bg-forest-900 text-white rounded-lg hover:bg-forest-800 transition-colors body-md font-medium"
          >
            Next
            <ChevronRight className="h-4 w-4 ml-2" />
          </button>
        )}
      </div>
    </div>
  );
}
