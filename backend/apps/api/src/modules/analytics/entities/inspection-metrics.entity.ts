import { InspectionMetrics } from '../types/analytics-result.type';

export class InspectionMetricsEntity implements InspectionMetrics {
  scheduled: number;
  completed: number;
  cancelled: number;
  averageCompletionTime: number;
  inspectorPerformance: Array<{ inspectorId: string; name: string; completedInspections: number; averageRating: number; averageCompletionTime: number }>;
  propertyInspectionFrequency: Array<{ propertyId: string; title: string; inspectionCount: number }>;

  constructor(data?: Partial<InspectionMetrics>) {
    Object.assign(this, data);
  }
}
