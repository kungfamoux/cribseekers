'use client';

export const dynamic = 'force-dynamic';

import { useState, useEffect, useCallback } from 'react';
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
import { toast } from 'sonner';
import { useProperty, useUpdateProperty } from '@/hooks/useProperty';
import type { Property } from '@/types';
import { useParams, useRouter } from 'next/navigation';
import { Save, Eye, ArrowLeft } from 'lucide-react';
import Link from 'next/link';

const propertySchema = z.object({
  title: z.string().min(5, 'Title must be at least 5 characters'),
  description: z.string().min(20, 'Description must be at least 20 characters'),
  type: z.enum(['apartment', 'house', 'land', 'commercial', 'office', 'shop', 'warehouse']),
  category: z.enum(['residential', 'commercial', 'industrial', 'agricultural']),
  purpose: z.enum(['sale', 'rent', 'lease']),
  address: z.string().min(5, 'Address is required'),
  city: z.string().min(2, 'City is required'),
  state: z.string().min(2, 'State is required'),
  lga: z.string().optional(),
  estate: z.string().optional(),
  lat: z.number().optional(),
  lng: z.number().optional(),
  price: z.number().min(1, 'Price must be greater than 0'),
  currency: z.enum(['NGN', 'USD', 'EUR', 'GBP']),
  amenities: z.array(z.string()).min(1, 'Select at least one amenity'),
  rules: z.array(z.string()).optional(),
  available: z.boolean(),
  availableFrom: z.string().optional(),
  availableTo: z.string().optional(),
  seoTitle: z.string().optional(),
  seoDescription: z.string().optional(),
  seoKeywords: z.array(z.string()).optional(),
  bedrooms: z.number().min(0).optional(),
  bathrooms: z.number().min(0).optional(),
  toilets: z.number().min(0).optional(),
  parkingSpaces: z.number().min(0).optional(),
  area: z.number().min(1, 'Area is required'),
  areaUnit: z.enum(['sqm', 'sqft', 'acres', 'hectares']),
});

type PropertyFormData = z.infer<typeof propertySchema>;

export default function EditPropertyPage() {
  const params = useParams();
  const router = useRouter();
  const propertyId = params.id as string;
  const [currentStep, setCurrentStep] = useState(1);
  const [autosaveStatus, setAutosaveStatus] = useState<'idle' | 'saving' | 'saved' | 'error'>('idle');
  const totalSteps = 11;
  const [images, setImages] = useState<Array<{ id: string; url: string; isThumbnail: boolean; order: number }>>([]);
  const [videos, setVideos] = useState<Array<{ id: string; url: string }>>([]);
  const [documents, setDocuments] = useState<Array<{ id: string; url: string; name: string }>>([]);
  const [availableDates, setAvailableDates] = useState<string[]>([]);
  const [blockedDates, setBlockedDates] = useState<string[]>([]);

  const { data: property, isLoading, error } = useProperty(propertyId);
  const updateProperty = useUpdateProperty(propertyId);

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors, isSubmitting, dirtyFields },
    watch,
    reset,
  } = useForm<PropertyFormData>({
    resolver: zodResolver(propertySchema),
    defaultValues: {
      title: '',
      description: '',
      type: 'apartment',
      category: 'residential',
      purpose: 'sale',
      address: '',
      city: '',
      state: '',
      lga: '',
      estate: '',
      price: 0,
      currency: 'NGN',
      amenities: [],
      rules: [],
      available: true,
      seoTitle: '',
      seoDescription: '',
      seoKeywords: [],
      bedrooms: 0,
      bathrooms: 0,
      toilets: 0,
      parkingSpaces: 0,
      area: 0,
      areaUnit: 'sqm',
    },
  });

  // Load property data when available
  useEffect(() => {
    if (property) {
      reset({
        title: property.title,
        description: property.description,
        type: property.type as 'apartment' | 'house' | 'land' | 'commercial' | 'office' | 'shop' | 'warehouse',
        category: property.category as 'residential' | 'commercial' | 'industrial' | 'agricultural',
        purpose: property.purpose as 'sale' | 'rent' | 'lease',
        address: property.location.address,
        city: property.location.city,
        state: property.location.state,
        lga: property.location.lga,
        estate: property.location.estate,
        lat: property.location.coordinates?.lat,
        lng: property.location.coordinates?.lng,
        price: property.price,
        currency: property.currency as 'NGN' | 'USD' | 'EUR' | 'GBP',
        amenities: property.amenities,
        available: property.availability?.available ?? true,
        availableFrom: property.availability?.availableFrom,
        availableTo: property.availability?.availableTo,
        bedrooms: property.features.bedrooms,
        bathrooms: property.features.bathrooms,
        toilets: property.features.toilets,
        parkingSpaces: property.features.parkingSpaces,
        area: property.features.area,
        areaUnit: property.features.areaUnit as 'sqm' | 'sqft' | 'acres' | 'hectares',
      });
    }
  }, [property, reset]);

  const handleAutosave = useCallback(async () => {
    setAutosaveStatus('saving');
    try {
      const formData = watch();
      await updateProperty.mutateAsync(formData as PropertyFormData);
      setAutosaveStatus('saved');
      setTimeout(() => setAutosaveStatus('idle'), 2000);
    } catch {
      setAutosaveStatus('error');
      setTimeout(() => setAutosaveStatus('idle'), 2000);
    }
  }, [watch, updateProperty]);

  // Autosave functionality
  useEffect(() => {
    const timer = setTimeout(() => {
      if (Object.keys(dirtyFields).length > 0 && property) {
        handleAutosave();
      }
    }, 3000); // Autosave after 3 seconds of inactivity

    return () => clearTimeout(timer);
  }, [dirtyFields, watch, handleAutosave, property]);

  const onSubmit = async (data: PropertyFormData) => {
    try {
      await updateProperty.mutateAsync(data);
      toast.success('Property updated successfully', {
        description: 'Your changes have been saved',
      });
      router.push('/properties/my');
    } catch {
      // Error is handled by the mutation's onError callback
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


  if (isLoading) {
    return (
      <DashboardLayout>
        <div className="flex items-center justify-center h-96">
          <div className="text-center">
            <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-forest-900 border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]"></div>
            <p className="body-md text-forest-600 dark:text-forest-400 mt-4">Loading property...</p>
          </div>
        </div>
      </DashboardLayout>
    );
  }

  if (error || !property) {
    return (
      <DashboardLayout>
        <div className="flex flex-col items-center justify-center h-96">
          <p className="heading-lg text-forest-900 dark:text-forest-50 mb-4">Property not found</p>
          <Link href="/properties/my">
            <button className="inline-flex items-center px-4 py-2 bg-forest-900 text-white rounded-lg hover:bg-forest-800 transition-colors body-md font-medium">
              Back to Properties
            </button>
          </Link>
        </div>
      </DashboardLayout>
    );
  }

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
                  rows={6}
                  placeholder="Describe your property in detail..."
                  className="w-full px-4 py-3 border border-border-default rounded-lg bg-surface-primary dark:bg-forest-700 text-forest-900 dark:text-forest-50 placeholder-forest-400 focus:outline-none focus:ring-2 focus:ring-forest-500 resize-none"
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
                    placeholder="e.g., 50000000"
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
                  {errors.currency && (
                    <p className="body-sm text-red-600 mt-1">{errors.currency.message}</p>
                  )}
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
                  <div className="flex gap-2">
                    <input
                      type="number"
                      {...register('area', { valueAsNumber: true })}
                      placeholder="e.g., 150"
                      className="flex-1 px-4 py-3 border border-border-default rounded-lg bg-surface-primary dark:bg-forest-700 text-forest-900 dark:text-forest-50 placeholder-forest-400 focus:outline-none focus:ring-2 focus:ring-forest-500"
                    />
                    <select
                      {...register('areaUnit')}
                      className="px-4 py-3 border border-border-default rounded-lg bg-surface-primary dark:bg-forest-700 text-forest-900 dark:text-forest-50 focus:outline-none focus:ring-2 focus:ring-forest-500"
                    >
                      <option value="sqm">sqm</option>
                      <option value="sqft">sqft</option>
                      <option value="acres">acres</option>
                      <option value="hectares">hectares</option>
                    </select>
                  </div>
                  {errors.area && (
                    <p className="body-sm text-red-600 mt-1">{errors.area.message}</p>
                  )}
                </div>
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
                  propertyId={propertyId}
                />
              </div>
              <div>
                <h3 className="heading-md text-forest-900 dark:text-forest-50 mb-4">Videos</h3>
                <VideoUploader
                  onVideosChange={setVideos}
                  existingVideos={property?.videos?.map((v: { id: string; url: string }) => ({ id: v.id, url: v.url })) || []}
                  propertyId={propertyId}
                />
              </div>
              <div>
                <h3 className="heading-md text-forest-900 dark:text-forest-50 mb-4">Documents</h3>
                <PropertyDocumentUploader
                  onDocumentsChange={setDocuments}
                  existingDocuments={property?.documents?.map((d: { id: string; url: string; name: string }) => ({ id: d.id, url: d.url, name: d.name })) || []}
                  propertyId={propertyId}
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
                id: propertyId,
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
                status: property?.status || 'draft',
                isFeatured: property?.isFeatured || false,
                views: property?.views || 0,
                favorites: property?.favorites || 0,
                inquiries: property?.inquiries || 0,
                createdAt: property?.createdAt || new Date().toISOString(),
                updatedAt: property?.updatedAt || new Date().toISOString(),
                createdBy: property?.createdBy || 'user',
              } as Property}
            />
          </div>
        );

      case 11:
        return (
          <div className="space-y-6">
            <h2 className="heading-lg text-forest-900 dark:text-forest-50">Save Changes</h2>
            <div className="bg-green-50 dark:bg-green-900/20 rounded-xl p-6 border border-green-200 dark:border-green-800">
              <h3 className="heading-md text-green-900 dark:text-green-200 mb-2">Ready to Save!</h3>
              <p className="body-md text-green-800 dark:text-green-300 mb-4">
                Your changes will be saved and the property will be updated.
              </p>
            </div>
            <button
              onClick={handleSubmit(onSubmit)}
              disabled={isSubmitting}
              className="w-full inline-flex items-center justify-center px-6 py-3 bg-forest-900 text-white rounded-lg hover:bg-forest-800 transition-colors body-md font-medium disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isSubmitting ? 'Saving...' : 'Save Changes'}
            </button>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <div className="flex items-center gap-3 mb-2">
              <Link href="/properties/my">
                <button className="p-2 hover:bg-surface-secondary dark:hover:bg-forest-700 rounded-lg transition-colors">
                  <ArrowLeft className="h-5 w-5 text-forest-600 dark:text-forest-400" />
                </button>
              </Link>
              <h1 className="heading-xl text-forest-900 dark:text-forest-50">Edit Property</h1>
            </div>
            <p className="body-md text-forest-600 dark:text-forest-400">
              Update your property listing
            </p>
          </div>
          <div className="flex items-center gap-3">
            {/* Autosave Status */}
            <div className="flex items-center gap-2">
              {autosaveStatus === 'saving' && (
                <span className="body-sm text-forest-600 dark:text-forest-400 flex items-center gap-1">
                  <div className="h-4 w-4 animate-spin rounded-full border-2 border-forest-900 border-r-transparent"></div>
                  Saving...
                </span>
              )}
              {autosaveStatus === 'saved' && (
                <span className="body-sm text-green-600 dark:text-green-400 flex items-center gap-1">
                  <Save className="h-4 w-4" />
                  Saved
                </span>
              )}
              {autosaveStatus === 'error' && (
                <span className="body-sm text-red-600 dark:text-red-400">Error saving</span>
              )}
            </div>
            <Link href={`/properties/${propertyId}`}>
              <button className="inline-flex items-center px-4 py-2 border border-border-default rounded-lg body-md font-medium text-forest-900 dark:text-forest-50 hover:bg-surface-secondary dark:hover:bg-forest-700 transition-colors">
                <Eye className="h-4 w-4 mr-2" />
                Preview
              </button>
            </Link>
          </div>
        </div>

        <PropertyWizard
          totalSteps={totalSteps}
          currentStep={currentStep}
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
