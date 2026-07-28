'use client';

export const dynamic = 'force-dynamic';

import { useState } from 'react';
import { DashboardLayout, EmptyState } from '@/components/dashboard';
import { DraftCard } from '@/components/properties/DraftCard';
import { FileText, Trash2, Plus } from 'lucide-react';
import Link from 'next/link';
import { toast } from 'sonner';

export default function DraftsPage() {
  const [selectedDrafts, setSelectedDrafts] = useState<string[]>([]);

  const drafts = [
    {
      id: '1',
      title: 'Luxury Villa in Ikoyi',
      location: 'Ikoyi, Lagos',
      type: 'house',
      status: 'draft' as const,
      lastModified: '2024-01-20T10:30:00',
      progress: 75,
    },
    {
      id: '2',
      title: 'Commercial Office Space',
      location: 'Victoria Island, Lagos',
      type: 'commercial',
      status: 'draft' as const,
      lastModified: '2024-01-18T15:45:00',
      progress: 40,
    },
    {
      id: '3',
      title: '2-Bedroom Apartment',
      location: 'Yaba, Lagos',
      type: 'apartment',
      status: 'draft' as const,
      lastModified: '2024-01-15T09:20:00',
      progress: 20,
    },
  ];

  // const _handleSelectDraft = (id: string) => {
  //   setSelectedDrafts((prev) =>
  //     prev.includes(id) ? prev.filter((d) => d !== id) : [...prev, id]
  //   );
  // };


  const handleDeleteSelected = () => {
    toast.success('Drafts deleted successfully', {
      description: `${selectedDrafts.length} drafts have been removed`,
    });
    setSelectedDrafts([]);
  };

  // const _handleDuplicate = (_id: string) => {
  //   toast.success('Draft duplicated successfully', {
  //     description: 'A copy of the draft has been created',
  //   });
  // };

  const handleDelete = () => {
    toast.success('Draft deleted successfully', {
      description: 'The draft has been removed',
    });
  };


  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="heading-xl text-forest-900 dark:text-forest-50 mb-2">Drafts</h1>
            <p className="body-md text-forest-600 dark:text-forest-400">
              Continue editing your saved property drafts
            </p>
          </div>
          <Link href="/properties/create">
            <button className="inline-flex items-center px-4 py-2 bg-forest-900 text-white rounded-lg hover:bg-forest-800 transition-colors body-md font-medium">
              <Plus className="h-4 w-4 mr-2" />
              New Property
            </button>
          </Link>
        </div>

        {/* Bulk Actions */}
        {selectedDrafts.length > 0 && (
          <div className="flex items-center justify-between bg-forest-50 dark:bg-forest-900/20 rounded-lg p-4">
            <span className="body-sm text-forest-600 dark:text-forest-400">
              {selectedDrafts.length} drafts selected
            </span>
            <div className="flex items-center gap-2">
              <button
                onClick={handleDeleteSelected}
                className="inline-flex items-center px-3 py-1.5 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors body-sm"
              >
                <Trash2 className="h-4 w-4 mr-1" />
                Delete Selected
              </button>
            </div>
          </div>
        )}

        {/* Drafts List */}
        {drafts.length === 0 ? (
          <EmptyState
            icon={FileText}
            title="No drafts found"
            description="Start creating a property to save it as a draft"
            action={{
              label: 'Create Property',
              onClick: () => window.location.href = '/properties/create',
            }}
          />
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {drafts.map((draft) => (
              <DraftCard
                key={draft.id}
                property={draft}
                onEdit={(id) => window.location.href = `/properties/${id}/edit`}
                onDelete={handleDelete}
              />
            ))}
          </div>
        )}

        {/* Tips */}
        <div className="bg-blue-50 dark:bg-blue-900/20 rounded-xl border border-blue-200 dark:border-blue-800 p-6">
          <h3 className="heading-md text-blue-900 dark:text-blue-200 mb-3">Draft Tips</h3>
          <ul className="space-y-2 body-sm text-blue-800 dark:text-blue-300">
            <li>• Drafts are automatically saved as you work on your property</li>
            <li>• You can continue editing drafts at any time</li>
            <li>• Duplicate drafts to create similar properties quickly</li>
            <li>• Delete drafts you no longer need to keep your workspace clean</li>
          </ul>
        </div>
      </div>
    </DashboardLayout>
  );
}
