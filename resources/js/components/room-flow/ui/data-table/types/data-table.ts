import type { ReactNode } from 'react';
import type { RouteDefinition } from '@/wayfinder';

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

type DataTableActionMethod = 'get' | 'post' | 'put' | 'patch' | 'delete';

export type Action<T extends object> = {
    action: string;
    actionPath: (row: T) => string | RouteDefinition<DataTableActionMethod>;
    variant?: 'default' | 'destructive';
    confirm?: boolean;
    confirmTitle?: string;
    confirmMessage?: string | ((row: T) => string);
    confirmButtonText?: string;
    cancelButtonText?: string;
};

export type Actions<T extends object> = Action<T>[];
