import { cn } from '@/lib/utils';
import { AlertCircle, Edit2, Plus, X } from 'lucide-react';

interface PropertyRulesCardProps {
  rules: string[];
  availableRules?: string[];
  onEdit?: () => void;
  onAdd?: (rule: string) => void;
  onRemove?: (rule: string) => void;
  className?: string;
}

const COMMON_RULES = [
  'No Smoking',
  'No Pets',
  'No Parties',
  'Quiet Hours (10PM - 7AM)',
  'No Guests After 10PM',
  'No Subletting',
  'Utilities Included',
  'Maintenance Included',
  'Furnished',
  'Unfurnished',
];

export function PropertyRulesCard({
  rules,
  availableRules = COMMON_RULES,
  onEdit,
  onAdd,
  onRemove,
  className,
}: PropertyRulesCardProps) {
  return (
    <div
      className={cn(
        'bg-surface-primary dark:bg-forest-800 rounded-xl border border-border-default p-6',
        className
      )}
    >
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <AlertCircle className="h-5 w-5 text-forest-900 dark:text-forest-50" />
          <h3 className="heading-md text-forest-900 dark:text-forest-50">House Rules</h3>
        </div>
        {onEdit && (
          <button
            onClick={onEdit}
            className="p-2 hover:bg-surface-secondary dark:hover:bg-forest-700 rounded-lg transition-colors"
            aria-label="Edit rules"
          >
            <Edit2 className="h-4 w-4 text-forest-600 dark:text-forest-400" />
          </button>
        )}
      </div>

      {rules.length > 0 ? (
        <div className="space-y-2">
          {rules.map((rule) => (
            <div
              key={rule}
              className="flex items-center justify-between p-3 bg-forest-50 dark:bg-forest-700/50 rounded-lg"
            >
              <div className="flex items-center gap-2">
                <AlertCircle className="h-4 w-4 text-forest-600 dark:text-forest-400" />
                <span className="body-sm text-forest-900 dark:text-forest-50">{rule}</span>
              </div>
              {onRemove && (
                <button
                  onClick={() => onRemove(rule)}
                  className="p-1 hover:text-red-600 dark:hover:text-red-400 transition-colors"
                  aria-label={`Remove rule: ${rule}`}
                >
                  <X className="h-4 w-4" />
                </button>
              )}
            </div>
          ))}
        </div>
      ) : (
        <p className="body-sm text-forest-600 dark:text-forest-400">No rules specified</p>
      )}

      {onAdd && availableRules.length > 0 && (
        <div className="mt-4 pt-4 border-t border-border-default">
          <p className="body-xs text-forest-600 dark:text-forest-400 mb-2">Add common rules:</p>
          <div className="flex flex-wrap gap-2">
            {availableRules
              .filter((r) => !rules.includes(r))
              .slice(0, 6)
              .map((rule) => (
                <button
                  key={rule}
                  onClick={() => onAdd(rule)}
                  className="inline-flex items-center gap-1 px-3 py-1.5 border border-border-default rounded-full body-sm text-forest-600 dark:text-forest-400 hover:border-forest-900 dark:hover:border-forest-400 hover:text-forest-900 dark:hover:text-forest-50 transition-colors"
                >
                  <Plus className="h-3 w-3" />
                  {rule}
                </button>
              ))}
          </div>
        </div>
      )}
    </div>
  );
}
