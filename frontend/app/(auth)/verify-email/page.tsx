'use client';

export const dynamic = 'force-dynamic';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { motion } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';
import { Mail, ArrowRight, CheckCircle2, AlertCircle, RefreshCw } from 'lucide-react';
import { apiClient } from '@/services/api/axios';
import { API_ENDPOINTS } from '@/services/api/endpoints';
import { GuestRoute } from '@/components/shared';
import { toast } from 'sonner';

const verifyEmailSchema = z.object({
  email: z.string().email('Invalid email address'),
});

type VerifyEmailFormData = z.infer<typeof verifyEmailSchema>;

export default function VerifyEmailPage() {
  const [isLoading, setIsLoading] = useState(false);
  const [isResending, setIsResending] = useState(false);
  const [emailSent, setEmailSent] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<VerifyEmailFormData>({
    resolver: zodResolver(verifyEmailSchema),
  });

  const onSubmit = async (data: VerifyEmailFormData) => {
    setIsLoading(true);
    try {
      await apiClient.post(API_ENDPOINTS.VERIFY_EMAIL, data);
      setEmailSent(true);
      toast.success('Verification email sent!', {
        description: 'Please check your inbox for the verification link',
      });
    } catch (error: unknown) {
      const message = error instanceof Error ? error.message : 'An error occurred';
      toast.error('Failed to send verification email', {
        description: message || 'An error occurred',
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleResend = async () => {
    setIsResending(true);
    try {
      await apiClient.post(API_ENDPOINTS.VERIFY_EMAIL);
      toast.success('Verification email resent!', {
        description: 'Please check your inbox for the verification link',
      });
    } catch (error: unknown) {
      const message = error instanceof Error ? error.message : 'An error occurred';
      toast.error('Failed to resend verification email', {
        description: message || 'An error occurred',
      });
    } finally {
      setIsResending(false);
    }
  };

  return (
    <GuestRoute>
      <div className="min-h-screen bg-gradient-to-br from-forest-50 to-forest-100 dark-from-forest-950 dark:to-forest-900 flex items-center justify-center p-4">
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
              Verify your email
            </h1>
            <p className="body-md text-forest-600 dark:text-forest-400">
              We've sent a verification link to your email address
            </p>
          </div>

          {/* Verification Card */}
          <div className="bg-white dark:bg-forest-800 rounded-xl shadow-sm border border-border-default p-8">
            {!emailSent ? (
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                {/* Email Field */}
                <div>
                  <label htmlFor="email" className="block body-sm font-medium text-forest-900 dark:text-forest-50 mb-2">
                    Email Address
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <Mail className="h-5 w-5 text-forest-400" />
                    </div>
                    <input
                      {...register('email')}
                      type="email"
                      id="email"
                      autoComplete="email"
                      className={`block w-full pl-10 pr-3 py-3 border rounded-lg body-md transition-colors ${
                        errors.email
                          ? 'border-red-500 focus:ring-red-500 focus:border-red-500'
                          : 'border-border-default focus:ring-forest-500 focus:border-forest-500'
                      } bg-white dark:bg-forest-700 text-forest-900 dark:text-forest-50 placeholder-forest-400`}
                      placeholder="you@example.com"
                    />
                  </div>
                  {errors.email && (
                    <p className="mt-1 body-sm text-red-500 flex items-center">
                      <AlertCircle className="h-4 w-4 mr-1" />
                      {errors.email.message}
                    </p>
                  )}
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={isLoading || isSubmitting}
                  className="w-full flex items-center justify-center px-4 py-3 bg-forest-900 text-white rounded-lg hover:bg-forest-800 transition-colors body-md font-medium disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isLoading || isSubmitting ? (
                    <>
                      <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2" />
                      Sending...
                    </>
                  ) : (
                    <>
                      Send Verification Link
                      <ArrowRight className="ml-2 h-5 w-5" />
                    </>
                  )}
                </button>
              </form>
            ) : (
              <div className="text-center space-y-6">
                {/* Success Icon */}
                <div className="flex justify-center">
                  <div className="flex items-center justify-center w-16 h-16 bg-green-100 dark:bg-green-900 rounded-full">
                    <CheckCircle2 className="h-8 w-8 text-green-600 dark:text-green-400" />
                  </div>
                </div>

                {/* Success Message */}
                <div>
                  <h3 className="heading-lg text-forest-900 dark:text-forest-50 mb-2">
                    Check your inbox
                  </h3>
                  <p className="body-md text-forest-600 dark:text-forest-400">
                    We've sent a verification link to your email address. Click the link to verify your account.
                  </p>
                </div>

                {/* Resend Button */}
                <button
                  onClick={handleResend}
                  disabled={isResending}
                  className="flex items-center justify-center px-4 py-2 text-forest-600 dark:text-forest-400 hover:text-forest-900 dark:hover:text-forest-50 transition-colors body-md disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isResending ? (
                    <>
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-current mr-2" />
                      Resending...
                    </>
                  ) : (
                    <>
                      <RefreshCw className="mr-2 h-4 w-4" />
                      Resend verification email
                    </>
                  )}
                </button>
              </div>
            )}

            {/* Help Text */}
            <div className="mt-6 pt-6 border-t border-border-default">
              <p className="body-sm text-forest-600 dark:text-forest-400 text-center">
                Didn't receive the email? Check your spam folder or{' '}
                <button
                  onClick={handleResend}
                  disabled={isResending}
                  className="text-forest-900 dark:text-forest-50 hover:underline disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  request another
                </button>
              </p>
            </div>
          </div>

          {/* Back to Login */}
          <p className="mt-8 text-center body-md text-forest-600 dark:text-forest-400">
            Already verified?{' '}
            <Link href="/login" className="text-forest-900 dark:text-forest-50 font-medium hover:underline">
              Sign in
            </Link>
          </p>
        </motion.div>
      </div>
    </GuestRoute>
  );
}
