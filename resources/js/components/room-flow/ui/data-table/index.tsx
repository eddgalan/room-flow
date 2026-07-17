import type { Actions } from '@/components/room-flow/ui/data-table/types/data-table';
import FilterBar from './filter-bar';
import { useDataTable } from './hooks/use-data-table';
import Pagination from './pagination';
import RecordsCounter from './records-counter';
import TableBar from './table-bar';
import TableContent from './table-content';

type Props<T extends Record<string, unknown>> = {
    endpoint: string;
    headers: Array<keyof T & string>;
    caption?: string;
    filter?: boolean;
    pagination?: boolean;
    actions?: Actions<T>;
};

export default function DataTable<T extends Record<string, unknown>>({
    endpoint,
    headers,
    caption,
    filter = true,
    pagination = true,
    actions = [],
}: Props<T>) {
    const {
        rows,
        currentPage,
        lastPage,
        perPage,
        total,
        isLoading,
        error,
        changePage,
    } = useDataTable<T>({
        endpoint,
    });

    return (
        <div className="w-full">
            {filter && <FilterBar />}

            <TableBar>
                <RecordsCounter records={total} />

                {pagination && (
                    <Pagination
                        currentPage={currentPage}
                        recordsPerPage={perPage}
                        lastPage={lastPage}
                        onPageChange={changePage}
                        disabled={isLoading}
                    />
                )}
            </TableBar>

            {error && (
                <div className="p-4 text-sm text-destructive">{error}</div>
            )}

            <TableContent
                headers={headers}
                data={rows}
                caption={caption}
                isLoading={isLoading}
                actions={actions}
            />
        </div>
    );
}
