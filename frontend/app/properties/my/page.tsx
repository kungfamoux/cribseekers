'use client';

export const dynamic = 'force-dynamic';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { DashboardLayout, EmptyState } from '@/components/dashboard';
import { PropertyToolbar } from '@/components/properties/PropertyToolbar';
import { BulkActionBar } from '@/components/properties/BulkActionBar';
import { PropertyStatusBadge } from '@/components/properties/PropertyStatusBadge';
import { Plus, Edit2, Trash2, Eye, Home, Heart, Loader2 } from 'lucide-react';
import Link from 'next/link';
import { toast } from 'sonner';
import { useProperties, useDeleteProperty } from '@/hooks/useProperty';
import { Property } from '@/types';

export default function MyPropertiesPage() {
  const router = useRouter();
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [selectedProperties, setSelectedProperties] = useState<string[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<'all' | 'published' | 'draft' | 'pending' | 'rejected'>('all');
  const [typeFilter, setTypeFilter] = useState<'all' | 'apartment' | 'house' | 'land' | 'commercial' | 'office' | 'shop' | 'warehouse'>('all');
  const [showFilters, setShowFilters] = useState(false);
  
  const { data: propertiesData, isLoading } = useProperties({ status: statusFilter !== 'all' ? statusFilter : undefined });
  const deleteProperty = useDeleteProperty();
  
  const properties = propertiesData?.data || [];
  
  const filteredProperties = properties.filter((p: Property) => {
    const matchesSearch = p.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          p.location.address.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesType = typeFilter === 'all' || p.type === typeFilter;
    return matchesSearch && matchesType;
  });
  
  const handleBulkDelete = async () => {
    try {
      await Promise.all(selectedProperties.map(id => deleteProperty.mutateAsync(id)));
      setSelectedProperties([]);
      toast.success('Properties deleted successfully');
    } catch {
      toast.error('Failed to delete properties');
    }
  };
  
  
  const handleSelectProperty = (id: string) => {
    setSelectedProperties((prev: string[]) =>
      prev.includes(id) ? prev.filter((p) => p !== id) : [...prev, id]
    );
  };

  const handleSelectAll = () => {
    if (selectedProperties.length === filteredProperties.length) {
      setSelectedProperties([]);
    } else {
      setSelectedProperties(filteredProperties.map((p: Property) => p.id));
    }
  };

  const handleDeleteSelected = () => {
    handleBulkDelete();
  };

  const formatPrice = (price: number, currency: string) => {
    return new Intl.NumberFormat('en-NG', {
      style: 'currency',
      currency: currency,
      maximumFractionDigits: 0,
    }).format(price);
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
            <h1 className="heading-xl text-forest-900 dark:text-forest-50 mb-2">My Properties</h1>
            <p className="body-md text-forest-600 dark:text-forest-400">
              Manage your property listings
            </p>
          </div>
          <Link href="/properties/create">
            <button className="inline-flex items-center px-4 py-2 bg-forest-900 text-white rounded-lg hover:bg-forest-800 transition-colors body-md font-medium">
              <Plus className="h-4 w-4 mr-2" />
              Add Property
            </button>
          </Link>
        </div>

        {/* Toolbar */}
        <PropertyToolbar
          onSearch={setSearchQuery}
          currentView={viewMode}
          onViewChange={setViewMode}
          onFilter={() => setShowFilters(!showFilters)}
          onCreate={() => router.push('/properties/create')}
        />

        {/* Inline Filters */}
        {showFilters && (
          <div className="bg-white dark:bg-forest-800 rounded-xl border border-border-default p-4">
            <div className="flex items-center gap-3">
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value as 'all' | 'published' | 'draft' | 'pending' | 'rejected')}
                className="px-4 py-2 border border-border-default rounded-lg bg-surface-primary dark:bg-forest-700 text-forest-900 dark:text-forest-50 focus:outline-none focus:ring-2 focus:ring-forest-500"
              >
                <option value="all">All Status</option>
                <option value="published">Published</option>
                <option value="draft">Draft</option>
                <option value="pending">Pending</option>
                <option value="rejected">Rejected</option>
              </select>

              <select
                value={typeFilter}
                onChange={(e) => setTypeFilter(e.target.value as 'all' | 'apartment' | 'house' | 'land' | 'commercial' | 'office' | 'shop' | 'warehouse')}
                className="px-4 py-2 border border-border-default rounded-lg bg-surface-primary dark:bg-forest-700 text-forest-900 dark:text-forest-50 focus:outline-none focus:ring-2 focus:ring-forest-500"
              >
                <option value="all">All Types</option>
                <option value="apartment">Apartment</option>
                <option value="house">House</option>
                <option value="land">Land</option>
                <option value="commercial">Commercial</option>
              </select>
            </div>
          </div>
        )}

        {/* Bulk Action Bar */}
        {selectedProperties.length > 0 && (
          <BulkActionBar
            selectedCount={selectedProperties.length}
            onClear={() => setSelectedProperties([])}
            onPublish={() => toast.success('Properties published')}
            onUnpublish={() => toast.success('Properties unpublished')}
            onArchive={() => toast.success('Properties archived')}
            onDelete={handleDeleteSelected}
          />
        )}

        {/* Properties Grid/List */}
        {filteredProperties.length === 0 ? (
          <EmptyState
            icon={Home}
            title="No properties found"
            description="Get started by creating your first property listing"
            action={{
              label: 'Add Property',
              onClick: () => router.push('/properties/create'),
            }}
          />
        ) : (
          <>
            {viewMode === 'grid' ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredProperties.map((property: Property) => (
                  <div key={property.id} className="relative">
                    <input
                      type="checkbox"
                      checked={selectedProperties.includes(property.id)}
                      onChange={() => handleSelectProperty(property.id)}
                      className="absolute top-4 left-4 z-10 w-5 h-5 rounded border-2 border-white dark:border-forest-800 bg-transparent checked:bg-forest-900 cursor-pointer"
                    />
                    <div className="bg-white dark:bg-forest-800 rounded-xl border border-border-default overflow-hidden hover:shadow-lg transition-shadow">
                      {/* Image */}
                      <div className="relative h-48 bg-surface-secondary">
                        <img
                          src={property.images[0] || '/placeholder.jpg'}
                          alt={property.title}
                          className="w-full h-full object-cover"
                        />
                        <div className="absolute top-4 right-4">
                          <PropertyStatusBadge status={property.status as 'draft' | 'pending' | 'published' | 'rejected' | 'archived'} />
                        </div>
                      </div>

                      {/* Content */}
                      <div className="p-4">
                        <h3 className="heading-sm text-forest-900 dark:text-forest-50 mb-2 line-clamp-1">
                          {property.title}
                        </h3>
                        <p className="body-sm text-forest-600 dark:text-forest-400 mb-3 line-clamp-1">
                          {property.location.address}, {property.location.city}
                        </p>
                        <div className="flex items-center justify-between mb-3">
                          <span className="heading-md text-forest-900 dark:text-forest-50">
                            {formatPrice(property.price, property.currency)}
                          </span>
                        </div>
                        <div className="flex items-center gap-4 text-xs text-forest-600 dark:text-forest-400 mb-4">
                          <span>{property.features.bedrooms} Beds</span>
                          <span>{property.features.bathrooms} Baths</span>
                          <span>{property.features.area} {property.features.areaUnit}</span>
                        </div>
                        <div className="flex items-center justify-between pt-3 border-t border-border-default">
                          <div className="flex items-center gap-3 text-xs text-forest-600 dark:text-forest-400">
                            <span className="flex items-center">
                              <Eye className="h-3 w-3 mr-1" />
                              {property.views}
                            </span>
                            <span className="flex items-center">
                              <Heart className="h-3 w-3 mr-1" />
                              {property.favorites}
                            </span>
                          </div>
                          <Link href={`/properties/${property.id}/edit`}>
                            <button className="text-forest-600 dark:text-forest-400 hover:text-forest-900 dark:hover:text-forest-50">
                              <Edit2 className="h-4 w-4" />
                            </button>
                          </Link>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="bg-white dark:bg-forest-800 rounded-xl border border-border-default overflow-hidden">
                <table className="w-full">
                  <thead className="bg-surface-secondary dark:bg-forest-700">
                    <tr>
                      <th className="px-4 py-3 text-left">
                        <input
                          type="checkbox"
                          checked={selectedProperties.length === filteredProperties.length && filteredProperties.length > 0}
                          onChange={handleSelectAll}
                          className="w-5 h-5 rounded border-2 border-border-default bg-transparent checked:bg-forest-900 cursor-pointer"
                        />
                      </th>
                      <th className="px-4 py-3 text-left body-sm font-medium text-forest-900 dark:text-forest-50">Property</th>
                      <th className="px-4 py-3 text-left body-sm font-medium text-forest-900 dark:text-forest-50">Location</th>
                      <th className="px-4 py-3 text-left body-sm font-medium text-forest-900 dark:text-forest-50">Price</th>
                      <th className="px-4 py-3 text-left body-sm font-medium text-forest-900 dark:text-forest-50">Status</th>
                      <th className="px-4 py-3 text-left body-sm font-medium text-forest-900 dark:text-forest-50">Views</th>
                      <th className="px-4 py-3 text-left body-sm font-medium text-forest-900 dark:text-forest-50">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredProperties.map((property: Property) => (
                      <tr key={property.id} className="border-t border-border-default hover:bg-surface-secondary dark:hover:bg-forest-700">
                        <td className="px-4 py-3">
                          <input
                            type="checkbox"
                            checked={selectedProperties.includes(property.id)}
                            onChange={() => handleSelectProperty(property.id)}
                            className="w-5 h-5 rounded border-2 border-border-default bg-transparent checked:bg-forest-900 cursor-pointer"
                          />
                        </td>
                        <td className="px-4 py-3">
                          <div className="flex items-center space-x-3">
                            <img
                              src={property.images[0] || '/placeholder.jpg'}
                              alt={property.title}
                              className="w-12 h-12 rounded-lg object-cover"
                            />
                            <div>
                              <p className="body-sm font-medium text-forest-900 dark:text-forest-50 line-clamp-1">
                                {property.title}
                              </p>
                              <p className="body-xs text-forest-600 dark:text-forest-400">
                                {property.type}
                              </p>
                            </div>
                          </div>
                        </td>
                        <td className="px-4 py-3 body-sm text-forest-600 dark:text-forest-400">
                          {property.location.address}, {property.location.city}
                        </td>
                        <td className="px-4 py-3 body-sm font-medium text-forest-900 dark:text-forest-50">
                          {formatPrice(property.price, property.currency)}
                        </td>
                        <td className="px-4 py-3">
                          <PropertyStatusBadge status={property.status as 'draft' | 'pending' | 'published' | 'rejected' | 'archived'} />
                        </td>
                        <td className="px-4 py-3 body-sm text-forest-600 dark:text-forest-400">
                          {property.views}
                        </td>
                        <td className="px-4 py-3">
                          <div className="flex items-center space-x-2">
                            <Link href={`/properties/${property.id}/edit`}>
                              <button className="p-1.5 hover:bg-surface-secondary dark:hover:bg-forest-600 rounded-lg transition-colors">
                                <Edit2 className="h-4 w-4 text-forest-600 dark:text-forest-400" />
                              </button>
                            </Link>
                            <button className="p-1.5 hover:bg-surface-secondary dark:hover:bg-forest-600 rounded-lg transition-colors">
                              <Trash2 className="h-4 w-4 text-red-600" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}

            {/* Pagination */}
            <div className="flex items-center justify-between pt-4">
              <span className="body-sm text-forest-600 dark:text-forest-400">
                Showing 1-{filteredProperties.length} of {filteredProperties.length} properties
              </span>
              <div className="flex items-center gap-2">
                <button className="px-3 py-1.5 border border-border-default rounded-lg body-sm text-forest-600 dark:text-forest-400 hover:bg-surface-secondary dark:hover:bg-forest-700 disabled:opacity-50" disabled>
                  Previous
                </button>
                <button className="px-3 py-1.5 bg-forest-900 text-white rounded-lg body-sm hover:bg-forest-800 disabled:opacity-50" disabled>
                  Next
                </button>
              </div>
            </div>
          </>
        )}
      </div>
    </DashboardLayout>
  );
}
