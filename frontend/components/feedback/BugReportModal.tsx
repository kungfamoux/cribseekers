'use client';

import { useState } from 'react';
import { X, Bug, Send } from 'lucide-react';
import { getFeedbackContext, formatFeedbackContext } from '@/lib/feedbackContext';
import { logger } from '@/lib/logger';

interface BugReportModalProps {
  onClose: () => void;
}

export function BugReportModal({ onClose }: BugReportModalProps) {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [steps, setSteps] = useState('');
  const [severity, setSeverity] = useState<'low' | 'medium' | 'high' | 'critical'>('medium');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    const context = getFeedbackContext();

    const bugReport = {
      type: 'bug',
      title,
      description,
      steps,
      severity,
      context,
      timestamp: new Date().toISOString(),
    };

    // Log the bug report (in production, this would send to an API)
    logger.info('Bug report submitted', bugReport);
    
    // Track the event
    logger.track('bug_report_submitted', {
      severity,
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
      setSteps('');
      setSeverity('medium');
      onClose();
    }, 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
      <div className="bg-surface-secondary rounded-lg shadow-xl max-w-lg w-full max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between p-6 border-b border-border">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-error/10 rounded-lg">
              <Bug className="w-5 h-5 text-error" />
            </div>
            <h2 className="text-xl font-bold">Report a Bug</h2>
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
            <h3 className="text-lg font-bold mb-2">Bug Report Submitted</h3>
            <p className="text-text-secondary">
              Thank you for helping us improve CribSeekers. We'll review your report shortly.
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="p-6 space-y-4">
            <div>
              <label className="block text-sm font-medium mb-2">Bug Title *</label>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
                placeholder="Brief description of the bug"
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
                placeholder="Describe what happened"
                className="w-full px-4 py-2 bg-surface-primary border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary resize-none"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Steps to Reproduce</label>
              <textarea
                value={steps}
                onChange={(e) => setSteps(e.target.value)}
                rows={3}
                placeholder="1. Go to...&#10;2. Click on...&#10;3. See error..."
                className="w-full px-4 py-2 bg-surface-primary border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary resize-none"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Severity</label>
              <select
                value={severity}
                onChange={(e) => setSeverity(e.target.value as 'low' | 'medium' | 'high' | 'critical')}
                className="w-full px-4 py-2 bg-surface-primary border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
              >
                <option value="low">Low - Minor inconvenience</option>
                <option value="medium">Medium - Affects usability</option>
                <option value="high">High - Blocks key functionality</option>
                <option value="critical">Critical - App unusable</option>
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
                    Submit Bug Report
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
