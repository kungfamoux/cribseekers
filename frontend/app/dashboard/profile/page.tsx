'use client';

export const dynamic = 'force-dynamic';

import { useState, useEffect } from 'react';
import { DashboardLayout } from '@/components/dashboard';
import { User, Mail, Phone, MapPin, Calendar, Briefcase, Camera, Edit2, CheckCircle, AlertCircle, Clock, Loader2 } from 'lucide-react';
import { useAuthStore } from '@/store/auth.store';
import { useMe, useUpdateProfile, useUploadAvatar } from '@/hooks/useUser';

export default function ProfilePage() {
  const [isEditing, setIsEditing] = useState(false);
  const [profileForm, setProfileForm] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    dateOfBirth: '',
    gender: '',
    occupation: '',
    address: '',
    state: '',
    lga: '',
    emergencyContactName: '',
    emergencyContactPhone: '',
    emergencyContactRelationship: '',
  });
  
  const { data: userData, isLoading } = useMe();
  const updateProfile = useUpdateProfile();
  const uploadAvatar = useUploadAvatar();
  
  const user = userData?.data || useAuthStore.getState().user;
  
  // Initialize form with user data
  useEffect(() => {
    if (user) {
      setProfileForm({
        firstName: user.firstName || '',
        lastName: user.lastName || '',
        email: user.email || '',
        phone: user.phone || '',
        dateOfBirth: user.dateOfBirth || '',
        gender: user.gender || '',
        occupation: user.occupation || '',
        address: user.address || '',
        state: user.state || '',
        lga: user.lga || '',
        emergencyContactName: '',
        emergencyContactPhone: '',
        emergencyContactRelationship: '',
      });
    }
  }, [user]);

  const verificationStatus = {
    email: { status: user?.emailVerified ? 'verified' : 'not_verified', icon: user?.emailVerified ? CheckCircle : AlertCircle, color: user?.emailVerified ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400' },
    phone: { status: user?.phoneVerified ? 'verified' : 'not_verified', icon: user?.phoneVerified ? CheckCircle : AlertCircle, color: user?.phoneVerified ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400' },
    identity: { status: user?.identityVerified ? 'verified' : 'pending', icon: user?.identityVerified ? CheckCircle : Clock, color: user?.identityVerified ? 'text-green-600 dark:text-green-400' : 'text-yellow-600 dark:text-yellow-400' },
    address: { status: user?.addressVerified ? 'verified' : 'not_verified', icon: user?.addressVerified ? CheckCircle : AlertCircle, color: user?.addressVerified ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400' },
  };

  const handleSave = async () => {
    try {
      await updateProfile.mutateAsync(profileForm);
      setIsEditing(false);
    } catch {
      // Error handled by hook
    }
  };

  const handleAvatarUpload = () => {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = 'image/*';
    input.onchange = async (e) => {
      const file = (e.target as HTMLInputElement).files?.[0];
      if (file) {
        try {
          await uploadAvatar.mutateAsync(file);
        } catch {
          // Error handled by hook
        }
      }
    };
    input.click();
  };
  
  if (isLoading) {
    return (
      <DashboardLayout>
        <div className="flex items-center justify-center py-20">
          <Loader2 className="w-8 h-8 animate-spin text-forest-600" />
        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="heading-2xl text-forest-900 dark:text-forest-50 mb-2">Profile</h1>
            <p className="body-md text-forest-600 dark:text-forest-400">
              Manage your personal information and verification status
            </p>
          </div>
          {!isEditing && (
            <button
              onClick={() => setIsEditing(true)}
              className="flex items-center px-4 py-2 bg-forest-900 text-white rounded-lg hover:bg-forest-800 transition-colors body-md font-medium"
            >
              <Edit2 className="h-4 w-4 mr-2" />
              Edit Profile
            </button>
          )}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Profile Card */}
          <div className="lg:col-span-1">
            <div className="bg-white dark:bg-forest-800 rounded-xl border border-border-default p-6">
              <div className="flex flex-col items-center text-center mb-6">
                <div className="relative mb-4">
                  <div className="w-32 h-32 bg-forest-100 dark:bg-forest-700 rounded-full flex items-center justify-center">
                    <User className="h-16 w-16 text-forest-400" />
                  </div>
                  <button
                    onClick={handleAvatarUpload}
                    className="absolute bottom-0 right-0 flex items-center justify-center w-10 h-10 bg-forest-900 text-white rounded-full hover:bg-forest-800 transition-colors"
                  >
                    <Camera className="h-5 w-5" />
                  </button>
                </div>
                <h2 className="heading-lg text-forest-900 dark:text-forest-50 mb-1">
                  {profileForm.firstName} {profileForm.lastName}
                </h2>
                <p className="body-sm text-forest-600 dark:text-forest-400 mb-2">{profileForm.email}</p>
                <div className="flex items-center justify-center space-x-2">
                  <span className="px-3 py-1 bg-forest-100 dark:bg-forest-700 text-forest-900 dark:text-forest-50 text-xs rounded-full">
                    Buyer
                  </span>
                  <span className="px-3 py-1 bg-green-100 dark:bg-green-900 text-green-600 dark:text-green-400 text-xs rounded-full">
                    Verified
                  </span>
                </div>
              </div>

              {/* Verification Status */}
              <div className="border-t border-border-default pt-6">
                <h3 className="heading-md text-forest-900 dark:text-forest-50 mb-4">Verification Status</h3>
                <div className="space-y-3">
                  {Object.entries(verificationStatus).map(([key, value]) => (
                    <div key={key} className="flex items-center justify-between">
                      <div className="flex items-center">
                        <value.icon className={`h-4 w-4 mr-2 ${value.color}`} />
                        <span className="body-sm text-forest-900 dark:text-forest-50 capitalize">
                          {key}
                        </span>
                      </div>
                      <span className={`body-xs capitalize ${value.color}`}>
                        {value.status.replace('_', ' ')}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Profile Completion */}
              <div className="border-t border-border-default pt-6 mt-6">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="heading-md text-forest-900 dark:text-forest-50">Profile Completion</h3>
                  <span className="body-sm text-forest-600 dark:text-forest-400">75%</span>
                </div>
                <div className="w-full bg-forest-100 dark:bg-forest-700 rounded-full h-2">
                  <div className="bg-forest-900 dark:bg-forest-50 h-2 rounded-full" style={{ width: '75%' }} />
                </div>
                <p className="body-xs text-forest-500 dark:text-forest-500 mt-2">
                  Complete your profile to unlock all features
                </p>
              </div>
            </div>
          </div>

          {/* Profile Details */}
          <div className="lg:col-span-2">
            <div className="bg-white dark:bg-forest-800 rounded-xl border border-border-default p-6">
              <h3 className="heading-lg text-forest-900 dark:text-forest-50 mb-6">Personal Information</h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* First Name */}
                <div>
                  <label className="block body-sm font-medium text-forest-900 dark:text-forest-50 mb-2">
                    First Name
                  </label>
                  <div className="relative">
                    <User className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-forest-400" />
                    <input
                      type="text"
                      defaultValue={profileForm.firstName}
                      disabled={!isEditing}
                      className="w-full pl-10 pr-4 py-2 bg-surface-secondary border border-border-default rounded-lg body-md focus:outline-none focus:ring-2 focus:ring-forest-500 disabled:opacity-50 disabled:cursor-not-allowed text-forest-900 dark:text-forest-50"
                    />
                  </div>
                </div>

                {/* Last Name */}
                <div>
                  <label className="block body-sm font-medium text-forest-900 dark:text-forest-50 mb-2">
                    Last Name
                  </label>
                  <div className="relative">
                    <User className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-forest-400" />
                    <input
                      type="text"
                      defaultValue={profileForm.lastName}
                      disabled={!isEditing}
                      className="w-full pl-10 pr-4 py-2 bg-surface-secondary border border-border-default rounded-lg body-md focus:outline-none focus:ring-2 focus:ring-forest-500 disabled:opacity-50 disabled:cursor-not-allowed text-forest-900 dark:text-forest-50"
                    />
                  </div>
                </div>

                {/* Email */}
                <div>
                  <label className="block body-sm font-medium text-forest-900 dark:text-forest-50 mb-2">
                    Email
                  </label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-forest-400" />
                    <input
                      type="email"
                      defaultValue={profileForm.email}
                      disabled
                      className="w-full pl-10 pr-4 py-2 bg-surface-secondary border border-border-default rounded-lg body-md focus:outline-none focus:ring-2 focus:ring-forest-500 disabled:opacity-50 disabled:cursor-not-allowed text-forest-900 dark:text-forest-50"
                    />
                  </div>
                </div>

                {/* Phone */}
                <div>
                  <label className="block body-sm font-medium text-forest-900 dark:text-forest-50 mb-2">
                    Phone
                  </label>
                  <div className="relative">
                    <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-forest-400" />
                    <input
                      type="tel"
                      defaultValue={profileForm.phone}
                      disabled={!isEditing}
                      className="w-full pl-10 pr-4 py-2 bg-surface-secondary border border-border-default rounded-lg body-md focus:outline-none focus:ring-2 focus:ring-forest-500 disabled:opacity-50 disabled:cursor-not-allowed text-forest-900 dark:text-forest-50"
                    />
                  </div>
                </div>

                {/* Date of Birth */}
                <div>
                  <label className="block body-sm font-medium text-forest-900 dark:text-forest-50 mb-2">
                    Date of Birth
                  </label>
                  <div className="relative">
                    <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-forest-400" />
                    <input
                      type="date"
                      defaultValue={profileForm.dateOfBirth}
                      disabled={!isEditing}
                      className="w-full pl-10 pr-4 py-2 bg-surface-secondary border border-border-default rounded-lg body-md focus:outline-none focus:ring-2 focus:ring-forest-500 disabled:opacity-50 disabled:cursor-not-allowed text-forest-900 dark:text-forest-50"
                    />
                  </div>
                </div>

                {/* Occupation */}
                <div>
                  <label className="block body-sm font-medium text-forest-900 dark:text-forest-50 mb-2">
                    Occupation
                  </label>
                  <div className="relative">
                    <Briefcase className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-forest-400" />
                    <input
                      type="text"
                      defaultValue={profileForm.occupation}
                      disabled={!isEditing}
                      className="w-full pl-10 pr-4 py-2 bg-surface-secondary border border-border-default rounded-lg body-md focus:outline-none focus:ring-2 focus:ring-forest-500 disabled:opacity-50 disabled:cursor-not-allowed text-forest-900 dark:text-forest-50"
                    />
                  </div>
                </div>

                {/* Address */}
                <div className="md:col-span-2">
                  <label className="block body-sm font-medium text-forest-900 dark:text-forest-50 mb-2">
                    Address
                  </label>
                  <div className="relative">
                    <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-forest-400" />
                    <input
                      type="text"
                      defaultValue={profileForm.address}
                      disabled={!isEditing}
                      className="w-full pl-10 pr-4 py-2 bg-surface-secondary border border-border-default rounded-lg body-md focus:outline-none focus:ring-2 focus:ring-forest-500 disabled:opacity-50 disabled:cursor-not-allowed text-forest-900 dark:text-forest-50"
                    />
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              {isEditing && (
                <div className="flex items-center justify-end space-x-3 mt-6 pt-6 border-t border-border-default">
                  <button
                    onClick={() => setIsEditing(false)}
                    className="px-4 py-2 bg-white dark:bg-forest-700 text-forest-900 dark:text-forest-50 border border-border-default rounded-lg hover:bg-surface-secondary transition-colors body-md font-medium"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleSave}
                    className="px-4 py-2 bg-forest-900 text-white rounded-lg hover:bg-forest-800 transition-colors body-md font-medium"
                  >
                    Save Changes
                  </button>
                </div>
              )}
            </div>

            {/* Emergency Contact */}
            <div className="bg-white dark:bg-forest-800 rounded-xl border border-border-default p-6 mt-6">
              <h3 className="heading-lg text-forest-900 dark:text-forest-50 mb-6">Emergency Contact</h3>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div>
                  <label className="block body-sm font-medium text-forest-900 dark:text-forest-50 mb-2">
                    Name
                  </label>
                  <input
                    type="text"
                    defaultValue={profileForm.emergencyContactName}
                    disabled={!isEditing}
                    className="w-full px-4 py-2 bg-surface-secondary border border-border-default rounded-lg body-md focus:outline-none focus:ring-2 focus:ring-forest-500 disabled:opacity-50 disabled:cursor-not-allowed text-forest-900 dark:text-forest-50"
                  />
                </div>
                <div>
                  <label className="block body-sm font-medium text-forest-900 dark:text-forest-50 mb-2">
                    Phone
                  </label>
                  <input
                    type="tel"
                    defaultValue={profileForm.emergencyContactPhone}
                    disabled={!isEditing}
                    className="w-full px-4 py-2 bg-surface-secondary border border-border-default rounded-lg body-md focus:outline-none focus:ring-2 focus:ring-forest-500 disabled:opacity-50 disabled:cursor-not-allowed text-forest-900 dark:text-forest-50"
                  />
                </div>
                <div>
                  <label className="block body-sm font-medium text-forest-900 dark:text-forest-50 mb-2">
                    Relationship
                  </label>
                  <input
                    type="text"
                    defaultValue={profileForm.emergencyContactRelationship}
                    disabled={!isEditing}
                    className="w-full px-4 py-2 bg-surface-secondary border border-border-default rounded-lg body-md focus:outline-none focus:ring-2 focus:ring-forest-500 disabled:opacity-50 disabled:cursor-not-allowed text-forest-900 dark:text-forest-50"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
