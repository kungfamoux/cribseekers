import { LucideIcon } from 'lucide-react';
import { cn } from '@/lib/utils';

interface EmptyStateProps {
  icon: LucideIcon;
  title: string;
  description: string;
  action?: {
    label: string;
    onClick: () => void;
  };
  className?: string;
}

export function EmptyState({ icon: Icon, title, description, action, className }: EmptyStateProps) {
  return (
    <div className={cn('flex flex-col items-center justify-center py-12 text-center', className)}>
      <div className="flex items-center justify-center w-20 h-20 bg-forest-100 dark:bg-forest-700 rounded-full mb-6">
        <Icon className="h-10 w-10 text-forest-400" />
      </div>
      <h3 className="heading-lg text-forest-900 dark:text-forest-50 mb-2">{title}</h3>
      <p className="body-md text-forest-600 dark:text-forest-400 mb-6 max-w-md">{description}</p>
      {action && (
        <button
          onClick={action.onClick}
          className="px-6 py-3 bg-forest-900 text-white rounded-lg hover:bg-forest-800 transition-colors body-md font-medium"
        >
          {action.label}
        </button>
      )}
    </div>
  );
}
