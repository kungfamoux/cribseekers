'use client';

export const dynamic = 'force-dynamic';

import { useState } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';
import { LogOut, X, ArrowLeft } from 'lucide-react';
import { ProtectedRoute } from '@/components/shared';
import { useAuth } from '@/components/providers/AuthProvider';
import { toast } from 'sonner';

export default function LogoutPage() {
  const { logout } = useAuth();
  const [isLoading, setIsLoading] = useState(false);

  const handleLogout = async () => {
    setIsLoading(true);
    try {
      await logout();
      toast.success('Logged out successfully', {
        description: 'You have been signed out of your account',
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <ProtectedRoute>
      <div className="min-h-screen bg-gradient-to-br from-forest-50 to-forest-100 dark:from-forest-950 dark:to-forest-900 flex items-center justify-center p-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="w-full max-w-md"
        >
          {/* Logo */}
          <div className="text-center mb-8">
            <Link href="/" className="inline-flex items-center justify-center space-x-2 mb-6">
              <Image
                src="/logo.png"
                alt="CribSeekers"
                width={80}
                height={80}
                className="h-12 w-12"
              />
              <span className="heading-2xl font-heading text-forest-900 dark:text-forest-50">CribSeekers</span>
            </Link>
            <h1 className="heading-2xl font-heading text-forest-900 dark:text-forest-50 mb-2">
              Sign out
            </h1>
            <p className="body-md text-forest-600 dark:text-forest-400">
              Are you sure you want to sign out of your account?
            </p>
          </div>

          {/* Logout Card */}
          <div className="bg-white dark:bg-forest-800 rounded-xl shadow-sm border border-border-default p-8">
            {/* Warning Icon */}
            <div className="flex justify-center mb-6">
              <div className="flex items-center justify-center w-16 h-16 bg-red-100 dark:bg-red-900 rounded-full">
                <LogOut className="h-8 w-8 text-red-600 dark:text-red-400" />
              </div>
            </div>

            {/* Confirmation Message */}
            <div className="text-center mb-8">
              <h3 className="heading-lg text-forest-900 dark:text-forest-50 mb-2">
                You're about to sign out
              </h3>
              <p className="body-md text-forest-600 dark:text-forest-400">
                You'll need to sign in again to access your account and continue using CribSeekers.
              </p>
            </div>

            {/* Action Buttons */}
            <div className="space-y-3">
              <button
                onClick={handleLogout}
                disabled={isLoading}
                className="w-full flex items-center justify-center px-4 py-3 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors body-md font-medium disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isLoading ? (
                  <>
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2" />
                    Signing out...
                  </>
                ) : (
                  <>
                    <LogOut className="mr-2 h-5 w-5" />
                    Yes, sign me out
                  </>
                )}
              </button>

              <Link
                href="/dashboard"
                className="w-full flex items-center justify-center px-4 py-3 bg-white dark:bg-forest-700 text-forest-900 dark:text-forest-50 border border-border-default rounded-lg hover:bg-surface-secondary transition-colors body-md font-medium"
              >
                <X className="mr-2 h-5 w-5" />
                Cancel
              </Link>
            </div>
          </div>

          {/* Back Link */}
          <div className="mt-6 text-center">
            <Link
              href="/dashboard"
              className="inline-flex items-center text-forest-600 dark:text-forest-400 hover:text-forest-900 dark:hover:text-forest-50 transition-colors body-md"
            >
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Dashboard
            </Link>
          </div>
        </motion.div>
      </div>
    </ProtectedRoute>
  );
}
