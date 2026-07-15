export class SavedSearch {
  id: string;
  userId: string;
  name: string;
  filters: any;
  propertyId?: string;
  notifyByEmail: boolean;
  lastRunAt?: Date;
  createdAt: Date;
  updatedAt: Date;
}
