'use client';

export const dynamic = 'force-dynamic';

import { useState } from 'react';
import { DashboardLayout } from '@/components/dashboard';
import { Monitor, Tablet, Smartphone, ArrowLeft, Edit2 } from 'lucide-react';
import { useParams } from 'next/navigation';
import Link from 'next/link';

export default function PropertyPreviewPage() {
  const params = useParams();
  const propertyId = params.id as string;
  const [previewMode, setPreviewMode] = useState<'desktop' | 'tablet' | 'mobile'>('desktop');

  const previewSizes = {
    desktop: 'w-full',
    tablet: 'max-w-3xl mx-auto',
    mobile: 'max-w-sm mx-auto',
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
              <h1 className="heading-xl text-forest-900 dark:text-forest-50 mb-2">Property Preview</h1>
              <p className="body-md text-forest-600 dark:text-forest-400">
                See how your property listing will appear to users
              </p>
            </div>
          </div>
          <Link href={`/properties/${propertyId}/edit`}>
            <button className="inline-flex items-center px-4 py-2 bg-forest-900 text-white rounded-lg hover:bg-forest-800 transition-colors body-md font-medium">
              <Edit2 className="h-4 w-4 mr-2" />
              Edit Property
            </button>
          </Link>
        </div>

        {/* Preview Mode Selector */}
        <div className="flex items-center justify-center gap-2 bg-surface-secondary dark:bg-forest-700 rounded-lg p-2 w-fit mx-auto">
          <button
            onClick={() => setPreviewMode('desktop')}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-colors ${
              previewMode === 'desktop'
                ? 'bg-white dark:bg-forest-800 text-forest-900 dark:text-forest-50 shadow-sm'
                : 'text-forest-600 dark:text-forest-400 hover:bg-white dark:hover:bg-forest-800'
            }`}
          >
            <Monitor className="h-4 w-4" />
            <span className="body-sm">Desktop</span>
          </button>
          <button
            onClick={() => setPreviewMode('tablet')}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-colors ${
              previewMode === 'tablet'
                ? 'bg-white dark:bg-forest-800 text-forest-900 dark:text-forest-50 shadow-sm'
                : 'text-forest-600 dark:text-forest-400 hover:bg-white dark:hover:bg-forest-800'
            }`}
          >
            <Tablet className="h-4 w-4" />
            <span className="body-sm">Tablet</span>
          </button>
          <button
            onClick={() => setPreviewMode('mobile')}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-colors ${
              previewMode === 'mobile'
                ? 'bg-white dark:bg-forest-800 text-forest-900 dark:text-forest-50 shadow-sm'
                : 'text-forest-600 dark:text-forest-400 hover:bg-white dark:hover:bg-forest-800'
            }`}
          >
            <Smartphone className="h-4 w-4" />
            <span className="body-sm">Mobile</span>
          </button>
        </div>

        {/* Preview Container */}
        <div className={`transition-all duration-300 ${previewSizes[previewMode]}`}>
          <div className="bg-white dark:bg-forest-800 rounded-xl border border-border-default overflow-hidden shadow-lg">
            {/* Property Header */}
            <div className="relative h-64 bg-gradient-to-br from-forest-900 to-forest-700">
              <div className="absolute inset-0 bg-black/30" />
              <div className="absolute bottom-0 left-0 right-0 p-6">
                <span className="inline-block px-3 py-1 bg-green-500 text-white text-xs font-medium rounded-full mb-2">
                  For Sale
                </span>
                <h2 className="heading-lg text-white mb-1">Modern 3-Bedroom Apartment</h2>
                <p className="body-md text-white/80">Lekki Phase 1, Lagos</p>
              </div>
            </div>

            {/* Property Details */}
            <div className="p-6 space-y-6">
              {/* Price */}
              <div className="flex items-center justify-between">
                <div>
                  <p className="heading-xl text-forest-900 dark:text-forest-50">
                    ₦45,000,000
                  </p>
                  <p className="body-sm text-forest-600 dark:text-forest-400">
                    ₦2,500,000 per sqm
                  </p>
                </div>
                <button className="px-4 py-2 bg-forest-900 text-white rounded-lg body-md font-medium hover:bg-forest-800 transition-colors">
                  Contact Agent
                </button>
              </div>

              {/* Features */}
              <div className="grid grid-cols-4 gap-4 py-4 border-y border-border-default">
                <div className="text-center">
                  <p className="heading-lg text-forest-900 dark:text-forest-50">3</p>
                  <p className="body-xs text-forest-600 dark:text-forest-400">Bedrooms</p>
                </div>
                <div className="text-center">
                  <p className="heading-lg text-forest-900 dark:text-forest-50">2</p>
                  <p className="body-xs text-forest-600 dark:text-forest-400">Bathrooms</p>
                </div>
                <div className="text-center">
                  <p className="heading-lg text-forest-900 dark:text-forest-50">2</p>
                  <p className="body-xs text-forest-600 dark:text-forest-400">Toilets</p>
                </div>
                <div className="text-center">
                  <p className="heading-lg text-forest-900 dark:text-forest-50">150</p>
                  <p className="body-xs text-forest-600 dark:text-forest-400">sqm</p>
                </div>
              </div>

              {/* Description */}
              <div>
                <h3 className="heading-md text-forest-900 dark:text-forest-50 mb-2">Description</h3>
                <p className="body-md text-forest-600 dark:text-forest-400">
                  This modern 3-bedroom apartment is located in the heart of Lekki Phase 1, offering
                  luxurious living with stunning views. The property features spacious rooms,
                  modern amenities, and is in close proximity to shopping centers, schools, and
                  recreational facilities.
                </p>
              </div>

              {/* Amenities */}
              <div>
                <h3 className="heading-md text-forest-900 dark:text-forest-50 mb-3">Amenities</h3>
                <div className="flex flex-wrap gap-2">
                  {['Air Conditioning', 'Swimming Pool', 'Security', 'Parking', 'Water Supply', 'Electricity'].map((amenity) => (
                    <span key={amenity} className="px-3 py-1 bg-forest-100 dark:bg-forest-700 text-forest-900 dark:text-forest-50 rounded-full body-xs">
                      {amenity}
                    </span>
                  ))}
                </div>
              </div>

              {/* Location */}
              <div>
                <h3 className="heading-md text-forest-900 dark:text-forest-50 mb-2">Location</h3>
                <div className="bg-surface-secondary dark:bg-forest-700 rounded-lg h-48 flex items-center justify-center">
                  <p className="body-md text-forest-600 dark:text-forest-400">
                    Map placeholder - Google Maps integration
                  </p>
                </div>
              </div>

              {/* Agent Info */}
              <div className="flex items-center gap-4 p-4 bg-surface-secondary dark:bg-forest-700 rounded-lg">
                <div className="w-12 h-12 bg-forest-900 rounded-full flex items-center justify-center text-white font-medium">
                  JD
                </div>
                <div className="flex-1">
                  <p className="heading-md text-forest-900 dark:text-forest-50">John Doe</p>
                  <p className="body-sm text-forest-600 dark:text-forest-400">Property Agent</p>
                </div>
                <button className="px-4 py-2 border border-border-default rounded-lg body-md font-medium text-forest-900 dark:text-forest-50 hover:bg-surface-primary dark:hover:bg-forest-600 transition-colors">
                  View Profile
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Tips */}
        <div className="bg-blue-50 dark:bg-blue-900/20 rounded-xl border border-blue-200 dark:border-blue-800 p-6">
          <h3 className="heading-md text-blue-900 dark:text-blue-200 mb-3">Preview Tips</h3>
          <ul className="space-y-2 body-sm text-blue-800 dark:text-blue-300">
            <li>• Switch between desktop, tablet, and mobile views to check responsiveness</li>
            <li>• Ensure images are high quality and load quickly</li>
            <li>• Verify all information is accurate before publishing</li>
            <li>• Test the contact form functionality</li>
          </ul>
        </div>
      </div>
    </DashboardLayout>
  );
}
