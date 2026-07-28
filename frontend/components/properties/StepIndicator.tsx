import { cn } from '@/lib/utils';
import { Check } from 'lucide-react';

interface Step {
  id: number;
  title: string;
  status: 'completed' | 'current' | 'pending';
}

interface StepIndicatorProps {
  steps: Step[];
  className?: string;
}

export function StepIndicator({ steps, className }: StepIndicatorProps) {
  return (
    <div className={cn('w-full', className)}>
      <div className="flex items-center justify-between">
        {steps.map((step, index) => (
          <div key={step.id} className="flex items-center flex-1">
            {/* Step Circle */}
            <div className="flex flex-col items-center">
              <div
                className={cn(
                  'flex items-center justify-center w-10 h-10 rounded-full border-2 font-medium transition-colors',
                  step.status === 'completed'
                    ? 'bg-forest-900 border-forest-900 text-white'
                    : step.status === 'current'
                    ? 'bg-forest-900 border-forest-900 text-white'
                    : 'bg-white dark:bg-forest-800 border-border-default text-forest-400'
                )}
              >
                {step.status === 'completed' ? (
                  <Check className="h-5 w-5" />
                ) : (
                  <span className="body-sm">{step.id}</span>
                )}
              </div>
              <span
                className={cn(
                  'mt-2 body-xs text-center max-w-[100px]',
                  step.status === 'current'
                    ? 'text-forest-900 dark:text-forest-50 font-medium'
                    : 'text-forest-600 dark:text-forest-400'
                )}
              >
                {step.title}
              </span>
            </div>

            {/* Connector Line */}
            {index < steps.length - 1 && (
              <div
                className={cn(
                  'flex-1 h-0.5 mx-4 transition-colors',
                  step.status === 'completed' ? 'bg-forest-900' : 'bg-border-default'
                )}
              />
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
