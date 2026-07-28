'use client';

import { useState } from 'react';
import { MessageSquare, ChevronDown } from 'lucide-react';
import { BugReportModal } from './BugReportModal';
import { FeatureRequestModal } from './FeatureRequestModal';
import { GeneralFeedbackModal } from './GeneralFeedbackModal';

type FeedbackType = 'bug' | 'feature' | 'general' | null;

export function FeedbackWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [activeModal, setActiveModal] = useState<FeedbackType>(null);

  const openModal = (type: FeedbackType) => {
    setActiveModal(type);
    setIsOpen(false);
  };

  const closeModal = () => {
    setActiveModal(null);
  };

  return (
    <>
      <div className="fixed bottom-6 right-6 z-40">
        {!isOpen ? (
          <button
            onClick={() => setIsOpen(true)}
            className="flex items-center gap-2 px-4 py-3 bg-primary text-white rounded-full shadow-lg hover:bg-primary/90 transition-colors"
          >
            <MessageSquare className="w-5 h-5" />
            <span className="font-medium">Feedback</span>
          </button>
        ) : (
          <div className="bg-surface-secondary rounded-lg shadow-xl overflow-hidden">
            <button
              onClick={() => setIsOpen(false)}
              className="w-full flex items-center justify-between px-4 py-3 bg-primary text-white"
            >
              <span className="font-medium">Send Feedback</span>
              <ChevronDown className="w-5 h-5" />
            </button>
            <div className="p-2 space-y-1">
              <button
                onClick={() => openModal('bug')}
                className="w-full flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-surface-primary transition-colors text-left"
              >
                <span className="text-2xl">🐛</span>
                <div>
                  <div className="font-medium">Report a Bug</div>
                  <div className="text-sm text-text-secondary">Something isn't working</div>
                </div>
              </button>
              <button
                onClick={() => openModal('feature')}
                className="w-full flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-surface-primary transition-colors text-left"
              >
                <span className="text-2xl">💡</span>
                <div>
                  <div className="font-medium">Request a Feature</div>
                  <div className="text-sm text-text-secondary">Suggest an improvement</div>
                </div>
              </button>
              <button
                onClick={() => openModal('general')}
                className="w-full flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-surface-primary transition-colors text-left"
              >
                <span className="text-2xl">💬</span>
                <div>
                  <div className="font-medium">General Feedback</div>
                  <div className="text-sm text-text-secondary">Share your thoughts</div>
                </div>
              </button>
            </div>
          </div>
        )}
      </div>

      {activeModal === 'bug' && <BugReportModal onClose={closeModal} />}
      {activeModal === 'feature' && <FeatureRequestModal onClose={closeModal} />}
      {activeModal === 'general' && <GeneralFeedbackModal onClose={closeModal} />}
    </>
  );
}
