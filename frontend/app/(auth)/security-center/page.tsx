'use client';

export const dynamic = 'force-dynamic';

import { useState } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';
import { Shield, History, Smartphone, Lock, Trash2, AlertTriangle, ArrowLeft } from 'lucide-react';
import { ProtectedRoute } from '@/components/shared';
import { toast } from 'sonner';

export default function SecurityCenterPage() {
  const [is2FAEnabled, setIs2FAEnabled] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const sessions = [
    { id: 1, device: 'Chrome on Windows', location: 'Lagos, Nigeria', lastActive: '2 minutes ago', current: true },
    { id: 2, device: 'Safari on iPhone', location: 'Abuja, Nigeria', lastActive: '2 hours ago', current: false },
    { id: 3, device: 'Firefox on Mac', location: 'Port Harcourt, Nigeria', lastActive: '1 day ago', current: false },
  ];

  const loginHistory = [
    { id: 1, device: 'Chrome on Windows', location: 'Lagos, Nigeria', time: 'Today, 10:30 AM', status: 'success' },
    { id: 2, device: 'Safari on iPhone', location: 'Abuja, Nigeria', time: 'Today, 8:15 AM', status: 'success' },
    { id: 3, device: 'Unknown Device', location: 'Unknown', time: 'Yesterday, 11:45 PM', status: 'failed' },
  ];

  const handleToggle2FA = async () => {
    setIsLoading(true);
    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000));
      setIs2FAEnabled(!is2FAEnabled);
      toast.success(is2FAEnabled ? '2FA disabled' : '2FA enabled', {
        description: is2FAEnabled ? 'Two-factor authentication has been disabled' : 'Two-factor authentication has been enabled',
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleRevokeSession = () => {
    toast.success('Session revoked', {
      description: 'The session has been terminated',
    });
  };

  const handleDeleteAccount = () => {
    toast.error('Account deletion', {
      description: 'This feature is not yet implemented. Please contact support.',
    });
  };

  return (
    <ProtectedRoute>
      <div className="min-h-screen bg-gradient-to-br from-forest-50 to-forest-100 dark:from-forest-950 dark:to-forest-900 py-12">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="max-w-5xl mx-auto"
          >
            {/* Header */}
            <div className="mb-8">
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
              <div className="flex items-center mb-4">
                <Link href="/dashboard" className="inline-flex items-center text-forest-600 dark:text-forest-400 hover:text-forest-900 dark:hover:text-forest-50 transition-colors body-md">
                  <ArrowLeft className="mr-2 h-4 w-4" />
                  Back to Dashboard
                </Link>
              </div>
              <h1 className="heading-2xl font-heading text-forest-900 dark:text-forest-50 mb-2">
                Security Center
              </h1>
              <p className="body-md text-forest-600 dark:text-forest-400">
                Manage your account security and privacy settings
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Left Column - Main Settings */}
              <div className="lg:col-span-2 space-y-6">
                {/* 2FA Settings */}
                <div className="bg-white dark:bg-forest-800 rounded-xl shadow-sm border border-border-default p-6">
                  <div className="flex items-center mb-4">
                    <Shield className="h-6 w-6 text-forest-600 dark:text-forest-400 mr-3" />
                    <h2 className="heading-lg text-forest-900 dark:text-forest-50">Two-Factor Authentication</h2>
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="body-md text-forest-600 dark:text-forest-400 mb-1">
                        Add an extra layer of security to your account
                      </p>
                      <p className="body-sm text-forest-500">
                        {is2FAEnabled ? '2FA is currently enabled' : '2FA is currently disabled'}
                      </p>
                    </div>
                    <button
                      onClick={handleToggle2FA}
                      disabled={isLoading}
                      className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                        is2FAEnabled ? 'bg-forest-900' : 'bg-gray-200 dark:bg-gray-700'
                      } disabled:opacity-50 disabled:cursor-not-allowed`}
                    >
                      <span
                        className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                          is2FAEnabled ? 'translate-x-6' : 'translate-x-1'
                        }`}
                      />
                    </button>
                  </div>
                </div>

                {/* Active Sessions */}
                <div className="bg-white dark:bg-forest-800 rounded-xl shadow-sm border border-border-default p-6">
                  <div className="flex items-center mb-4">
                    <Smartphone className="h-6 w-6 text-forest-600 dark:text-forest-400 mr-3" />
                    <h2 className="heading-lg text-forest-900 dark:text-forest-50">Active Sessions</h2>
                  </div>
                  <div className="space-y-4">
                    {sessions.map((session) => (
                      <div key={session.id} className="flex items-center justify-between p-4 bg-surface-secondary rounded-lg">
                        <div className="flex items-center">
                          <Smartphone className="h-5 w-5 text-forest-400 mr-3" />
                          <div>
                            <p className="body-md text-forest-900 dark:text-forest-50">{session.device}</p>
                            <p className="body-sm text-forest-600 dark:text-forest-400">
                              {session.location} • {session.lastActive}
                            </p>
                          </div>
                        </div>
                        <div className="flex items-center space-x-2">
                          {session.current && (
                            <span className="px-2 py-1 bg-green-100 dark:bg-green-900 text-green-600 dark:text-green-400 text-xs rounded-full">
                              Current
                            </span>
                          )}
                          {!session.current && (
                            <button
                              onClick={() => handleRevokeSession()}
                              className="text-red-500 hover:text-red-700 transition-colors body-sm"
                            >
                              Revoke
                            </button>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Login History */}
                <div className="bg-white dark:bg-forest-800 rounded-xl shadow-sm border border-border-default p-6">
                  <div className="flex items-center mb-4">
                    <History className="h-6 w-6 text-forest-600 dark:text-forest-400 mr-3" />
                    <h2 className="heading-lg text-forest-900 dark:text-forest-50">Login History</h2>
                  </div>
                  <div className="space-y-3">
                    {loginHistory.map((entry) => (
                      <div key={entry.id} className="flex items-center justify-between p-3 bg-surface-secondary rounded-lg">
                        <div className="flex items-center">
                          <div className={`flex items-center justify-center w-8 h-8 rounded-full mr-3 ${
                            entry.status === 'success' ? 'bg-green-100 dark:bg-green-900' : 'bg-red-100 dark:bg-red-900'
                          }`}>
                            {entry.status === 'success' ? (
                              <Lock className="h-4 w-4 text-green-600 dark:text-green-400" />
                            ) : (
                              <AlertTriangle className="h-4 w-4 text-red-600 dark:text-red-400" />
                            )}
                          </div>
                          <div>
                            <p className="body-md text-forest-900 dark:text-forest-50">{entry.device}</p>
                            <p className="body-sm text-forest-600 dark:text-forest-400">
                              {entry.location} • {entry.time}
                            </p>
                          </div>
                        </div>
                        <span
                          className={`text-xs px-2 py-1 rounded-full ${
                            entry.status === 'success'
                              ? 'bg-green-100 dark:bg-green-900 text-green-600 dark:text-green-400'
                              : 'bg-red-100 dark:bg-red-900 text-red-600 dark:text-red-400'
                          }`}
                        >
                          {entry.status}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Right Column - Quick Actions */}
              <div className="space-y-6">
                {/* Quick Actions */}
                <div className="bg-white dark:bg-forest-800 rounded-xl shadow-sm border border-border-default p-6">
                  <h2 className="heading-lg text-forest-900 dark:text-forest-50 mb-4">Quick Actions</h2>
                  <div className="space-y-3">
                    <Link
                      href="/change-password"
                      className="flex items-center p-3 bg-surface-secondary rounded-lg hover:bg-surface-tertiary transition-colors"
                    >
                      <Lock className="h-5 w-5 text-forest-600 dark:text-forest-400 mr-3" />
                      <span className="body-md text-forest-900 dark:text-forest-50">Change Password</span>
                    </Link>
                    <Link
                      href="/identity-verification"
                      className="flex items-center p-3 bg-surface-secondary rounded-lg hover:bg-surface-tertiary transition-colors"
                    >
                      <Shield className="h-5 w-5 text-forest-600 dark:text-forest-400 mr-3" />
                      <span className="body-md text-forest-900 dark:text-forest-50">Verify Identity</span>
                    </Link>
                  </div>
                </div>

                {/* Danger Zone */}
                <div className="bg-white dark:bg-forest-800 rounded-xl shadow-sm border border-red-200 dark:border-red-900 p-6">
                  <h2 className="heading-lg text-red-600 dark:text-red-400 mb-4">Danger Zone</h2>
                  <button
                    onClick={handleDeleteAccount}
                    className="flex items-center justify-center w-full p-3 bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400 rounded-lg hover:bg-red-100 dark:hover:bg-red-900/40 transition-colors body-md"
                  >
                    <Trash2 className="h-5 w-5 mr-2" />
                    Delete Account
                  </button>
                  <p className="body-sm text-forest-600 dark:text-forest-400 mt-2">
                    This action cannot be undone. Please contact support for assistance.
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </ProtectedRoute>
  );
}
