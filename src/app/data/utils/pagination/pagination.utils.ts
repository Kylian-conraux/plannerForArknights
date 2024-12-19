import { PaginatedResult, PaginationConfig } from "../../interface/pagination/pagination.interface";

export function createPaginationResult<T>(items: T[], config: PaginationConfig, filteredItems: T[]): PaginatedResult<T>{
    const total = filteredItems.length;
    const totalPages = Math.ceil(total/config.pageSize);
    const start = (config.currentPage-1)*config.pageSize;
    const end = start + config.pageSize;
    const paginatedItems = filteredItems.slice(start, end);

    return {items: paginatedItems, total, currentPage: config.currentPage, totalPages, hasNext: config.currentPage<totalPages, hasPrevious: config.currentPage>1};
}