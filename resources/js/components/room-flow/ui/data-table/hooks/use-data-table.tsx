import { useCallback, useEffect, useState } from 'react';
import type { DataTableParams, DataTableResponse } from '../types/data-table';

type UseDataTableOptions = {
    endpoint: string;
    initialPerPage?: number;
};

const initialParams = (perPage: number): DataTableParams => ({
    page: 1,
    perPage,
    search: '',
    filters: {},
});

export function useDataTable<T>({
    endpoint,
    initialPerPage = 20,
}: UseDataTableOptions) {
    const [rows, setRows] = useState<T[]>([]);
    const [params, setParams] = useState<DataTableParams>(() =>
        initialParams(initialPerPage),
    );

    const [currentPage, setCurrentPage] = useState(1);
    const [lastPage, setLastPage] = useState(1);
    const [total, setTotal] = useState(0);
    const [perPage, setPerPage] = useState(initialPerPage);

    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const fetchData = useCallback(
        async (signal?: AbortSignal) => {
            setIsLoading(true);
            setError(null);

            try {
                const query = new URLSearchParams({
                    page: String(params.page),
                    per_page: String(params.perPage),
                });

                if (params.search) {
                    query.set('search', params.search);
                }

                if (params.sortBy) {
                    query.set('sort_by', params.sortBy);
                    query.set('sort_direction', params.sortDirection ?? 'asc');
                }

                Object.entries(params.filters).forEach(([field, value]) => {
                    query.set(`filters[${field}]`, String(value));
                });

                const response = await fetch(
                    `${endpoint}?${query.toString()}`,
                    {
                        signal,
                        headers: {
                            Accept: 'application/json',
                        },
                    },
                );

                if (!response.ok) {
                    throw new Error(
                        `Request failed with status ${response.status}`,
                    );
                }

                const result = (await response.json()) as DataTableResponse<T>;

                setRows(result.data);
                setCurrentPage(result.meta.current_page);
                setLastPage(result.meta.last_page);
                setPerPage(result.meta.per_page);
                setTotal(result.meta.total);
            } catch (exception) {
                if (
                    exception instanceof DOMException &&
                    exception.name === 'AbortError'
                ) {
                    return;
                }

                setError(
                    exception instanceof Error
                        ? exception.message
                        : 'An unexpected error occurred.',
                );
            } finally {
                setIsLoading(false);
            }
        },
        [endpoint, params],
    );

    useEffect(() => {
        const controller = new AbortController();

        void Promise.resolve().then(() => fetchData(controller.signal));

        return () => controller.abort();
    }, [fetchData]);

    const changePage = (page: number) => {
        if (page < 1 || page > lastPage) {
            return;
        }

        setParams((current) => ({
            ...current,
            page,
        }));
    };

    const changePerPage = (value: number) => {
        setParams((current) => ({
            ...current,
            page: 1,
            perPage: value,
        }));
    };

    const changeSearch = (search: string) => {
        setParams((current) => ({
            ...current,
            page: 1,
            search,
        }));
    };

    const changeFilters = (filters: DataTableParams['filters']) => {
        setParams((current) => ({
            ...current,
            page: 1,
            filters,
        }));
    };

    const changeSorting = (sortBy: string, sortDirection: 'asc' | 'desc') => {
        setParams((current) => ({
            ...current,
            page: 1,
            sortBy,
            sortDirection,
        }));
    };

    return {
        rows,
        currentPage,
        lastPage,
        perPage,
        total,
        params,
        isLoading,
        error,
        changePage,
        changePerPage,
        changeSearch,
        changeFilters,
        changeSorting,
        refresh: fetchData,
    };
}
