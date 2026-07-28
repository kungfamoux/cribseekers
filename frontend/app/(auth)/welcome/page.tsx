'use client';

export const dynamic = 'force-dynamic';

import { motion } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight, Home, Shield, TrendingUp, Users } from 'lucide-react';
import { GuestRoute } from '@/components/shared';

export default function WelcomePage() {
  const features = [
    {
      icon: Home,
      title: 'Find Your Perfect Property',
      description: 'Browse thousands of verified listings across Nigeria with advanced search filters.',
    },
    {
      icon: Shield,
      title: 'Secure Transactions',
      description: 'Our escrow system ensures your money is safe until you\'re completely satisfied.',
    },
    {
      icon: TrendingUp,
      title: 'AI-Powered Recommendations',
      description: 'Get personalized property suggestions based on your preferences and search history.',
    },
    {
      icon: Users,
      title: 'Verified Listings',
      description: 'Every property is verified by our team to ensure authenticity and accuracy.',
    },
  ];

  return (
    <GuestRoute>
      <div className="min-h-screen bg-gradient-to-br from-forest-50 to-forest-100 dark:from-forest-950 dark:to-forest-900">
        {/* Navbar */}
        <nav className="container mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between">
            <Link href="/" className="flex items-center space-x-2">
              <Image
                src="/logo.png"
                alt="CribSeekers"
                width={80}
                height={80}
                className="h-10 w-10"
              />
              <span className="heading-xl font-heading text-forest-900 dark:text-forest-50">CribSeekers</span>
            </Link>
            <Link
              href="/login"
              className="body-md text-forest-600 dark:text-forest-400 hover:text-forest-900 dark:hover:text-forest-50 transition-colors"
            >
              Sign In
            </Link>
          </div>
        </nav>

        {/* Hero Section */}
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-20">
          <div className="max-w-4xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <h1 className="heading-3xl md:heading-4xl font-heading text-forest-900 dark:text-forest-50 mb-6">
                Welcome to CribSeekers
              </h1>
              <p className="body-lg md:body-xl text-forest-600 dark:text-forest-400 mb-8 max-w-2xl mx-auto">
                Nigeria's premier real estate platform. Find your perfect property with confidence using our secure escrow system and verified listings.
              </p>
            </motion.div>

            {/* CTA Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="flex flex-col sm:flex-row gap-4 justify-center"
            >
              <Link
                href="/signup"
                className="inline-flex items-center justify-center px-8 py-4 bg-forest-900 text-white rounded-lg hover:bg-forest-800 transition-colors body-lg font-medium"
              >
                Get Started
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
              <Link
                href="/login"
                className="inline-flex items-center justify-center px-8 py-4 bg-white dark:bg-forest-800 text-forest-900 dark:text-forest-50 rounded-lg border border-border-default hover:bg-surface-secondary transition-colors body-lg font-medium"
              >
                Sign In
              </Link>
            </motion.div>
          </div>

          {/* Features Grid */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="max-w-6xl mx-auto mt-16 md:mt-24"
          >
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {features.map((feature, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.5 + index * 0.1 }}
                  className="bg-white dark:bg-forest-800 p-6 rounded-xl shadow-sm border border-border-default"
                >
                  <div className="flex items-center justify-center w-12 h-12 bg-forest-100 dark:bg-forest-700 rounded-lg mb-4">
                    <feature.icon className="h-6 w-6 text-forest-900 dark:text-forest-50" />
                  </div>
                  <h3 className="heading-md mb-2 text-forest-900 dark:text-forest-50">{feature.title}</h3>
                  <p className="body-sm text-forest-600 dark:text-forest-400">{feature.description}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Trust Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.8 }}
            className="max-w-4xl mx-auto mt-16 md:mt-24 text-center"
          >
            <div className="bg-white dark:bg-forest-800 p-8 md:p-12 rounded-xl shadow-sm border border-border-default">
              <h2 className="heading-xl font-heading text-forest-900 dark:text-forest-50 mb-4">
                Trusted by thousands of Nigerians
              </h2>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mt-8">
                <div>
                  <p className="heading-2xl text-forest-900 dark:text-forest-50">10K+</p>
                  <p className="body-sm text-forest-600 dark:text-forest-400">Properties Listed</p>
                </div>
                <div>
                  <p className="heading-2xl text-forest-900 dark:text-forest-50">5K+</p>
                  <p className="body-sm text-forest-600 dark:text-forest-400">Happy Users</p>
                </div>
                <div>
                  <p className="heading-2xl text-forest-900 dark:text-forest-50">36</p>
                  <p className="body-sm text-forest-600 dark:text-forest-400">States Covered</p>
                </div>
                <div>
                  <p className="heading-2xl text-forest-900 dark:text-forest-50">₦2B+</p>
                  <p className="body-sm text-forest-600 dark:text-forest-400">Transactions</p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </GuestRoute>
  );
}
