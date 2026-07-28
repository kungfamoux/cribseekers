'use client';

export const dynamic = 'force-dynamic';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { DashboardLayout } from '@/components/dashboard';
import { PropertyWizard } from '@/components/properties';
import { MapPicker } from '@/components/properties/MapPicker';
import { PropertyPricingCard } from '@/components/properties/PropertyPricingCard';
import { PropertyAmenitiesCard } from '@/components/properties/PropertyAmenitiesCard';
import { PropertyRulesCard } from '@/components/properties/PropertyRulesCard';
import { ImageGalleryManager } from '@/components/properties/ImageGalleryManager';
import { VideoUploader } from '@/components/properties/VideoUploader';
import { PropertyDocumentUploader } from '@/components/properties/PropertyDocumentUploader';
import { AvailabilityCalendar } from '@/components/properties/AvailabilityCalendar';
import { PropertySEOCard } from '@/components/properties/PropertySEOCard';
import { PropertyPreviewCard } from '@/components/properties/PropertyPreviewCard';
import { useCreateProperty } from '@/hooks/useProperty';
import type { Property } from '@/types';
import type { PropertyFormData } from '@/hooks/useProperty';

const propertySchema = z.object({
  // Step 1: Basic Info
  title: z.string().min(5, 'Title must be at least 5 characters'),
  description: z.string().min(20, 'Description must be at least 20 characters'),
  
  // Step 2: Property Type
  type: z.enum(['apartment', 'house', 'land', 'commercial', 'office', 'shop', 'warehouse']),
  category: z.enum(['residential', 'commercial', 'industrial', 'agricultural']),
  purpose: z.enum(['sale', 'rent', 'lease']),
  
  // Step 3: Location
  address: z.string().min(5, 'Address is required'),
  city: z.string().min(2, 'City is required'),
  state: z.string().min(2, 'State is required'),
  lga: z.string().optional(),
  estate: z.string().optional(),
  lat: z.number().optional(),
  lng: z.number().optional(),
  
  // Step 4: Pricing
  price: z.number().min(1, 'Price must be greater than 0'),
  currency: z.enum(['NGN', 'USD', 'EUR', 'GBP']),
  bedrooms: z.number().optional(),
  bathrooms: z.number().optional(),
  toilets: z.number().optional(),
  parkingSpaces: z.number().optional(),
  area: z.number().min(1, 'Area is required'),
  areaUnit: z.enum(['sqm', 'sqft', 'acres', 'hectares']),
  
  // Step 5: Description (already in step 1)
  
  // Step 6: Amenities
  amenities: z.array(z.string()).min(1, 'Select at least one amenity'),
  
  // Step 7: Rules
  rules: z.array(z.string()).optional(),
  
  // Step 8: Availability (flat structure for form)
  available: z.boolean().default(true),
  availableFrom: z.string().optional(),
  availableTo: z.string().optional(),
  
  // Step 9: Review (no additional fields)
  
  // Step 10: Publish (no additional fields)
  
  // SEO fields
  seoTitle: z.string().optional(),
  seoDescription: z.string().optional(),
  seoKeywords: z.array(z.string()).optional(),
});

export default function CreatePropertyPage() {
  const [currentStep, setCurrentStep] = useState(1);
  const totalSteps = 11;
  const [images, setImages] = useState<Array<{ id: string; url: string; isThumbnail: boolean; order: number }>>([]);
  const [videos, setVideos] = useState<Array<{ id: string; url: string }>>([]);
  const [documents, setDocuments] = useState<Array<{ id: string; url: string; name: string }>>([]);
  const [availableDates, setAvailableDates] = useState<string[]>([]);
  const [blockedDates, setBlockedDates] = useState<string[]>([]);
  const createProperty = useCreateProperty();

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<z.infer<typeof propertySchema>>({
    resolver: zodResolver(propertySchema),
    defaultValues: {
      title: '',
      description: '',
      type: 'apartment' as const,
      category: 'residential' as const,
      purpose: 'sale' as const,
      address: '',
      city: '',
      state: '',
      lga: '',
      estate: '',
      price: 0,
      currency: 'NGN' as const,
      bedrooms: undefined,
      bathrooms: undefined,
      toilets: undefined,
      parkingSpaces: undefined,
      area: 0,
      areaUnit: 'sqm' as const,
      amenities: [],
      rules: [],
      available: true,
      availableFrom: undefined,
      availableTo: undefined,
      seoTitle: '',
      seoDescription: '',
      seoKeywords: [],
    },
  });

  const onSubmit = async (data: z.infer<typeof propertySchema>) => {
    try {
      // Transform flat form data to API format
      const apiData = {
        ...data,
        availability: {
          available: data.available,
          availableFrom: data.availableFrom,
          availableTo: data.availableTo,
        },
      };
      await createProperty.mutateAsync(apiData as PropertyFormData);
    } catch {
      // Error is handled by the mutation's onError callback
    }
  };


  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return (
          <div className="space-y-6">
            <h2 className="heading-lg text-forest-900 dark:text-forest-50">Basic Information</h2>
            <div className="space-y-4">
              <div>
                <label className="block body-sm font-medium text-forest-900 dark:text-forest-50 mb-2">
                  Property Title *
                </label>
                <input
                  type="text"
                  {...register('title')}
                  placeholder="e.g., Modern 3-Bedroom Apartment in Lekki"
                  className="w-full px-4 py-3 border border-border-default rounded-lg bg-surface-primary dark:bg-forest-700 text-forest-900 dark:text-forest-50 placeholder-forest-400 focus:outline-none focus:ring-2 focus:ring-forest-500"
                />
                {errors.title && (
                  <p className="body-sm text-red-600 mt-1">{errors.title.message}</p>
                )}
              </div>
              <div>
                <label className="block body-sm font-medium text-forest-900 dark:text-forest-50 mb-2">
                  Description *
                </label>
                <textarea
                  {...register('description')}
                  rows={5}
                  placeholder="Describe your property in detail..."
                  className="w-full px-4 py-3 border border-border-default rounded-lg bg-surface-primary dark:bg-forest-700 text-forest-900 dark:text-forest-50 placeholder-forest-400 focus:outline-none focus:ring-2 focus:ring-forest-500"
                />
                {errors.description && (
                  <p className="body-sm text-red-600 mt-1">{errors.description.message}</p>
                )}
              </div>
            </div>
          </div>
        );

      case 2:
        return (
          <div className="space-y-6">
            <h2 className="heading-lg text-forest-900 dark:text-forest-50">Property Type</h2>
            <div className="space-y-4">
              <div>
                <label className="block body-sm font-medium text-forest-900 dark:text-forest-50 mb-2">
                  Property Type *
                </label>
                <select
                  {...register('type')}
                  className="w-full px-4 py-3 border border-border-default rounded-lg bg-surface-primary dark:bg-forest-700 text-forest-900 dark:text-forest-50 focus:outline-none focus:ring-2 focus:ring-forest-500"
                >
                  <option value="apartment">Apartment</option>
                  <option value="house">House</option>
                  <option value="land">Land</option>
                  <option value="commercial">Commercial</option>
                  <option value="office">Office</option>
                  <option value="shop">Shop</option>
                  <option value="warehouse">Warehouse</option>
                </select>
                {errors.type && (
                  <p className="body-sm text-red-600 mt-1">{errors.type.message}</p>
                )}
              </div>
              <div>
                <label className="block body-sm font-medium text-forest-900 dark:text-forest-50 mb-2">
                  Category *
                </label>
                <select
                  {...register('category')}
                  className="w-full px-4 py-3 border border-border-default rounded-lg bg-surface-primary dark:bg-forest-700 text-forest-900 dark:text-forest-50 focus:outline-none focus:ring-2 focus:ring-forest-500"
                >
                  <option value="residential">Residential</option>
                  <option value="commercial">Commercial</option>
                  <option value="industrial">Industrial</option>
                  <option value="agricultural">Agricultural</option>
                </select>
                {errors.category && (
                  <p className="body-sm text-red-600 mt-1">{errors.category.message}</p>
                )}
              </div>
              <div>
                <label className="block body-sm font-medium text-forest-900 dark:text-forest-50 mb-2">
                  Purpose *
                </label>
                <select
                  {...register('purpose')}
                  className="w-full px-4 py-3 border border-border-default rounded-lg bg-surface-primary dark:bg-forest-700 text-forest-900 dark:text-forest-50 focus:outline-none focus:ring-2 focus:ring-forest-500"
                >
                  <option value="sale">For Sale</option>
                  <option value="rent">For Rent</option>
                  <option value="lease">For Lease</option>
                </select>
                {errors.purpose && (
                  <p className="body-sm text-red-600 mt-1">{errors.purpose.message}</p>
                )}
              </div>
            </div>
          </div>
        );

      case 3:
        return (
          <div className="space-y-6">
            <h2 className="heading-lg text-forest-900 dark:text-forest-50">Location</h2>
            <MapPicker
              onLocationChange={(location) => {
                setValue('address', location.address);
                setValue('city', location.city);
                setValue('state', location.state);
                setValue('lga', location.lga || '');
                setValue('estate', location.estate || '');
                setValue('lat', location.lat);
                setValue('lng', location.lng);
              }}
              initialLocation={{
                address: watch('address'),
                city: watch('city'),
                state: watch('state'),
                lga: watch('lga'),
                estate: watch('estate'),
                lat: watch('lat'),
                lng: watch('lng'),
              }}
            />
          </div>
        );

      case 4:
        return (
          <div className="space-y-6">
            <h2 className="heading-lg text-forest-900 dark:text-forest-50">Pricing & Features</h2>
            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block body-sm font-medium text-forest-900 dark:text-forest-50 mb-2">
                    Price *
                  </label>
                  <input
                    type="number"
                    {...register('price', { valueAsNumber: true })}
                    placeholder="0"
                    className="w-full px-4 py-3 border border-border-default rounded-lg bg-surface-primary dark:bg-forest-700 text-forest-900 dark:text-forest-50 placeholder-forest-400 focus:outline-none focus:ring-2 focus:ring-forest-500"
                  />
                  {errors.price && (
                    <p className="body-sm text-red-600 mt-1">{errors.price.message}</p>
                  )}
                </div>
                <div>
                  <label className="block body-sm font-medium text-forest-900 dark:text-forest-50 mb-2">
                    Currency *
                  </label>
                  <select
                    {...register('currency')}
                    className="w-full px-4 py-3 border border-border-default rounded-lg bg-surface-primary dark:bg-forest-700 text-forest-900 dark:text-forest-50 focus:outline-none focus:ring-2 focus:ring-forest-500"
                  >
                    <option value="NGN">NGN (₦)</option>
                    <option value="USD">USD ($)</option>
                    <option value="EUR">EUR (€)</option>
                    <option value="GBP">GBP (£)</option>
                  </select>
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="block body-sm font-medium text-forest-900 dark:text-forest-50 mb-2">
                    Bedrooms
                  </label>
                  <input
                    type="number"
                    {...register('bedrooms', { valueAsNumber: true })}
                    placeholder="0"
                    className="w-full px-4 py-3 border border-border-default rounded-lg bg-surface-primary dark:bg-forest-700 text-forest-900 dark:text-forest-50 placeholder-forest-400 focus:outline-none focus:ring-2 focus:ring-forest-500"
                  />
                </div>
                <div>
                  <label className="block body-sm font-medium text-forest-900 dark:text-forest-50 mb-2">
                    Bathrooms
                  </label>
                  <input
                    type="number"
                    {...register('bathrooms', { valueAsNumber: true })}
                    placeholder="0"
                    className="w-full px-4 py-3 border border-border-default rounded-lg bg-surface-primary dark:bg-forest-700 text-forest-900 dark:text-forest-50 placeholder-forest-400 focus:outline-none focus:ring-2 focus:ring-forest-500"
                  />
                </div>
                <div>
                  <label className="block body-sm font-medium text-forest-900 dark:text-forest-50 mb-2">
                    Toilets
                  </label>
                  <input
                    type="number"
                    {...register('toilets', { valueAsNumber: true })}
                    placeholder="0"
                    className="w-full px-4 py-3 border border-border-default rounded-lg bg-surface-primary dark:bg-forest-700 text-forest-900 dark:text-forest-50 placeholder-forest-400 focus:outline-none focus:ring-2 focus:ring-forest-500"
                  />
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block body-sm font-medium text-forest-900 dark:text-forest-50 mb-2">
                    Parking Spaces
                  </label>
                  <input
                    type="number"
                    {...register('parkingSpaces', { valueAsNumber: true })}
                    placeholder="0"
                    className="w-full px-4 py-3 border border-border-default rounded-lg bg-surface-primary dark:bg-forest-700 text-forest-900 dark:text-forest-50 placeholder-forest-400 focus:outline-none focus:ring-2 focus:ring-forest-500"
                  />
                </div>
                <div>
                  <label className="block body-sm font-medium text-forest-900 dark:text-forest-50 mb-2">
                    Area *
                  </label>
                  <input
                    type="number"
                    {...register('area', { valueAsNumber: true })}
                    placeholder="0"
                    className="w-full px-4 py-3 border border-border-default rounded-lg bg-surface-primary dark:bg-forest-700 text-forest-900 dark:text-forest-50 placeholder-forest-400 focus:outline-none focus:ring-2 focus:ring-forest-500"
                  />
                  {errors.area && (
                    <p className="body-sm text-red-600 mt-1">{errors.area.message}</p>
                  )}
                </div>
              </div>
              <div>
                <label className="block body-sm font-medium text-forest-900 dark:text-forest-50 mb-2">
                  Area Unit *
                </label>
                <select
                  {...register('areaUnit')}
                  className="w-full px-4 py-3 border border-border-default rounded-lg bg-surface-primary dark:bg-forest-700 text-forest-900 dark:text-forest-50 focus:outline-none focus:ring-2 focus:ring-forest-500"
                >
                  <option value="sqm">Square Meters (sqm)</option>
                  <option value="sqft">Square Feet (sqft)</option>
                  <option value="acres">Acres</option>
                  <option value="hectares">Hectares</option>
                </select>
              </div>
            </div>
            <PropertyPricingCard
              price={watch('price')}
              currency={watch('currency')}
              purpose={watch('purpose')}
            />
          </div>
        );

      case 5:
        return (
          <div className="space-y-6">
            <h2 className="heading-lg text-forest-900 dark:text-forest-50">Amenities</h2>
            <PropertyAmenitiesCard
              amenities={watch('amenities') || []}
              onAdd={(amenity) => {
                const current = watch('amenities') || [];
                setValue('amenities', [...current, amenity]);
              }}
              onRemove={(amenity) => {
                const current = watch('amenities') || [];
                setValue('amenities', current.filter((a) => a !== amenity));
              }}
            />
            {errors.amenities && (
              <p className="body-sm text-red-600 mt-1">{errors.amenities.message}</p>
            )}
          </div>
        );

      case 6:
        return (
          <div className="space-y-6">
            <h2 className="heading-lg text-forest-900 dark:text-forest-50">House Rules</h2>
            <PropertyRulesCard
              rules={watch('rules') || []}
              onAdd={(rule) => {
                const current = watch('rules') || [];
                setValue('rules', [...current, rule]);
              }}
              onRemove={(rule) => {
                const current = watch('rules') || [];
                setValue('rules', current.filter((r) => r !== rule));
              }}
            />
          </div>
        );

      case 7:
        return (
          <div className="space-y-6">
            <h2 className="heading-lg text-forest-900 dark:text-forest-50">Media</h2>
            <div className="space-y-6">
              <div>
                <h3 className="heading-md text-forest-900 dark:text-forest-50 mb-4">Images</h3>
                <ImageGalleryManager
                  images={images}
                  onImagesChange={setImages}
                />
              </div>
              <div>
                <h3 className="heading-md text-forest-900 dark:text-forest-50 mb-4">Videos</h3>
                <VideoUploader
                  onVideosChange={setVideos}
                />
              </div>
              <div>
                <h3 className="heading-md text-forest-900 dark:text-forest-50 mb-4">Documents</h3>
                <PropertyDocumentUploader
                  onDocumentsChange={setDocuments}
                />
              </div>
            </div>
          </div>
        );

      case 8:
        return (
          <div className="space-y-6">
            <h2 className="heading-lg text-forest-900 dark:text-forest-50">Availability</h2>
            <AvailabilityCalendar
              availableDates={availableDates}
              blockedDates={blockedDates}
              onDateSelect={(date) => {
                const dateStr = date.toISOString().split('T')[0];
                if (blockedDates.includes(dateStr)) {
                  setBlockedDates(blockedDates.filter((d) => d !== dateStr));
                } else {
                  setAvailableDates([...availableDates, dateStr]);
                }
              }}
              onDateBlock={(date) => {
                const dateStr = date.toISOString().split('T')[0];
                setBlockedDates([...blockedDates, dateStr]);
                setAvailableDates(availableDates.filter((d) => d !== dateStr));
              }}
              onDateUnblock={(date) => {
                const dateStr = date.toISOString().split('T')[0];
                setBlockedDates(blockedDates.filter((d) => d !== dateStr));
              }}
            />
          </div>
        );

      case 9:
        return (
          <div className="space-y-6">
            <h2 className="heading-lg text-forest-900 dark:text-forest-50">SEO Settings</h2>
            <PropertySEOCard
              title={watch('title')}
              description={watch('description')}
              keywords={watch('seoKeywords') || []}
            />
            <div className="space-y-4">
              <div>
                <label className="block body-sm font-medium text-forest-900 dark:text-forest-50 mb-2">
                  SEO Title (Optional)
                </label>
                <input
                  type="text"
                  {...register('seoTitle')}
                  placeholder="Custom title for search engines"
                  className="w-full px-4 py-3 border border-border-default rounded-lg bg-surface-primary dark:bg-forest-700 text-forest-900 dark:text-forest-50 placeholder-forest-400 focus:outline-none focus:ring-2 focus:ring-forest-500"
                />
              </div>
              <div>
                <label className="block body-sm font-medium text-forest-900 dark:text-forest-50 mb-2">
                  SEO Description (Optional)
                </label>
                <textarea
                  {...register('seoDescription')}
                  rows={3}
                  placeholder="Custom description for search engines"
                  className="w-full px-4 py-3 border border-border-default rounded-lg bg-surface-primary dark:bg-forest-700 text-forest-900 dark:text-forest-50 placeholder-forest-400 focus:outline-none focus:ring-2 focus:ring-forest-500"
                />
              </div>
            </div>
          </div>
        );

      case 10:
        return (
          <div className="space-y-6">
            <h2 className="heading-lg text-forest-900 dark:text-forest-50">Preview Your Property</h2>
            <PropertyPreviewCard
              property={{
                id: 'preview',
                title: watch('title'),
                description: watch('description'),
                type: watch('type'),
                category: watch('category'),
                purpose: watch('purpose'),
                price: watch('price'),
                currency: watch('currency'),
                location: {
                  address: watch('address'),
                  city: watch('city'),
                  state: watch('state'),
                  lga: watch('lga'),
                  estate: watch('estate'),
                  coordinates: watch('lat') && watch('lng') ? { lat: watch('lat')!, lng: watch('lng')! } : undefined,
                },
                features: {
                  bedrooms: watch('bedrooms') || 0,
                  bathrooms: watch('bathrooms') || 0,
                  toilets: watch('toilets') || 0,
                  parkingSpaces: watch('parkingSpaces') || 0,
                  area: watch('area'),
                  areaUnit: watch('areaUnit'),
                },
                amenities: watch('amenities') || [],
                images: images.map((i) => i.url),
                videos: videos.map((v) => v.url),
                documents: documents.map((d) => d.url),
                status: 'draft',
                isFeatured: false,
                views: 0,
                favorites: 0,
                inquiries: 0,
                createdAt: new Date().toISOString(),
                updatedAt: new Date().toISOString(),
                createdBy: 'user',
              } as Property}
            />
          </div>
        );

      case 11:
        return (
          <div className="space-y-6">
            <h2 className="heading-lg text-forest-900 dark:text-forest-50">Publish Your Property</h2>
            <p className="body-md text-forest-600 dark:text-forest-400">
              Your property is ready to be published. Click the button below to complete the process.
            </p>
            <div className="bg-green-50 dark:bg-green-900/20 rounded-lg p-6 border border-green-200 dark:border-green-800">
              <h3 className="heading-md text-green-900 dark:text-green-200 mb-2">
                ✓ All steps completed
              </h3>
              <p className="body-sm text-green-800 dark:text-green-300">
                Your property listing is complete and ready for publication.
              </p>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  const handleNext = () => {
    if (currentStep < totalSteps) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handlePrevious = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleSubmitForm = async () => {
    await handleSubmit(onSubmit)();
  };

  return (
    <DashboardLayout>
      <div className="max-w-4xl mx-auto">
        <div className="mb-8">
          <h1 className="heading-xl text-forest-900 dark:text-forest-50 mb-2">Create Property</h1>
          <p className="body-md text-forest-600 dark:text-forest-400">
            Step {currentStep} of {totalSteps}
          </p>
        </div>

        <PropertyWizard
          currentStep={currentStep}
          totalSteps={totalSteps}
          onNext={handleNext}
          onPrevious={handlePrevious}
          onSubmit={handleSubmitForm}
          isSubmitting={isSubmitting}
        >
          {renderStep()}
        </PropertyWizard>
      </div>
    </DashboardLayout>
  );
}
