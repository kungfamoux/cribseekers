import { useState } from 'react';
import { cn } from '@/lib/utils';
import { X, Filter } from 'lucide-react';

interface InspectionFilterPanelProps {
  isOpen: boolean;
  onClose: () => void;
  onApply: (filters: {
    status: string;
    type: string;
    dateRange: string;
    agent: string;
  }) => void;
  onClear: () => void;
  className?: string;
}

export function InspectionFilterPanel({
  isOpen,
  onClose,
  onApply,
  onClear,
  className,
}: InspectionFilterPanelProps) {
  const [status, setStatus] = useState('all');
  const [type, setType] = useState('all');
  const [dateRange, setDateRange] = useState('all');
  const [agent, setAgent] = useState('all');

  const handleApply = () => {
    onApply({
      status,
      type,
      dateRange,
      agent,
    });
    onClose();
  };

  const handleClear = () => {
    setStatus('all');
    setType('all');
    setDateRange('all');
    setAgent('all');
    onClear();
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className={cn('bg-white dark:bg-forest-800 rounded-xl border border-border-default p-6', className)}>
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-2">
          <Filter className="h-5 w-5 text-forest-600 dark:text-forest-400" />
          <h3 className="heading-md text-forest-900 dark:text-forest-50">Filters</h3>
        </div>
        <button
          onClick={onClose}
          className="p-2 hover:bg-surface-secondary dark:hover:bg-forest-700 rounded-lg transition-colors"
        >
          <X className="h-5 w-5 text-forest-600 dark:text-forest-400" />
        </button>
      </div>

      {/* Filters */}
      <div className="space-y-6">
        {/* Status */}
        <div>
          <label className="block body-sm font-medium text-forest-900 dark:text-forest-50 mb-2">
            Status
          </label>
          <select
            value={status}
            onChange={(e) => setStatus(e.target.value)}
            className="w-full px-4 py-2 border border-border-default rounded-lg bg-surface-primary dark:bg-forest-700 text-forest-900 dark:text-forest-50 focus:outline-none focus:ring-2 focus:ring-forest-500"
          >
            <option value="all">All Status</option>
            <option value="pending">Pending</option>
            <option value="confirmed">Confirmed</option>
            <option value="completed">Completed</option>
            <option value="cancelled">Cancelled</option>
            <option value="rescheduled">Rescheduled</option>
          </select>
        </div>

        {/* Type */}
        <div>
          <label className="block body-sm font-medium text-forest-900 dark:text-forest-50 mb-2">
            Inspection Type
          </label>
          <select
            value={type}
            onChange={(e) => setType(e.target.value)}
            className="w-full px-4 py-2 border border-border-default rounded-lg bg-surface-primary dark:bg-forest-700 text-forest-900 dark:text-forest-50 focus:outline-none focus:ring-2 focus:ring-forest-500"
          >
            <option value="all">All Types</option>
            <option value="in_person">In-Person</option>
            <option value="virtual">Virtual</option>
            <option value="self_tour">Self-Tour</option>
          </select>
        </div>

        {/* Date Range */}
        <div>
          <label className="block body-sm font-medium text-forest-900 dark:text-forest-50 mb-2">
            Date Range
          </label>
          <select
            value={dateRange}
            onChange={(e) => setDateRange(e.target.value)}
            className="w-full px-4 py-2 border border-border-default rounded-lg bg-surface-primary dark:bg-forest-700 text-forest-900 dark:text-forest-50 focus:outline-none focus:ring-2 focus:ring-forest-500"
          >
            <option value="all">All Time</option>
            <option value="today">Today</option>
            <option value="week">This Week</option>
            <option value="month">This Month</option>
            <option value="upcoming">Upcoming</option>
            <option value="past">Past</option>
          </select>
        </div>

        {/* Agent */}
        <div>
          <label className="block body-sm font-medium text-forest-900 dark:text-forest-50 mb-2">
            Agent
          </label>
          <select
            value={agent}
            onChange={(e) => setAgent(e.target.value)}
            className="w-full px-4 py-2 border border-border-default rounded-lg bg-surface-primary dark:bg-forest-700 text-forest-900 dark:text-forest-50 focus:outline-none focus:ring-2 focus:ring-forest-500"
          >
            <option value="all">All Agents</option>
            <option value="assigned">Assigned Agent</option>
            <option value="unassigned">Unassigned</option>
          </select>
        </div>
      </div>

      {/* Actions */}
      <div className="flex items-center gap-3 mt-6 pt-6 border-t border-border-default">
        <button
          onClick={handleClear}
          className="flex-1 inline-flex items-center justify-center px-4 py-2 border border-border-default rounded-lg hover:bg-surface-secondary dark:hover:bg-forest-700 transition-colors body-md font-medium text-forest-900 dark:text-forest-50"
        >
          Clear All
        </button>
        <button
          onClick={handleApply}
          className="flex-1 inline-flex items-center justify-center px-4 py-2 bg-forest-900 text-white rounded-lg hover:bg-forest-800 transition-colors body-md font-medium"
        >
          Apply Filters
        </button>
      </div>
    </div>
  );
}
