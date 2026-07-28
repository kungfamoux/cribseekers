'use client';

export const dynamic = 'force-dynamic';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { DashboardLayout, EmptyState } from '@/components/dashboard';
import { InspectionCard } from '@/components/inspections/InspectionCard';
import { Calendar, Clock, User } from 'lucide-react';
import { API_ENDPOINTS } from '@/services/api/endpoints';
import { useQuery } from '@tanstack/react-query';
import { Inspection } from '@/types/inspection.types';

export default function InspectorSchedulePage() {
  const router = useRouter();
  const [viewMode, setViewMode] = useState<'today' | 'week' | 'upcoming'>('today');

  // Fetch scheduled inspections
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

  const getFilteredInspections = () => {
    if (!inspections) return [];
    const today = new Date().toDateString();
    
    return inspections.filter((inspection: Inspection) => {
      const inspectionDate = new Date(inspection.date).toDateString();
      
      if (viewMode === 'today') {
        return inspectionDate === today && ['confirmed', 'in_progress'].includes(inspection.status);
      } else if (viewMode === 'week') {
        const weekFromNow = new Date();
        weekFromNow.setDate(weekFromNow.getDate() + 7);
        const inspectionDateObj = new Date(inspection.date);
        return inspectionDateObj >= new Date() && inspectionDateObj <= weekFromNow;
      } else {
        return inspectionDate >= today && ['confirmed', 'pending'].includes(inspection.status);
      }
    });
  };

  const stats = {
    today: inspections?.filter((i: Inspection) => new Date(i.date).toDateString() === new Date().toDateString() && ['confirmed', 'in_progress'].includes(i.status)).length || 0,
    week: inspections?.filter((i: Inspection) => {
      const inspectionDate = new Date(i.date);
      const weekFromNow = new Date();
      weekFromNow.setDate(weekFromNow.getDate() + 7);
      return inspectionDate >= new Date() && inspectionDate <= weekFromNow;
    }).length || 0,
    upcoming: inspections?.filter((i: Inspection) => new Date(i.date) >= new Date() && ['confirmed', 'pending'].includes(i.status)).length || 0,
  };

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Header */}
        <div>
          <h1 className="heading-xl text-forest-900 dark:text-forest-50 mb-2">Inspector Schedule</h1>
          <p className="body-md text-forest-600 dark:text-forest-400">
            Manage your inspection appointments
          </p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-white dark:bg-forest-800 rounded-xl border border-border-default p-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-blue-100 dark:bg-blue-900/20 rounded-lg flex items-center justify-center">
                <Calendar className="h-5 w-5 text-blue-600 dark:text-blue-400" />
              </div>
              <div>
                <p className="heading-lg text-forest-900 dark:text-forest-50">{stats.today}</p>
                <p className="body-xs text-forest-600 dark:text-forest-400">Today</p>
              </div>
            </div>
          </div>
          <div className="bg-white dark:bg-forest-800 rounded-xl border border-border-default p-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-green-100 dark:bg-green-900/20 rounded-lg flex items-center justify-center">
                <Clock className="h-5 w-5 text-green-600 dark:text-green-400" />
              </div>
              <div>
                <p className="heading-lg text-forest-900 dark:text-forest-50">{stats.week}</p>
                <p className="body-xs text-forest-600 dark:text-forest-400">This Week</p>
              </div>
            </div>
          </div>
          <div className="bg-white dark:bg-forest-800 rounded-xl border border-border-default p-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-purple-100 dark:bg-purple-900/20 rounded-lg flex items-center justify-center">
                <User className="h-5 w-5 text-purple-600 dark:text-purple-400" />
              </div>
              <div>
                <p className="heading-lg text-forest-900 dark:text-forest-50">{stats.upcoming}</p>
                <p className="body-xs text-forest-600 dark:text-forest-400">Upcoming</p>
              </div>
            </div>
          </div>
        </div>

        {/* View Tabs */}
        <div className="flex items-center bg-surface-secondary dark:bg-forest-700 rounded-lg p-1">
          {[
            { value: 'today', label: 'Today' },
            { value: 'week', label: 'This Week' },
            { value: 'upcoming', label: 'Upcoming' },
          ].map((tab) => (
            <button
              key={tab.value}
              onClick={() => setViewMode(tab.value as 'today' | 'week' | 'upcoming')}
              className={`px-4 py-2 rounded-md body-sm font-medium transition-colors ${
                viewMode === tab.value
                  ? 'bg-white dark:bg-forest-600 text-forest-900 dark:text-forest-50 shadow-sm'
                  : 'text-forest-600 dark:text-forest-400 hover:text-forest-900 dark:hover:text-forest-50'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Inspections List */}
        {isLoading ? (
          <div className="flex items-center justify-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-forest-900" />
          </div>
        ) : error ? (
          <div className="flex items-center justify-center py-12">
            <div className="text-center">
              <p className="body-md text-red-600 dark:text-red-400 mb-2">Failed to load schedule</p>
              <button
                onClick={() => window.location.reload()}
                className="inline-flex items-center px-4 py-2 bg-forest-900 text-white rounded-lg hover:bg-forest-800 transition-colors body-sm font-medium"
              >
                Retry
              </button>
            </div>
          </div>
        ) : getFilteredInspections().length === 0 ? (
          <EmptyState
            icon={Calendar}
            title="No scheduled inspections"
            description="Your upcoming inspections will appear here"
          />
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {getFilteredInspections().map((inspection: Inspection) => (
              <InspectionCard
                key={inspection.id}
                inspection={inspection}
                onViewDetails={handleViewDetails}
              />
            ))}
          </div>
        )}
      </div>
    </DashboardLayout>
  );
}
