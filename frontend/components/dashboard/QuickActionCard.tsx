import { LucideIcon } from 'lucide-react';
import Link from 'next/link';
import { cn } from '@/lib/utils';

interface QuickActionCardProps {
  title: string;
  description: string;
  icon: LucideIcon;
  href: string;
  className?: string;
}

export function QuickActionCard({ title, description, icon: Icon, href, className }: QuickActionCardProps) {
  return (
    <Link
      href={href}
      className={cn(
        'group bg-white dark:bg-forest-800 rounded-xl border border-border-default p-6 hover:border-forest-300 dark:hover:border-forest-700 transition-all hover:shadow-sm',
        className
      )}
    >
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center justify-center w-12 h-12 bg-forest-100 dark:bg-forest-700 rounded-lg group-hover:bg-forest-200 dark:group-hover:bg-forest-600 transition-colors">
          <Icon className="h-6 w-6 text-forest-600 dark:text-forest-400" />
        </div>
        <div className="flex items-center justify-center w-8 h-8 rounded-full bg-forest-50 dark:bg-forest-900 opacity-0 group-hover:opacity-100 transition-opacity">
          <svg
            className="h-4 w-4 text-forest-600 dark:text-forest-400"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </div>
      </div>
      <h3 className="heading-md text-forest-900 dark:text-forest-50 mb-2">{title}</h3>
      <p className="body-sm text-forest-600 dark:text-forest-400">{description}</p>
    </Link>
  );
}
