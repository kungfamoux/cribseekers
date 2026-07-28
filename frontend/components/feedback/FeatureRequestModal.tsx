'use client';

import { useState } from 'react';
import { X, Lightbulb, Send } from 'lucide-react';
import { getFeedbackContext, formatFeedbackContext } from '@/lib/feedbackContext';
import { logger } from '@/lib/logger';

interface FeatureRequestModalProps {
  onClose: () => void;
}

export function FeatureRequestModal({ onClose }: FeatureRequestModalProps) {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState<'search' | 'properties' | 'inspections' | 'payments' | 'messaging' | 'other'>('other');
  const [priority, setPriority] = useState<'low' | 'medium' | 'high'>('medium');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    const context = getFeedbackContext();

    const featureRequest = {
      type: 'feature_request',
      title,
      description,
      category,
      priority,
      context,
      timestamp: new Date().toISOString(),
    };

    // Log the feature request (in production, this would send to an API)
    logger.info('Feature request submitted', featureRequest);
    
    // Track the event
    logger.track('feature_request_submitted', {
      category,
      priority,
      route: context.route,
    });

    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));

    setIsSubmitting(false);
    setIsSubmitted(true);

    // Reset form after delay
    setTimeout(() => {
      setIsSubmitted(false);
      setTitle('');
      setDescription('');
      setCategory('other');
      setPriority('medium');
      onClose();
    }, 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
      <div className="bg-surface-secondary rounded-lg shadow-xl max-w-lg w-full max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between p-6 border-b border-border">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-primary/10 rounded-lg">
              <Lightbulb className="w-5 h-5 text-primary" />
            </div>
            <h2 className="text-xl font-bold">Request a Feature</h2>
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
            <h3 className="text-lg font-bold mb-2">Feature Request Submitted</h3>
            <p className="text-text-secondary">
              Thank you for your suggestion! We'll review it and consider it for future updates.
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="p-6 space-y-4">
            <div>
              <label className="block text-sm font-medium mb-2">Feature Title *</label>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
                placeholder="What feature would you like?"
                className="w-full px-4 py-2 bg-surface-primary border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Description *</label>
              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                required
                rows={4}
                placeholder="Describe the feature and how it would help you"
                className="w-full px-4 py-2 bg-surface-primary border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary resize-none"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Category</label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value as 'search' | 'properties' | 'inspections' | 'payments' | 'messaging' | 'other')}
                className="w-full px-4 py-2 bg-surface-primary border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
              >
                <option value="search">Property Search</option>
                <option value="properties">Property Management</option>
                <option value="inspections">Inspections</option>
                <option value="payments">Payments & Wallet</option>
                <option value="messaging">Messaging</option>
                <option value="other">Other</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Priority</label>
              <select
                value={priority}
                onChange={(e) => setPriority(e.target.value as 'low' | 'medium' | 'high')}
                className="w-full px-4 py-2 bg-surface-primary border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
              >
                <option value="low">Low - Nice to have</option>
                <option value="medium">Medium - Would be helpful</option>
                <option value="high">High - Really need this</option>
              </select>
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
                    Submit Request
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
