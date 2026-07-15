import { UserStatus, UserType, Gender } from '@prisma/client';

export class User {
  id: string;
  email: string;
  phoneNumber?: string;
  password: string;
  firstName: string;
  lastName: string;
  type: UserType;
  status: UserStatus;
  gender?: Gender;
  dateOfBirth?: Date;
  emailVerified: boolean;
  phoneVerified: boolean;
  lastLoginAt?: Date;
  failedLoginAttempts: number;
  lockedUntil?: Date;
  createdAt: Date;
  updatedAt: Date;
  deletedAt?: Date;
  createdBy?: string;
  updatedBy?: string;
}
