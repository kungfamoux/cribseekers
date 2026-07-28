'use client';

export const dynamic = 'force-dynamic';

import { motion } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';
import { CheckCircle2, Home, Search, User, Shield, ArrowRight, TrendingUp } from 'lucide-react';
import { ProtectedRoute } from '@/components/shared';
import { useAuthStore } from '@/store/auth.store';

const quickActions = [
  {
    title: 'Search Properties',
    description: 'Find your perfect property',
    icon: Search,
    href: '/search',
    color: 'bg-blue-100 dark:bg-blue-900',
    iconColor: 'text-blue-600 dark:text-blue-400',
  },
  {
    title: 'Complete Profile',
    description: 'Finish setting up your account',
    icon: User,
    href: '/complete-profile',
    color: 'bg-green-100 dark:bg-green-900',
    iconColor: 'text-green-600 dark:text-green-400',
  },
  {
    title: 'Verify Identity',
    description: 'Upload your documents',
    icon: Shield,
    href: '/identity-verification',
    color: 'bg-purple-100 dark:bg-purple-900',
    iconColor: 'text-purple-600 dark:text-purple-400',
  },
  {
    title: 'View Dashboard',
    description: 'Access your dashboard',
    icon: Home,
    href: '/dashboard',
    color: 'bg-orange-100 dark:bg-orange-900',
    iconColor: 'text-orange-600 dark:text-orange-400',
  },
];

const nextSteps = [
  { title: 'Complete your profile', completed: false },
  { title: 'Verify your email', completed: true },
  { title: 'Verify your phone', completed: false },
  { title: 'Upload identity documents', completed: false },
  { title: 'Select account type', completed: false },
];

export default function WelcomeDashboardPage() {
  const user = useAuthStore.getState().user;
  const completedSteps = nextSteps.filter((step) => step.completed).length;
  const progress = (completedSteps / nextSteps.length) * 100;

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
              <div className="flex items-center justify-center mb-4">
                <div className="flex items-center justify-center w-16 h-16 bg-green-100 dark:bg-green-900 rounded-full">
                  <CheckCircle2 className="h-8 w-8 text-green-600 dark:text-green-400" />
                </div>
              </div>
              <h1 className="heading-2xl font-heading text-forest-900 dark:text-forest-50 mb-2">
                Welcome, {user?.firstName || 'User'}!
              </h1>
              <p className="body-md text-forest-600 dark:text-forest-400">
                Your account has been created successfully. Let's get you started.
              </p>
            </div>

            {/* Progress Card */}
            <div className="bg-white dark:bg-forest-800 rounded-xl shadow-sm border border-border-default p-8 mb-8">
              <div className="flex items-center justify-between mb-4">
                <h2 className="heading-lg text-forest-900 dark:text-forest-50">Profile Completion</h2>
                <span className="body-md font-medium text-forest-600 dark:text-forest-400">
                  {completedSteps}/{nextSteps.length} completed
                </span>
              </div>
              <div className="w-full bg-forest-100 dark:bg-forest-700 rounded-full h-3 mb-6">
                <div
                  className="bg-forest-900 dark:bg-forest-50 h-3 rounded-full transition-all duration-500"
                  style={{ width: `${progress}%` }}
                />
              </div>
              <div className="space-y-3">
                {nextSteps.map((step, index) => (
                  <div key={index} className="flex items-center">
                    {step.completed ? (
                      <CheckCircle2 className="h-5 w-5 text-green-600 dark:text-green-400 mr-3" />
                    ) : (
                      <div className="h-5 w-5 rounded-full border-2 border-border-default mr-3" />
                    )}
                    <span
                      className={`body-md ${
                        step.completed
                          ? 'text-forest-900 dark:text-forest-50 line-through'
                          : 'text-forest-600 dark:text-forest-400'
                      }`}
                    >
                      {step.title}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Quick Actions */}
            <div className="mb-8">
              <h2 className="heading-lg text-forest-900 dark:text-forest-50 mb-4">Quick Actions</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                {quickActions.map((action, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                  >
                    <Link
                      href={action.href}
                      className="block bg-white dark:bg-forest-800 rounded-xl shadow-sm border border-border-default p-6 hover:border-forest-300 dark:hover:border-forest-700 transition-colors"
                    >
                      <div className={`flex items-center justify-center w-12 h-12 ${action.color} rounded-lg mb-4`}>
                        <action.icon className={`h-6 w-6 ${action.iconColor}`} />
                      </div>
                      <h3 className="heading-md text-forest-900 dark:text-forest-50 mb-1">{action.title}</h3>
                      <p className="body-sm text-forest-600 dark:text-forest-400">{action.description}</p>
                    </Link>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Getting Started Guide */}
            <div className="bg-white dark:bg-forest-800 rounded-xl shadow-sm border border-border-default p-8">
              <div className="flex items-center mb-6">
                <TrendingUp className="h-6 w-6 text-forest-600 dark:text-forest-400 mr-3" />
                <h2 className="heading-lg text-forest-900 dark:text-forest-50">Getting Started Guide</h2>
              </div>
              <div className="space-y-4">
                <div className="flex items-start">
                  <div className="flex items-center justify-center w-8 h-8 bg-forest-100 dark:bg-forest-700 rounded-full flex-shrink-0 mr-4">
                    <span className="body-sm font-medium text-forest-900 dark:text-forest-50">1</span>
                  </div>
                  <div>
                    <h3 className="heading-md text-forest-900 dark:text-forest-50 mb-1">Complete your profile</h3>
                    <p className="body-sm text-forest-600 dark:text-forest-400">
                      Add your personal information, address, and emergency contact details to personalize your experience.
                    </p>
                  </div>
                </div>
                <div className="flex items-start">
                  <div className="flex items-center justify-center w-8 h-8 bg-forest-100 dark:bg-forest-700 rounded-full flex-shrink-0 mr-4">
                    <span className="body-sm font-medium text-forest-900 dark:text-forest-50">2</span>
                  </div>
                  <div>
                    <h3 className="heading-md text-forest-900 dark:text-forest-50 mb-1">Verify your identity</h3>
                    <p className="body-sm text-forest-600 dark:text-forest-400">
                      Upload your government ID and selfie to unlock all features and increase your account security.
                    </p>
                  </div>
                </div>
                <div className="flex items-start">
                  <div className="flex items-center justify-center w-8 h-8 bg-forest-100 dark:bg-forest-700 rounded-full flex-shrink-0 mr-4">
                    <span className="body-sm font-medium text-forest-900 dark:text-forest-50">3</span>
                  </div>
                  <div>
                    <h3 className="heading-md text-forest-900 dark:text-forest-50 mb-1">Select your account type</h3>
                    <p className="body-sm text-forest-600 dark:text-forest-400">
                      Choose between Buyer, Tenant, Landlord, Agent, or Developer to get personalized recommendations.
                    </p>
                  </div>
                </div>
                <div className="flex items-start">
                  <div className="flex items-center justify-center w-8 h-8 bg-forest-100 dark:bg-forest-700 rounded-full flex-shrink-0 mr-4">
                    <span className="body-sm font-medium text-forest-900 dark:text-forest-50">4</span>
                  </div>
                  <div>
                    <h3 className="heading-md text-forest-900 dark:text-forest-50 mb-1">Start exploring properties</h3>
                    <p className="body-sm text-forest-600 dark:text-forest-400">
                      Use our advanced search filters to find properties that match your criteria and schedule inspections.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* CTA Button */}
            <div className="mt-8 text-center">
              <Link
                href="/search"
                className="inline-flex items-center justify-center px-8 py-4 bg-forest-900 text-white rounded-lg hover:bg-forest-800 transition-colors body-lg font-medium"
              >
                Start Searching
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </div>
          </motion.div>
        </div>
      </div>
    </ProtectedRoute>
  );
}
