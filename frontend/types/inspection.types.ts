export interface Inspection {
  id: string;
  propertyId: string;
  userId: string;
  date: string;
  time: string;
  status: 'pending' | 'confirmed' | 'completed' | 'cancelled' | 'rescheduled';
  type?: 'in_person' | 'virtual' | 'self_tour';
  property?: {
    id: string;
    title: string;
    address: string;
    image?: string;
    images?: string[];
  };
  agentId?: string;
  agent?: {
    id: string;
    name: string;
    avatar?: string;
    phone?: string;
  };
  createdAt: string;
  confirmedAt?: string;
  completedAt?: string;
  cancelledAt?: string;
}

export interface InspectionFilters {
  status: string;
  type: string;
  dateRange: string;
  agent: string;
}
