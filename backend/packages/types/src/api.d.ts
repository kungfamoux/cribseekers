export interface ApiResponse<T = unknown> {
    success: boolean;
    data: T;
    message?: string;
    errors?: Record<string, string[]>;
    meta?: ApiMeta;
}
export interface ApiMeta {
    timestamp: string;
    requestId: string;
    version: string;
}
export interface PaginatedResponse<T> {
    items: T[];
    pagination: PaginationMeta;
}
export interface PaginationMeta {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
    hasNext: boolean;
    hasPrevious: boolean;
}
export interface ApiError {
    statusCode: number;
    message: string;
    error?: string;
    details?: unknown;
    timestamp: string;
    path: string;
}
//# sourceMappingURL=api.d.ts.map