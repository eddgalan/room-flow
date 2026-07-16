import FilterBar from '@/components/room-flow/ui/data-table/filter-bar';
import Pagination from '@/components/room-flow/ui/data-table/pagination';
import RecordsCounter from '@/components/room-flow/ui/data-table/records-counter';
import TableBar from '@/components/room-flow/ui/data-table/table-bar';
import TableContent from '@/components/room-flow/ui/data-table/table-content';

type Props = {
    filter?: boolean;
    pagination?: boolean;
};

const headers = [
    'id',
    'name',
    'lastname',
    'username',
    'enabled',
    'email',
    'phone_number',
    'created_at',
    'updated_at',
];

const data = [
    {
        id: '1',
        name: 'Admin',
        lastname: 'Admin',
        username: 'AdminUser',
        enabled: '1',
        email: 'admin@mail.com',
        phone_number: '5500000000',
        created_at: '---',
        updated_at: '---',
    },
];

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
            <TableContent headers={headers} data={data} caption="Users list" />
        </div>
    );
}
