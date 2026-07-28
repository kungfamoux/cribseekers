'use client';

export const dynamic = 'force-dynamic';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { DashboardLayout, EmptyState } from '@/components/dashboard';
import { InspectionCard } from '@/components/inspections/InspectionCard';
import { InspectionFilterPanel } from '@/components/inspections/InspectionFilterPanel';
import { Calendar, Search, Filter } from 'lucide-react';
import { toast } from 'sonner';
import { API_ENDPOINTS } from '@/services/api/endpoints';
import { useQuery } from '@tanstack/react-query';
import { cn } from '@/lib/utils';
import { Inspection, InspectionFilters } from '@/types/inspection.types';

export default function InspectionHistoryPage() {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState('');
  const [showFilters, setShowFilters] = useState(false);
  const [filters, setFilters] = useState({
    status: 'all',
    type: 'all',
    dateRange: 'all',
  });

  // Fetch inspections from backend
  const { data: inspections, isLoading, error } = useQuery({
    queryKey: ['inspections'],
    queryFn: async () => {
      const response = await fetch(API_ENDPOINTS.INSPECTIONS);
      if (!response.ok) throw new Error('Failed to fetch inspections');
      return response.json();
    },
  });

  const handleViewDetails = (id: string) => {
    router.push(`/inspections/${id}`);
  };

  const handleReschedule = (id: string) => {
    router.push(`/inspections/${id}/reschedule`);
  };

  const handleCancel = (id: string) => {
    router.push(`/inspections/${id}/cancel`);
  };

  const handleContactAgent = () => {
    toast.success('Opening chat with agent');
  };

  const handleFilterApply = (newFilters: InspectionFilters) => {
    setFilters(newFilters);
  };

  const handleFilterClear = () => {
    setFilters({ status: 'all', type: 'all', dateRange: 'all' });
  };

  const filteredInspections = inspections?.filter((inspection: Inspection) => {
    const matchesSearch = inspection.property?.title?.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          inspection.property?.address?.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = filters.status === 'all' || inspection.status === filters.status;
    const matchesType = filters.type === 'all' || inspection.type === filters.type;
    
    return matchesSearch && matchesStatus && matchesType;
  }) || [];

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="heading-xl text-forest-900 dark:text-forest-50 mb-2">Inspection History</h1>
            <p className="body-md text-forest-600 dark:text-forest-400">
              View all your past and upcoming inspections
            </p>
          </div>
        </div>

        {/* Toolbar */}
        <div className="flex items-center gap-4">
          {/* Search */}
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-forest-400" />
            <input
              type="text"
              placeholder="Search inspections..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-border-default rounded-lg bg-surface-primary dark:bg-forest-700 text-forest-900 dark:text-forest-50 placeholder-forest-400 focus:outline-none focus:ring-2 focus:ring-forest-500"
            />
          </div>

          {/* Filter Button */}
          <button
            onClick={() => setShowFilters(!showFilters)}
            className={cn(
              'inline-flex items-center px-4 py-2 border rounded-lg body-md font-medium transition-colors',
              showFilters
                ? 'border-forest-900 bg-forest-50 dark:bg-forest-900/20 text-forest-900 dark:text-forest-50'
                : 'border-border-default hover:border-forest-900 text-forest-600 dark:text-forest-400'
            )}
          >
            <Filter className="h-4 w-4 mr-2" />
            Filter
          </button>
        </div>

        {/* Filter Panel */}
        {showFilters && (
          <InspectionFilterPanel
            isOpen={showFilters}
            onClose={() => setShowFilters(false)}
            onApply={handleFilterApply}
            onClear={handleFilterClear}
          />
        )}

        {/* Inspections Grid */}
        {isLoading ? (
          <div className="flex items-center justify-center py-12">
            <div className="text-center">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-forest-900 mx-auto mb-4" />
              <p className="body-sm text-forest-600 dark:text-forest-400">Loading inspections...</p>
            </div>
          </div>
        ) : error ? (
          <div className="flex items-center justify-center py-12">
            <div className="text-center">
              <p className="body-md text-red-600 dark:text-red-400 mb-2">Failed to load inspections</p>
              <button
                onClick={() => window.location.reload()}
                className="inline-flex items-center px-4 py-2 bg-forest-900 text-white rounded-lg hover:bg-forest-800 transition-colors body-sm font-medium"
              >
                Retry
              </button>
            </div>
          </div>
        ) : filteredInspections.length === 0 ? (
          <EmptyState
            icon={Calendar}
            title="No inspections found"
            description="Your inspection history will appear here"
          />
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredInspections.map((inspection: Inspection) => (
              <InspectionCard
                key={inspection.id}
                inspection={inspection}
                onViewDetails={handleViewDetails}
                onReschedule={handleReschedule}
                onCancel={handleCancel}
                onContactAgent={handleContactAgent}
              />
            ))}
          </div>
        )}
      </div>
    </DashboardLayout>
  );
}
