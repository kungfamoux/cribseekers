'use client';

export const dynamic = 'force-dynamic';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { motion } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';
import { User, AlertCircle, Camera, ArrowRight } from 'lucide-react';
import { ProtectedRoute } from '@/components/shared';
import { apiClient } from '@/services/api/axios';
import { API_ENDPOINTS } from '@/services/api/endpoints';
import { useAuthStore } from '@/store/auth.store';
import { toast } from 'sonner';

const profileSchema = z.object({
  firstName: z.string().min(2, 'First name must be at least 2 characters'),
  lastName: z.string().min(2, 'Last name must be at least 2 characters'),
  phone: z.string().min(11, 'Phone number must be at least 11 characters'),
  dateOfBirth: z.string().refine((val) => {
    const date = new Date(val);
    const today = new Date();
    const age = today.getFullYear() - date.getFullYear();
    return age >= 18;
  }, 'You must be at least 18 years old'),
  gender: z.enum(['male', 'female', 'other'], { required_error: 'Please select your gender' }),
  occupation: z.string().min(2, 'Occupation must be at least 2 characters'),
  address: z.string().min(5, 'Address must be at least 5 characters'),
  state: z.string().min(2, 'State is required'),
  lga: z.string().min(2, 'LGA is required'),
  emergencyContactName: z.string().min(2, 'Emergency contact name is required'),
  emergencyContactPhone: z.string().min(11, 'Emergency contact phone must be at least 11 characters'),
  emergencyContactRelationship: z.string().min(2, 'Relationship is required'),
});

type ProfileFormData = z.infer<typeof profileSchema>;

const nigerianStates = [
  'Abia', 'Adamawa', 'Akwa Ibom', 'Anambra', 'Bauchi', 'Bayelsa', 'Benue', 'Borno',
  'Cross River', 'Delta', 'Ebonyi', 'Edo', 'Ekiti', 'Enugu', 'Gombe', 'Imo', 'Jigawa',
  'Kaduna', 'Kano', 'Katsina', 'Kebbi', 'Kogi', 'Kwara', 'Lagos', 'Nasarawa', 'Niger',
  'Ogun', 'Ondo', 'Osun', 'Oyo', 'Plateau', 'Rivers', 'Sokoto', 'Taraba', 'Yobe', 'Zamfara',
  'FCT',
];

export default function CompleteProfilePage() {
  const [avatarPreview, setAvatarPreview] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const user = useAuthStore.getState().user;

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<ProfileFormData>({
    resolver: zodResolver(profileSchema),
    defaultValues: {
      firstName: user?.firstName || '',
      lastName: user?.lastName || '',
    },
  });

  const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setAvatarPreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const onSubmit = async (data: ProfileFormData) => {
    setIsLoading(true);
    try {
      await apiClient.put(API_ENDPOINTS.UPDATE_PROFILE, data);
      toast.success('Profile updated successfully!', {
        description: 'Your profile has been completed',
      });
      window.location.href = '/identity-verification';
    } catch (error: unknown) {
      const message = error instanceof Error ? error.message : 'An error occurred';
      toast.error('Failed to update profile', {
        description: message || 'An error occurred',
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <ProtectedRoute>
      <div className="min-h-screen bg-gradient-to-br from-forest-50 to-forest-100 dark:from-forest-950 dark:to-forest-900 py-12">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="max-w-4xl mx-auto"
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
              <h1 className="heading-2xl font-heading text-forest-900 dark:text-forest-50 mb-2">
                Complete your profile
              </h1>
              <p className="body-md text-forest-600 dark:text-forest-400">
                Tell us more about yourself to personalize your experience
              </p>
            </div>

            {/* Profile Form */}
            <div className="bg-white dark:bg-forest-800 rounded-xl shadow-sm border border-border-default p-8">
              {/* Avatar Upload */}
              <div className="flex flex-col items-center mb-8">
                <div className="relative">
                  <div className="w-32 h-32 rounded-full bg-forest-100 dark:bg-forest-700 flex items-center justify-center overflow-hidden border-4 border-white dark:border-forest-600 shadow-sm">
                    {avatarPreview ? (
                      <img src={avatarPreview} alt="Avatar" className="w-full h-full object-cover" />
                    ) : (
                      <User className="h-16 w-16 text-forest-400" />
                    )}
                  </div>
                  <label htmlFor="avatar" className="absolute bottom-0 right-0 flex items-center justify-center w-10 h-10 bg-forest-900 text-white rounded-full cursor-pointer hover:bg-forest-800 transition-colors">
                    <Camera className="h-5 w-5" />
                  </label>
                  <input
                    type="file"
                    id="avatar"
                    accept="image/*"
                    onChange={handleAvatarChange}
                    className="hidden"
                  />
                </div>
                <p className="body-sm text-forest-600 dark:text-forest-400 mt-2">Upload your profile photo</p>
              </div>

              <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                {/* Name Fields */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="firstName" className="block body-sm font-medium text-forest-900 dark:text-forest-50 mb-2">
                      First Name
                    </label>
                    <input
                      {...register('firstName')}
                      type="text"
                      id="firstName"
                      className={`block w-full px-3 py-3 border rounded-lg body-md transition-colors ${
                        errors.firstName
                          ? 'border-red-500 focus:ring-red-500 focus:border-red-500'
                          : 'border-border-default focus:ring-forest-500 focus:border-forest-500'
                      } bg-white dark:bg-forest-700 text-forest-900 dark:text-forest-50 placeholder-forest-400`}
                      placeholder="John"
                    />
                    {errors.firstName && (
                      <p className="mt-1 body-sm text-red-500 flex items-center">
                        <AlertCircle className="h-4 w-4 mr-1" />
                        {errors.firstName.message}
                      </p>
                    )}
                  </div>

                  <div>
                    <label htmlFor="lastName" className="block body-sm font-medium text-forest-900 dark:text-forest-50 mb-2">
                      Last Name
                    </label>
                    <input
                      {...register('lastName')}
                      type="text"
                      id="lastName"
                      className={`block w-full px-3 py-3 border rounded-lg body-md transition-colors ${
                        errors.lastName
                          ? 'border-red-500 focus:ring-red-500 focus:border-red-500'
                          : 'border-border-default focus:ring-forest-500 focus:border-forest-500'
                      } bg-white dark:bg-forest-700 text-forest-900 dark:text-forest-50 placeholder-forest-400`}
                      placeholder="Doe"
                    />
                    {errors.lastName && (
                      <p className="mt-1 body-sm text-red-500 flex items-center">
                        <AlertCircle className="h-4 w-4 mr-1" />
                        {errors.lastName.message}
                      </p>
                    )}
                  </div>
                </div>

                {/* Phone & Date of Birth */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="phone" className="block body-sm font-medium text-forest-900 dark:text-forest-50 mb-2">
                      Phone Number
                    </label>
                    <input
                      {...register('phone')}
                      type="tel"
                      id="phone"
                      className={`block w-full px-3 py-3 border rounded-lg body-md transition-colors ${
                        errors.phone
                          ? 'border-red-500 focus:ring-red-500 focus:border-red-500'
                          : 'border-border-default focus:ring-forest-500 focus:border-forest-500'
                      } bg-white dark:bg-forest-700 text-forest-900 dark:text-forest-50 placeholder-forest-400`}
                      placeholder="+234 800 123 4567"
                    />
                    {errors.phone && (
                      <p className="mt-1 body-sm text-red-500 flex items-center">
                        <AlertCircle className="h-4 w-4 mr-1" />
                        {errors.phone.message}
                      </p>
                    )}
                  </div>

                  <div>
                    <label htmlFor="dateOfBirth" className="block body-sm font-medium text-forest-900 dark:text-forest-50 mb-2">
                      Date of Birth
                    </label>
                    <input
                      {...register('dateOfBirth')}
                      type="date"
                      id="dateOfBirth"
                      className={`block w-full px-3 py-3 border rounded-lg body-md transition-colors ${
                        errors.dateOfBirth
                          ? 'border-red-500 focus:ring-red-500 focus:border-red-500'
                          : 'border-border-default focus:ring-forest-500 focus:border-forest-500'
                      } bg-white dark:bg-forest-700 text-forest-900 dark:text-forest-50`}
                    />
                    {errors.dateOfBirth && (
                      <p className="mt-1 body-sm text-red-500 flex items-center">
                        <AlertCircle className="h-4 w-4 mr-1" />
                        {errors.dateOfBirth.message}
                      </p>
                    )}
                  </div>
                </div>

                {/* Gender & Occupation */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="gender" className="block body-sm font-medium text-forest-900 dark:text-forest-50 mb-2">
                      Gender
                    </label>
                    <select
                      {...register('gender')}
                      id="gender"
                      className={`block w-full px-3 py-3 border rounded-lg body-md transition-colors ${
                        errors.gender
                          ? 'border-red-500 focus:ring-red-500 focus:border-red-500'
                          : 'border-border-default focus:ring-forest-500 focus:border-forest-500'
                      } bg-white dark:bg-forest-700 text-forest-900 dark:text-forest-50`}
                    >
                      <option value="">Select gender</option>
                      <option value="male">Male</option>
                      <option value="female">Female</option>
                      <option value="other">Other</option>
                    </select>
                    {errors.gender && (
                      <p className="mt-1 body-sm text-red-500 flex items-center">
                        <AlertCircle className="h-4 w-4 mr-1" />
                        {errors.gender.message}
                      </p>
                    )}
                  </div>

                  <div>
                    <label htmlFor="occupation" className="block body-sm font-medium text-forest-900 dark:text-forest-50 mb-2">
                      Occupation
                    </label>
                    <input
                      {...register('occupation')}
                      type="text"
                      id="occupation"
                      className={`block w-full px-3 py-3 border rounded-lg body-md transition-colors ${
                        errors.occupation
                          ? 'border-red-500 focus:ring-red-500 focus:border-red-500'
                          : 'border-border-default focus:ring-forest-500 focus:border-forest-500'
                      } bg-white dark:bg-forest-700 text-forest-900 dark:text-forest-50 placeholder-forest-400`}
                      placeholder="Software Engineer"
                    />
                    {errors.occupation && (
                      <p className="mt-1 body-sm text-red-500 flex items-center">
                        <AlertCircle className="h-4 w-4 mr-1" />
                        {errors.occupation.message}
                      </p>
                    )}
                  </div>
                </div>

                {/* Address */}
                <div>
                  <label htmlFor="address" className="block body-sm font-medium text-forest-900 dark:text-forest-50 mb-2">
                    Address
                  </label>
                  <input
                    {...register('address')}
                    type="text"
                    id="address"
                    className={`block w-full px-3 py-3 border rounded-lg body-md transition-colors ${
                      errors.address
                        ? 'border-red-500 focus:ring-red-500 focus:border-red-500'
                        : 'border-border-default focus:ring-forest-500 focus:border-forest-500'
                    } bg-white dark:bg-forest-700 text-forest-900 dark:text-forest-50 placeholder-forest-400`}
                    placeholder="123 Main Street, Ikeja"
                  />
                  {errors.address && (
                    <p className="mt-1 body-sm text-red-500 flex items-center">
                      <AlertCircle className="h-4 w-4 mr-1" />
                      {errors.address.message}
                    </p>
                  )}
                </div>

                {/* State & LGA */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="state" className="block body-sm font-medium text-forest-900 dark:text-forest-50 mb-2">
                      State
                    </label>
                    <select
                      {...register('state')}
                      id="state"
                      className={`block w-full px-3 py-3 border rounded-lg body-md transition-colors ${
                        errors.state
                          ? 'border-red-500 focus:ring-red-500 focus:border-red-500'
                          : 'border-border-default focus:ring-forest-500 focus:border-forest-500'
                      } bg-white dark:bg-forest-700 text-forest-900 dark:text-forest-50`}
                    >
                      <option value="">Select state</option>
                      {nigerianStates.map((state) => (
                        <option key={state} value={state}>
                          {state}
                        </option>
                      ))}
                    </select>
                    {errors.state && (
                      <p className="mt-1 body-sm text-red-500 flex items-center">
                        <AlertCircle className="h-4 w-4 mr-1" />
                        {errors.state.message}
                      </p>
                    )}
                  </div>

                  <div>
                    <label htmlFor="lga" className="block body-sm font-medium text-forest-900 dark:text-forest-50 mb-2">
                      LGA
                    </label>
                    <input
                      {...register('lga')}
                      type="text"
                      id="lga"
                      className={`block w-full px-3 py-3 border rounded-lg body-md transition-colors ${
                        errors.lga
                          ? 'border-red-500 focus:ring-red-500 focus:border-red-500'
                          : 'border-border-default focus:ring-forest-500 focus:border-forest-500'
                      } bg-white dark:bg-forest-700 text-forest-900 dark:text-forest-50 placeholder-forest-400`}
                      placeholder="Ikeja"
                    />
                    {errors.lga && (
                      <p className="mt-1 body-sm text-red-500 flex items-center">
                        <AlertCircle className="h-4 w-4 mr-1" />
                        {errors.lga.message}
                      </p>
                    )}
                  </div>
                </div>

                {/* Emergency Contact */}
                <div className="border-t border-border-default pt-6">
                  <h3 className="heading-md text-forest-900 dark:text-forest-50 mb-4">Emergency Contact</h3>
                  
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                      <label htmlFor="emergencyContactName" className="block body-sm font-medium text-forest-900 dark:text-forest-50 mb-2">
                        Name
                      </label>
                      <input
                        {...register('emergencyContactName')}
                        type="text"
                        id="emergencyContactName"
                        className={`block w-full px-3 py-3 border rounded-lg body-md transition-colors ${
                          errors.emergencyContactName
                            ? 'border-red-500 focus:ring-red-500 focus:border-red-500'
                            : 'border-border-default focus:ring-forest-500 focus:border-forest-500'
                        } bg-white dark:bg-forest-700 text-forest-900 dark:text-forest-50 placeholder-forest-400`}
                        placeholder="Jane Doe"
                      />
                      {errors.emergencyContactName && (
                        <p className="mt-1 body-sm text-red-500 flex items-center">
                          <AlertCircle className="h-4 w-4 mr-1" />
                          {errors.emergencyContactName.message}
                        </p>
                      )}
                    </div>

                    <div>
                      <label htmlFor="emergencyContactPhone" className="block body-sm font-medium text-forest-900 dark:text-forest-50 mb-2">
                        Phone
                      </label>
                      <input
                        {...register('emergencyContactPhone')}
                        type="tel"
                        id="emergencyContactPhone"
                        className={`block w-full px-3 py-3 border rounded-lg body-md transition-colors ${
                          errors.emergencyContactPhone
                            ? 'border-red-500 focus:ring-red-500 focus:border-red-500'
                            : 'border-border-default focus:ring-forest-500 focus:border-forest-500'
                        } bg-white dark:bg-forest-700 text-forest-900 dark:text-forest-50 placeholder-forest-400`}
                        placeholder="+234 800 123 4567"
                      />
                      {errors.emergencyContactPhone && (
                        <p className="mt-1 body-sm text-red-500 flex items-center">
                          <AlertCircle className="h-4 w-4 mr-1" />
                          {errors.emergencyContactPhone.message}
                        </p>
                      )}
                    </div>

                    <div>
                      <label htmlFor="emergencyContactRelationship" className="block body-sm font-medium text-forest-900 dark:text-forest-50 mb-2">
                        Relationship
                      </label>
                      <input
                        {...register('emergencyContactRelationship')}
                        type="text"
                        id="emergencyContactRelationship"
                        className={`block w-full px-3 py-3 border rounded-lg body-md transition-colors ${
                          errors.emergencyContactRelationship
                            ? 'border-red-500 focus:ring-red-500 focus:border-red-500'
                            : 'border-border-default focus:ring-forest-500 focus:border-forest-500'
                        } bg-white dark:bg-forest-700 text-forest-900 dark:text-forest-50 placeholder-forest-400`}
                        placeholder="Spouse"
                      />
                      {errors.emergencyContactRelationship && (
                        <p className="mt-1 body-sm text-red-500 flex items-center">
                          <AlertCircle className="h-4 w-4 mr-1" />
                          {errors.emergencyContactRelationship.message}
                        </p>
                      )}
                    </div>
                  </div>
                </div>

                {/* Submit Button */}
                <div className="flex items-center justify-between pt-6">
                  <Link
                    href="/select-account-type"
                    className="body-md text-forest-600 dark:text-forest-400 hover:text-forest-900 dark:hover:text-forest-50 transition-colors"
                  >
                    Back
                  </Link>
                  <button
                    type="submit"
                    disabled={isLoading || isSubmitting}
                    className="flex items-center justify-center px-8 py-3 bg-forest-900 text-white rounded-lg hover:bg-forest-800 transition-colors body-md font-medium disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isLoading || isSubmitting ? (
                      <>
                        <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2" />
                        Saving...
                      </>
                    ) : (
                      <>
                        Continue
                        <ArrowRight className="ml-2 h-5 w-5" />
                      </>
                    )}
                  </button>
                </div>
              </form>
            </div>

            {/* Skip Button */}
            <div className="mt-6 text-center">
              <Link
                href="/identity-verification"
                className="inline-flex items-center text-forest-600 dark:text-forest-400 hover:text-forest-900 dark:hover:text-forest-50 transition-colors body-md"
              >
                Skip for now
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </div>
          </motion.div>
        </div>
      </div>
    </ProtectedRoute>
  );
}
