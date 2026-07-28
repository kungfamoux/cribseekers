'use client';

export const dynamic = 'force-dynamic';

import { useState } from 'react';
import { DashboardLayout } from '@/components/dashboard';
import { ArrowLeft, Save, Trash2, Eye, Bell, Lock } from 'lucide-react';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import { toast } from 'sonner';
import { useDeleteProperty } from '@/hooks/useProperty';

export default function PropertySettingsPage() {
  const params = useParams();
  const router = useRouter();
  const propertyId = params.id as string;
  const [isSaving, setIsSaving] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  
  const deleteProperty = useDeleteProperty();

  const handleSave = async () => {
    setIsSaving(true);
    try {
      toast.success('Settings saved successfully', {
        description: 'Your property settings have been updated',
      });
    } catch {
      toast.error('Failed to save settings', {
        description: 'Please try again later',
      });
    } finally {
      setIsSaving(false);
    }
  };

  const handleDelete = async () => {
    try {
      await deleteProperty.mutateAsync(propertyId);
      toast.success('Property deleted successfully', {
        description: 'The property has been removed',
      });
      router.push('/properties/my');
    } catch {
      toast.error('Failed to delete property', {
        description: 'Please try again later',
      });
    }
  };
  

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Link href={`/properties/${propertyId}/edit`}>
              <button className="p-2 hover:bg-surface-secondary dark:hover:bg-forest-700 rounded-lg transition-colors">
                <ArrowLeft className="h-5 w-5 text-forest-600 dark:text-forest-400" />
              </button>
            </Link>
            <div>
              <h1 className="heading-xl text-forest-900 dark:text-forest-50 mb-2">Property Settings</h1>
              <p className="body-md text-forest-600 dark:text-forest-400">
                Manage your property configuration
              </p>
            </div>
          </div>
          <button
            onClick={handleSave}
            disabled={isSaving}
            className="inline-flex items-center px-4 py-2 bg-forest-900 text-white rounded-lg hover:bg-forest-800 transition-colors body-md font-medium disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <Save className="h-4 w-4 mr-2" />
            {isSaving ? 'Saving...' : 'Save Changes'}
          </button>
        </div>

        {/* Settings Sections */}
        <div className="space-y-6">
          {/* Visibility Settings */}
          <div className="bg-white dark:bg-forest-800 rounded-xl border border-border-default p-6">
            <div className="flex items-center gap-3 mb-4">
              <Eye className="h-5 w-5 text-forest-600 dark:text-forest-400" />
              <h2 className="heading-lg text-forest-900 dark:text-forest-50">Visibility</h2>
            </div>
            <div className="space-y-4">
              <div className="flex items-center justify-between p-4 bg-surface-secondary dark:bg-forest-700 rounded-lg">
                <div>
                  <p className="body-md font-medium text-forest-900 dark:text-forest-50">Published Status</p>
                  <p className="body-sm text-forest-600 dark:text-forest-400">Control whether your property is visible to users</p>
                </div>
                <select className="px-4 py-2 border border-border-default rounded-lg bg-surface-primary dark:bg-forest-700 text-forest-900 dark:text-forest-50 focus:outline-none focus:ring-2 focus:ring-forest-500">
                  <option value="published">Published</option>
                  <option value="draft">Draft</option>
                  <option value="archived">Archived</option>
                </select>
              </div>
              <div className="flex items-center justify-between p-4 bg-surface-secondary dark:bg-forest-700 rounded-lg">
                <div>
                  <p className="body-md font-medium text-forest-900 dark:text-forest-50">Featured Listing</p>
                  <p className="body-sm text-forest-600 dark:text-forest-400">Feature your property in search results</p>
                </div>
                <button className="px-4 py-2 bg-forest-100 dark:bg-forest-700 text-forest-900 dark:text-forest-50 rounded-lg body-md font-medium hover:bg-forest-200 dark:hover:bg-forest-600 transition-colors">
                  Upgrade
                </button>
              </div>
            </div>
          </div>

          {/* Notification Settings */}
          <div className="bg-white dark:bg-forest-800 rounded-xl border border-border-default p-6">
            <div className="flex items-center gap-3 mb-4">
              <Bell className="h-5 w-5 text-forest-600 dark:text-forest-400" />
              <h2 className="heading-lg text-forest-900 dark:text-forest-50">Notifications</h2>
            </div>
            <div className="space-y-4">
              <div className="flex items-center justify-between p-4 bg-surface-secondary dark:bg-forest-700 rounded-lg">
                <div>
                  <p className="body-md font-medium text-forest-900 dark:text-forest-50">Inquiry Alerts</p>
                  <p className="body-sm text-forest-600 dark:text-forest-400">Get notified when users inquire about your property</p>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input type="checkbox" defaultChecked className="sr-only peer" />
                  <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-forest-300 dark:peer-focus:ring-forest-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-forest-900"></div>
                </label>
              </div>
              <div className="flex items-center justify-between p-4 bg-surface-secondary dark:bg-forest-700 rounded-lg">
                <div>
                  <p className="body-md font-medium text-forest-900 dark:text-forest-50">View Reports</p>
                  <p className="body-sm text-forest-600 dark:text-forest-400">Receive weekly reports on property performance</p>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input type="checkbox" defaultChecked className="sr-only peer" />
                  <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-forest-300 dark:peer-focus:ring-forest-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-forest-900"></div>
                </label>
              </div>
              <div className="flex items-center justify-between p-4 bg-surface-secondary dark:bg-forest-700 rounded-lg">
                <div>
                  <p className="body-md font-medium text-forest-900 dark:text-forest-50">Price Alerts</p>
                  <p className="body-sm text-forest-600 dark:text-forest-400">Get notified when similar properties are listed</p>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input type="checkbox" className="sr-only peer" />
                  <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-forest-300 dark:peer-focus:ring-forest-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-forest-900"></div>
                </label>
              </div>
            </div>
          </div>

          {/* Privacy Settings */}
          <div className="bg-white dark:bg-forest-800 rounded-xl border border-border-default p-6">
            <div className="flex items-center gap-3 mb-4">
              <Lock className="h-5 w-5 text-forest-600 dark:text-forest-400" />
              <h2 className="heading-lg text-forest-900 dark:text-forest-50">Privacy</h2>
            </div>
            <div className="space-y-4">
              <div className="flex items-center justify-between p-4 bg-surface-secondary dark:bg-forest-700 rounded-lg">
                <div>
                  <p className="body-md font-medium text-forest-900 dark:text-forest-50">Show Contact Information</p>
                  <p className="body-sm text-forest-600 dark:text-forest-400">Display your contact details to interested users</p>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input type="checkbox" defaultChecked className="sr-only peer" />
                  <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-forest-300 dark:peer-focus:ring-forest-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-forest-900"></div>
                </label>
              </div>
              <div className="flex items-center justify-between p-4 bg-surface-secondary dark:bg-forest-700 rounded-lg">
                <div>
                  <p className="body-md font-medium text-forest-900 dark:text-forest-50">Exact Location</p>
                  <p className="body-sm text-forest-600 dark:text-forest-400">Show the exact address or approximate location</p>
                </div>
                <select className="px-4 py-2 border border-border-default rounded-lg bg-surface-primary dark:bg-forest-700 text-forest-900 dark:text-forest-50 focus:outline-none focus:ring-2 focus:ring-forest-500">
                  <option value="exact">Exact Address</option>
                  <option value="approximate">Approximate Area</option>
                  <option value="hidden">Hidden</option>
                </select>
              </div>
            </div>
          </div>

          {/* Danger Zone */}
          <div className="bg-red-50 dark:bg-red-900/20 rounded-xl border border-red-200 dark:border-red-800 p-6">
            <div className="flex items-center gap-3 mb-4">
              <Trash2 className="h-5 w-5 text-red-600 dark:text-red-400" />
              <h2 className="heading-lg text-red-900 dark:text-red-200">Danger Zone</h2>
            </div>
            <div className="space-y-4">
              <div className="flex items-center justify-between p-4 bg-white dark:bg-forest-800 rounded-lg border border-border-default">
                <div>
                  <p className="body-md font-medium text-forest-900 dark:text-forest-50">Delete Property</p>
                  <p className="body-sm text-forest-600 dark:text-forest-400">Permanently delete this property and all its data</p>
                </div>
                <button
                  onClick={() => setShowDeleteConfirm(true)}
                  className="px-4 py-2 bg-red-600 text-white rounded-lg body-md font-medium hover:bg-red-700 transition-colors"
                >
                  Delete Property
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Delete Confirmation Modal */}
        {showDeleteConfirm && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
            <div className="bg-white dark:bg-forest-800 rounded-xl p-6 max-w-md w-full mx-4">
              <h3 className="heading-lg text-forest-900 dark:text-forest-50 mb-2">Delete Property?</h3>
              <p className="body-md text-forest-600 dark:text-forest-400 mb-6">
                This action cannot be undone. All property data, including images and inquiries, will be permanently deleted.
              </p>
              <div className="flex items-center justify-end gap-3">
                <button
                  onClick={() => setShowDeleteConfirm(false)}
                  className="px-4 py-2 border border-border-default rounded-lg body-md font-medium text-forest-900 dark:text-forest-50 hover:bg-surface-secondary dark:hover:bg-forest-700 transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={handleDelete}
                  className="px-4 py-2 bg-red-600 text-white rounded-lg body-md font-medium hover:bg-red-700 transition-colors"
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </DashboardLayout>
  );
}
