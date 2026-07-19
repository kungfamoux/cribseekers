import { DeviceType } from '@prisma/client';

export class Device {
  id: string;
  userId: string;
  deviceType: DeviceType;
  deviceName?: string;
  deviceIdentifier?: string;
  os?: string;
  osVersion?: string;
  browser?: string;
  browserVersion?: string;
  isTrusted: boolean;
  lastUsedAt: Date;
  createdAt: Date;
  updatedAt: Date;
}
