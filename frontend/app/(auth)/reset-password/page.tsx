'use client';

export const dynamic = 'force-dynamic';

import { useState, Suspense } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { motion } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';
import { Lock, Eye, EyeOff, CheckCircle2, AlertCircle } from 'lucide-react';
import { apiClient } from '@/services/api/axios';
import { API_ENDPOINTS } from '@/services/api/endpoints';
import { GuestRoute } from '@/components/shared';
import { toast } from 'sonner';
import { useSearchParams } from 'next/navigation';

const resetPasswordSchema = z
  .object({
    password: z
      .string()
      .min(8, 'Password must be at least 8 characters')
      .regex(/[A-Z]/, 'Password must contain at least one uppercase letter')
      .regex(/[a-z]/, 'Password must contain at least one lowercase letter')
      .regex(/[0-9]/, 'Password must contain at least one number')
      .regex(/[^A-Za-z0-9]/, 'Password must contain at least one special character'),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: 'Passwords do not match',
    path: ['confirmPassword'],
  });

type ResetPasswordFormData = z.infer<typeof resetPasswordSchema>;

function ResetPasswordForm() {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const searchParams = useSearchParams();
  const token = searchParams.get('token');

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<ResetPasswordFormData>({
    resolver: zodResolver(resetPasswordSchema),
  });

  const onSubmit = async (data: ResetPasswordFormData) => {
    if (!token) {
      toast.error('Invalid reset link', {
        description: 'Please request a new password reset link',
      });
      return;
    }

    setIsLoading(true);
    try {
      const { ...resetData } = data;
      await apiClient.post(API_ENDPOINTS.RESET_PASSWORD, {
        ...resetData,
        token,
      });
      setIsSuccess(true);
      toast.success('Password reset successful!', {
        description: 'You can now sign in with your new password',
      });
    } catch (error: unknown) {
      const message = error instanceof Error ? error.message : 'An error occurred';
      toast.error('Failed to reset password', {
        description: message || 'An error occurred',
      });
    } finally {
      setIsLoading(false);
    }
  };

  if (!token) {
    return (
      <GuestRoute>
        <div className="min-h-screen bg-gradient-to-br from-forest-50 to-forest-100 dark:from-forest-950 dark:to-forest-900 flex items-center justify-center p-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="w-full max-w-md"
          >
            <div className="bg-white dark:bg-forest-800 rounded-xl shadow-sm border border-border-default p-8 text-center">
              <div className="flex justify-center mb-4">
                <div className="flex items-center justify-center w-16 h-16 bg-red-100 dark:bg-red-900 rounded-full">
                  <AlertCircle className="h-8 w-8 text-red-600 dark:text-red-400" />
                </div>
              </div>
              <h3 className="heading-lg text-forest-900 dark:text-forest-50 mb-2">
                Invalid reset link
              </h3>
              <p className="body-md text-forest-600 dark:text-forest-400 mb-6">
                The password reset link is invalid or has expired. Please request a new one.
              </p>
              <Link
                href="/forgot-password"
                className="inline-flex items-center justify-center px-4 py-3 bg-forest-900 text-white rounded-lg hover:bg-forest-800 transition-colors body-md font-medium"
              >
                Request new reset link
              </Link>
            </div>
          </motion.div>
        </div>
      </GuestRoute>
    );
  }

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
              Reset your password
            </h1>
            <p className="body-md text-forest-600 dark:text-forest-400">
              Enter your new password below
            </p>
          </div>

          {/* Reset Password Card */}
          <div className="bg-white dark:bg-forest-800 rounded-xl shadow-sm border border-border-default p-8">
            {!isSuccess ? (
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                {/* Password Field */}
                <div>
                  <label htmlFor="password" className="block body-sm font-medium text-forest-900 dark:text-forest-50 mb-2">
                    New Password
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <Lock className="h-5 w-5 text-forest-400" />
                    </div>
                    <input
                      {...register('password')}
                      type={showPassword ? 'text' : 'password'}
                      id="password"
                      autoComplete="new-password"
                      className={`block w-full pl-10 pr-10 py-3 border rounded-lg body-md transition-colors ${
                        errors.password
                          ? 'border-red-500 focus:ring-red-500 focus:border-red-500'
                          : 'border-border-default focus:ring-forest-500 focus:border-forest-500'
                      } bg-white dark:bg-forest-700 text-forest-900 dark:text-forest-50 placeholder-forest-400`}
                      placeholder="••••••••"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute inset-y-0 right-0 pr-3 flex items-center hover:text-forest-600 dark:hover:text-forest-300 transition-colors"
                    >
                      {showPassword ? (
                        <EyeOff className="h-5 w-5 text-forest-400" />
                      ) : (
                        <Eye className="h-5 w-5 text-forest-400" />
                      )}
                    </button>
                  </div>
                  {errors.password && (
                    <p className="mt-1 body-sm text-red-500 flex items-center">
                      <AlertCircle className="h-4 w-4 mr-1" />
                      {errors.password.message}
                    </p>
                  )}
                </div>

                {/* Confirm Password Field */}
                <div>
                  <label htmlFor="confirmPassword" className="block body-sm font-medium text-forest-900 dark:text-forest-50 mb-2">
                    Confirm New Password
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <Lock className="h-5 w-5 text-forest-400" />
                    </div>
                    <input
                      {...register('confirmPassword')}
                      type={showConfirmPassword ? 'text' : 'password'}
                      id="confirmPassword"
                      autoComplete="new-password"
                      className={`block w-full pl-10 pr-10 py-3 border rounded-lg body-md transition-colors ${
                        errors.confirmPassword
                          ? 'border-red-500 focus:ring-red-500 focus:border-red-500'
                          : 'border-border-default focus:ring-forest-500 focus:border-forest-500'
                      } bg-white dark:bg-forest-700 text-forest-900 dark:text-forest-50 placeholder-forest-400`}
                      placeholder="••••••••"
                    />
                    <button
                      type="button"
                      onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                      className="absolute inset-y-0 right-0 pr-3 flex items-center hover:text-forest-600 dark:hover:text-forest-300 transition-colors"
                    >
                      {showConfirmPassword ? (
                        <EyeOff className="h-5 w-5 text-forest-400" />
                      ) : (
                        <Eye className="h-5 w-5 text-forest-400" />
                      )}
                    </button>
                  </div>
                  {errors.confirmPassword && (
                    <p className="mt-1 body-sm text-red-500 flex items-center">
                      <AlertCircle className="h-4 w-4 mr-1" />
                      {errors.confirmPassword.message}
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
                      Resetting...
                    </>
                  ) : (
                    'Reset Password'
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
                    Password reset successful
                  </h3>
                  <p className="body-md text-forest-600 dark:text-forest-400">
                    Your password has been reset successfully. You can now sign in with your new password.
                  </p>
                </div>

                {/* Sign In Button */}
                <Link
                  href="/login"
                  className="inline-flex items-center justify-center px-4 py-3 bg-forest-900 text-white rounded-lg hover:bg-forest-800 transition-colors body-md font-medium w-full"
                >
                  Sign In
                </Link>
              </div>
            )}

            {/* Back to Login */}
            <div className="mt-6 pt-6 border-t border-border-default">
              <p className="body-sm text-forest-600 dark:text-forest-400 text-center">
                Remember your password?{' '}
                <Link href="/login" className="text-forest-900 dark:text-forest-50 hover:underline">
                  Sign in
                </Link>
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </GuestRoute>
  );
}

export default function ResetPasswordPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <ResetPasswordForm />
    </Suspense>
  );
}
