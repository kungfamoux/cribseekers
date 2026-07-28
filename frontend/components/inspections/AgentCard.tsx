import { cn } from '@/lib/utils';
import { Star, MapPin, Phone, MessageSquare, Calendar } from 'lucide-react';

interface AgentCardProps {
  agent: {
    id: string;
    name: string;
    avatar?: string;
    rating?: number;
    reviewCount?: number;
    location?: string;
    phone?: string;
    specializations?: string[];
    available?: boolean;
  };
  onContact?: (agentId: string) => void;
  onBook?: (agentId: string) => void;
  className?: string;
}

export function AgentCard({ agent, onContact, onBook, className }: AgentCardProps) {
  return (
    <div className={cn(
      'bg-white dark:bg-forest-800 rounded-xl border border-border-default p-4 hover:shadow-lg transition-shadow',
      className
    )}>
      {/* Header */}
      <div className="flex items-start gap-4 mb-4">
        <div className="flex-shrink-0">
          {agent.avatar ? (
            <img
              src={agent.avatar}
              alt={agent.name}
              className="w-16 h-16 rounded-full object-cover"
            />
          ) : (
            <div className="w-16 h-16 rounded-full bg-forest-100 dark:bg-forest-700 flex items-center justify-center">
              <span className="heading-lg text-forest-600 dark:text-forest-400">
                {agent.name.charAt(0)}
              </span>
            </div>
          )}
        </div>
        
        <div className="flex-1 min-w-0">
          <h3 className="heading-md text-forest-900 dark:text-forest-50 mb-1">
            {agent.name}
          </h3>
          
          {agent.rating && (
            <div className="flex items-center gap-1 mb-2">
              <Star className="h-4 w-4 text-yellow-500 fill-yellow-500" />
              <span className="body-sm font-medium text-forest-900 dark:text-forest-50">
                {agent.rating.toFixed(1)}
              </span>
              {agent.reviewCount && (
                <span className="body-xs text-forest-600 dark:text-forest-400">
                  ({agent.reviewCount} reviews)
                </span>
              )}
            </div>
          )}
          
          {agent.location && (
            <div className="flex items-center gap-1 body-sm text-forest-600 dark:text-forest-400">
              <MapPin className="h-3.5 w-3.5" />
              <span className="line-clamp-1">{agent.location}</span>
            </div>
          )}
        </div>
        
        {agent.available !== undefined && (
          <div className={cn(
            'px-2 py-1 rounded-full text-xs font-medium',
            agent.available
              ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'
              : 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-200'
          )}>
            {agent.available ? 'Available' : 'Busy'}
          </div>
        )}
      </div>
      
      {/* Specializations */}
      {agent.specializations && agent.specializations.length > 0 && (
        <div className="flex flex-wrap gap-1.5 mb-4">
          {agent.specializations.map((spec) => (
            <span
              key={spec}
              className="inline-flex items-center px-2 py-1 rounded-md text-xs bg-forest-100 dark:bg-forest-700 text-forest-700 dark:text-forest-300"
            >
              {spec}
            </span>
          ))}
        </div>
      )}
      
      {/* Actions */}
      <div className="flex items-center gap-2">
        {onContact && (
          <button
            onClick={() => onContact(agent.id)}
            className="flex-1 inline-flex items-center justify-center gap-2 px-4 py-2 border border-border-default rounded-lg hover:bg-surface-secondary dark:hover:bg-forest-700 transition-colors body-sm font-medium text-forest-900 dark:text-forest-50"
          >
            <MessageSquare className="h-4 w-4" />
            Contact
          </button>
        )}
        
        {onBook && (
          <button
            onClick={() => onBook(agent.id)}
            className="flex-1 inline-flex items-center justify-center gap-2 px-4 py-2 bg-forest-900 text-white rounded-lg hover:bg-forest-800 transition-colors body-sm font-medium"
          >
            <Calendar className="h-4 w-4" />
            Book Inspection
          </button>
        )}
        
        {agent.phone && (
          <a
            href={`tel:${agent.phone}`}
            className="inline-flex items-center justify-center p-2 border border-border-default rounded-lg hover:bg-surface-secondary dark:hover:bg-forest-700 transition-colors"
            aria-label="Call agent"
          >
            <Phone className="h-4 w-4 text-forest-600 dark:text-forest-400" />
          </a>
        )}
      </div>
    </div>
  );
}
