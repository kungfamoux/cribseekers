import { useState } from 'react';
import { cn } from '@/lib/utils';
import { AlertTriangle, X, Loader2 } from 'lucide-react';

interface CancellationDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: (reason: string) => Promise<void>;
  inspectionId?: string;
  className?: string;
}

export function CancellationDialog({
  isOpen,
  onClose,
  onConfirm,
  className,
}: CancellationDialogProps) {
  const [reason, setReason] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const reasons = [
    'Schedule conflict',
    'Property no longer interested',
    'Found another property',
    'Financial reasons',
    'Personal emergency',
    'Other',
  ];

  const handleConfirm = async () => {
    if (!reason.trim()) return;
    
    setIsSubmitting(true);
    try {
      await onConfirm(reason);
      onClose();
      setReason('');
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
        'relative bg-white dark:bg-forest-800 rounded-xl border border-border-default shadow-xl max-w-md w-full',
        className
      )}>
        {/* Header */}
        <div className="border-b border-border-default p-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-red-100 dark:bg-red-900/20 rounded-full flex items-center justify-center">
              <AlertTriangle className="h-5 w-5 text-red-600 dark:text-red-400" />
            </div>
            <div>
              <h3 className="heading-md text-forest-900 dark:text-forest-50">Cancel Inspection</h3>
              <p className="body-xs text-forest-600 dark:text-forest-400">
                This action cannot be undone
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
        <div className="p-6 space-y-4">
          <p className="body-sm text-forest-600 dark:text-forest-400">
            Please select a reason for cancelling this inspection:
          </p>

          {/* Reason Selection */}
          <div className="space-y-2">
            {reasons.map((r) => (
              <button
                key={r}
                type="button"
                onClick={() => setReason(r)}
                className={cn(
                  'w-full text-left px-4 py-3 rounded-lg border transition-all',
                  reason === r
                    ? 'border-forest-900 bg-forest-50 dark:bg-forest-900/20'
                    : 'border-border-default hover:border-forest-900'
                )}
              >
                <span className="body-sm text-forest-900 dark:text-forest-50">
                  {r}
                </span>
              </button>
            ))}
          </div>

          {/* Custom Reason */}
          {reason === 'Other' && (
            <textarea
              value={reason === 'Other' ? reason : ''}
              onChange={(e) => setReason(e.target.value)}
              placeholder="Please specify your reason..."
              rows={3}
              className="w-full px-4 py-3 border border-border-default rounded-lg bg-surface-primary dark:bg-forest-700 text-forest-900 dark:text-forest-50 placeholder-forest-400 focus:outline-none focus:ring-2 focus:ring-forest-500 resize-none"
            />
          )}

          {/* Warning */}
          <div className="bg-amber-50 dark:bg-amber-900/20 rounded-lg p-4 border border-amber-200 dark:border-amber-800">
            <p className="body-xs text-amber-800 dark:text-amber-300">
              <strong>Note:</strong> Cancellation fees may apply depending on how close to the inspection date you cancel.
            </p>
          </div>
        </div>

        {/* Actions */}
        <div className="border-t border-border-default p-4 flex items-center gap-3">
          <button
            onClick={onClose}
            disabled={isSubmitting}
            className="flex-1 inline-flex items-center justify-center px-4 py-2 border border-border-default rounded-lg hover:bg-surface-secondary dark:hover:bg-forest-700 transition-colors body-md font-medium text-forest-900 dark:text-forest-50 disabled:opacity-40 disabled:cursor-not-allowed"
          >
            Keep Inspection
          </button>
          <button
            onClick={handleConfirm}
            disabled={isSubmitting || !reason.trim()}
            className={cn(
              'flex-1 inline-flex items-center justify-center px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors body-md font-medium',
              'disabled:opacity-40 disabled:cursor-not-allowed'
            )}
          >
            {isSubmitting ? (
              <>
                <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                Cancelling...
              </>
            ) : (
              'Cancel Inspection'
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
