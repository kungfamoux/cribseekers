import { StepIndicator } from './StepIndicator';
import { cn } from '@/lib/utils';

interface PropertyWizardProps {
  children: React.ReactNode;
  totalSteps: number;
  currentStep: number;
  onNext: () => void;
  onPrevious: () => void;
  onSubmit: () => Promise<void>;
  isSubmitting: boolean;
  className?: string;
}

export function PropertyWizard({
  children,
  totalSteps,
  currentStep,
  onNext,
  onPrevious,
  onSubmit,
  isSubmitting,
  className,
}: PropertyWizardProps) {
  const stepTitles = [
    'Basic Info',
    'Property Type',
    'Location',
    'Pricing',
    'Description',
    'Amenities',
    'Rules',
    'Availability',
    'Review',
    'Publish',
  ];

  const steps = stepTitles.map((title, index) => ({
    id: index + 1,
    title,
    status:
      index + 1 < currentStep
        ? 'completed'
        : index + 1 === currentStep
        ? 'current'
        : 'pending',
  })) as Array<{ id: number; title: string; status: 'completed' | 'current' | 'pending' }>;

  const handlePrevious = () => {
    onPrevious();
  };

  const handleNext = () => {
    onNext();
  };

  return (
    <div className={cn('w-full', className)}>
      {/* Step Indicator */}
      <div className="mb-8">
        <StepIndicator steps={steps} />
      </div>

      {/* Step Content */}
      <div className="min-h-[400px]">{children}</div>

      {/* Navigation Buttons */}
      <div className="flex items-center justify-between mt-8 pt-6 border-t border-border-default">
        <button
          onClick={handlePrevious}
          disabled={currentStep === 1}
          className="inline-flex items-center px-4 py-2 border border-border-default rounded-lg body-md font-medium text-forest-900 dark:text-forest-50 hover:bg-surface-secondary dark:hover:bg-forest-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
        >
          Previous
        </button>

        <div className="flex items-center gap-2">
          <span className="body-sm text-forest-600 dark:text-forest-400">
            Step {currentStep} of {totalSteps}
          </span>
        </div>

        {currentStep === totalSteps ? (
          <button
            onClick={onSubmit}
            disabled={isSubmitting}
            className="inline-flex items-center px-4 py-2 bg-forest-900 text-white rounded-lg body-md font-medium hover:bg-forest-800 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            {isSubmitting ? 'Submitting...' : 'Submit'}
          </button>
        ) : (
          <button
            onClick={handleNext}
            className="inline-flex items-center px-4 py-2 bg-forest-900 text-white rounded-lg body-md font-medium hover:bg-forest-800 transition-colors"
          >
            Next
          </button>
        )}
      </div>
    </div>
  );
}
