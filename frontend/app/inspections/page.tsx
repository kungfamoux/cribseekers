'use client';

export const dynamic = 'force-dynamic';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { DashboardLayout, EmptyState } from '@/components/dashboard';
import { InspectionCard } from '@/components/inspections/InspectionCard';
import { InspectionReminderCard } from '@/components/inspections/InspectionReminderCard';
import { Calendar, Plus, Filter, Search } from 'lucide-react';
import Link from 'next/link';
import { toast } from 'sonner';
import { API_ENDPOINTS } from '@/services/api/endpoints';
import { useQuery } from '@tanstack/react-query';
import { cn } from '@/lib/utils';
import { Inspection } from '@/types/inspection.types';

export default function InspectionsDashboardPage() {
  const router = useRouter();
  const [viewMode, setViewMode] = useState<'upcoming' | 'past' | 'cancelled'>('upcoming');
  const [searchQuery, setSearchQuery] = useState('');
  const [showFilters, setShowFilters] = useState(false);

  // Fetch inspections from backend
  const { data: inspections, isLoading, error } = useQuery({
    queryKey: ['inspections'],
    queryFn: async () => {
      const response = await fetch(API_ENDPOINTS.INSPECTIONS);
      if (!response.ok) throw new Error('Failed to fetch inspections');
      return response.json();
    },
  });

  const getInspections = () => {
    if (!inspections) return [];
    return inspections.filter((inspection: Inspection) => {
      if (viewMode === 'upcoming') return ['pending', 'confirmed'].includes(inspection.status);
      if (viewMode === 'past') return inspection.status === 'completed';
      if (viewMode === 'cancelled') return inspection.status === 'cancelled';
      return true;
    });
  };

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

  const filteredInspections = getInspections().filter((inspection: Inspection) =>
    inspection.property?.title?.toLowerCase().includes(searchQuery.toLowerCase()) ||
    inspection.property?.address?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const stats = {
    upcoming: inspections?.filter((i: Inspection) => ['pending', 'confirmed'].includes(i.status)).length || 0,
    completed: inspections?.filter((i: Inspection) => i.status === 'completed').length || 0,
    cancelled: inspections?.filter((i: Inspection) => i.status === 'cancelled').length || 0,
  };

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="heading-xl text-forest-900 dark:text-forest-50 mb-2">Inspections</h1>
            <p className="body-md text-forest-600 dark:text-forest-400">
              Manage your property inspections
            </p>
          </div>
          <Link href="/inspections/book">
            <button className="inline-flex items-center px-4 py-2 bg-forest-900 text-white rounded-lg hover:bg-forest-800 transition-colors body-md font-medium">
              <Plus className="h-4 w-4 mr-2" />
              Book Inspection
            </button>
          </Link>
        </div>

        {/* Reminder Card */}
        {!isLoading && inspections && inspections.length > 0 && ['pending', 'confirmed'].includes(inspections[0].status) && (
          <InspectionReminderCard
            inspection={inspections[0]}
            onViewDetails={() => handleViewDetails(inspections[0].id)}
          />
        )}

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-white dark:bg-forest-800 rounded-xl border border-border-default p-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-blue-100 dark:bg-blue-900/20 rounded-lg flex items-center justify-center">
                <Calendar className="h-5 w-5 text-blue-600 dark:text-blue-400" />
              </div>
              <div>
                <p className="heading-lg text-forest-900 dark:text-forest-50">{stats.upcoming}</p>
                <p className="body-xs text-forest-600 dark:text-forest-400">Upcoming</p>
              </div>
            </div>
          </div>
          <div className="bg-white dark:bg-forest-800 rounded-xl border border-border-default p-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-green-100 dark:bg-green-900/20 rounded-lg flex items-center justify-center">
                <Calendar className="h-5 w-5 text-green-600 dark:text-green-400" />
              </div>
              <div>
                <p className="heading-lg text-forest-900 dark:text-forest-50">{stats.completed}</p>
                <p className="body-xs text-forest-600 dark:text-forest-400">Completed</p>
              </div>
            </div>
          </div>
          <div className="bg-white dark:bg-forest-800 rounded-xl border border-border-default p-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-red-100 dark:bg-red-900/20 rounded-lg flex items-center justify-center">
                <Calendar className="h-5 w-5 text-red-600 dark:text-red-400" />
              </div>
              <div>
                <p className="heading-lg text-forest-900 dark:text-forest-50">{stats.cancelled}</p>
                <p className="body-xs text-forest-600 dark:text-forest-400">Cancelled</p>
              </div>
            </div>
          </div>
        </div>

        {/* Toolbar */}
        <div className="flex items-center gap-4">
          {/* View Tabs */}
          <div className="flex items-center bg-surface-secondary dark:bg-forest-700 rounded-lg p-1">
            {[
              { value: 'upcoming', label: 'Upcoming' },
              { value: 'past', label: 'Past' },
              { value: 'cancelled', label: 'Cancelled' },
            ].map((tab) => (
              <button
                key={tab.value}
                onClick={() => setViewMode(tab.value as 'upcoming' | 'past' | 'cancelled')}
                className={cn(
                  'px-4 py-2 rounded-md body-sm font-medium transition-colors',
                  viewMode === tab.value
                    ? 'bg-white dark:bg-forest-600 text-forest-900 dark:text-forest-50 shadow-sm'
                    : 'text-forest-600 dark:text-forest-400 hover:text-forest-900 dark:hover:text-forest-50'
                )}
              >
                {tab.label}
              </button>
            ))}
          </div>

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
            description="Get started by booking your first property inspection"
            action={{
              label: 'Book Inspection',
              onClick: () => router.push('/inspections/book'),
            }}
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

