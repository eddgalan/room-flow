import FilterBar from '@/components/room-flow/ui/data-table/filter-bar';
import Pagination from '@/components/room-flow/ui/data-table/pagination';
import RecordsCounter from '@/components/room-flow/ui/data-table/records-counter';
import TableBar from '@/components/room-flow/ui/data-table/table-bar';

type Props = {
    filter?: boolean;
    pagination?: boolean;
};

export default function Index({
    filter = true,
    pagination = true,
}: Props) {
    return (
        <div className="w-full flex-row">
            {filter && <FilterBar />}
            <TableBar>
                <RecordsCounter />
                {pagination && <Pagination />}
            </TableBar>
        </div>
    );
}
