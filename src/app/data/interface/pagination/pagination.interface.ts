export interface PaginationConfig {
    pageSize: number;
    currentPage: number;
    totalItems: number;
}

export interface PaginatedResult<T>{
    items: T[];
    total: number;
    currentPage: number;
    totalPages: number;
    hasNext: boolean;
    hasPrevious: boolean;
}