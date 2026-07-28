'use client';

import { useState } from 'react';
import { X, MessageSquare, Send } from 'lucide-react';
import { getFeedbackContext, formatFeedbackContext } from '@/lib/feedbackContext';
import { logger } from '@/lib/logger';

interface GeneralFeedbackModalProps {
  onClose: () => void;
}

export function GeneralFeedbackModal({ onClose }: GeneralFeedbackModalProps) {
  const [feedback, setFeedback] = useState('');
  const [category, setCategory] = useState<'experience' | 'ui' | 'performance' | 'content' | 'other'>('experience');
  const [rating, setRating] = useState<number>(0);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    const context = getFeedbackContext();

    const generalFeedback = {
      type: 'general_feedback',
      feedback,
      category,
      rating,
      context,
      timestamp: new Date().toISOString(),
    };

    // Log the feedback (in production, this would send to an API)
    logger.info('General feedback submitted', generalFeedback);
    
    // Track the event
    logger.track('general_feedback_submitted', {
      category,
      rating,
      route: context.route,
    });

    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));

    setIsSubmitting(false);
    setIsSubmitted(true);

    // Reset form after delay
    setTimeout(() => {
      setIsSubmitted(false);
      setFeedback('');
      setCategory('experience');
      setRating(0);
      onClose();
    }, 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
      <div className="bg-surface-secondary rounded-lg shadow-xl max-w-lg w-full max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between p-6 border-b border-border">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-primary/10 rounded-lg">
              <MessageSquare className="w-5 h-5 text-primary" />
            </div>
            <h2 className="text-xl font-bold">Share Your Feedback</h2>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-surface-primary rounded-lg transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {isSubmitted ? (
          <div className="p-6 text-center">
            <div className="w-16 h-16 bg-success/10 rounded-full flex items-center justify-center mx-auto mb-4">
              <Send className="w-8 h-8 text-success" />
            </div>
            <h3 className="text-lg font-bold mb-2">Thank You!</h3>
            <p className="text-text-secondary">
              Your feedback helps us improve CribSeekers. We appreciate your input!
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="p-6 space-y-4">
            <div>
              <label className="block text-sm font-medium mb-2">Your Feedback *</label>
              <textarea
                value={feedback}
                onChange={(e) => setFeedback(e.target.value)}
                required
                rows={4}
                placeholder="Tell us what you think about CribSeekers..."
                className="w-full px-4 py-2 bg-surface-primary border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary resize-none"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Category</label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value as any)}
                className="w-full px-4 py-2 bg-surface-primary border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
              >
                <option value="experience">Overall Experience</option>
                <option value="ui">User Interface</option>
                <option value="performance">Performance</option>
                <option value="content">Content & Listings</option>
                <option value="other">Other</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Rating (Optional)</label>
              <div className="flex gap-2">
                {[1, 2, 3, 4, 5].map((star) => (
                  <button
                    key={star}
                    type="button"
                    onClick={() => setRating(star)}
                    className="text-2xl transition-colors hover:scale-110"
                  >
                    {star <= rating ? '⭐' : '☆'}
                  </button>
                ))}
              </div>
            </div>

            <div className="pt-4">
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors disabled:opacity-50"
              >
                {isSubmitting ? (
                  <>
                    <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    Submitting...
                  </>
                ) : (
                  <>
                    <Send className="w-4 h-4" />
                    Submit Feedback
                  </>
                )}
              </button>
            </div>

            <div className="text-xs text-text-secondary">
              <p className="font-medium mb-1">System Information (auto-included):</p>
              <pre className="whitespace-pre-wrap opacity-70">{formatFeedbackContext(getFeedbackContext())}</pre>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}
