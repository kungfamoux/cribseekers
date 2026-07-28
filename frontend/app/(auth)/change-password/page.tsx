'use client';

export const dynamic = 'force-dynamic';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { motion } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';
import { Lock, Eye, EyeOff, CheckCircle2, AlertCircle, ArrowLeft } from 'lucide-react';
import { ProtectedRoute } from '@/components/shared';
import { apiClient } from '@/services/api/axios';
import { API_ENDPOINTS } from '@/services/api/endpoints';
import { toast } from 'sonner';

const changePasswordSchema = z
  .object({
    currentPassword: z.string().min(1, 'Current password is required'),
    newPassword: z
      .string()
      .min(8, 'Password must be at least 8 characters')
      .regex(/[A-Z]/, 'Password must contain at least one uppercase letter')
      .regex(/[a-z]/, 'Password must contain at least one lowercase letter')
      .regex(/[0-9]/, 'Password must contain at least one number')
      .regex(/[^A-Za-z0-9]/, 'Password must contain at least one special character'),
    confirmPassword: z.string(),
  })
  .refine((data) => data.newPassword === data.confirmPassword, {
    message: 'Passwords do not match',
    path: ['confirmPassword'],
  });

type ChangePasswordFormData = z.infer<typeof changePasswordSchema>;

export default function ChangePasswordPage() {
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<ChangePasswordFormData>({
    resolver: zodResolver(changePasswordSchema),
  });

  const onSubmit = async (data: ChangePasswordFormData) => {
    setIsLoading(true);
    try {
      const { ...passwordData } = data;
      await apiClient.post(API_ENDPOINTS.CHANGE_PASSWORD, passwordData);
      setIsSuccess(true);
      toast.success('Password changed successfully!', {
        description: 'Your password has been updated',
      });
    } catch (error: unknown) {
      const message = error instanceof Error ? error.message : 'An error occurred';
      toast.error('Failed to change password', {
        description: message || 'Current password is incorrect',
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <ProtectedRoute>
      <div className="min-h-screen bg-gradient-to-br from-forest-50 to-forest-100 dark:from-forest-950 dark:to-forest-900 flex items-center justify-center p-4 py-12">
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
              Change your password
            </h1>
            <p className="body-md text-forest-600 dark:text-forest-400">
              Enter your current password and choose a new one
            </p>
          </div>

          {/* Change Password Card */}
          <div className="bg-white dark:bg-forest-800 rounded-xl shadow-sm border border-border-default p-8">
            {!isSuccess ? (
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                {/* Current Password */}
                <div>
                  <label htmlFor="currentPassword" className="block body-sm font-medium text-forest-900 dark:text-forest-50 mb-2">
                    Current Password
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <Lock className="h-5 w-5 text-forest-400" />
                    </div>
                    <input
                      {...register('currentPassword')}
                      type={showCurrentPassword ? 'text' : 'password'}
                      id="currentPassword"
                      autoComplete="current-password"
                      className={`block w-full pl-10 pr-10 py-3 border rounded-lg body-md transition-colors ${
                        errors.currentPassword
                          ? 'border-red-500 focus:ring-red-500 focus:border-red-500'
                          : 'border-border-default focus:ring-forest-500 focus:border-forest-500'
                      } bg-white dark:bg-forest-700 text-forest-900 dark:text-forest-50 placeholder-forest-400`}
                      placeholder="••••••••"
                    />
                    <button
                      type="button"
                      onClick={() => setShowCurrentPassword(!showCurrentPassword)}
                      className="absolute inset-y-0 right-0 pr-3 flex items-center hover:text-forest-600 dark:hover:text-forest-300 transition-colors"
                    >
                      {showCurrentPassword ? (
                        <EyeOff className="h-5 w-5 text-forest-400" />
                      ) : (
                        <Eye className="h-5 w-5 text-forest-400" />
                      )}
                    </button>
                  </div>
                  {errors.currentPassword && (
                    <p className="mt-1 body-sm text-red-500 flex items-center">
                      <AlertCircle className="h-4 w-4 mr-1" />
                      {errors.currentPassword.message}
                    </p>
                  )}
                </div>

                {/* New Password */}
                <div>
                  <label htmlFor="newPassword" className="block body-sm font-medium text-forest-900 dark:text-forest-50 mb-2">
                    New Password
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <Lock className="h-5 w-5 text-forest-400" />
                    </div>
                    <input
                      {...register('newPassword')}
                      type={showNewPassword ? 'text' : 'password'}
                      id="newPassword"
                      autoComplete="new-password"
                      className={`block w-full pl-10 pr-10 py-3 border rounded-lg body-md transition-colors ${
                        errors.newPassword
                          ? 'border-red-500 focus:ring-red-500 focus:border-red-500'
                          : 'border-border-default focus:ring-forest-500 focus:border-forest-500'
                      } bg-white dark:bg-forest-700 text-forest-900 dark:text-forest-50 placeholder-forest-400`}
                      placeholder="••••••••"
                    />
                    <button
                      type="button"
                      onClick={() => setShowNewPassword(!showNewPassword)}
                      className="absolute inset-y-0 right-0 pr-3 flex items-center hover:text-forest-600 dark:hover:text-forest-300 transition-colors"
                    >
                      {showNewPassword ? (
                        <EyeOff className="h-5 w-5 text-forest-400" />
                      ) : (
                        <Eye className="h-5 w-5 text-forest-400" />
                      )}
                    </button>
                  </div>
                  {errors.newPassword && (
                    <p className="mt-1 body-sm text-red-500 flex items-center">
                      <AlertCircle className="h-4 w-4 mr-1" />
                      {errors.newPassword.message}
                    </p>
                  )}
                </div>

                {/* Confirm Password */}
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
                      Changing...
                    </>
                  ) : (
                    'Change Password'
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
                    Password changed successfully
                  </h3>
                  <p className="body-md text-forest-600 dark:text-forest-400">
                    Your password has been updated. You can now sign in with your new password.
                  </p>
                </div>

                {/* Back to Dashboard */}
                <Link
                  href="/dashboard"
                  className="inline-flex items-center px-4 py-3 bg-forest-900 text-white rounded-lg hover:bg-forest-800 transition-colors body-md font-medium w-full"
                >
                  Back to Dashboard
                </Link>
              </div>
            )}

            {/* Back Link */}
            <div className="mt-6 pt-6 border-t border-border-default">
              <Link
                href="/dashboard"
                className="inline-flex items-center text-forest-600 dark:text-forest-400 hover:text-forest-900 dark:hover:text-forest-50 transition-colors body-md"
              >
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back to Dashboard
              </Link>
            </div>
          </div>
        </motion.div>
      </div>
    </ProtectedRoute>
  );
}
