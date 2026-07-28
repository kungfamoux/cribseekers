'use client';

import { Navbar, Footer } from '@/components/public';
import { motion } from 'framer-motion';
import { Home, RefreshCw, AlertTriangle } from 'lucide-react';
import Link from 'next/link';

export default function Error({
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-1 bg-surface-secondary">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-2xl mx-auto text-center"
          >
            <div className="mb-8">
              <div className="w-20 h-20 bg-error-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <AlertTriangle className="w-10 h-10 text-error-500" />
              </div>
              <h1 className="display-hero font-heading text-forest-900 mb-4">500</h1>
              <h2 className="heading-xl text-text-primary mb-4">Something went wrong</h2>
              <p className="body-lg text-text-secondary mb-8">
                We're sorry, but something unexpected happened. Our team has been notified and is working to fix the issue.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
              <button
                onClick={reset}
                className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-forest-900 text-white rounded-xl ui-md font-medium hover:bg-forest-800 transition-colors"
              >
                <RefreshCw className="w-5 h-5" />
                Try Again
              </button>
              <Link
                href="/"
                className="inline-flex items-center justify-center gap-2 px-6 py-3 border border-border-default rounded-xl ui-md font-medium hover:bg-surface-primary transition-colors"
              >
                <Home className="w-5 h-5" />
                Go Home
              </Link>
            </div>

            <div className="bg-surface-elevated rounded-2xl p-8">
              <h3 className="heading-md text-text-primary mb-4">What you can do</h3>
              <ul className="text-left space-y-3">
                <li className="flex items-start gap-3">
                  <span className="text-forest-900 mt-1">•</span>
                  <span className="body-md text-text-secondary">Refresh the page and try again</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-forest-900 mt-1">•</span>
                  <span className="body-md text-text-secondary">Check your internet connection</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-forest-900 mt-1">•</span>
                  <span className="body-md text-text-secondary">Try clearing your browser cache</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-forest-900 mt-1">•</span>
                  <span className="body-md text-text-secondary">Contact our support team if the problem persists</span>
                </li>
              </ul>
            </div>
          </motion.div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
