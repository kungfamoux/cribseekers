import { cn } from '@/lib/utils';

export function SkeletonLoader({ className }: { className?: string }) {
  return (
    <div className={cn('animate-pulse bg-surface-secondary dark:bg-forest-700 rounded', className)} />
  );
}

export function StatsCardSkeleton() {
  return (
    <div className="bg-white dark:bg-forest-800 rounded-xl border border-border-default p-6">
      <div className="flex items-center justify-between mb-4">
        <SkeletonLoader className="w-12 h-12 rounded-lg" />
        <SkeletonLoader className="w-16 h-6 rounded" />
      </div>
      <SkeletonLoader className="h-4 w-24 mb-2 rounded" />
      <SkeletonLoader className="h-8 w-32 rounded" />
    </div>
  );
}

export function CardSkeleton() {
  return (
    <div className="bg-white dark:bg-forest-800 rounded-xl border border-border-default p-6">
      <SkeletonLoader className="w-full h-40 rounded-lg mb-4" />
      <SkeletonLoader className="h-4 w-3/4 mb-2 rounded" />
      <SkeletonLoader className="h-4 w-1/2 rounded" />
    </div>
  );
}
