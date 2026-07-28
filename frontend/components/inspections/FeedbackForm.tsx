import { useState } from 'react';
import { cn } from '@/lib/utils';
import { Star, Send, X } from 'lucide-react';

interface FeedbackFormProps {
  inspectionId: string;
  onSubmit?: (feedback: {
    propertyRating: number;
    agentRating: number;
    comment: string;
  }) => void;
  onCancel?: () => void;
  className?: string;
}

export function FeedbackForm({ inspectionId, onSubmit, onCancel, className }: FeedbackFormProps) {
  const [propertyRating, setPropertyRating] = useState(0);
  const [agentRating, setAgentRating] = useState(0);
  const [comment, setComment] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    const feedback = {
      inspectionId,
      propertyRating,
      agentRating,
      comment,
    };

    try {
      await new Promise(resolve => setTimeout(resolve, 1000));
      onSubmit?.(feedback);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className={cn('bg-white dark:bg-forest-800 rounded-xl border border-border-default', className)}>
      {/* Header */}
      <div className="border-b border-border-default p-4 flex items-center justify-between">
        <div>
          <h3 className="heading-md text-forest-900 dark:text-forest-50">Rate Your Inspection</h3>
          <p className="body-sm text-forest-600 dark:text-forest-400">
            Share your experience with us
          </p>
        </div>
        {onCancel && (
          <button
            onClick={onCancel}
            className="p-2 hover:bg-surface-secondary dark:hover:bg-forest-700 rounded-lg transition-colors"
          >
            <X className="h-5 w-5 text-forest-600 dark:text-forest-400" />
          </button>
        )}
      </div>

      {/* Form */}
      <form onSubmit={handleSubmit} className="p-6 space-y-6">
        {/* Property Rating */}
        <div>
          <label className="block body-sm font-medium text-forest-900 dark:text-forest-50 mb-3">
            Rate the Property
          </label>
          <div className="flex items-center gap-2">
            {[1, 2, 3, 4, 5].map((rating) => (
              <button
                key={rating}
                type="button"
                onClick={() => setPropertyRating(rating)}
                className="p-1 transition-transform hover:scale-110"
              >
                <Star
                  className={cn(
                    'h-8 w-8',
                    rating <= propertyRating
                      ? 'text-yellow-500 fill-yellow-500'
                      : 'text-forest-300 dark:text-forest-600'
                  )}
                />
              </button>
            ))}
            <span className="body-sm text-forest-600 dark:text-forest-400 ml-2">
              {propertyRating > 0 ? `${propertyRating}/5` : 'Select rating'}
            </span>
          </div>
        </div>

        {/* Agent Rating */}
        <div>
          <label className="block body-sm font-medium text-forest-900 dark:text-forest-50 mb-3">
            Rate the Agent
          </label>
          <div className="flex items-center gap-2">
            {[1, 2, 3, 4, 5].map((rating) => (
              <button
                key={rating}
                type="button"
                onClick={() => setAgentRating(rating)}
                className="p-1 transition-transform hover:scale-110"
              >
                <Star
                  className={cn(
                    'h-8 w-8',
                    rating <= agentRating
                      ? 'text-yellow-500 fill-yellow-500'
                      : 'text-forest-300 dark:text-forest-600'
                  )}
                />
              </button>
            ))}
            <span className="body-sm text-forest-600 dark:text-forest-400 ml-2">
              {agentRating > 0 ? `${agentRating}/5` : 'Select rating'}
            </span>
          </div>
        </div>

        {/* Comment */}
        <div>
          <label className="block body-sm font-medium text-forest-900 dark:text-forest-50 mb-3">
            Additional Comments
          </label>
          <textarea
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            placeholder="Tell us about your experience..."
            rows={4}
            className="w-full px-4 py-3 border border-border-default rounded-lg bg-surface-primary dark:bg-forest-700 text-forest-900 dark:text-forest-50 placeholder-forest-400 focus:outline-none focus:ring-2 focus:ring-forest-500 resize-none"
          />
        </div>

        {/* Submit */}
        <div className="flex items-center gap-3">
          {onCancel && (
            <button
              type="button"
              onClick={onCancel}
              className="flex-1 inline-flex items-center justify-center px-4 py-2 border border-border-default rounded-lg hover:bg-surface-secondary dark:hover:bg-forest-700 transition-colors body-md font-medium text-forest-900 dark:text-forest-50"
            >
              Cancel
            </button>
          )}
          <button
            type="submit"
            disabled={isSubmitting || propertyRating === 0}
            className={cn(
              'flex-1 inline-flex items-center justify-center px-4 py-2 bg-forest-900 text-white rounded-lg hover:bg-forest-800 transition-colors body-md font-medium',
              'disabled:opacity-40 disabled:cursor-not-allowed'
            )}
          >
            {isSubmitting ? (
              'Submitting...'
            ) : (
              <>
                <Send className="h-4 w-4 mr-2" />
                Submit Review
              </>
            )}
          </button>
        </div>
      </form>
    </div>
  );
}
