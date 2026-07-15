export class PermissionResponseDto {
  id: string;
  name: string;
  description?: string;
  type: string;
  resource: string;
  action: string;
  conditions?: string;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export class PermissionListResponseDto {
  data: PermissionResponseDto[];
  meta: {
    total: number;
    page: number;
    limit: number;
    totalPages: number;
    hasNextPage: boolean;
    hasPreviousPage: boolean;
  };
}
