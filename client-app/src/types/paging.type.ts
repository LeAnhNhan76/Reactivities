export type PagingParams = {
    pageIndex: number;
    itemsPerPage: number;
}

export type PagingResult<T> = {
    pageIndex: number;
    itemsPerPage: number;
    totalItems: number;
    totalPages: number;
    result: T[]
}