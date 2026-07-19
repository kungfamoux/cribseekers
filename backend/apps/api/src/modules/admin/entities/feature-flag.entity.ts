export class FeatureFlag {
  id: string;
  key: string;
  description: string | null;
  enabled: boolean;
  percentage: number;
  whitelist: string[];
  metadata: any;
  createdAt: Date;
  updatedAt: Date;
}
