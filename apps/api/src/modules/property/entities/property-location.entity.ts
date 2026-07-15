export class PropertyLocation {
  id: string;
  propertyId: string;
  address: string;
  city: string;
  state: string;
  country: string;
  postalCode?: string;
  latitude: number;
  longitude: number;
  geohash?: string;
  neighborhood?: string;
  landmark?: string;
  directions?: string;
  createdAt: Date;
  updatedAt: Date;
  deletedAt?: Date;
}
