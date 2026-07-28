export interface ApiResponse<T> {
  success: boolean;
  message: string;
  data: T | null;
  meta: {
    page?: number;
    limit?: number;
    total?: number;
    totalPages?: number;
  };
  errors: Array<{
    field: string;
    message: string;
  }>;
}

export interface PaginatedResponse<T> {
  data: T[];
  meta: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
}

export interface PaginationParams {
  page?: number;
  limit?: number;
  sortBy?: string;
  sortOrder?: 'asc' | 'desc';
}
