'use client';

export const dynamic = 'force-dynamic';

import { useState } from 'react';
import { DashboardLayout } from '@/components/dashboard';
import { EmptyState } from '@/components/dashboard';
import { GitCompare, X, Share2, Plus, Bed, Bath, Maximize, MapPin, Star, DollarSign, Calendar } from 'lucide-react';
import { toast } from 'sonner';

export default function ComparePage() {
  const [selectedProperties, setSelectedProperties] = useState<string[]>(['1', '2', '3']);

  const properties = [
    {
      id: '1',
      title: 'Modern 3-Bedroom Apartment',
      location: 'Lekki Phase 1, Lagos',
      price: '₦2,500,000/year',
      pricePerSqm: '₦16,667/sqm',
      bedrooms: 3,
      bathrooms: 2,
      area: '150 sqm',
      rating: 4.8,
      type: 'Apartment',
      furnished: 'Yes',
      parking: '2 spaces',
      yearBuilt: '2020',
      amenities: ['Swimming Pool', 'Gym', 'Security', 'Backup Power', 'Water Supply'],
      image: '/placeholder-property-1.jpg',
    },
    {
      id: '2',
      title: 'Luxury 4-Bedroom Duplex',
      location: 'Victoria Island, Lagos',
      price: '₦5,000,000/year',
      pricePerSqm: '₦20,000/sqm',
      bedrooms: 4,
      bathrooms: 3,
      area: '250 sqm',
      rating: 4.9,
      type: 'Duplex',
      furnished: 'Yes',
      parking: '3 spaces',
      yearBuilt: '2022',
      amenities: ['Swimming Pool', 'Gym', 'Security', 'Backup Power', 'Water Supply', 'Garden'],
      image: '/placeholder-property-2.jpg',
    },
    {
      id: '3',
      title: 'Cozy 2-Bedroom Flat',
      location: 'Ikeja GRA, Lagos',
      price: '₦1,800,000/year',
      pricePerSqm: '₦18,000/sqm',
      bedrooms: 2,
      bathrooms: 1,
      area: '100 sqm',
      rating: 4.5,
      type: 'Flat',
      furnished: 'No',
      parking: '1 space',
      yearBuilt: '2018',
      amenities: ['Security', 'Backup Power', 'Water Supply'],
      image: '/placeholder-property-3.jpg',
    },
    {
      id: '4',
      title: 'Penthouse with Ocean View',
      location: 'Eko Atlantic, Lagos',
      price: '₦8,000,000/year',
      pricePerSqm: '₦22,857/sqm',
      bedrooms: 5,
      bathrooms: 4,
      area: '350 sqm',
      rating: 5.0,
      type: 'Penthouse',
      furnished: 'Yes',
      parking: '4 spaces',
      yearBuilt: '2023',
      amenities: ['Swimming Pool', 'Gym', 'Security', 'Backup Power', 'Water Supply', 'Garden', 'Concierge'],
      image: '/placeholder-property-4.jpg',
    },
  ];

  const comparisonProperties = properties.filter((p) => selectedProperties.includes(p.id));

  const handleRemoveProperty = (id: string) => {
    setSelectedProperties((prev) => prev.filter((p) => p !== id));
    toast.success('Property removed', {
      description: 'The property has been removed from comparison',
    });
  };

  const handleAddProperty = () => {
    toast.info('Add Property', {
      description: 'Select more properties to compare',
    });
  };

  const handleShare = () => {
    toast.success('Comparison shared', {
      description: 'The comparison link has been copied to your clipboard',
    });
  };

  if (selectedProperties.length === 0) {
    return (
      <DashboardLayout>
        <div className="flex flex-col items-center justify-center py-20">
          <EmptyState
            icon={GitCompare}
            title="No properties to compare"
            description="Add properties to compare them side by side. You can compare up to 4 properties at once."
            action={{
              label: 'Add Properties',
              onClick: handleAddProperty,
            }}
          />
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
            <h1 className="heading-2xl text-forest-900 dark:text-forest-50 mb-2">Property Comparison</h1>
            <p className="body-md text-forest-600 dark:text-forest-400">
              Compare properties side by side to make the best decision
            </p>
          </div>
          <div className="flex items-center space-x-2">
            <button
              onClick={handleAddProperty}
              disabled={selectedProperties.length >= 4}
              className="flex items-center px-4 py-2 bg-forest-900 text-white rounded-lg hover:bg-forest-800 transition-colors body-md font-medium disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <Plus className="h-4 w-4 mr-2" />
              Add Property ({selectedProperties.length}/4)
            </button>
            <button
              onClick={handleShare}
              className="flex items-center px-4 py-2 bg-white dark:bg-forest-800 text-forest-900 dark:text-forest-50 border border-border-default rounded-lg hover:bg-surface-secondary transition-colors body-md"
            >
              <Share2 className="h-4 w-4 mr-2" />
              Share
            </button>
          </div>
        </div>

        {/* Comparison Table */}
        <div className="bg-white dark:bg-forest-800 rounded-xl border border-border-default overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <tbody>
                {/* Property Images */}
                <tr className="border-b border-border-default">
                  <td className="p-4 bg-surface-secondary dark:bg-forest-900 font-medium body-md text-forest-900 dark:text-forest-50 w-48">
                    Property
                  </td>
                  {comparisonProperties.map((property) => (
                    <td key={property.id} className="p-4 min-w-[280px] relative">
                      <button
                        onClick={() => handleRemoveProperty(property.id)}
                        className="absolute top-2 right-2 p-1 bg-white dark:bg-forest-800 rounded-full shadow-sm hover:bg-surface-secondary transition-colors"
                      >
                        <X className="h-4 w-4 text-forest-600 dark:text-forest-400" />
                      </button>
                      <div className="h-32 bg-forest-100 dark:bg-forest-700 rounded-lg mb-3 flex items-center justify-center">
                        <div className="text-center">
                          <div className="h-16 w-16 bg-forest-200 dark:bg-forest-600 rounded-lg mx-auto mb-2" />
                          <p className="body-xs text-forest-600 dark:text-forest-400">Property Image</p>
                        </div>
                      </div>
                      <h3 className="heading-md text-forest-900 dark:text-forest-50 mb-1">{property.title}</h3>
                      <div className="flex items-center text-forest-600 dark:text-forest-400 body-sm">
                        <MapPin className="h-3 w-3 mr-1" />
                        {property.location}
                      </div>
                    </td>
                  ))}
                  {selectedProperties.length < 4 && (
                    <td className="p-4 min-w-[280px]">
                      <button
                        onClick={handleAddProperty}
                        className="h-full w-full border-2 border-dashed border-border-default rounded-lg flex flex-col items-center justify-center py-12 hover:border-forest-300 dark:hover:border-forest-700 transition-colors"
                      >
                        <Plus className="h-8 w-8 text-forest-400 mb-2" />
                        <span className="body-md text-forest-600 dark:text-forest-400">Add Property</span>
                      </button>
                    </td>
                  )}
                </tr>

                {/* Price */}
                <tr className="border-b border-border-default">
                  <td className="p-4 bg-surface-secondary dark:bg-forest-900 font-medium body-md text-forest-900 dark:text-forest-50">
                    <div className="flex items-center">
                      <DollarSign className="h-4 w-4 mr-2" />
                      Price
                    </div>
                  </td>
                  {comparisonProperties.map((property) => (
                    <td key={property.id} className="p-4">
                      <p className="heading-lg text-forest-900 dark:text-forest-50">{property.price}</p>
                      <p className="body-sm text-forest-600 dark:text-forest-400">{property.pricePerSqm}</p>
                    </td>
                  ))}
                  {selectedProperties.length < 4 && <td className="p-4" />}
                </tr>

                {/* Rating */}
                <tr className="border-b border-border-default">
                  <td className="p-4 bg-surface-secondary dark:bg-forest-900 font-medium body-md text-forest-900 dark:text-forest-50">
                    <div className="flex items-center">
                      <Star className="h-4 w-4 mr-2" />
                      Rating
                    </div>
                  </td>
                  {comparisonProperties.map((property) => (
                    <td key={property.id} className="p-4">
                      <div className="flex items-center">
                        <Star className="h-4 w-4 text-yellow-500 mr-1 fill-current" />
                        <span className="heading-md text-forest-900 dark:text-forest-50">{property.rating}</span>
                      </div>
                    </td>
                  ))}
                  {selectedProperties.length < 4 && <td className="p-4" />}
                </tr>

                {/* Type */}
                <tr className="border-b border-border-default">
                  <td className="p-4 bg-surface-secondary dark:bg-forest-900 font-medium body-md text-forest-900 dark:text-forest-50">
                    Property Type
                  </td>
                  {comparisonProperties.map((property) => (
                    <td key={property.id} className="p-4 body-md text-forest-900 dark:text-forest-50">
                      {property.type}
                    </td>
                  ))}
                  {selectedProperties.length < 4 && <td className="p-4" />}
                </tr>

                {/* Bedrooms */}
                <tr className="border-b border-border-default">
                  <td className="p-4 bg-surface-secondary dark:bg-forest-900 font-medium body-md text-forest-900 dark:text-forest-50">
                    <div className="flex items-center">
                      <Bed className="h-4 w-4 mr-2" />
                      Bedrooms
                    </div>
                  </td>
                  {comparisonProperties.map((property) => (
                    <td key={property.id} className="p-4 body-md text-forest-900 dark:text-forest-50">
                      {property.bedrooms}
                    </td>
                  ))}
                  {selectedProperties.length < 4 && <td className="p-4" />}
                </tr>

                {/* Bathrooms */}
                <tr className="border-b border-border-default">
                  <td className="p-4 bg-surface-secondary dark:bg-forest-900 font-medium body-md text-forest-900 dark:text-forest-50">
                    <div className="flex items-center">
                      <Bath className="h-4 w-4 mr-2" />
                      Bathrooms
                    </div>
                  </td>
                  {comparisonProperties.map((property) => (
                    <td key={property.id} className="p-4 body-md text-forest-900 dark:text-forest-50">
                      {property.bathrooms}
                    </td>
                  ))}
                  {selectedProperties.length < 4 && <td className="p-4" />}
                </tr>

                {/* Area */}
                <tr className="border-b border-border-default">
                  <td className="p-4 bg-surface-secondary dark:bg-forest-900 font-medium body-md text-forest-900 dark:text-forest-50">
                    <div className="flex items-center">
                      <Maximize className="h-4 w-4 mr-2" />
                      Area
                    </div>
                  </td>
                  {comparisonProperties.map((property) => (
                    <td key={property.id} className="p-4 body-md text-forest-900 dark:text-forest-50">
                      {property.area}
                    </td>
                  ))}
                  {selectedProperties.length < 4 && <td className="p-4" />}
                </tr>

                {/* Furnished */}
                <tr className="border-b border-border-default">
                  <td className="p-4 bg-surface-secondary dark:bg-forest-900 font-medium body-md text-forest-900 dark:text-forest-50">
                    Furnished
                  </td>
                  {comparisonProperties.map((property) => (
                    <td key={property.id} className="p-4 body-md text-forest-900 dark:text-forest-50">
                      {property.furnished}
                    </td>
                  ))}
                  {selectedProperties.length < 4 && <td className="p-4" />}
                </tr>

                {/* Parking */}
                <tr className="border-b border-border-default">
                  <td className="p-4 bg-surface-secondary dark:bg-forest-900 font-medium body-md text-forest-900 dark:text-forest-50">
                    Parking
                  </td>
                  {comparisonProperties.map((property) => (
                    <td key={property.id} className="p-4 body-md text-forest-900 dark:text-forest-50">
                      {property.parking}
                    </td>
                  ))}
                  {selectedProperties.length < 4 && <td className="p-4" />}
                </tr>

                {/* Year Built */}
                <tr className="border-b border-border-default">
                  <td className="p-4 bg-surface-secondary dark:bg-forest-900 font-medium body-md text-forest-900 dark:text-forest-50">
                    <div className="flex items-center">
                      <Calendar className="h-4 w-4 mr-2" />
                      Year Built
                    </div>
                  </td>
                  {comparisonProperties.map((property) => (
                    <td key={property.id} className="p-4 body-md text-forest-900 dark:text-forest-50">
                      {property.yearBuilt}
                    </td>
                  ))}
                  {selectedProperties.length < 4 && <td className="p-4" />}
                </tr>

                {/* Amenities */}
                <tr>
                  <td className="p-4 bg-surface-secondary dark:bg-forest-900 font-medium body-md text-forest-900 dark:text-forest-50">
                    Amenities
                  </td>
                  {comparisonProperties.map((property) => (
                    <td key={property.id} className="p-4">
                      <div className="flex flex-wrap gap-2">
                        {property.amenities.map((amenity, index) => (
                          <span
                            key={`amenity-${index}`}
                            className="px-2 py-1 bg-forest-100 dark:bg-forest-700 text-forest-900 dark:text-forest-50 text-xs rounded-full"
                          >
                            {amenity}
                          </span>
                        ))}
                      </div>
                    </td>
                  ))}
                  {selectedProperties.length < 4 && <td className="p-4" />}
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* Comparison Summary */}
        <div className="bg-forest-50 dark:bg-forest-900 rounded-xl border border-border-default p-6">
          <h3 className="heading-md text-forest-900 dark:text-forest-50 mb-4">Comparison Summary</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-white dark:bg-forest-800 rounded-lg p-4">
              <p className="body-sm text-forest-600 dark:text-forest-400 mb-1">Best Value</p>
              <p className="heading-md text-forest-900 dark:text-forest-50">
                {comparisonProperties.reduce((best, current) =>
                  parseFloat(current.pricePerSqm.replace(/[^\d.]/g, '')) <
                  parseFloat(best.pricePerSqm.replace(/[^\d.]/g, ''))
                    ? current
                    : best
                ).title}
              </p>
            </div>
            <div className="bg-white dark:bg-forest-800 rounded-lg p-4">
              <p className="body-sm text-forest-600 dark:text-forest-400 mb-1">Highest Rated</p>
              <p className="heading-md text-forest-900 dark:text-forest-50">
                {comparisonProperties.reduce((best, current) =>
                  current.rating > best.rating ? current : best
                ).title}
              </p>
            </div>
            <div className="bg-white dark:bg-forest-800 rounded-lg p-4">
              <p className="body-sm text-forest-600 dark:text-forest-400 mb-1">Most Spacious</p>
              <p className="heading-md text-forest-900 dark:text-forest-50">
                {comparisonProperties.reduce((best, current) =>
                  parseInt(current.area) > parseInt(best.area) ? current : best
                ).title}
              </p>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
