'use client';

export const dynamic = 'force-dynamic';

import { useState } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';
import { Home, User, Building2, Briefcase, Building, ArrowRight, CheckCircle2 } from 'lucide-react';
import { ProtectedRoute } from '@/components/shared';
import { useAuthStore } from '@/store/auth.store';
import { toast } from 'sonner';

const accountTypes = [
  {
    id: 'buyer',
    name: 'Buyer',
    description: 'Looking to purchase a property',
    icon: Home,
    color: 'bg-blue-100 dark:bg-blue-900',
    iconColor: 'text-blue-600 dark:text-blue-400',
  },
  {
    id: 'tenant',
    name: 'Tenant',
    description: 'Looking to rent a property',
    icon: User,
    color: 'bg-green-100 dark:bg-green-900',
    iconColor: 'text-green-600 dark:text-green-400',
  },
  {
    id: 'landlord',
    name: 'Landlord',
    description: 'Own properties to rent or sell',
    icon: Building2,
    color: 'bg-purple-100 dark:bg-purple-900',
    iconColor: 'text-purple-600 dark:text-purple-400',
  },
  {
    id: 'agent',
    name: 'Agent',
    description: 'Real estate professional',
    icon: Briefcase,
    color: 'bg-orange-100 dark:bg-orange-900',
    iconColor: 'text-orange-600 dark:text-orange-400',
  },
  {
    id: 'developer',
    name: 'Developer',
    description: 'Property development company',
    icon: Building,
    color: 'bg-red-100 dark:bg-red-900',
    iconColor: 'text-red-600 dark:text-red-400',
  },
];

export default function SelectAccountTypePage() {
  const [selectedType, setSelectedType] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const { setAuth } = useAuthStore();

  const handleSelect = async (type: string) => {
    setSelectedType(type);
    setIsLoading(true);

    try {
      // Update user account type
      const user = useAuthStore.getState().user;
      if (user) {
        const updatedUser = { ...user, accountType: type };
        setAuth(updatedUser, useAuthStore.getState().accessToken!, useAuthStore.getState().refreshToken!);
      }

      toast.success('Account type selected!', {
        description: `You selected ${type} account`,
      });

      // Navigate to complete profile
      setTimeout(() => {
        window.location.href = '/complete-profile';
      }, 500);
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
          className="w-full max-w-4xl"
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
              Select your account type
            </h1>
            <p className="body-md text-forest-600 dark:text-forest-400">
              Choose the account type that best describes you
            </p>
          </div>

          {/* Account Types Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {accountTypes.map((type, index) => (
              <motion.div
                key={type.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                onClick={() => !isLoading && handleSelect(type.id)}
                className={`cursor-pointer bg-white dark:bg-forest-800 rounded-xl shadow-sm border-2 transition-all ${
                  selectedType === type.id
                    ? 'border-forest-900 dark:border-forest-50'
                    : 'border-border-default hover:border-forest-300 dark:hover:border-forest-700'
                }`}
              >
                <div className="p-6">
                  <div className={`flex items-center justify-center w-16 h-16 ${type.color} rounded-lg mb-4`}>
                    <type.icon className={`h-8 w-8 ${type.iconColor}`} />
                  </div>
                  <h3 className="heading-lg text-forest-900 dark:text-forest-50 mb-2">{type.name}</h3>
                  <p className="body-sm text-forest-600 dark:text-forest-400">{type.description}</p>
                  {selectedType === type.id && (
                    <div className="mt-4 flex items-center text-forest-900 dark:text-forest-50">
                      <CheckCircle2 className="h-5 w-5 mr-2" />
                      <span className="body-sm font-medium">Selected</span>
                    </div>
                  )}
                </div>
              </motion.div>
            ))}
          </div>

          {/* Help Text */}
          <div className="mt-8 text-center">
            <p className="body-sm text-forest-600 dark:text-forest-400">
              You can change your account type later in your profile settings
            </p>
          </div>

          {/* Skip Button */}
          <div className="mt-6 text-center">
            <Link
              href="/complete-profile"
              className="inline-flex items-center text-forest-600 dark:text-forest-400 hover:text-forest-900 dark:hover:text-forest-50 transition-colors body-md"
            >
              Skip for now
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </div>
        </motion.div>
      </div>
    </ProtectedRoute>
  );
}
