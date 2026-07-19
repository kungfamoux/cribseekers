export class UserResponseDto {
  id: string;
  email: string;
  phoneNumber?: string;
  firstName: string;
  lastName: string;
  type: string;
  status: string;
  gender?: string;
  dateOfBirth?: Date;
  emailVerified: boolean;
  phoneVerified: boolean;
  lastLoginAt?: Date;
  createdAt: Date;
  updatedAt: Date;
}

export class UserListResponseDto {
  data: UserResponseDto[];
  meta: {
    total: number;
    page: number;
    limit: number;
    totalPages: number;
    hasNextPage: boolean;
    hasPreviousPage: boolean;
  };
}
