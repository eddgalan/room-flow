import type { ReactNode } from 'react';

export type DataTableRow = Record<string, ReactNode>;

export type DataTableResponse<T> = {
    data: T[];
    meta: {
        current_page: number;
        last_page: number;
        per_page: number;
        total: number;
    };
};

export type DataTableParams = {
    page: number;
    perPage: number;
    search: string;
    sortBy?: string;
    sortDirection?: 'asc' | 'desc';
    filters: Record<string, string | number | boolean>;
};
