export interface Coordinates {
  latitude: number;
  longitude: number;
}

export interface Address {
  street: string;
  city: string;
  state: string;
  country: string;
  postalCode: string;
  coordinates?: Coordinates;
}

export interface Money {
  amount: number;
  currency: string;
}

export interface DateRange {
  startDate: Date;
  endDate: Date;
}

export interface FileUpload {
  filename: string;
  mimetype: string;
  size: number;
  url: string;
}

export interface AuditFields {
  createdAt: Date;
  updatedAt: Date;
  createdBy?: string;
  updatedBy?: string;
  deletedAt?: Date;
}

export type Id = string;

export type UUID = string;
