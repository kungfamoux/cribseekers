'use client';

import { useState } from 'react';
import { Mail, ArrowRight, CheckCircle } from 'lucide-react';

export function NewsletterForm() {
  const [email, setEmail] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000));

    setIsLoading(false);
    setIsSubmitted(true);
    setEmail('');

    // Reset success message after 3 seconds
    setTimeout(() => setIsSubmitted(false), 3000);
  };

  return (
    <div className="bg-forest-900 rounded-2xl p-8">
      {isSubmitted ? (
        <div className="text-center">
          <div className="flex justify-center mb-4">
            <div className="w-16 h-16 bg-success-500 rounded-full flex items-center justify-center">
              <CheckCircle className="h-8 w-8 text-white" />
            </div>
          </div>
          <h3 className="heading-lg text-white mb-2">You're on the list!</h3>
          <p className="body-md text-forest-200">
            We'll send you the latest property updates and exclusive offers.
          </p>
        </div>
      ) : (
        <>
          <h3 className="heading-lg text-white mb-2">Stay Updated</h3>
          <p className="body-md text-forest-200 mb-6">
            Get the latest property listings and market insights delivered to your inbox.
          </p>
          <form onSubmit={handleSubmit} className="flex gap-2">
            <div className="flex-1 relative">
              <Mail className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-forest-400" />
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                required
                className="w-full pl-12 pr-4 py-3 bg-forest-800 border border-forest-700 rounded-xl text-white placeholder:text-forest-400 focus:outline-none focus:border-forest-500 transition-colors body-md"
              />
            </div>
            <button
              type="submit"
              disabled={isLoading}
              className="px-6 py-3 bg-gold-500 hover:bg-gold-400 text-forest-900 rounded-xl ui-md font-medium transition-colors flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? (
                <div className="h-5 w-5 animate-spin rounded-full border-2 border-forest-900 border-t-transparent" />
              ) : (
                <>
                  Subscribe
                  <ArrowRight className="h-5 w-5" />
                </>
              )}
            </button>
          </form>
          <p className="ui-sm text-forest-400 mt-4">
            By subscribing, you agree to our Privacy Policy and consent to receive updates.
          </p>
        </>
      )}
    </div>
  );
}
