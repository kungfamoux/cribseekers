'use client';

export const dynamic = 'force-dynamic';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { motion } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';
import { Phone, ArrowRight, AlertCircle, RefreshCw } from 'lucide-react';
import { apiClient } from '@/services/api/axios';
import { API_ENDPOINTS } from '@/services/api/endpoints';
import { GuestRoute } from '@/components/shared';
import { toast } from 'sonner';

const verifyPhoneSchema = z.object({
  phone: z.string().min(11, 'Phone number must be at least 11 characters'),
});

type VerifyPhoneFormData = z.infer<typeof verifyPhoneSchema>;

export default function VerifyPhonePage() {
  const [isLoading, setIsLoading] = useState(false);
  const [isResending, setIsResending] = useState(false);
  const [otpSent, setOtpSent] = useState(false);
  const [otp, setOtp] = useState('');

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<VerifyPhoneFormData>({
    resolver: zodResolver(verifyPhoneSchema),
  });

  const onSubmit = async (data: VerifyPhoneFormData) => {
    setIsLoading(true);
    try {
      await apiClient.post(API_ENDPOINTS.VERIFY_PHONE, data);
      setOtpSent(true);
      toast.success('OTP sent!', {
        description: 'Please check your phone for the verification code',
      });
    } catch (error: unknown) {
      const message = error instanceof Error ? error.message : 'An error occurred';
      toast.error('Failed to send OTP', {
        description: message || 'An error occurred',
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleVerifyOtp = async () => {
    if (otp.length !== 6) {
      toast.error('Invalid OTP', {
        description: 'Please enter a 6-digit code',
      });
      return;
    }

    setIsLoading(true);
    try {
      await apiClient.post(API_ENDPOINTS.VERIFY_OTP, { otp });
      toast.success('Phone verified successfully!', {
        description: 'Your phone number has been verified',
      });
      window.location.href = '/select-account-type';
    } catch (error: unknown) {
      const message = error instanceof Error ? error.message : 'An error occurred';
      toast.error('Verification failed', {
        description: message || 'Invalid OTP',
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleResend = async () => {
    setIsResending(true);
    try {
      await apiClient.post(API_ENDPOINTS.VERIFY_PHONE);
      toast.success('OTP resent!', {
        description: 'Please check your phone for the verification code',
      });
    } catch (error: unknown) {
      const message = error instanceof Error ? error.message : 'An error occurred';
      toast.error('Failed to resend OTP', {
        description: message || 'An error occurred',
      });
    } finally {
      setIsResending(false);
    }
  };

  return (
    <GuestRoute>
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
              Verify your phone
            </h1>
            <p className="body-md text-forest-600 dark:text-forest-400">
              We'll send you a verification code via SMS
            </p>
          </div>

          {/* Verification Card */}
          <div className="bg-white dark:bg-forest-800 rounded-xl shadow-sm border border-border-default p-8">
            {!otpSent ? (
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                {/* Phone Field */}
                <div>
                  <label htmlFor="phone" className="block body-sm font-medium text-forest-900 dark:text-forest-50 mb-2">
                    Phone Number
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <Phone className="h-5 w-5 text-forest-400" />
                    </div>
                    <input
                      {...register('phone')}
                      type="tel"
                      id="phone"
                      autoComplete="tel"
                      className={`block w-full pl-10 pr-3 py-3 border rounded-lg body-md transition-colors ${
                        errors.phone
                          ? 'border-red-500 focus:ring-red-500 focus:border-red-500'
                          : 'border-border-default focus:ring-forest-500 focus:border-forest-500'
                      } bg-white dark:bg-forest-700 text-forest-900 dark:text-forest-50 placeholder-forest-400`}
                      placeholder="+234 800 123 4567"
                    />
                  </div>
                  {errors.phone && (
                    <p className="mt-1 body-sm text-red-500 flex items-center">
                      <AlertCircle className="h-4 w-4 mr-1" />
                      {errors.phone.message}
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
                      Send Verification Code
                      <ArrowRight className="ml-2 h-5 w-5" />
                    </>
                  )}
                </button>
              </form>
            ) : (
              <div className="space-y-6">
                {/* OTP Input */}
                <div>
                  <label htmlFor="otp" className="block body-sm font-medium text-forest-900 dark:text-forest-50 mb-2">
                    Enter Verification Code
                  </label>
                  <input
                    type="text"
                    id="otp"
                    value={otp}
                    onChange={(e) => setOtp(e.target.value.replace(/\D/g, '').slice(0, 6))}
                    maxLength={6}
                    className="block w-full px-4 py-3 border border-border-default rounded-lg body-md text-center tracking-widest focus:ring-forest-500 focus:border-forest-500 bg-white dark:bg-forest-700 text-forest-900 dark:text-forest-50 placeholder-forest-400"
                    placeholder="000000"
                  />
                  <p className="mt-2 body-sm text-forest-600 dark:text-forest-400">
                    Enter the 6-digit code sent to your phone
                  </p>
                </div>

                {/* Verify Button */}
                <button
                  onClick={handleVerifyOtp}
                  disabled={isLoading || otp.length !== 6}
                  className="w-full flex items-center justify-center px-4 py-3 bg-forest-900 text-white rounded-lg hover:bg-forest-800 transition-colors body-md font-medium disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isLoading ? (
                    <>
                      <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2" />
                      Verifying...
                    </>
                  ) : (
                    'Verify Phone Number'
                  )}
                </button>

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
                      Resend code
                    </>
                  )}
                </button>
              </div>
            )}

            {/* Help Text */}
            <div className="mt-6 pt-6 border-t border-border-default">
              <p className="body-sm text-forest-600 dark:text-forest-400 text-center">
                Having trouble? Contact{' '}
                <Link href="/contact" className="text-forest-900 dark:text-forest-50 hover:underline">
                  support
                </Link>
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
